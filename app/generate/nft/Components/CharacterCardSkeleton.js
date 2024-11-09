import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const CharacterCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden transition-all duration-300
                   bg-gray-900/50 backdrop-blur border border-white/10">
      <CardContent className="p-4 space-y-4">
        {/* Image skeleton with loading animation */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gray-800/50 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>
        
        {/* Class/Style badges skeleton */}
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-gray-800/50 rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-gray-800/50 rounded-full animate-pulse" />
        </div>
        
        {/* Stats Grid skeleton with better spacing */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30">
              <div className="w-5 h-5 rounded-full bg-gray-800/50 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-12 bg-gray-800/50 rounded animate-pulse" />
                <div className="h-3 w-8 bg-gray-800/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Special Power skeleton with improved layout */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-gray-800/50 animate-pulse" />
            <div className="h-4 w-32 bg-gray-800/50 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-full bg-gray-800/50 rounded animate-pulse" />
            <div className="h-2.5 w-3/4 bg-gray-800/50 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};