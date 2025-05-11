
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Spotify, Apple } from "lucide-react";

interface MusicPlayerProps {
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [provider, setProvider] = useState<"spotify" | "apple">("spotify");

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {provider === "spotify" ? (
                <Spotify className="h-5 w-5 text-green-500" />
              ) : (
                <Apple className="h-5 w-5" />
              )}
              <span className="font-medium">Study Music</span>
            </div>
            <ToggleGroup type="single" value={provider} onValueChange={(val) => val && setProvider(val as "spotify" | "apple")}>
              <ToggleGroupItem value="spotify">
                <Spotify className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="apple">
                <Apple className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium">Lo-Fi Study Beats</div>
            <div className="text-xs text-gray-500">Focus Playlist • 2:34 / 4:15</div>
          </div>
          
          <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
          
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10" 
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
