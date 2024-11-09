import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const CharacterCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden transition-all duration-300
                   bg-gray-900/50 backdrop-blur border border-white/10">
      <CardContent className="p-4 space-y-4">
        {/* Image skeleton */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800/50 animate-pulse" />
        
        {/* Stats Grid skeleton */}
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-800/50 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-2 w-12 bg-gray-800/50 rounded animate-pulse" />
                <div className="h-3 w-8 bg-gray-800/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Special Power skeleton */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-gray-800/50 animate-pulse" />
            <div className="h-3 w-24 bg-gray-800/50 rounded animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-full bg-gray-800/50 rounded animate-pulse" />
            <div className="h-2 w-3/4 bg-gray-800/50 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};