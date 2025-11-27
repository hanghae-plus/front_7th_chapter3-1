import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-block font-[Arial,sans-serif] font-normal leading-[1.5] cursor-pointer border border-solid whitespace-nowrap transition-all disabled:opacity-60 disabled:cursor-not-allowed outline-none rounded-[var(--radius-button)]",
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-button-primary)]",
          "text-white",
          "border-[var(--color-button-primary-border)]",
          "hover:not(:disabled):bg-[var(--color-button-primary-hover)]",
          "hover:not(:disabled):border-[var(--color-button-primary-hover)]",
        ].join(" "),
        secondary: [
          "bg-[var(--color-button-secondary)]",
          "text-[var(--color-button-secondary-text)]",
          "border-[var(--color-button-secondary-border)]",
          "hover:not(:disabled):bg-[var(--color-button-secondary-hover)]",
          "hover:not(:disabled):border-[var(--color-button-secondary-hover)]",
        ].join(" "),
        danger: [
          "bg-[var(--color-button-danger)]",
          "text-white",
          "border-[var(--color-button-danger-border)]",
          "hover:not(:disabled):bg-[var(--color-button-danger-hover)]",
          "hover:not(:disabled):border-[var(--color-button-danger-hover)]",
        ].join(" "),
        success: [
          "bg-[var(--color-button-success)]",
          "text-white",
          "border-[var(--color-button-success-border)]",
          "hover:not(:disabled):bg-[var(--color-button-success-hover)]",
          "hover:not(:disabled):border-[var(--color-button-success-hover)]",
        ].join(" "),
      },
      size: {
        sm: "py-[6px] px-[12px] text-[var(--font-size-button-sm)]",
        md: "py-[10px] px-[20px] text-[var(--font-size-button-md)]",
        lg: "py-[12px] px-[24px] text-[var(--font-size-button-lg)]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
