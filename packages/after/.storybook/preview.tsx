import type { Preview } from '@storybook/react-vite';
import type { ReactRenderer } from '@storybook/react';
import type { DecoratorFunction } from '@storybook/csf';
import { useEffect } from 'react';
import '../src/app/styles/index.css';

// Modal Portal용 decorator
const WithModalRoot: DecoratorFunction<ReactRenderer> = (Story) => {
  useEffect(() => {
    // modalRoot가 없으면 생성
    if (!document.getElementById('modalRoot')) {
      const modalRoot = document.createElement('div');
      modalRoot.id = 'modalRoot';
      document.body.appendChild(modalRoot);
    }

    // 클린업
    return () => {
      const modalRoot = document.getElementById('modalRoot');
      if (modalRoot && modalRoot.childNodes.length === 0) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  return <Story />;
};

const preview: Preview = {
  decorators: [WithModalRoot],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
};

export default preview;
