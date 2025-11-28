import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-bold font-sans leading-none whitespace-nowrap rounded-[3px]',
  {
    variants: {
      variant: {
        primary: 'bg-[#1976d2] text-white',
        secondary: 'bg-[#757575] text-white',
        success: 'bg-[#388e3c] text-white',
        danger: 'bg-[#d32f2f] text-white',
        warning: 'bg-[#f57c00] text-white',
        info: 'bg-[#0288d1] text-white',
      },
      size: {
        small: 'px-1 h-4 text-[0.625rem]',
        medium: 'px-2 h-5 text-xs',
        large: 'px-2.5 h-6 text-[0.8125rem]',
      },
      pill: {
        true: 'rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      pill: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, pill, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, size, pill, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };
