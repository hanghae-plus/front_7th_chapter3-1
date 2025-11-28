import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';
import '../src/styles/components.css';

const preview: Preview = {
  parameters: {
    layout: 'centered', // 모든 stories의 기본 레이아웃
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
          value: '#ffffff',
        },
        {
          name: 'paper',
          value: '#fafafa',
        },
        {
          name: 'dark',
          value: '#212121',
        },
      ],
    },
  },
  tags: ['autodocs'], // 모든 stories에 autodocs 자동 적용
};

export default preview;

