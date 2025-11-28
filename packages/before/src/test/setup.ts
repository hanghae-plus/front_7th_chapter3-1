import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock localStorage for jsdom
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock window.confirm for delete operations
global.confirm = vi.fn(() => true);

// Fix React.act for React 19 compatibility
// This is a workaround for @testing-library/react with React 19
// See: https://github.com/testing-library/react-testing-library/issues/1209
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
