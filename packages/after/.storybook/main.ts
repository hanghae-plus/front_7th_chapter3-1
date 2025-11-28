import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.base = '/front_7th_chapter3-1/story-book/';
    return config;
  },
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        // radix-ui나 react의 기본 props 제외
        if (prop.parent) {
          const parentFileName = prop.parent.fileName;
          if (parentFileName.includes('node_modules/@radix-ui')) {
            return false;
          }
          if (parentFileName.includes('node_modules/@types/react')) {
            return false;
          }
        }
        return true;
      },
    },
  },
};
export default config;
