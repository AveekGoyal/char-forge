"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletIcon, LogOut } from "lucide-react";
import { formatEther } from "viem";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

const Navbar = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
      router.push("/");
    } catch (error) {
      toast.error("Failed to disconnect wallet");
      console.error("Disconnect error:", error);
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[2000px] mx-auto px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo/Brand - Using Orbitron font */}
            <div className="flex-shrink-0">
              <motion.span
                onClick={() => router.push("/home")}
                className="font-orbitron text-white bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent cursor-pointer"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CharacterForge.ai
              </motion.span>
            </div>

            {/* Wallet info - Using Rajdhani font */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="font-rajdhani text-white/70 text-lg">
                {balance &&
                  `${parseFloat(formatEther(balance.value)).toFixed(4)} ${
                    balance.symbol
                  }`}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <WalletIcon className="w-5 h-5" />
                  <span className="font-rajdhani text-white/90 font-medium">
                    {formatAddress(address)}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-black/90 backdrop-blur-lg border border-white/10"
                >
                  <DropdownMenuItem
                    className="font-rajdhani text-red-400 hover:text-red-300 cursor-pointer focus:text-red-300 focus:bg-red-500/10"
                    onClick={handleDisconnect}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};


// Particles Effect with standardized colors
const Particles = () => {
  const colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size + "px",
              height: size + "px",
              background: color,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              filter: "blur(1px)",
              opacity: 0.6,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
export default function GenerateLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <Particles />
      <Navbar />
      <AnimatePresence mode="wait">
        <main className="relative z-10 flex items-center justify-center min-h-screen pt-28 pb-16">
          {children}
        </main>
      </AnimatePresence>
    </div>
  );
}