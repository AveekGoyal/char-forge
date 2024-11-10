import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

const pinataClient = axios.create({
  baseURL: 'https://api.pinata.cloud',
  headers: {
    pinata_api_key: PINATA_API_KEY,
    pinata_secret_api_key: PINATA_SECRET_KEY,
  },
});

export const uploadImageToPinata = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await pinataClient.post('/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const uploadMetadataToPinata = async (metadata) => {
  try {
    const response = await pinataClient.post('/pinning/pinJSONToIPFS', metadata);

    return {
      success: true,
      ipfsHash: response.data.IpfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Error uploading metadata to Pinata:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const generateMetadata = (character, imageUrl) => {
  return {
    name: character.metadata.name,
    description: `A unique character created with CharacterForge.ai`,
    image: imageUrl,
    attributes: [
      { trait_type: 'Class', value: character.metadata.characterClass },
      { trait_type: 'Race', value: character.metadata.attributes.race },
      { trait_type: 'Style', value: character.metadata.style },
      { trait_type: 'HP', value: character.stats.HP },
      { trait_type: 'MP', value: character.stats.MP },
      { trait_type: 'STR', value: character.stats.STR },
      { trait_type: 'INT', value: character.stats.INT },
      { trait_type: 'Special Power', value: character.specialPower.name },
    ],
  };
};