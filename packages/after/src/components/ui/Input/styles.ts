import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    // Base styles
    'w-full',
    'text-[var(--color-text-primary)]',
    'border',
    'rounded-[3px]',
    'bg-[var(--color-bg-primary)]',
    'box-border',
    'transition-colors',
    // Focus state
    'focus:border-[var(--color-primary-500)]',
    'focus:outline-none',
    // Disabled state
    'disabled:bg-[var(--color-secondary-100)]',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: [
          'px-[var(--spacing-xs)]',
          'py-[var(--spacing-xs)]',
          'text-[length:var(--font-size-sm)]',
        ],
        md: [
          'px-[var(--spacing-sm)]',
          'py-[var(--spacing-sm)]',
          'text-[length:var(--font-size-btn-md)]',
        ],
        lg: [
          'px-[var(--spacing-md)]',
          'py-[var(--spacing-md)]',
          'text-[length:var(--font-size-btn-lg)]',
        ],
      },
      error: {
        true: 'border-[var(--color-danger-500)]',
        false: 'border-[var(--color-gray-400)]',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);
