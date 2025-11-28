import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    // Base styles
    'w-full',
    'min-h-[6em]',
    'text-[var(--color-text-primary)]',
    'font-[var(--font-weight-normal)]',
    'leading-[var(--line-height-tight)]',
    'border',
    'rounded-[4px]',
    'box-border',
    'transition-[border-color]',
    'duration-[var(--transition-duration-base)]',
    'ease-[var(--transition-ease-out)]',
    'resize-vertical',
    'outline-none',
    // Focus state
    'focus:border-[var(--color-primary-500)]',
    'focus:border-2',
    // Disabled state
    'disabled:bg-[var(--color-text-disabled)]',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: [
          'px-[var(--spacing-xs)]',
          'py-[var(--spacing-xs)]',
          'text-[length:var(--font-size-xs)]',
          'focus:px-[calc(var(--spacing-xs)-1px)]',
          'focus:py-[calc(var(--spacing-xs)-1px)]',
        ],
        md: [
          'px-[var(--spacing-sm)]',
          'py-[var(--spacing-sm)]',
          'text-[length:var(--font-size-btn-md)]',
          'focus:px-[calc(var(--spacing-sm)-1px)]',
          'focus:py-[calc(var(--spacing-sm)-1px)]',
        ],
        lg: [
          'px-[var(--spacing-md)]',
          'py-[var(--spacing-md)]',
          'text-[length:var(--font-size-btn-lg)]',
          'focus:px-[calc(var(--spacing-md)-1px)]',
          'focus:py-[calc(var(--spacing-md)-1px)]',
        ],
      },
      error: {
        true: 'border-[var(--color-danger-500)]',
        false: 'border-[var(--color-border-strong)]',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);
