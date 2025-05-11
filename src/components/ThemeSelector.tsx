
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomTheme, getAllThemes, applyTheme, deleteTheme, getCurrentTheme } from "@/utils/themeUtils";
import { Palette, Plus, Trash2, Pencil, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import ThemeEditor from "./ThemeEditor";

const ThemeSelector: React.FC = () => {
  const [themes, setThemes] = useState<CustomTheme[]>(getAllThemes);
  const [currentThemeId, setCurrentThemeId] = useState<string>(getCurrentTheme().id);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<CustomTheme | null>(null);

  const refreshThemes = () => {
    setThemes(getAllThemes());
    setCurrentThemeId(getCurrentTheme().id);
  };

  const handleThemeSelect = (theme: CustomTheme) => {
    applyTheme(theme);
    setCurrentThemeId(theme.id);
    toast.success(`Theme "${theme.name}" applied`);
  };

  const handleDeleteTheme = (themeId: string) => {
    if (themeId === currentThemeId) {
      toast.error("Cannot delete the currently applied theme");
      return;
    }

    if (["default", "dark", "purple"].includes(themeId)) {
      toast.error("Cannot delete system themes");
      return;
    }

    deleteTheme(themeId);
    refreshThemes();
    toast.success("Theme deleted");
  };

  const handleEditTheme = (theme: CustomTheme) => {
    if (["default", "dark", "purple"].includes(theme.id)) {
      toast.error("Cannot edit system themes");
      return;
    }
    
    setEditingTheme(theme);
    setCreateDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Themes</h3>
        <Button onClick={() => {
          setEditingTheme(null);
          setCreateDialogOpen(true);
        }} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Theme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card 
            key={theme.id} 
            className={`cursor-pointer transition-all ${theme.id === currentThemeId ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleThemeSelect(theme)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center">
                  {theme.name}
                  {theme.id === currentThemeId && (
                    <Check className="ml-2 h-4 w-4 text-green-500" />
                  )}
                </span>
                <span className="flex gap-1">
                  {theme.createdBy === "user" && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTheme(theme);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTheme(theme.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </span>
              </CardTitle>
              <CardDescription className="text-xs">
                {theme.createdBy === "system" ? "System Theme" : "Custom Theme"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-1">
                <div 
                  className="h-6 w-6 rounded-full border" 
                  style={{ backgroundColor: theme.colors.background }}
                  title="Background"
                ></div>
                <div 
                  className="h-6 w-6 rounded-full border" 
                  style={{ backgroundColor: theme.colors.primary }}
                  title="Primary"
                ></div>
                <div 
                  className="h-6 w-6 rounded-full border" 
                  style={{ backgroundColor: theme.colors.secondary }}
                  title="Secondary"
                ></div>
                <div 
                  className="h-6 w-6 rounded-full border" 
                  style={{ backgroundColor: theme.colors.accent }}
                  title="Accent"
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTheme ? "Edit Theme" : "Create New Theme"}</DialogTitle>
            <DialogDescription>
              {editingTheme 
                ? "Make changes to your custom theme" 
                : "Create your own custom theme by selecting colors"
              }
            </DialogDescription>
          </DialogHeader>
          <ThemeEditor 
            theme={editingTheme || undefined}
            onSave={() => {
              setCreateDialogOpen(false);
              refreshThemes();
            }}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeSelector;
