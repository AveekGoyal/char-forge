// app/generate/nft/page.js
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Brush,
  Wand2,
  Swords,
  User,
  Shield,
  Palette,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { steps } from "./config/steps";
import { StepContent } from "./components/StepContent";
import { ProgressHeader } from "./components/ProgressHeader";
import { ResultView } from "./components/ResultView";

// Loading component
const LoadingView = () => (
  <motion.div
    key="loading-card"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full"
  >
    <Card className="bg-[#1A1B1E] backdrop-blur-md border border-white/5 h-full">
      <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium text-white font-rajdhani">
            Generating your character...
          </h3>
          <p className="text-sm text-white/60 font-rajdhani">
            This might take a moment. We're bringing your creation to life!
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const GenerateNFTPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  // Map of step icons
  const iconComponents = {
    Brush,
    Wand2,
    Swords,
    User,
    Shield,
    Palette,
  };

  const handleSelection = (value) => {
    setSelections((prev) => ({
      ...prev,
      [steps[currentStep].id]: value,
    }));
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Here you would normally make an API call to generate the image
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setGeneratedImage("/api/placeholder/400/400");
      toast.success("Character generated successfully!");
    } catch (error) {
      toast.error("Failed to generate character");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRegenerate = () => {
    setCurrentStep(0);
    setGeneratedImage(null);
    setSelections({});
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0B]">
      {/* Background card shadow effect */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pt-24">
        <div className="w-[92vw] h-[82vh] max-w-7xl">
          <div className="w-full h-full bg-gray-800/20 rounded-xl transform translate-x-2 translate-y-2" />
        </div>
      </div>

      {/* Main content */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pt-24">
        <div className="w-[90vw] h-[80vh] max-w-7xl">
          <AnimatePresence mode="wait">
            {!isGenerating && !generatedImage ? (
              <motion.div
                key="selection-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full h-full"
              >
                <Card className="bg-[#1A1B1E] backdrop-blur-md border border-white/5 h-full flex flex-col">
                  <CardHeader>
                    <ProgressHeader
                      currentStep={currentStep}
                      totalSteps={steps.length}
                      stepInfo={steps[currentStep]}
                      icon={iconComponents[steps[currentStep].icon]}
                    />
                  </CardHeader>

                  <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <StepContent
                      step={steps[currentStep]}
                      currentSelection={selections[steps[currentStep].id]}
                      onSelect={handleSelection}
                    />

                    <div className="flex-shrink-0 mt-6">
                      <Separator className="mb-6 bg-white/5" />
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          disabled={currentStep === 0}
                          className="border-white/10 hover:border-white/20 bg-transparent text-white/60 hover:text-white/90 font-rajdhani"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={handleSkip}
                          className="text-white/40 hover:text-white/60 font-rajdhani"
                        >
                          <SkipForward className="w-4 h-4 mr-2" />
                          Skip
                        </Button>

                        <Button
                          onClick={handleNext}
                          disabled={!selections[steps[currentStep].id]}
                          className="bg-blue-600 hover:bg-blue-700 font-rajdhani"
                        >
                          {currentStep === steps.length - 1 ? (
                            "Generate"
                          ) : (
                            <>
                              Next
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : isGenerating ? (
              <LoadingView />
            ) : (
              <ResultView
                generatedImage={generatedImage}
                selections={selections}
                onRegenerate={handleRegenerate}
                steps={steps}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GenerateNFTPage;