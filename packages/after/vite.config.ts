import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

const base: string =
  process.env.NODE_ENV === 'production' ? '/front_7th_chapter3-1/' : '';

// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }),

  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  })
);
