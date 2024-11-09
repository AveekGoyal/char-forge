// components/Particles/index.js
"use client";

import { motion } from "framer-motion";

export const Particles = () => {
  // Gaming-themed colors: neon green, electric blue, cyber yellow
  const colors = ["#00ff00", "#0066ff", "#ffff00"];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Matrix-style digital rain background */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                   from-[#003300] via-black to-black opacity-50"
      />
      
      {/* Floating particles */}
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
              opacity: 0.4,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
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