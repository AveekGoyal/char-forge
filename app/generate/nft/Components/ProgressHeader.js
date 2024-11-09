// app/generate/nft/components/ProgressHeader.js
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkipForward } from "lucide-react";

export const ProgressHeader = ({ currentStep, totalSteps, onSkip, stepInfo, icon: Icon }) => (
  <div className="flex-shrink-0">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-blue-400" />
        <div>
          <h2 className="font-orbitron text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {stepInfo.title}
          </h2>
          <p className="font-rajdhani text-sm text-white/60 mt-1">
            {stepInfo.description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="text-white/60 hover:text-white font-rajdhani"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip
        </Button>
        <Badge variant="secondary" className="bg-white/10 font-rajdhani">
          Step {currentStep + 1} of {totalSteps}
        </Badge>
      </div>
    </div>
    
    <div className="mt-4 space-y-2">
      <Progress
        value={(currentStep / (totalSteps - 1)) * 100}
        className="h-2 bg-white/10"
      />
      <div className="flex justify-between text-xs text-white/40 font-rajdhani">
        <span>Start</span>
        <span>Generate</span>
      </div>
    </div>
  </div>
);