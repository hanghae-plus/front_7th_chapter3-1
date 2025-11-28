import React from "react";
import { ManagementPage } from "./pages/ManagementPage";
import { Header } from "./components/ui/header";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
