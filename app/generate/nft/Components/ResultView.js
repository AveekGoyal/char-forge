// app/generate/nft/components/ResultView.js
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const ResultView = ({ generatedImage, selections, onRegenerate, steps }) => (
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
          <div className="flex flex-row gap-8">
            <div className="relative group w-1/2">
              <img
                src={generatedImage}
                alt="Generated character"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <Badge variant="secondary" className="pointer-events-none bg-white/10">
                  Preview Version
                </Badge>
              </div>
            </div>

            <div className="w-1/2 space-y-6">
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

              <div className="flex gap-4 justify-end">
                <Button
                  variant="outline"
                  onClick={onRegenerate}
                  className="border-white/10 hover:border-white/20 bg-white/5 font-rajdhani"
                >
                  Generate Another
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Character downloaded successfully!");
                  }}
                  className="bg-primary hover:bg-primary/90 font-rajdhani"
                >
                  <Download className="w-4 h-4 mr-2" />
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