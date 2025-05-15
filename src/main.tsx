import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeTheme } from './utils/themeUtils.ts'
import { AuthProvider } from './contexts/AuthContext.tsx'

// Initialize the theme
initializeTheme();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
