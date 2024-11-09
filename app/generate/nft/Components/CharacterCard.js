import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Brain, Zap, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const StatDisplay = ({ icon: Icon, label, value, color, max = 100 }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="relative flex items-center gap-2 p-1.5 rounded-md bg-black/20">
      <div 
        className="absolute inset-0 rounded-md opacity-20"
        style={{
          width: `${percentage}%`,
          backgroundColor: color.replace("text-", "bg-")
        }}
      />
      
      <Icon className={cn("w-3 h-3 relative z-10", color)} />
      <div className="flex gap-1 items-center flex-1 relative z-10">
        <div className="text-xs text-white/60">{label}</div>
        <div className="text-xs font-medium text-white">{value}</div>
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
  const defaultStats = {
    HP: 50,
    MP: 50,
    STR: 50,
    INT: 50
  };

  const finalStats = { ...defaultStats, ...stats };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:scale-105",
      "bg-gray-900/50 backdrop-blur w-64",
      isSelected ? 'ring-2 ring-blue-500' : 'border-white/10'
    )}>
      {selectable && (
        <div className="absolute top-2 right-2 z-10">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={onSelect}
            className="h-4 w-4 bg-black/50 border-white/30 data-[state=checked]:bg-blue-500"
          />
        </div>
      )}
      
      <CardContent className="p-3 space-y-3">
        {/* Image container */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-[1]" />
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Character" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
              <p className="text-white/30 text-sm">No Image</p>
            </div>
          )}
          
          {/* Class/Race Badges */}
          {metadata.characterClass && (
            <div className="absolute bottom-2 left-2 z-[2] flex flex-wrap gap-1.5">
              <Badge variant="outline" className="bg-black/50 text-xs py-0.5 border-white/20">
                {metadata.characterClass}
              </Badge>
              {metadata.attributes?.race && (
                <Badge variant="outline" className="bg-black/50 text-xs py-0.5 border-white/20">
                  {metadata.attributes.race}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="space-y-1.5">
          <StatDisplay icon={Heart} label="HP" value={finalStats.HP} color="text-red-400" />
          <StatDisplay icon={Brain} label="MP" value={finalStats.MP} color="text-blue-400" />
          <StatDisplay icon={Shield} label="STR" value={finalStats.STR} color="text-yellow-400" />
          <StatDisplay icon={Zap} label="INT" value={finalStats.INT} color="text-purple-400" />
        </div>

        {/* Special Power */}
        <div className="pt-1.5 border-t border-white/10">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-medium text-white">
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