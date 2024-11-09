// app/generate/nft/components/ResultView.js
"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Download, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const ResultView = ({ 
  generatedData, // New prop to receive the full response from the API
  selections, 
  onRegenerate,
  steps,
  isLoading = false 
}) => {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloadLoading(true);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = generatedData?.data?.image;
      link.download = `character-${Date.now()}.webp`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Character downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download character");
    } finally {
      setDownloadLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <motion.div
        key="loading-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full"
      >
        <Card className="bg-gray-800/50 backdrop-blur-md border border-white/10 h-full">
          <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
            <p className="text-white/60 font-rajdhani">Generating your character...</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="result-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
    >
      <Card className="bg-gray-800/50 backdrop-blur-md border border-white/10 h-full">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Generated Character
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Preview Section */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="relative group rounded-lg overflow-hidden max-w-md mx-auto">
                  {generatedData?.data?.image ? (
                    <img
                      src={generatedData.data.image}
                      alt="Generated character"
                      className="w-full h-auto rounded-lg shadow-lg max-h-[500px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
                      <p className="text-white/60 font-rajdhani">No image generated</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <Badge variant="secondary" className="pointer-events-none bg-white/10">
                      Preview Version
                    </Badge>
                  </div>
                </div>

                {/* Generation Info */}
                {generatedData?.data?.metadata && (
                  <div className="space-y-2 p-4 bg-black/20 rounded-lg">
                    <Label className="text-sm text-white/60 font-rajdhani">
                      Generation Details
                    </Label>
                    <p className="text-xs text-white/40 font-rajdhani break-words max-w-full whitespace-normal overflow-wrap-anywhere leading-relaxed">
                      {generatedData.data.metadata.prompt}
                    </p>
                  </div>
                )}
              </div>

              {/* Character Details Section */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-rajdhani font-medium text-lg text-white">
                    Character Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selections).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-sm text-white/60 font-rajdhani">
                          {steps.find((step) => step.id === key)?.title}
                        </Label>
                        <p className="text-sm font-medium text-white font-rajdhani">
                          {steps
                            .find((step) => step.id === key)
                            ?.options.find((opt) => opt.id === value)?.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="border-white/10 hover:border-white/20 bg-white/5 font-rajdhani"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Another
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={!generatedData?.data?.image || downloadLoading}
                    className="bg-primary hover:bg-primary/90 font-rajdhani"
                  >
                    {downloadLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Download Character
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};