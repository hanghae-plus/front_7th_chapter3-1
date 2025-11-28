
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock window.confirm for delete operations
// @ts-ignore
(global as any).confirm = vi.fn(() => true);
