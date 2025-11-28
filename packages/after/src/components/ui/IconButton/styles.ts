import { cva } from 'class-variance-authority';

export const iconButtonVariants = cva(
  [
    'p-0',
    'aspect-square',
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    'ring-offset-background',
  ],
  {
    variants: {
      size: {
        sm: ['w-8', 'h-8'],
        md: ['w-9', 'h-9'],
        lg: ['w-10', 'h-10'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
