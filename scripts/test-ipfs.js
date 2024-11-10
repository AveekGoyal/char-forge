// test-ipfs.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

async function testIPFSUpload() {
    const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
    console.log(PINATA_API_KEY, PINATA_SECRET_KEY);

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
        console.error('❌ Pinata API keys not found in environment variables');
        return;
    }

    console.log('Found API Keys:', {
        pinataKey: PINATA_API_KEY ? '✅ Present' : '❌ Missing',
        pinataSecret: PINATA_SECRET_KEY ? '✅ Present' : '❌ Missing'
    });

    const pinataClient = axios.create({
        baseURL: 'https://api.pinata.cloud',
        headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
        },
    });

    // 1. Test image upload
    async function uploadTestImage() {
        try {
            const formData = new FormData();
            
            // Read image from public folder
            const imagePath = path.join(process.cwd(), 'public', 'cyra-card.png');
            console.log('📂 Looking for image at:', imagePath);
            
            if (!fs.existsSync(imagePath)) {
                throw new Error(`Image not found at ${imagePath}`);
            }

            const imageFile = fs.createReadStream(imagePath);
            formData.append('file', imageFile, { filename: 'cyra-card.png' });

            console.log('📤 Uploading image to Pinata...');

            const response = await pinataClient.post('/pinning/pinFileToIPFS', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            });

            return {
                success: true,
                ipfsHash: response.data.IpfsHash,
                pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
            };
        } catch (error) {
            console.error('❌ Image upload error:', error.response?.data || error.message);
            return { success: false, error: error.message };
        }
    }

    // 2. Test metadata upload
    async function uploadTestMetadata(imageHash) {
        try {
            console.log('📝 Generating and uploading metadata...');

            const metadata = {
                name: "Cyra the Warrior",
                description: "A powerful warrior character from CharacterForge.ai",
                image: `ipfs://${imageHash}`,
                attributes: [
                    { trait_type: 'Class', value: 'Warrior' },
                    { trait_type: 'Race', value: 'Elf' },
                    { trait_type: 'Style', value: 'Pixel' },
                    { trait_type: 'HP', value: 85 },
                    { trait_type: 'MP', value: 45 },
                    { trait_type: 'STR', value: 75 },
                    { trait_type: 'INT', value: 60 },
                    { trait_type: 'Special Power', value: 'Berserker Rage' },
                ],
            };

            const response = await pinataClient.post('/pinning/pinJSONToIPFS', metadata);

            return {
                success: true,
                ipfsHash: response.data.IpfsHash,
                pinataUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
                metadata: metadata
            };
        } catch (error) {
            console.error('❌ Metadata upload error:', error.response?.data || error.message);
            return { success: false, error: error.message };
        }
    }

    // 3. Run test flow
    console.log('🚀 Starting IPFS test...');
    
    // Test image upload
    const imageResult = await uploadTestImage();
    console.log('\n🖼️  Image Upload Result:', imageResult);
    
    if (imageResult.success) {
        // Test metadata upload
        const metadataResult = await uploadTestMetadata(imageResult.ipfsHash);
        console.log('\n📄 Metadata Upload Result:', metadataResult);
        
        if (metadataResult.success) {
            console.log('\n✅ Test URLs to verify:');
            console.log('🔗 Image:', `https://gateway.pinata.cloud/ipfs/${imageResult.ipfsHash}`);
            console.log('🔗 Metadata:', `https://gateway.pinata.cloud/ipfs/${metadataResult.ipfsHash}`);
            
            console.log('\n📝 Smart Contract baseURI should be:');
            console.log(`ipfs://${metadataResult.ipfsHash}/`);

            console.log('\n🔍 Verify your metadata:');
            console.log(JSON.stringify(metadataResult.metadata, null, 2));
        }
    }
}

// Run the test
testIPFSUpload().catch(console.error);