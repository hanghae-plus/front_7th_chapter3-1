import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './layouts/Header';
import { ManagementPage } from './pages/ManagementPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
