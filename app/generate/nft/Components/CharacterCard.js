import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Brain, Zap, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const StatDisplay = ({ icon: Icon, label, value, color, max = 100 }) => {
  // Calculate percentage for the stat bar
  const percentage = (value / max) * 100;
  
  return (
    <div className="relative flex items-center gap-2 p-2 rounded-lg bg-black/20">
      {/* Background stat bar */}
      <div 
        className="absolute inset-0 rounded-lg opacity-20"
        style={{
          width: `${percentage}%`,
          backgroundColor: color.replace("text-", "bg-")
        }}
      />
      
      <Icon className={cn("w-4 h-4 relative z-10", color)} />
      <div className="flex-1 relative z-10">
        <div className="text-xs text-white/60">{label}</div>
        <div className="font-bold text-white">{value}</div>
      </div>
    </div>
  );
};

const CharacterCard = ({ 
  imageUrl, 
  stats = {}, 
  specialPower = {},
  isSelected = false,
  onSelect = () => {},
  selectable = true,
  metadata = {}
}) => {
  // Default stats in case they're not provided
  const defaultStats = {
    HP: 50,
    MP: 50,
    STR: 50,
    INT: 50
  };

  const finalStats = { ...defaultStats, ...stats };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105
                     bg-gray-900/50 backdrop-blur border group
                     ${isSelected ? 'border-blue-500' : 'border-white/10'}`}>
      {selectable && (
        <div className="absolute top-2 right-2 z-10">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={onSelect}
            className="bg-black/50 border-white/30 data-[state=checked]:bg-blue-500"
          />
        </div>
      )}
      
      <CardContent className="p-4 space-y-4">
        {/* Image container with gradient overlay */}
        <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[1]" />
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Character" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
              <p className="text-white/30">No Image</p>
            </div>
          )}
          
          {/* Class/Race Badge */}
          {metadata.characterClass && (
            <div className="absolute bottom-2 left-2 z-[2] flex gap-2">
              <Badge variant="outline" className="bg-black/50 text-xs border-white/20">
                {metadata.characterClass}
              </Badge>
              {metadata.attributes?.race && (
                <Badge variant="outline" className="bg-black/50 text-xs border-white/20">
                  {metadata.attributes.race}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="space-y-2">
          <StatDisplay 
            icon={Heart} 
            label="HP" 
            value={finalStats.HP} 
            color="text-red-400"
          />
          <StatDisplay 
            icon={Brain} 
            label="MP" 
            value={finalStats.MP} 
            color="text-blue-400"
          />
          <StatDisplay 
            icon={Shield} 
            label="STR" 
            value={finalStats.STR} 
            color="text-yellow-400"
          />
          <StatDisplay 
            icon={Zap} 
            label="INT" 
            value={finalStats.INT} 
            color="text-purple-400"
          />
        </div>

        {/* Special Power */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">
              {specialPower.name || "Special Power"}
            </span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            {specialPower.description || "No description available"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;