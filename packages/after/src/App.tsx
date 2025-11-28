import React from "react";
import { Header, ThemeToggle } from "./shared/ui";
import { ManagementPage } from "./pages/ManagementPage";
import { ThemeProvider } from "./shared/contexts/ThemeContext";
import "./styles/globals.css";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors" style={{ backgroundColor: "var(--color-bg-primary)" }}>
        <Header />
        <main>
          <ManagementPage />
        </main>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
};
