import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const base: string = process.env.NODE_ENV === 'production' ? '/front_7th_chapter3-1/' : '';

// https://vite.dev/config/
export default defineConfig({
  base,
  // @ts-expect-error - Plugin version mismatch between vite@7 and vitest's vite@5 in pnpm workspace
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/app/config/test/test-setup.ts',
    css: true,
  },
});
