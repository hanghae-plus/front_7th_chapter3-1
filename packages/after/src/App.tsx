import React from 'react'
import { Header } from './components/ui/header'
import { ManagementPage } from './pages/ManagementPage'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-(--color-neutral-100)">
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
