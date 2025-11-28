import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium leading-6 border border-solid whitespace-nowrap transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-btn-primary text-white border-btn-primary hover:bg-[#0056b3] hover:border-[#0056b3] disabled:hover:bg-btn-primary",
        secondary: "bg-btn-secondary text-white border-btn-secondary hover:bg-[#5a6268] hover:border-[#5a6268] disabled:hover:bg-btn-secondary",
        danger: "bg-btn-danger text-white border-btn-danger hover:bg-[#c82333] hover:border-[#c82333] disabled:hover:bg-btn-danger",
        success: "bg-btn-success text-white border-btn-success hover:bg-[#218838] hover:border-[#218838] disabled:hover:bg-btn-success",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2 text-base",
        lg: "px-8 py-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, type = "button", children, ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={buttonVariants({ variant, size, fullWidth, className })} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
