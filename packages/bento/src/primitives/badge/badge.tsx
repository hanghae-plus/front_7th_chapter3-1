import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px] aria-invalid:ring-[var(--destructive)]/20 dark:aria-invalid:ring-[var(--destructive)]/40 aria-invalid:border-[var(--destructive)] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] [a&]:hover:bg-[var(--primary)]/90",
        secondary:
          "border-transparent bg-[var(--secondary)] text-[var(--secondary-foreground)] [a&]:hover:bg-[var(--secondary)]/90",
        danger:
          "border-transparent bg-[var(--destructive)] text-white [a&]:hover:bg-[var(--destructive)]/90 focus-visible:ring-[var(--destructive)]/20 dark:focus-visible:ring-[var(--destructive)]/40 dark:bg-[var(--destructive)]/60",
        success:
          "border-transparent bg-[var(--positive)] text-[var(--positive-foreground)] [a&]:hover:bg-[var(--positive)]/90 focus-visible:ring-[var(--positive)]/20 dark:focus-visible:ring-[var(--positive)]/40 dark:bg-[var(--positive)]/60",
        warning:
          "border-transparent bg-[var(--caution)] text-[var(--caution-foreground)] [a&]:hover:bg-[var(--caution)]/90 focus-visible:ring-[var(--caution)]/20 dark:focus-visible:ring-[var(--caution)]/40",
        info: "border-transparent bg-[var(--informative)] text-[var(--informative-foreground)] [a&]:hover:bg-[var(--informative)]/90 focus-visible:ring-[var(--informative)]/20 dark:focus-visible:ring-[var(--informative)]/40",
        outline:
          "text-[var(--foreground)] [a&]:hover:bg-[var(--accent)] [a&]:hover:text-[var(--accent-foreground)]",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "square",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
function Badge({
  className,
  variant,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants, type BadgeProps };
