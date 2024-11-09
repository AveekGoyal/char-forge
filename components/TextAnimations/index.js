"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const GradualText = ({
  text,
  baseColor = "white",
  highlightColor = "#00ff00", // Changed to gaming green
}) => {
  const characters = text.split("");
  return (
    <div
      className="whitespace-nowrap flex justify-center px-4"
      style={{
        maxWidth: "100%",
        transform: "scale(var(--scale-factor, 1))",
        "--scale-factor": "clamp(0.8, 5vw, 1.2)",
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          style={{
            color: baseColor,
            textShadow: "0 0 10px rgba(0,255,0,0.5)", // Changed to gaming green glow
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "clamp(2rem, 2vw, 3.5rem)",
          }}
          animate={{
            color: [baseColor, highlightColor, baseColor],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const textOptions = [
    "Generate Character NFTs using AI",
    "Choose from 8+ Art Styles: Pixel, Vector, 3D...",
    "Select Theme: Fantasy, Sci-fi, Cyberpunk...",
    "Pick Character Class: Warrior, Mage, Rogue...",
    "Customize Attributes: Build, Height, Gear..."
  ];

  useEffect(() => {
    const text = textOptions[currentTextIndex];
    
    if (currentCharIndex < text.length) {
      // Type current text
      const typingTimeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(typingTimeout);
    } else {
      // Move to next text after delay
      const nextTextTimeout = setTimeout(() => {
        setDisplayText("");
        setCurrentCharIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % textOptions.length);
      }, 2000);
      return () => clearTimeout(nextTextTimeout);
    }
  }, [currentCharIndex, currentTextIndex]);

  return (
    <span
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: "clamp(1rem, 2vw, 1.5rem)",
      }}
      className="text-[#00ff00] tracking-wider" // Changed to gaming green
    >
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};