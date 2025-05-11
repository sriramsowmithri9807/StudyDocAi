
export interface CustomTheme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };
  createdBy: string;
}

export const defaultThemes: CustomTheme[] = [
  {
    id: "default",
    name: "Default Theme",
    colors: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      primary: "hsl(222.2 47.4% 11.2%)",
      secondary: "hsl(210 40% 96.1%)",
      accent: "hsl(210 40% 96.1%)",
      muted: "hsl(210 40% 96.1%)",
    },
    createdBy: "system"
  },
  {
    id: "dark",
    name: "Dark Theme",
    colors: {
      background: "hsl(222.2 84% 4.9%)",
      foreground: "hsl(210 40% 98%)",
      primary: "hsl(210 40% 98%)",
      secondary: "hsl(217.2 32.6% 17.5%)",
      accent: "hsl(217.2 32.6% 17.5%)",
      muted: "hsl(217.2 32.6% 17.5%)",
    },
    createdBy: "system"
  },
  {
    id: "purple",
    name: "Purple Dream",
    colors: {
      background: "hsl(280 65% 99%)",
      foreground: "hsl(280 40% 15%)",
      primary: "hsl(280 50% 50%)",
      secondary: "hsl(280 40% 92%)",
      accent: "hsl(280 60% 80%)",
      muted: "hsl(280 20% 90%)",
    },
    createdBy: "system"
  }
];

export const getStoredThemes = (): CustomTheme[] => {
  const storedThemes = localStorage.getItem("customThemes");
  return storedThemes ? JSON.parse(storedThemes) : [];
};

export const getAllThemes = (): CustomTheme[] => {
  return [...defaultThemes, ...getStoredThemes()];
};

export const saveTheme = (theme: CustomTheme): void => {
  const storedThemes = getStoredThemes();
  const existingIndex = storedThemes.findIndex(t => t.id === theme.id);
  
  if (existingIndex >= 0) {
    storedThemes[existingIndex] = theme;
  } else {
    storedThemes.push(theme);
  }
  
  localStorage.setItem("customThemes", JSON.stringify(storedThemes));
};

export const deleteTheme = (themeId: string): void => {
  const storedThemes = getStoredThemes();
  const filteredThemes = storedThemes.filter(t => t.id !== themeId);
  localStorage.setItem("customThemes", JSON.stringify(filteredThemes));
};

export const applyTheme = (theme: CustomTheme): void => {
  const root = document.documentElement;
  
  // Store the current theme ID
  localStorage.setItem("currentTheme", theme.id);
  
  // Apply theme colors
  root.style.setProperty("--background", theme.colors.background);
  root.style.setProperty("--foreground", theme.colors.foreground);
  root.style.setProperty("--primary", theme.colors.primary);
  root.style.setProperty("--secondary", theme.colors.secondary);
  root.style.setProperty("--accent", theme.colors.accent);
  root.style.setProperty("--muted", theme.colors.muted);
};

export const getCurrentTheme = (): CustomTheme => {
  const themeId = localStorage.getItem("currentTheme") || "default";
  const allThemes = getAllThemes();
  return allThemes.find(t => t.id === themeId) || defaultThemes[0];
};

export const initializeTheme = (): void => {
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
};
