import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-sm font-medium transition-colors border justify-center h-9 px-4 py-2",
  {
    variants: {
      variant: {
        icon: "bg-transparent border-none p-[0]",
        primary:
          "bg-primary hover:bg-primary-hover text-app-primary-foreground border-primary",
        secondary:
          "bg-secondary hover:bg-secondary-hover border-border-light text-app-secondary-foreground",
        danger:
          "bg-danger hover:bg-danger-hover text-app-danger-foreground border-danger",
        success:
          "bg-success hover:bg-success-hover text-app-success-foreground border-success",
        warning:
          "bg-warning hover:bg-warning-hover text-app-warning-foreground border-warning",
        info: "bg-info hover:bg-info-hover text-app-info-foreground border-info",
        outline:
          "border-border text-app-foreground bg-transparent hover:bg-muted/60",
        ghost: "border-transparent text-app-foreground hover:bg-muted/40",
      },
      size: {
        default: "",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    </>
  );
}

export { Button, buttonVariants };
