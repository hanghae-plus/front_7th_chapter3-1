import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold leading-none whitespace-nowrap rounded-sm",
  {
    variants: {
      variant: {
        primary: "bg-badge-primary text-white",
        secondary: "bg-badge-secondary text-white",
        success: "bg-badge-success text-white",
        danger: "bg-badge-danger text-white",
        warning: "bg-badge-warning text-white",
        info: "bg-badge-info text-white",
      },
      size: {
        small: "h-4 px-1 text-xs",
        medium: "h-5 px-2 text-sm",
        large: "h-6 px-2 text-base",
      },
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      pill,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ variant, size, pill, className })}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
