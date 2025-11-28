import React from 'react'
import { Header } from './components/organisms'
import { ManagementPage } from './pages/ManagementPage'
// import './styles/components.css'
import "./styles/index.css";
import {Button} from '@/components/ui/button'

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Header />
      <main>
        <ManagementPage />
          <div className="min-h-screen bg-background p-8 flex flex-col gap-4 items-start">
              <h1 className="text-2xl font-bold text-foreground">Button Component Examples</h1>
              <div className="flex flex-wrap gap-2">
                  <Button>Default Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Button</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small Button</Button>
                  <Button size="md">medium Size Button</Button>
                  <Button size="lg">Large Button</Button>
                  <Button size="icon"><span role="img" aria-label="star">⭐</span></Button>
                   </div>

              <div className="flex flex-wrap gap-2">
                   <Button disabled>Disabled Button</Button>
                   <Button variant="secondary" disabled>Disabled Secondary</Button>
                  </div>
              </div>
      </main>
    </div>
  );
};
