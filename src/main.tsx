
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeTheme } from './utils/themeUtils.ts'

// Initialize the theme
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
