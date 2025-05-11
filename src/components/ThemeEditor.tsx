
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomTheme, saveTheme, applyTheme } from "@/utils/themeUtils";
import { Palette } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { nanoid } from "nanoid";

interface ThemeEditorProps {
  theme?: CustomTheme;
  onSave?: () => void;
  onCancel?: () => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({
  theme,
  onSave,
  onCancel
}) => {
  const [themeName, setThemeName] = useState(theme?.name || "");
  const [bgColor, setBgColor] = useState(theme?.colors.background || "hsl(0 0% 100%)");
  const [fgColor, setFgColor] = useState(theme?.colors.foreground || "hsl(222.2 84% 4.9%)");
  const [primaryColor, setPrimaryColor] = useState(theme?.colors.primary || "hsl(222.2 47.4% 11.2%)");
  const [secondaryColor, setSecondaryColor] = useState(theme?.colors.secondary || "hsl(210 40% 96.1%)");
  const [accentColor, setAccentColor] = useState(theme?.colors.accent || "hsl(210 40% 96.1%)");
  const [mutedColor, setMutedColor] = useState(theme?.colors.muted || "hsl(210 40% 96.1%)");

  const handlePreview = () => {
    const previewTheme: CustomTheme = {
      id: theme?.id || "preview",
      name: themeName,
      colors: {
        background: bgColor,
        foreground: fgColor,
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        muted: mutedColor
      },
      createdBy: "user"
    };
    
    applyTheme(previewTheme);
    toast("Theme preview applied");
  };

  const handleSave = () => {
    if (!themeName.trim()) {
      toast.error("Please enter a theme name");
      return;
    }

    const newTheme: CustomTheme = {
      id: theme?.id || `theme-${nanoid(6)}`,
      name: themeName,
      colors: {
        background: bgColor,
        foreground: fgColor,
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        muted: mutedColor
      },
      createdBy: "user"
    };

    saveTheme(newTheme);
    applyTheme(newTheme);
    toast.success("Theme saved and applied!");
    
    if (onSave) onSave();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="mr-2 h-5 w-5" />
          {theme ? "Edit Theme" : "Create New Theme"}
        </CardTitle>
        <CardDescription>
          {theme 
            ? "Modify your existing theme colors" 
            : "Customize your own theme by selecting colors"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme-name">Theme Name</Label>
          <Input 
            id="theme-name" 
            value={themeName} 
            onChange={(e) => setThemeName(e.target.value)} 
            placeholder="My Awesome Theme"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="background-color">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="background-color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer"
                value={bgColor.startsWith("#") ? bgColor : "#ffffff"}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="foreground-color">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="foreground-color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer"
                value={fgColor.startsWith("#") ? fgColor : "#000000"}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer"
                value={primaryColor.startsWith("#") ? primaryColor : "#000000"}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer"
                value={secondaryColor.startsWith("#") ? secondaryColor : "#f0f0f0"}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accent-color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
              />
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer"
                value={accentColor.startsWith("#") ? accentColor : "#f0f0f0"}
                onChange={(e) => setAccentColor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="muted-color">Muted Color</Label>
            <div className="flex gap-2">
              <Input
                id="muted-color"
                value={mutedColor}
                onChange={(e) => setMutedColor(e.target.value)}
              />
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer"
                value={mutedColor.startsWith("#") ? mutedColor : "#f0f0f0"}
                onChange={(e) => setMutedColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="secondary" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={handleSave}>
            Save Theme
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThemeEditor;
