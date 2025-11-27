import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // primitive.css 토큰 기반 버튼 베이스 스타일 (components.css의 .btn 스타일과 동일)
  "inline-block whitespace-nowrap border border-solid cursor-pointer font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 font-[var(--font-family-base)] leading-[var(--line-height-normal)] rounded-[var(--radius-3)]",
  {
    variants: {
      variant: {
        // primitive.css의 색상 토큰 사용
        primary:
          "border-[var(--color-primary-dark)] bg-[var(--color-primary)] text-[#ffffff] hover:bg-[var(--color-primary-dark)] focus-visible:ring-[var(--color-primary-dark)]",
        secondary:
          "border-[var(--color-neutral-250)] bg-[var(--color-neutral-100)] text-[var(--color-neutral-800)] hover:bg-[var(--color-neutral-200)] focus-visible:ring-[var(--color-neutral-300)]",
        danger:
          "border-[var(--color-danger-dark)] bg-[var(--color-danger)] text-[#ffffff] hover:bg-[var(--color-danger-dark)] focus-visible:ring-[var(--color-danger-dark)]",
        success:
          "border-[var(--color-success-dark)] bg-[var(--color-success)] text-[#ffffff] hover:bg-[var(--color-success-dark)] focus-visible:ring-[var(--color-success-dark)]",
      },
      size: {
        // primitive.css의 spacing 및 font-size 토큰 사용
        sm: "py-[var(--spacing-2)] px-[var(--spacing-5)] text-[length:var(--font-size-13)]",
        md: "py-[var(--spacing-4)] px-[var(--spacing-8)] text-[length:var(--font-size-14)]",
        lg: "py-[var(--spacing-5)] px-[var(--spacing-9)] text-[length:var(--font-size-15)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
