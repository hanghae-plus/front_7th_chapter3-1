import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-block font-sans font-normal leading-[1.5] rounded-[3px] cursor-pointer border border-solid whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#1976d2] text-white border-[#1565c0] hover:enabled:bg-[#1565c0]',
        secondary: 'bg-[#f5f5f5] text-[#333] border-[#ddd] hover:enabled:bg-[#e0e0e0]',
        danger: 'bg-[#d32f2f] text-white border-[#c62828] hover:enabled:bg-[#c62828]',
        success: 'bg-[#388e3c] text-white border-[#2e7d32] hover:enabled:bg-[#2e7d32]',
      },
      size: {
        sm: 'py-1.5 px-3 text-[13px]',
        md: 'py-2.5 px-5 text-[14px]',
        lg: 'py-3 px-6 text-[15px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
