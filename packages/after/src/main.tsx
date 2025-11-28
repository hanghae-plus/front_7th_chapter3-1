import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { EntityProvider } from './contexts/EntityContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EntityProvider>
      <App />
    </EntityProvider>
  </StrictMode>,
)