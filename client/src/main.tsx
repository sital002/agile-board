import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark">
          <App />
        </ThemeProvider>
      </TooltipProvider>
  </React.StrictMode>
);
