import type { Preview } from '@storybook/react-vite';
import '../src/styles/components.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Accessibility addon 전역 설정
    a11y: {
      // axe-core 설정
      config: {
        rules: [
          {
            // color-contrast 체크 (WCAG 2.0 Level AA)
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
      // 자동 실행 옵션
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      },
    },
    options: {
      storySort: {
        order: ['Design', 'UI', 'Molecules'],
      },
    },
  },
};

export default preview;
