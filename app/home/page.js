"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  LogOut,
  Wand2,
  Palette,
  Upload,
  LayoutGrid,
  Lock,
} from "lucide-react";
import { formatEther } from "viem";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { toast } from "sonner";
import Marquee from "@/components/ui/marquee";


// Particles Effect with standardized colors
const Particles = () => {
  const colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"]; // Matching landing page colors
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

// Enhanced Navbar with standardized fonts
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
            <div className="flex-shrink-0">
              <motion.span
                className="font-orbitron text-white bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CharacterForge.ai
              </motion.span>
            </div>

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
        <Wallet className="w-5 h-5" />
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

// Character Templates with standardized styling
const characterTemplates = [
  {
    name: "Pixel Warrior",
    description: "8-bit styled warrior character with customizable attributes.",
  },
  {
    name: "Cyber Mage",
    description: "Futuristic spellcaster with techno-magical elements.",
  },
  {
    name: "Space Explorer",
    description: "Sci-fi adventurer ready for galactic missions.",
  },
  {
    name: "Forest Guardian",
    description: "Nature-based protector with mystical abilities.",
  },
];

const CharacterShowcase = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img 
          src="/dwarf-ranger.png" 
          alt="Character" 
          className="w-32 h-32 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      </motion.div>

      <motion.div 
        className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"
        animate={{
          y: [-20, 0, -20],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 4,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img 
          src="/elf-rogue.png" 
          alt="Character" 
          className="w-32 h-32 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      </motion.div>

      <motion.div 
        className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2"
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img 
          src="/human-sorceress.png" 
          alt="Character" 
          className="w-32 h-32 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      </motion.div>

      {/* Magic particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              y: [-20, 20],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const NFTGalleryShowcase = () => {
  return (
    <motion.div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
      {['/pixel-warrior.png', '/cyra-card.png', '/klee-card.png'].map((src, idx) => (
        <motion.div
          key={idx}
          className="relative aspect-[3/4] rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: idx * 0.2 } 
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
            whileHover={{ opacity: 0 }}
          />
          <motion.img
            src={src}
            alt="NFT Card"
            className="w-full h-full object-cover"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 } 
            }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-white/0"
            whileHover={{ 
              borderColor: "rgba(255,255,255,0.2)",
              transition: { duration: 0.2 }
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

const features = [
  {
    Icon: Wand2,
    name: "Generate Character + NFT",
    description:
      "Create unique characters and mint them as NFTs in one seamless process.",
    href: "/generate/nft",
    cta: "Create & Mint",
    className: "col-span-6 lg:col-span-4 cursor-pointer group/card relative",
    background: (
      <>
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-fuchsia-900/50" />
        
        {/* Character showcase */}
        <CharacterShowcase />
        
        {/* Content overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </>
    ),
  },
  {
    Icon: Upload,
    name: "Upload Images to Generate NFT",
    description:
      "Convert your existing artwork into NFTs with just a few clicks.",
    href: "#",
    cta: "Coming Soon",
    className: "col-span-6 lg:col-span-4 cursor-pointer group/card relative",
    background: (
      <div className="absolute inset-0">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-teal-900/30 to-cyan-900/50" />
        
        {/* Grid elements with better visibility */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="h-20 w-20 rounded-lg bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>

        {/* Lock overlay with improved visibility */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-3">
            <Lock className="w-8 h-8 mx-auto text-white/90" />
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm font-rajdhani text-white">
              Coming Soon
            </Badge>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: LayoutGrid,
    name: "View Your NFTs",
    description: "Browse your complete NFT collection in one place.",
    href: "/view-all-NFTs",
    cta: "View Gallery",
    className: "col-span-6 lg:col-span-4 cursor-pointer group/card relative",
    background: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/50 via-orange-900/30 to-rose-900/50" />
        <NFTGalleryShowcase />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm group-hover/card:bg-black/20 transition-all duration-300" />
      </>
    ),
  },
];


// Main content component with improved card styling
const MainContent = () => {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="bento-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`${feature.className} h-[400px]`}
                onClick={() => feature.href !== "#" && router.push(feature.href)}
              >
                <div className="relative w-full h-full rounded-xl border border-white/20 overflow-hidden group cursor-pointer
                             hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-2xl
                             shadow-black/50 hover:shadow-black/70">
                  {/* Background */}
                  <div className="absolute inset-0">
                    {feature.background}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between backdrop-blur-sm">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4
                                    group-hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                        {React.createElement(feature.Icon, {
                          className: "w-6 h-6 text-white"
                        })}
                      </div>
                      <h3 className="font-orbitron text-2xl text-white mb-3 group-hover:text-white/90">
                        {feature.name}
                      </h3>
                      <p className="font-rajdhani text-lg text-white/90 group-hover:text-white">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="font-rajdhani text-base text-white/80 group-hover:text-white transition-all duration-300
                                  flex items-center gap-2">
                      {feature.cta} 
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};


// Home Page Component
export default function HomePage() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative min-h-screen bg-gray-900 text-white"
      >
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black" />
        <Particles />
        <Navbar />
        <main className="relative z-10 flex items-center justify-center min-h-screen pt-28 pb-16">
          <MainContent />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}