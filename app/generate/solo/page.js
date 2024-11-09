"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brush,
  Wand2,
  Swords,
  User,
  Shield,
  Palette,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Configuration array for all steps
const steps = [
  {
    id: "artStyle",
    title: "Select Art Style",
    description: "Choose the visual style for your character",
    icon: Brush,
    options: [
      {
        id: "pixel",
        label: "Pixel Art",
        description: "8-bit retro style graphics",
      },
      {
        id: "vector",
        label: "Vector Art",
        description: "Clean, scalable graphics",
      },
      {
        id: "handdrawn",
        label: "Hand-drawn",
        description: "Artistic, sketched look",
      },
      {
        id: "3d2d",
        label: "3D-styled 2D",
        description: "Depth with 2D rendering",
      },
      {
        id: "voxel",
        label: "Voxel",
        description: "3D pixel art style",
      },
      {
        id: "lowpoly",
        label: "Low-poly",
        description: "Geometric, minimalist 3D",
      },
      {
        id: "cartoon",
        label: "Cartoon",
        description: "Animated, expressive style",
      },
      {
        id: "anime",
        label: "Anime/Manga",
        description: "Japanese animation style",
      },
    ],
  },
  {
    id: "theme",
    title: "Choose Theme",
    description: "Select the thematic setting for your character",
    icon: Wand2,
    options: [
      {
        id: "fantasy",
        label: "Fantasy",
        description: "Medieval magical world",
      },
      {
        id: "scifi",
        label: "Sci-fi",
        description: "Futuristic space setting",
      },
      {
        id: "postapoc",
        label: "Post-apocalyptic",
        description: "Survival in ruins",
      },
      {
        id: "cyberpunk",
        label: "Cyberpunk",
        description: "High tech, low life",
      },
      {
        id: "medieval",
        label: "Medieval",
        description: "Historical middle ages",
      },
      {
        id: "modern",
        label: "Modern",
        description: "Contemporary setting",
      },
      {
        id: "steampunk",
        label: "Steampunk",
        description: "Victorian sci-fi fusion",
      },
      {
        id: "horror",
        label: "Horror",
        description: "Dark and frightening",
      },
    ],
  },
  {
    id: "class",
    title: "Select Character Class",
    description: "Define your character's role and abilities",
    icon: Swords,
    options: [
      {
        id: "warrior",
        label: "Warrior",
        description: "Melee combat specialist",
      },
      {
        id: "mage",
        label: "Mage",
        description: "Master of arcane arts",
      },
      {
        id: "rogue",
        label: "Rogue",
        description: "Stealth and agility expert",
      },
      {
        id: "healer",
        label: "Healer",
        description: "Supportive spellcaster",
      },
      {
        id: "ranger",
        label: "Ranger",
        description: "Ranged combat expert",
      },
      {
        id: "paladin",
        label: "Paladin",
        description: "Holy warrior",
      },
      {
        id: "necromancer",
        label: "Necromancer",
        description: "Master of death magic",
      },
      {
        id: "bard",
        label: "Bard",
        description: "Musical enchanter",
      },
    ],
  },
  {
    id: "attributes",
    title: "Character Attributes",
    description: "Customize your character's physical traits",
    icon: User,
    options: [
      {
        id: "slim",
        label: "Slim Build",
        description: "Lean and agile physique",
      },
      {
        id: "athletic",
        label: "Athletic Build",
        description: "Balanced and fit",
      },
      {
        id: "muscular",
        label: "Muscular Build",
        description: "Strong and powerful",
      },
      {
        id: "short",
        label: "Short Height",
        description: "Below average height",
      },
      {
        id: "average",
        label: "Average Height",
        description: "Medium stature",
      },
      {
        id: "tall",
        label: "Tall Height",
        description: "Above average height",
      },
      {
        id: "slender",
        label: "Slender",
        description: "Tall and thin",
      },
      {
        id: "stocky",
        label: "Stocky",
        description: "Short and strong",
      },
    ],
  },
  {
    id: "equipment",
    title: "Equipment Style",
    description: "Choose your character's gear and accessories",
    icon: Shield,
    options: [
      {
        id: "light",
        label: "Light Armor",
        description: "Minimal, agile equipment",
      },
      {
        id: "medium",
        label: "Medium Armor",
        description: "Balanced protection",
      },
      {
        id: "heavy",
        label: "Heavy Armor",
        description: "Maximum defense",
      },
      {
        id: "magical",
        label: "Magical Robes",
        description: "Enchanted gear",
      },
      {
        id: "tech",
        label: "Tech Gear",
        description: "Advanced technology",
      },
      {
        id: "tribal",
        label: "Tribal Wear",
        description: "Traditional equipment",
      },
      {
        id: "royal",
        label: "Royal Attire",
        description: "Noble equipment",
      },
      {
        id: "stealth",
        label: "Stealth Gear",
        description: "Concealment focused",
      },
    ],
  },
  {
    id: "colorScheme",
    title: "Color Scheme",
    description: "Select the color palette for your character",
    icon: Palette,
    options: [
      {
        id: "warm",
        label: "Warm Colors",
        description: "Reds, oranges, yellows",
      },
      {
        id: "cool",
        label: "Cool Colors",
        description: "Blues, greens, purples",
      },
      {
        id: "earthy",
        label: "Earth Tones",
        description: "Browns, greens, tans",
      },
      {
        id: "monochrome",
        label: "Monochromatic",
        description: "Single color variations",
      },
      {
        id: "vibrant",
        label: "Vibrant",
        description: "Bold, bright colors",
      },
      {
        id: "pastel",
        label: "Pastel",
        description: "Soft, muted tones",
      },
      {
        id: "dark",
        label: "Dark",
        description: "Deep, rich colors",
      },
      {
        id: "metallic",
        label: "Metallic",
        description: "Shiny, reflective colors",
      },
    ],
  },
];

