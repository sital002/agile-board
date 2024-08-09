import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TooltipProvider>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <Toaster />

          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </TooltipProvider>
  </React.StrictMode>
);
