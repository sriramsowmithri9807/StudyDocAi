import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Apple, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MusicPlayerProps {
  className?: string;
}

interface MusicPlayerSettings {
  provider: "spotify" | "apple";
  volume: number;
  progress: number;
  isPlaying: boolean;
  currentTrack: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [provider, setProvider] = useState<"spotify" | "apple">("spotify");
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(65);
  const [currentTrack, setCurrentTrack] = useState("Lo-Fi Study Beats");

  // Load saved settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("musicPlayerSettings");
    if (savedSettings) {
      try {
        const settings: MusicPlayerSettings = JSON.parse(savedSettings);
        setProvider(settings.provider);
        setVolume(settings.volume);
        setProgress(settings.progress);
        setIsPlaying(settings.isPlaying);
        setCurrentTrack(settings.currentTrack);
      } catch (error) {
        console.error("Error loading music player settings:", error);
      }
    }
  }, []);

  // Save settings whenever they change
  const saveSettings = () => {
    const settings: MusicPlayerSettings = {
      provider,
      volume,
      progress,
      isPlaying,
      currentTrack
    };
    
    localStorage.setItem("musicPlayerSettings", JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your music player preferences have been saved",
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProviderChange = (val: string) => {
    if (val) {
      setProvider(val as "spotify" | "apple");
    }
  };

  const handleVolumeChange = (val: number[]) => {
    setVolume(val[0]);
  };

  const handleProgressChange = (val: number[]) => {
    setProgress(val[0]);
  };

  // Calculate the time display based on progress
  const totalDuration = 255; // 4:15 in seconds
  const currentTime = Math.floor((progress / 100) * totalDuration);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {provider === "spotify" ? (
                <Music className="h-5 w-5 text-green-500" />
              ) : (
                <Apple className="h-5 w-5" />
              )}
              <span className="font-medium">Study Music</span>
            </div>
            <div className="flex items-center space-x-2">
              <ToggleGroup 
                type="single" 
                value={provider} 
                onValueChange={handleProviderChange}
              >
                <ToggleGroupItem value="spotify">
                  <Music className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="apple">
                  <Apple className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={saveSettings}
                className="text-gray-500 hover:text-primary"
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium">{currentTrack}</div>
            <div className="text-xs text-gray-500">
              Focus Playlist • {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>
          </div>
          
          <Slider 
            value={[progress]} 
            max={100} 
            step={1} 
            className="w-full"
            onValueChange={handleProgressChange}
          />
          
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
            <Slider 
              value={[volume]} 
              max={100} 
              step={1} 
              className="w-full"
              onValueChange={handleVolumeChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