const Particles = () => {
  const colors = ["#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size + "px",
              height: size + "px",
              background: color,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              filter: "blur(1px)",
              opacity: 0.6,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

const GenerateCharacterSolo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleSelection = (value) => {
    setSelections((prev) => ({
      ...prev,
      [steps[currentStep].id]: value,
    }));
  };

  const generatePrompt = () => {
    const promptMap = {
      artStyle: "in the style of",
      theme: "with a theme of",
      class: "character class:",
      attributes: "with attributes:",
      equipment: "wearing",
      colorScheme: "using a color scheme that is",
    };

    return Object.entries(selections)
      .map(([key, value]) => `${promptMap[key]} ${value}`)
      .join(", ");
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const prompt = generatePrompt();

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setGeneratedImage("/api/placeholder/400/400");
      toast.success("Character generated successfully!");
    } catch (error) {
      toast.error("Failed to generate character");
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

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
      <Particles />

      <div className="fixed inset-0 z-10 flex items-center justify-center">
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
                <Card className="bg-black/50 backdrop-blur-md border border-white/10 h-full flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {React.createElement(steps[currentStep].icon, {
                          className: "w-6 h-6 text-primary",
                        })}
                        <div>
                          <CardTitle className="text-2xl">
                            {steps[currentStep].title}
                          </CardTitle>
                          <p className="text-sm text-white/60 mt-1">
                            {steps[currentStep].description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/10">
                        Step {currentStep + 1} of {steps.length}
                      </Badge>
                    </div>
                    <Progress
                      value={(currentStep / (steps.length - 1)) * 100}
                      className="mt-4"
                    />
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <ScrollArea className="flex-1 pr-4">
                      <RadioGroup
                        onValueChange={handleSelection}
                        value={selections[steps[currentStep].id]}
                        className="grid grid-cols-4 gap-4"
                      >
                        {steps[currentStep].options.map((option) => (
                          <Label
                            key={option.id}
                            htmlFor={option.id}
                            className="cursor-pointer"
                          >
                            <Card
                              className={`
                              h-full transition-all duration-200 bg-white/5 hover:bg-white/10
                              ${
                                selections[steps[currentStep].id] === option.id
                                  ? "border-primary"
                                  : "border-white/5 hover:border-white/20"
                              }
                            `}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-2">
                                  <RadioGroupItem
                                    value={option.id}
                                    id={option.id}
                                  />
                                  <div>
                                    <h4 className="font-medium leading-none text-white">
                                      {option.label}
                                    </h4>
                                    <p className="text-sm text-white/60 mt-2">
                                      {option.description}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Label>
                        ))}
                      </RadioGroup>
                    </ScrollArea>

                    <div className="flex-shrink-0 mt-6">
                      <Separator className="mb-6 bg-white/10" />
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          disabled={currentStep === 0}
                          className="border-white/10 hover:border-white/20 bg-white/5"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={!selections[steps[currentStep].id]}
                          className="bg-primary hover:bg-primary/90"
                        >
                          {currentStep === steps.length - 1 ? (
                            <>
                              Generate
                              <Wand2 className="w-4 h-4 ml-2" />
                            </>
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
              <motion.div
                key="loading-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <Card className="bg-black/50 backdrop-blur-md border border-white/10 h-full">
                  <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <div className="space-y-2 text-center">
                      <h3 className="text-lg font-medium text-white">
                        Generating your character...
                      </h3>
                      <p className="text-sm text-white/60">
                        This might take a moment. We're bringing your creation
                        to life!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="result-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <Card className="bg-black/50 backdrop-blur-md border border-white/10 h-full">
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="text-2xl">
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
                            <Badge
                              variant="secondary"
                              className="pointer-events-none bg-white/10"
                            >
                              Preview Version
                            </Badge>
                          </div>
                        </div>

                        <div className="w-1/2 space-y-6">
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg text-white">
                              Character Details
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {Object.entries(selections).map(
                                ([key, value]) => (
                                  <div key={key} className="space-y-1">
                                    <Label className="text-sm text-white/60">
                                      {
                                        steps.find((step) => step.id === key)
                                          ?.title
                                      }
                                    </Label>
                                    <p className="text-sm font-medium text-white">
                                      {
                                        steps
                                          .find((step) => step.id === key)
                                          ?.options.find(
                                            (opt) => opt.id === value
                                          )?.label
                                      }
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setCurrentStep(0);
                                setGeneratedImage(null);
                                setSelections({});
                              }}
                              className="border-white/10 hover:border-white/20 bg-white/5"
                            >
                              Generate Another
                            </Button>
                            <Button
                              onClick={() => {
                                toast.success(
                                  "Character downloaded successfully!"
                                );
                              }}
                              className="bg-primary hover:bg-primary/90"
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Add Navbar component for consistency with home page
const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[2000px] mx-auto px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <motion.span
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                }}
                className="text-white bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                CharacterForge.ai
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Main page component that wraps everything
const GenerateCharacterSoloPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-8">
        <GenerateCharacterSolo />
      </main>
    </div>
  );
};

export default GenerateCharacterSoloPage;
