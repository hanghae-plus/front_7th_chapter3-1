import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock window.confirm for delete operations
global.confirm = vi.fn(() => true);

// Create modalRoot for portal rendering
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modalRoot');
document.body.appendChild(modalRoot);
