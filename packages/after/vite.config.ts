import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const base: string = process.env.NODE_ENV === 'production' ? '/front_7th_chapter3-1/' : '';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
