import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
      type: {
        primary: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary-hover ",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary-hover",
        success: "border-transparent bg-success text-success-foreground [a&]:hover:bg-success-hover dark:text-white",
        warning: "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning-hover dark:text-white",
        danger:
          "border-transparent bg-error text-error-foreground [a&]:hover:bg-error-hover focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60 dark:text-white",
        info: "border-transparent bg-info text-info-foreground [a&]:hover:bg-info-hover focus-visible:ring-info/20 dark:focus-visible:ring-info/40 dark:bg-info/60 dark:text-white",
      },
    },
    defaultVariants: {
      type: "primary",
      pill: false,
    },
  }
);

function Badge({
  className,
  type,
  pill,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean; pill?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return <Comp data-slot="badge" className={cn(badgeVariants({ type, pill }), className)} {...props} />;
}

export { Badge, badgeVariants };
