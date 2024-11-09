// app/generate/nft/components/StepContent.js
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export const StepContent = ({ step, currentSelection, onSelect }) => (
  <ScrollArea className="flex-1 pr-4">
    <RadioGroup
      onValueChange={onSelect}
      value={currentSelection}
      className="grid grid-cols-4 gap-4"
    >
      {step.options.map((option) => (
        <Label
          key={option.id}
          htmlFor={option.id}
          className="cursor-pointer"
        >
          <Card
            className={`
              h-full transition-all duration-200 bg-[#13141A] hover:bg-[#1A1B20]
              ${
                currentSelection === option.id
                  ? "border-blue-500/50"
                  : "border-white/5 hover:border-white/10"
              }
            `}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="border-white/20"
                />
                <div>
                  <h4 className="font-rajdhani font-medium leading-none text-white/90">
                    {option.label}
                  </h4>
                  <p className="font-rajdhani text-sm text-white/50 mt-2">
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
);