import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Download, RefreshCw, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import CharacterCard from './CharacterCard';

// Special powers pool - we'll randomly assign these
const SPECIAL_POWERS = [
  {
    name: "Dragon's Breath",
    description: "Unleash a powerful cone of fire damage",
  },
  {
    name: "Time Warp",
    description: "Manipulate the flow of time briefly",
  },
  {
    name: "Nature's Blessing",
    description: "Heal and enhance nearby allies",
  },
  {
    name: "Shadow Strike",
    description: "Deal bonus damage from stealth",
  },
  {
    name: "Mind Control",
    description: "Temporarily control an enemy",
  },
  {
    name: "Thunder Clap",
    description: "Stun and damage nearby enemies",
  }
];

export const ResultView = ({ 
  generatedData,
  selections, 
  onRegenerate,
  steps,
  isLoading = false,
  onProceed = () => {} 
}) => {
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [characterVariations, setCharacterVariations] = useState([]);
  
  useEffect(() => {
    if (generatedData?.variations) {
      // Filter successful variations and create character data
      const characters = generatedData.variations
        .filter(variation => variation.success)
        .map((variation, index) => ({
          id: index + 1,
          imageUrl: variation.image,
          specialPower: SPECIAL_POWERS[Math.floor(Math.random() * SPECIAL_POWERS.length)],
          metadata: variation.metadata
        }));
      
      setCharacterVariations(characters);
    }
  }, [generatedData]);

  const handleCardSelect = (id) => {
    setSelectedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleProceed = () => {
    if (selectedCards.size === 0) {
      toast.error("Please select at least one character variation");
      return;
    }

    // Get selected characters
    const selectedCharacters = characterVariations.filter(char => 
      selectedCards.has(char.id)
    );
    
    try {
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('selectedCharacters') || '[]');
      localStorage.setItem('selectedCharacters', 
        JSON.stringify([...existing, ...selectedCharacters])
      );
      
      // Call the parent's onProceed with selected characters
      onProceed(selectedCharacters);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      toast.error("Failed to save selections");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full"
      >
        <Card className="bg-gray-800/50 backdrop-blur-md border border-white/10 h-full">
          <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
            <p className="text-white/60 font-rajdhani">Generating your characters...</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
    >
      <Card className="bg-gray-800/50 backdrop-blur-md border border-white/10 h-full">
        <CardHeader>
          <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Select Your Favorite Variations
          </CardTitle>
          <p className="text-white/60 font-rajdhani">
            Choose one or more variations to proceed with your collection
          </p>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {characterVariations.map((char) => (
                <CharacterCard
                  key={char.id}
                  imageUrl={char.imageUrl}
                  specialPower={char.specialPower}
                  isSelected={selectedCards.has(char.id)}
                  onSelect={() => handleCardSelect(char.id)}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={onRegenerate}
                className="border-white/10 hover:border-white/20 bg-white/5"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Variations
              </Button>

              <Button
                onClick={handleProceed}
                disabled={selectedCards.size === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Collection
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};