import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'hanghae-plus_front_7th_chapter3-1'
const isPages = process.env.GITHUB_PAGES === 'true'
const basePath = isPages ? `/${repoName}/before/` : '/'

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
