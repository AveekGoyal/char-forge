import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Loader2,
  Upload
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const variants = {
    pending: "bg-yellow-500/20 text-yellow-500",
    uploading: "bg-blue-500/20 text-blue-500",
    minting: "bg-purple-500/20 text-purple-500",
    success: "bg-green-500/20 text-green-500",
    failed: "bg-red-500/20 text-red-500"
  };

  return (
    <Badge className={`${variants[status]} font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const MintStatus = ({
  status = 'pending',
  progress = 0,
  currentStep = '',
  error = null,
  transactionHash = null,
  openSeaLink = null,
  onRetry = () => {},
  onComplete = () => {}
}) => {
  const isComplete = status === 'success';
  const isFailed = status === 'failed';
  const isProcessing = ['uploading', 'minting'].includes(status);

  return (
    <Card className="bg-gray-800/50 backdrop-blur-md border border-white/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-orbitron text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Minting Progress
            </CardTitle>
            <p className="text-white/60 font-rajdhani mt-1">
              {isComplete ? 'Collection minted successfully!' : 
               isFailed ? 'Failed to mint collection' :
               'Converting your characters to NFTs...'}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-white/60">
            {currentStep}
          </p>
        </div>

        {/* Transaction Links */}
        {transactionHash && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white">Transaction Details</h3>
            <div className="flex flex-col gap-2">
              <a
                href={`https://basescan.org/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                View on BaseScan
                <ExternalLink className="w-4 h-4" />
              </a>
              {openSeaLink && (
                <a
                  href={openSeaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  View on OpenSea
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-red-500">
                  Error during minting
                </p>
                <p className="text-sm text-red-200/70">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {isFailed && (
            <Button
              variant="outline"
              onClick={onRetry}
              className="border-white/10 hover:border-white/20"
            >
              <Upload className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}

          {isComplete && (
            <Button
              onClick={onComplete}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete
            </Button>
          )}

          {isProcessing && (
            <Button disabled className="bg-blue-600">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MintStatus;