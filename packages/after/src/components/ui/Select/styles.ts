import { cva } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'flex',
    'w-full',
    'items-center',
    'justify-between',
    'whitespace-nowrap',
    'rounded-[3px]',
    'border',
    'bg-[var(--color-bg-primary)]',
    'text-[length:var(--font-size-btn-md)]',
    'text-[var(--color-text-primary)]',
    'shadow-sm',
    'box-border',
    'ring-offset-background',
    'data-[placeholder]:text-muted-foreground',
    'focus:outline-none',
    'focus:ring-0',
    'focus:border-[var(--color-primary-500)]',
    'disabled:cursor-not-allowed',
    'disabled:bg-[var(--color-secondary-100)]',
    '[&>span]:line-clamp-1',
  ],
  {
    variants: {
      size: {
        sm: [
          'h-8',
          'px-[var(--spacing-sm)]',
          'py-[var(--spacing-sm)]',
          'text-[length:var(--font-size-btn-sm)]',
        ],
        md: [
          'h-9',
          'px-[var(--spacing-sm)]',
          'py-[var(--spacing-sm)]',
          'text-[length:var(--font-size-btn-md)]',
        ],
        lg: [
          'h-10',
          'px-[var(--spacing-sm)]',
          'py-[var(--spacing-sm)]',
          'text-[length:var(--font-size-btn-lg)]',
        ],
      },
      error: {
        true: 'border-[var(--color-danger-500)] focus:ring-[var(--color-danger-500)]',
        false: 'border-[var(--color-gray-400)]',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

export const selectContentVariants = cva(
  [
    'relative',
    'z-[var(--z-index-popover)]',
    'max-h-[--radix-select-content-available-height]',
    'min-w-[8rem]',
    'overflow-y-auto',
    'overflow-x-hidden',
    'rounded-md',
    'border',
    'bg-[var(--color-white)]',
    'text-popover-foreground',
    'shadow-md',
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95',
    'data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'origin-[--radix-select-content-transform-origin]',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs'],
        md: ['text-sm'],
        lg: ['text-base'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const selectItemVariants = cva(
  [
    'relative',
    'flex',
    'w-full',
    'cursor-default',
    'select-none',
    'items-center',
    'rounded-sm',
    'outline-none',
    'focus:bg-accent',
    'focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-50',
    'hover:bg-[var(--color-secondary-100)]',
    'data-[highlighted]:bg-[var(--color-secondary-200)]',
  ],
  {
    variants: {
      size: {
        sm: ['py-1', 'pl-2', 'pr-6', 'text-xs'],
        md: ['py-1.5', 'pl-2', 'pr-8', 'text-sm'],
        lg: ['py-2', 'pl-3', 'pr-10', 'text-base'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const selectViewportVariants = cva(['p-1'], {
  variants: {
    position: {
      popper: [
        'h-[var(--radix-select-trigger-height)]',
        'w-full',
        'min-w-[var(--radix-select-trigger-width)]',
      ],
      'item-aligned': [],
    },
  },
  defaultVariants: {
    position: 'popper',
  },
});
