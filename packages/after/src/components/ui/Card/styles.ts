import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded bg-(--color-bg-primary) font-[Roboto,Helvetica,Arial,sans-serif] overflow-hidden mb-(--spacing-md) transition-shadow',
  {
    variants: {
      variant: {
        default: 'border border-(--color-border-base) shadow-(--shadow-sm)',
        bordered: 'border border-(--color-border-base) shadow-none',
        elevated: 'border border-(--color-border-light) shadow-(--shadow-md)',
        flat: 'border border-(--color-border-light) shadow-none bg-(--color-bg-secondary)',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
