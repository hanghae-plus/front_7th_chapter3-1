import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. 스타일 정의 (CVA) - Design Token Integration
// 레거시 Hex 코드(#...)를 모두 제거하고, components.css에 정의된 토큰을 사용합니다.
// -------------------------------------------------------------------------
const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-[3px] border text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground border-bum-blue-dark hover:bg-bum-blue-dark",
        secondary:
          "bg-secondary text-bum-gray-800 border-bum-gray-300 hover:bg-bum-gray-200",
        danger:
          "bg-destructive text-destructive-foreground border-bum-red-dark hover:bg-bum-red-dark",
        success:
          "bg-success text-success-foreground border-bum-green-dark hover:bg-bum-green-dark",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground border-transparent",
        link: "text-primary underline-offset-4 hover:underline border-transparent bg-transparent",
      },
      size: {
        md: "h-auto py-[10px] px-[20px] text-[14px]",
        sm: "h-auto py-[6px] px-[12px] text-[13px]",
        lg: "h-auto py-[12px] px-[24px] text-[15px]",
        icon: "h-10 w-10",
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
