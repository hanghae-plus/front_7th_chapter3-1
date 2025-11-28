import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  cn(
    'py-xs px-sm w-full font-sans text-base text-foreground border-border box-border rounded-sm border bg-background',
    'focus:border-border-focus focus:outline-none',
    'aria-invalid:border-border-error',
    'disabled:bg-disabled disabled:cursor-not-allowed '
  ),

  {
    variants: {
      variant: {
        default: 'full',
        sm: 'w-[200px]',
        md: 'w-[300px]',
        lg: 'w-[400px]',
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  }
);

export type InputVariant = VariantProps<typeof inputVariants>;

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & InputVariant) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input };
