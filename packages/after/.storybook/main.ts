import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const tailwindcss = (await import('tailwindcss')).default;
    const autoprefixer = (await import('autoprefixer')).default;
    
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_PATH || '/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      css: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
          ],
        },
      },
    });
  },
};

export default config;

