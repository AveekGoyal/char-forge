"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RefreshCw, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import CharacterCard from "./CharacterCard";
import { CharacterCardSkeleton } from "./CharacterCardSkeleton";
import { generateCharacterStats } from "./statsGenerator";

export const ResultView = ({
  generatedData,
  selections,
  onRegenerate,
  isLoading = false,
  onProceed = () => {},
}) => {
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    if (generatedData?.variations?.[0]) {
      const variation = generatedData.variations[0];
      if (variation.success) {
        const { stats, specialPower } = generateCharacterStats(
          selections.class,
          selections.race,
          selections.equipment
        );

        setCharacterData({
          id: 1,
          imageUrl: variation.image,
          stats,
          specialPower,
          metadata: variation.metadata,
        });
      }
    }
  }, [generatedData]);

  const handleProceed = () => {
    if (!characterData) {
      toast.error("No character data available");
      return;
    }

    try {
      onProceed([characterData]);
    } catch (error) {
      console.error("Error proceeding:", error);
      toast.error("Failed to proceed with character");
    }
  };

  if (isLoading || !characterData) {
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
              Generating Your Character
            </CardTitle>
            <div className="flex items-center gap-2 text-white/60 font-rajdhani">
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating your unique character...
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full pr-4">
              <div className="flex justify-center">
                {/* <CharacterCardSkeleton /> */}
                Loading character...
              </div>
            </ScrollArea>
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
            Your Generated Character
          </CardTitle>
          <p className="text-white/60 font-rajdhani">
            Review your character before proceeding
          </p>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-md">
                <CharacterCard {...characterData} />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={onRegenerate}
                className="border-white/10 hover:border-white/20 bg-white/5"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Character
              </Button>

              <Button
                onClick={handleProceed}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};
