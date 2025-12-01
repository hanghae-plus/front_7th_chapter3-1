import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------------------
// 1. Badge Style Definition (Legacy CSS Porting)
// 레거시 CSS 속성을 그대로 Tailwind 클래스로 변환했습니다.
// -------------------------------------------------------------------------
const badgeVariants = cva(
  // Base Styles
  "inline-flex items-center justify-center rounded-[3px] border text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        // [Primary] #1976d2 (Blue)
        primary:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",

        // [Secondary] #757575 (Legacy Badge Secondary - Solid Gray)
        secondary:
          "border-transparent bg-gray-solid text-white hover:bg-gray-solid/80",

        // [Danger] #d32f2f (Red)
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        danger:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",

        // [Success] #388e3c (Green)
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",

        // [Warning] #f57c00 (Orange)
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",

        // [Info] #0288d1 (Cyan)
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",

        outline: "text-foreground",
      },
      size: {
        // [Small] padding: 0 4px, font: 10px, height: 16px
        sm: "h-4 px-[4px] text-[10px]",

        // [Medium] padding: 0 8px, font: 12px (xs), height: 20px
        md: "h-5 px-[8px] text-xs",

        // [Large] padding: 0 10px, font: 13px, height: 24px
        lg: "h-6 px-[10px] text-[13px]",
      },
      pill: {
        // Legacy .badge-pill { border-radius: 10px; }
        true: "rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, pill, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, pill }), className)}
      {...props}
    />
  );
}

export { Badge };
