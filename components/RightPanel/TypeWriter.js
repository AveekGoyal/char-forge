"use client";

import React, { useState, useEffect } from 'react';

export const TypeWriter = ({ words = [], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const word = words[currentWordIndex];
    
    const handleTyping = () => {
      setCurrentText(current => {
        if (isDeleting) {
          // Deleting text
          if (current === '') {
            setIsDeleting(false);
            setCurrentWordIndex((current) => (current + 1) % words.length);
            return '';
          }
          return current.slice(0, -1);
        } else {
          // Typing text
          if (current === word) {
            setTimeout(() => setIsDeleting(true), pauseTime);
            return current;
          }
          return word.slice(0, current.length + 1);
        }
      });
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="text-[#FF2E63]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};