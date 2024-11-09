import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ImagePlus, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CollectionSizeSelector = ({
  onConfirm,
  isLoading = false,
  selectedVariations = [],
}) => {
  const [collectionSize, setCollectionSize] = useState(1);
  const maxSize = 10; // Maximum collection size for free tier

  const handleConfirm = () => {
    onConfirm(collectionSize);
  };

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
            Create Your Collection
          </CardTitle>
          <p className="text-white/60 font-rajdhani">
            How many characters would you like in your collection?
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Collection Size Selector */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80 font-rajdhani">Collection Size</span>
              <span className="text-white font-bold font-rajdhani">{collectionSize}</span>
            </div>
            
            <Slider
              value={[collectionSize]}
              onValueChange={([value]) => setCollectionSize(value)}
              min={1}
              max={maxSize}
              step={1}
              className="py-4"
            />
            
            <p className="text-sm text-white/40 font-rajdhani">
              Maximum {maxSize} characters for free tier
            </p>
          </div>

          {/* Selected Variations Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white/80 font-rajdhani">
              Selected Variations
            </h3>
            <ScrollArea className="h-48">
              <div className="grid grid-cols-4 gap-4">
                {selectedVariations.map((variation, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-white/10"
                  >
                    <img 
                      src={variation.imageUrl} 
                      alt={`Variation ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Cost Estimation */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white/80 font-rajdhani">
              Collection Summary
            </h3>
            <div className="p-4 rounded-lg bg-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Base Characters</span>
                <span className="text-white">{collectionSize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Style Variations</span>
                <span className="text-white">{selectedVariations.length}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-white/10">
                <span className="text-white/80">Total Generations</span>
                <span className="text-white">{collectionSize * selectedVariations.length}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Collection...
                </>
              ) : (
                <>
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Generate Collection
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};