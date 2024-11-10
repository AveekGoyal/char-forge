import { uploadImageToPinata, uploadMetadataToPinata, generateMetadata } from '@/app/lib/ipfs/pinata';
import { mintCharacter, setCollectionURI } from '@/app/lib/blockchain/contract';

export class MintingService {
  constructor(signer, onProgress) {
    this.signer = signer;
    this.onProgress = onProgress || (() => {});
  }

  async uploadCollectionToIPFS(characters) {
    const uploadedCharacters = [];
    
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      
      // Update progress
      this.onProgress({
        status: 'uploading',
        progress: (i / characters.length) * 50,
        currentStep: `Uploading character ${i + 1} of ${characters.length}`
      });

      // Convert image URL to File object
      const imageResponse = await fetch(character.imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], `character-${i + 1}.png`, { type: 'image/png' });

      // Upload image to IPFS
      const imageUpload = await uploadImageToPinata(imageFile);
      if (!imageUpload.success) {
        throw new Error(`Failed to upload image for character ${i + 1}`);
      }

      // Generate and upload metadata
      const metadata = generateMetadata(character, imageUpload.pinataUrl);
      const metadataUpload = await uploadMetadataToPinata(metadata);
      if (!metadataUpload.success) {
        throw new Error(`Failed to upload metadata for character ${i + 1}`);
      }

      uploadedCharacters.push({
        ...character,
        ipfs: {
          image: imageUpload.pinataUrl,
          metadata: metadataUpload.pinataUrl,
          imageHash: imageUpload.ipfsHash,
          metadataHash: metadataUpload.ipfsHash
        }
      });
    }

    return uploadedCharacters;
  }

  async mintCollection(uploadedCharacters) {
    try {
      // Set the base URI for the collection
      const baseURI = `ipfs://${uploadedCharacters[0].ipfs.metadataHash}/`;
      await setCollectionURI(this.signer, baseURI);

      // Update progress
      this.onProgress({
        status: 'minting',
        progress: 75,
        currentStep: 'Minting your collection...'
      });

      // Mint the entire collection in one transaction
      const mintResult = await mintCharacter(this.signer, uploadedCharacters.length);
      if (!mintResult.success) {
        throw new Error(mintResult.error);
      }

      // Generate OpenSea collection link
      const openSeaLink = `https://testnets.opensea.io/assets/base-sepolia/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${mintResult.tokenId}`;

      return {
        success: true,
        transactionHash: mintResult.hash,
        tokenIds: Array.from({ length: uploadedCharacters.length }, (_, i) => 
          (parseInt(mintResult.tokenId) + i).toString()
        ),
        openSeaLink
      };

    } catch (error) {
      console.error('Minting error:', error);
      throw error;
    }
  }

  async processCollection(characters) {
    try {
      // Step 1: Upload all characters to IPFS
      const uploadedCharacters = await this.uploadCollectionToIPFS(characters);

      // Step 2: Mint the collection
      const mintResult = await this.mintCollection(uploadedCharacters);

      // Update final progress
      this.onProgress({
        status: 'success',
        progress: 100,
        currentStep: 'Collection minted successfully!',
        transactionHash: mintResult.transactionHash,
        openSeaLink: mintResult.openSeaLink
      });

      return {
        success: true,
        characters: uploadedCharacters,
        ...mintResult
      };

    } catch (error) {
      this.onProgress({
        status: 'failed',
        progress: 0,
        currentStep: '',
        error: error.message
      });

      return {
        success: false,
        error: error.message
      };
    }
  }
}