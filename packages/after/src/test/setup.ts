import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock window.confirm for delete operations
global.confirm = vi.fn(() => true);

// Polyfill for Radix UI Select - Pointer Capture API
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = vi.fn(() => false);
}

if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = vi.fn();
}

if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = vi.fn();
}

// Polyfill for scrollIntoView
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}
