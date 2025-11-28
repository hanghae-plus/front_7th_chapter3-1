import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import * as React from "react";

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

// Mock matchMedia for theme detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Fix React.act for React 19 compatibility
// This is a workaround for @testing-library/react with React 19
// See: https://github.com/testing-library/react-testing-library/issues/1209
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// Provide React.act for testing-library
if (typeof React.act === "undefined") {
  (React as any).act = (callback: () => void) => {
    callback();
    return Promise.resolve();
  };
}
