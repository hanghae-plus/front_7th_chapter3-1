import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { ThemeProvider } from '../src/features/shared/providers/theme-provider'
import '../src/styles/components.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f5f5f5',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-ui-theme">
        <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;