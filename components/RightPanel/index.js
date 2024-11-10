"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wand2, Palette, Monitor, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TypeWriter } from "./TypeWriter";

export const RightPanel = () => {
  const router = useRouter();

  // Words for typewriter effect
  const typingWords = [
    "Fantasy Warriors",
    "Pixel Art Heroes",
    "3D Game Assets",
    "Sci-fi Explorers",
  ];

  const featuresData = [
    {
      icon: Wand2,
      title: "AI Generation",
      description: "Create unique characters instantly",
    },
    {
      icon: Palette,
      title: "Multiple Styles",
      description: "From pixel art to high-quality 3D",
    },
    {
      icon: Monitor,
      title: "Game Ready",
      description: "Ready-to-use in popular engines",
    },
    {
      icon: Shield,
      title: "NFT Enabled",
      description: "Instant blockchain deployment",
    },
  ];

  const workflowSteps = [
    {
      number: "01",
      title: "Choose Style",
      description: "Select from multiple art styles",
    },
    {
      number: "02",
      title: "Customize",
      description: "Define traits and attributes",
    },
    {
      number: "03",
      title: "Preview",
      description: "Review your character",
    },
    {
      number: "04",
      title: "Generate",
      description: "Create your collection",
    },
  ];

  const handleConnect = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          toast.success("Connected to MetaMask");
          router.push("/home");
        }
      }
    } catch (error) {
      console.error("Failed to connect:", error);
      toast.error("Failed to connect wallet");
    }
  };

  return (
    <div className="w-full flex flex-col items-start space-y-8">
      {/* Title Section */}
      <div className="space-y-2">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          style={{
            background: "linear-gradient(to right, #FF2E63, #4FB4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          CharacterForge.ai
        </motion.h1>

        <motion.h2
          className="text-xl text-[#4FB4FF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Generate Character NFTs using AI
        </motion.h2>

        <motion.div
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Generate your{" "}
          <span className="text-[#FF2E63]">
            <TypeWriter words={typingWords} />
          </span>
          . Instantly.
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {featuresData.map((feature, idx) => (
          <motion.div
            key={idx}
            className="p-4 rounded-lg border border-[#1A1A1A] bg-[#0A0A0A]
                       hover:border-[#FF2E63]/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
          >
            {React.createElement(feature.icon, {
              className: "w-6 h-6 mb-2 text-[#FF2E63]",
            })}
            <h3 className="text-white font-medium mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Connect Button */}
      <div className="w-full flex justify-center py-4">
        <motion.button
          onClick={handleConnect}
          className="px-8 py-3 rounded-lg text-white font-medium
                     bg-[#FF2E63] hover:bg-[#FF4776]
                     transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Connect Wallet
        </motion.button>
      </div>
    </div>
  );
};
