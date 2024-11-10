import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Upload } from "lucide-react";
import CharacterCard from '@/app/generate/nft/Components/CharacterCard';

const MintingPreview = ({
  collection,
  onMint,
  isLoading,
  estimatedGas,
  totalCost
}) => {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-md border border-white/10">
      <CardHeader>
        <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Ready to Mint
        </CardTitle>
        <div className="flex gap-4">
          <Badge variant="outline" className="bg-white/5">
            Characters: {collection.length}
          </Badge>
          {estimatedGas && (
            <Badge variant="outline" className="bg-white/5">
              Est. Gas: {estimatedGas} ETH
            </Badge>
          )}
          {totalCost && (
            <Badge variant="outline" className="bg-white/5">
              Total Cost: {totalCost} ETH
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {collection.map((character, index) => (
              <CharacterCard key={index} {...character} selectable={false} />
            ))}
          </div>

          <Button
            onClick={onMint}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Minting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Mint Collection
              </>
            )}
          </Button>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MintingPreview;