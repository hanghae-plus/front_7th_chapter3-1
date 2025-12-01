import type { Preview } from '@storybook/react-vite'
import "../src/styles/components.css"; 

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 배경색 설정 (선택 사항)
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f0f0f0' }, // --legacy-bg-page
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1e2124' },
      ],
    },
    layout: 'centered', 
  },
};

export default preview;