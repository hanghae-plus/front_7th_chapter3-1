import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-sans leading-none font-bold whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-gray-500 text-white',
        success: 'bg-success text-success-foreground',
        danger: 'bg-danger text-danger-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
      size: {
        sm: 'h-4 px-1 py-0 text-2xs',
        md: 'h-5 px-xs py-0 text-xs',
        lg: 'h-6 px-sm py-0 text-sm',
      },
      pill: {
        true: 'rounded-lg',
        false: 'rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      pill: false,
    },
  }
);

export type BadgeVariant = VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant,
  size,
  pill,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & BadgeVariant & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, pill }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
