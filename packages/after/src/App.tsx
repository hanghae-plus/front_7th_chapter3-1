import React from 'react';
import { Header } from './widgets/header.ui';
import { ManagementPage } from './pages/management/ui/page';
import { ModalRoot } from './app/providers/modal';
import { ThemeProvider } from './app/providers/theme';

export const App: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="bg-elevated min-h-screen">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
      <ModalRoot />
    </ThemeProvider>
  );
};
