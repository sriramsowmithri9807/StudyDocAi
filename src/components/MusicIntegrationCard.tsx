
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Music, Apple } from "lucide-react";

interface MusicIntegrationCardProps {
  provider: "Spotify" | "Apple Music";
  isConnected: boolean;
  description: string;
}

const MusicIntegrationCard: React.FC<MusicIntegrationCardProps> = ({
  provider,
  isConnected,
  description,
}) => {
  const handleConnect = () => {
    // In a real implementation, this would redirect to OAuth flow
    toast.success(`Connected to ${provider}!`);
  };

  const handleDisconnect = () => {
    // In a real implementation, this would revoke access tokens
    toast.success(`Disconnected from ${provider}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            {provider === "Spotify" ? (
              <Music className="mr-2 h-5 w-5 text-green-500" />
            ) : (
              <Apple className="mr-2 h-5 w-5" />
            )}
            {provider}
          </CardTitle>
          {isConnected && (
            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
              Connected
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">Connected Account</p>
            <p className="text-sm text-gray-500">user@example.com</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Connect your {provider} account to access your playlists and favorite tracks during study sessions.
          </p>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button variant="outline" onClick={handleDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button onClick={handleConnect}>
            Connect {provider}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MusicIntegrationCard;
