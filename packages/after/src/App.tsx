import React, { useState } from "react";
import Header from "./components/composed/Header";
import { ManagementPage } from "./pages/ManagementPage";
import "./styles/index.css";
import { DialogProvider } from "./components/composed/DialogProvider";

export const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <DialogProvider>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Header />
          <main>
            <ManagementPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </main>
        </div>
      </div>
    </DialogProvider>
  );
};
