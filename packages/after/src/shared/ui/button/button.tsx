import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-block font-sans leading-normal font-normal rounded-sm cursor-pointer border whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground border-primary-border hover:not(:disabled):bg-primary-hover',
        secondary:
          'bg-secondary text-secondary-foreground border-border-light hover:not(:disabled):bg-secondary-hover',
        danger:
          'bg-danger text-danger-foreground border-danger-hover hover:not(:disabled):bg-danger-hover',
        success:
          'bg-success text-success-foreground border-success-hover hover:not(:disabled):bg-success-hover',
      },
      size: {
        sm: 'px-base py-sm text-sm',
        md: 'px-lg py-base text-base',
        lg: 'px-xl py-base text-md',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  ButtonVariant & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
