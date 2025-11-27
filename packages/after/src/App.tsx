import React from "react";
import { Header } from "./widgets/header";
import { ManagementPage } from "./pages/ManagementPage";
import { DarkModeToggle } from "./shared/ui";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background transition-colors">
      <Header />
      <main>
        <ManagementPage />
      </main>
      <DarkModeToggle />
    </div>
  );
};
