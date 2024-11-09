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
} from "lucide-react";
import { toast } from "sonner";
import { steps } from "./config/steps";
import { StepContent } from "./Components/StepContent";
import { ProgressHeader } from "./Components/ProgressHeader";
import { ResultView } from "./Components/ResultView";
import { CollectionSizeSelector } from "./Components/CollectionSizeSelector";

// View states for the generation process
const VIEWS = {
  SELECTION: 'SELECTION',
  GENERATING: 'GENERATING', // New state for generation process
  GENERATION_RESULT: 'GENERATION_RESULT',
  COLLECTION_SIZE: 'COLLECTION_SIZE',
  FINAL_COLLECTION: 'FINAL_COLLECTION'
};

const GenerateNFTPage = () => {
  const [currentView, setCurrentView] = useState(VIEWS.SELECTION);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [generatedData, setGeneratedData] = useState(null);
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [finalCollection, setFinalCollection] = useState([]);

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
    try {
      // First, switch to generating view to show loading state
      setCurrentView(VIEWS.GENERATING);

      // Extract style and class from selections
      const style = selections.style;
      const characterClass = selections.class;
      const attributes = {
        gender: selections.gender,
        race: selections.race,
        equipment: selections.equipment,
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          style,
          characterClass,
          attributes,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error.message || 'Failed to generate characters');
      }

      // Check if we have at least one successful variation
      const successfulVariations = data.variations.filter(v => v.success);
      if (successfulVariations.length === 0) {
        throw new Error('Failed to generate any valid character variations');
      }

      setGeneratedData(data);
      // Switch to result view after successful generation
      setCurrentView(VIEWS.GENERATION_RESULT);
      toast.success("Characters generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate characters");
      setGeneratedData(null);
      // Return to selection view on error
      setCurrentView(VIEWS.SELECTION);
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
    setGeneratedData(null);
    setCurrentView(VIEWS.SELECTION);
  };

  const handleVariationsSelected = (selectedChars) => {
    setSelectedVariations(selectedChars);
    setCurrentView(VIEWS.COLLECTION_SIZE);
  };

  const handleCollectionSizeConfirmed = async (size) => {
    // Here we would generate the final collection based on selected variations
    try {
      const collectionData = {
        size,
        variations: selectedVariations,
        timestamp: new Date().toISOString(),
        selections
      };
      
      localStorage.setItem('currentCollection', JSON.stringify(collectionData));
      setFinalCollection(collectionData);
      setCurrentView(VIEWS.FINAL_COLLECTION);
      toast.success("Collection prepared successfully!");
    } catch (error) {
      console.error("Error preparing collection:", error);
      toast.error("Failed to prepare collection");
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case VIEWS.SELECTION:
        return (
          <motion.div
            key="selection-view"
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
                  onSkip={handleSkip}
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
                      className="border-white/10 hover:border-white/20"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!selections[steps[currentStep].id]}
                      className="bg-blue-600 hover:bg-blue-700"
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
        );

      case VIEWS.GENERATING:
      case VIEWS.GENERATION_RESULT:
        return (
          <ResultView
            generatedData={generatedData}
            selections={selections}
            onRegenerate={handleRegenerate}
            steps={steps}
            isLoading={currentView === VIEWS.GENERATING}
            onProceed={handleVariationsSelected}
          />
        );

      case VIEWS.COLLECTION_SIZE:
        return (
          <CollectionSizeSelector
            selectedVariations={selectedVariations}
            onConfirm={handleCollectionSizeConfirmed}
          />
        );

      case VIEWS.FINAL_COLLECTION:
        return (
          <div>Final Collection View (Coming next)</div>
        );

      default:
        return null;
    }
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
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GenerateNFTPage;