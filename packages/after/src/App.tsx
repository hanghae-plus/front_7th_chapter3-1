import React from "react";
import Header from "./components/composed/Header";
import { ManagementPage } from "./pages/ManagementPage";
import "./styles/index.css";
import { DialogProvider } from "./components/composed/DialogProvider";

export const App: React.FC = () => {
  return (
    <DialogProvider>
      <div style={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </DialogProvider>
  );
};
