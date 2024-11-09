import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Brain, Zap, Shield, Sparkles } from "lucide-react";

const StatDisplay = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-2">
    <Icon className={`w-4 h-4 ${color}`} />
    <div className="flex-1">
      <div className="text-xs text-white/60">{label}</div>
      <div className="font-bold text-white">{value}</div>
    </div>
  </div>
);

const CharacterCard = ({ 
  imageUrl, 
  stats = {}, 
  specialPower = {},
  isSelected = false,
  onSelect = () => {},
  selectable = true,
}) => {
  // Generate random stats if not provided
  const defaultStats = {
    HP: Math.floor(Math.random() * 50) + 50,
    MP: Math.floor(Math.random() * 40) + 30,
    STR: Math.floor(Math.random() * 30) + 20,
    INT: Math.floor(Math.random() * 35) + 25,
  };

  const finalStats = { ...defaultStats, ...stats };

  const defaultSpecialPower = {
    name: "Mystic Strike",
    description: "Deals magical damage to enemies",
  };

  const power = { ...defaultSpecialPower, ...specialPower };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105
                     bg-gray-900/50 backdrop-blur border ${isSelected ? 'border-blue-500' : 'border-white/10'}`}>
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
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
              {power.name}
            </span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            {power.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;