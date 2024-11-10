import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import CharacterCard from "./CharacterCard";
import { CharacterCardSkeleton } from "./CharacterCardSkeleton";
import { generateCharacterStats } from "./statsGenerator";

export const FinalCollectionView = ({
  collectionData,
  onRegenerate,
  onComplete,
  isLoading = false,
}) => {
  const [collection, setCollection] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [collectionStats, setCollectionStats] = useState({
    totalPower: 0,
    averagePower: 0,
  });

  useEffect(() => {
    if (collectionData) {
      generateCollection(collectionData);
    }
  }, [collectionData]);

  const generateSingleCharacter = async (selections) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          style: selections.style,
          characterClass: selections.class,
          attributes: {
            gender: selections.gender,
            race: selections.race,
            equipment: selections.equipment,
          },
        }),
      });

      const data = await response.json();
      if (!data.success || !data.variations?.[0]?.success) {
        throw new Error("Failed to generate character");
      }

      const { stats, specialPower } = generateCharacterStats(
        selections.class,
        selections.race,
        selections.equipment
      );

      return {
        imageUrl: data.variations[0].image,
        stats,
        specialPower,
        metadata: data.variations[0].metadata,
      };
    } catch (error) {
      console.error("Error generating character:", error);
      throw error;
    }
  };

  const generateCollection = async (data) => {
    try {
      setIsGenerating(true);
      setGenerationProgress(0);

      const newCollection = [];
      const { size, selections } = data;

      // Generate characters sequentially to avoid API rate limits
      for (let i = 0; i < size; i++) {
        try {
          const characterData = await generateSingleCharacter(selections);
          newCollection.push({
            id: `char-${i + 1}`,
            ...characterData,
            metadata: {
              ...characterData.metadata,
              name: `Character #${i + 1}`,
              serialNumber: i + 1,
            },
          });

          setGenerationProgress(((i + 1) / size) * 100);
          setCollection([...newCollection]); // Update UI with each new character
        } catch (error) {
          toast.error(`Failed to generate character ${i + 1}`);
        }
      }

      calculateStats(newCollection);
      toast.success("Collection generated successfully!");
    } catch (error) {
      console.error("Error generating collection:", error);
      toast.error("Failed to generate collection");
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const calculateStats = (chars) => {
    const totalPower = chars.reduce((acc, char) => {
      return (
        acc + Object.values(char.stats).reduce((sum, stat) => sum + stat, 0)
      );
    }, 0);

    setCollectionStats({
      totalPower,
      averagePower:
        chars.length > 0 ? Math.round(totalPower / chars.length) : 0,
    });
  };

  if (isGenerating) {
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
              Generating Your Collection
            </CardTitle>
            <div className="space-y-2">
              <p className="text-white/60 font-rajdhani">
                Creating {collectionData.size} unique characters...
              </p>
              <div className="w-full bg-gray-800/50 rounded-full h-2">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
              <p className="text-sm text-white/40 font-rajdhani">
                {Math.round(generationProgress)}% complete
              </p>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.map((char) => (
                  <CharacterCard key={char.id} {...char} />
                ))}
                {collection.length < collectionData.size && (
                  // <CharacterCardSkeleton />
                  <p>Loading...</p>
                )}
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
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Collection
              </CardTitle>
              <p className="text-white/60 font-rajdhani mt-1">
                {collection.length} Unique Characters Generated
              </p>
            </div>

            <div className="flex gap-4">
              <Badge variant="outline" className="bg-white/5">
                <Sparkles className="w-4 h-4 mr-1" />
                Total Power: {collectionStats.totalPower.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="bg-white/5">
                Avg Power: {collectionStats.averagePower}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {collection.map((char) => (
                <CharacterCard key={char.id} {...char} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={onRegenerate}
                disabled={isGenerating}
                className="border-white/10 hover:border-white/20"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>

              <Button
                onClick={() => {
                  toast.info("Blockchain integration coming soon");
                }}
                disabled={isGenerating || collection.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Prepare for Minting
              </Button>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};
