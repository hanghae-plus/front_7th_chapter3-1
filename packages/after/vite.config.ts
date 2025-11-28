// vite.config.ts
import { defineConfig } from 'vitest/config'     // ← 여기!
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Base is required for GitHub Pages when the site is served from a repo subpath
  base: '/front_7th_chapter3-1/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
