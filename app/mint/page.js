import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { useAccount, useSigner } from 'wagmi';
import { formatEther } from 'ethers/lib/utils';
import { toast } from "sonner";
import MintingPreview from '@/app/components/Mint/MintingPreview';
import MintStatus from '@/app/components/Mint/MintStatus';
import { MintingService } from '@/app/lib/blockchain/mintingService';

const MintPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  
  const [collection, setCollection] = useState([]);
  const [mintingStatus, setMintingStatus] = useState({
    status: 'pending',
    progress: 0,
    currentStep: '',
    transactionHash: null,
    openSeaLink: null,
    error: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    // Load collection from localStorage
    const savedCollection = localStorage.getItem('currentCollection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, []);

  const handleMint = async () => {
    if (!signer || !address) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      setIsLoading(true);
      
      const mintingService = new MintingService(signer, (progress) => {
        setMintingStatus(progress);
      });

      const result = await mintingService.processCollection(collection);

      if (result.success) {
        toast.success("Collection minted successfully!");
        // Clear the temporary collection from localStorage
        localStorage.removeItem('currentCollection');
      } else {
        toast.error("Failed to mint collection");
      }

    } catch (error) {
      console.error("Minting error:", error);
      setMintingStatus({
        status: 'failed',
        progress: 0,
        currentStep: '',
        error: error.message
      });
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setMintingStatus({
      status: 'pending',
      progress: 0,
      currentStep: '',
      error: null
    });
  };

  const handleComplete = () => {
    router.push('/view-nfts');
  };

  if (mintingStatus.status !== 'pending') {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <MintStatus 
          {...mintingStatus}
          onRetry={handleRetry}
          onComplete={handleComplete}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <MintingPreview
        collection={collection}
        onMint={handleMint}
        isLoading={isLoading}
        estimatedGas={estimatedGas}
        totalCost={totalCost}
      />
    </motion.div>
  );
};

export default MintPage;