import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const primaryStyles =
  "bg-[var(--ds-color-brand-primary-500)] text-[color:var(--ds-color-text-inverse)] border-[color:var(--ds-color-brand-primary-600)] hover:bg-[var(--ds-color-brand-primary-600)]"
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[3px] border text-[14px] leading-[1.5] font-normal transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: primaryStyles,
        primary: primaryStyles,
        secondary:
          "bg-[var(--ds-color-neutral-100)] text-[color:var(--ds-color-text-primary)] border-[color:var(--ds-color-neutral-200)] hover:bg-[var(--ds-color-neutral-150)]",
        danger:
          "bg-[var(--ds-color-feedback-danger-500)] text-[color:var(--ds-color-text-inverse)] border-[color:var(--ds-color-feedback-danger-600)] hover:bg-[var(--ds-color-feedback-danger-600)]",
        destructive:
          "bg-[var(--ds-color-feedback-danger-500)] text-[color:var(--ds-color-text-inverse)] border-[color:var(--ds-color-feedback-danger-600)] hover:bg-[var(--ds-color-feedback-danger-600)]",
        success:
          "bg-[var(--ds-color-feedback-success-500)] text-[color:var(--ds-color-text-inverse)] border-[color:var(--ds-color-feedback-success-600)] hover:bg-[var(--ds-color-feedback-success-600)]",
        outline:
          "bg-[var(--ds-color-surface-base)] text-[color:var(--ds-color-text-primary)] border-[color:var(--ds-color-neutral-200)] hover:bg-[var(--ds-color-neutral-100)]",
        ghost:
          "bg-transparent text-[color:var(--ds-color-brand-primary-500)] border-transparent hover:bg-[var(--ds-color-brand-primary-50)]",
        link: "bg-transparent border-transparent text-[color:var(--ds-color-brand-primary-500)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px]",
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-[15px]",
        icon: "p-0 size-9",
        "icon-sm": "p-0 size-8",
        "icon-lg": "p-0 size-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
