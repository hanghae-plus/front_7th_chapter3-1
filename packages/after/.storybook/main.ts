import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  ...(process.env.STORYBOOK_BASE_PATH && {
    base: process.env.STORYBOOK_BASE_PATH,
  }),
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
    });
  },
};

export default config;
