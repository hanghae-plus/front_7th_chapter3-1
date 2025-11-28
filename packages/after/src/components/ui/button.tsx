/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-block font-[Arial,sans-serif] font-normal leading-[1.5] rounded-[3px] border cursor-pointer whitespace-nowrap transition-all disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground border-primary-hover hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground border-border hover:bg-secondary-hover",
        danger: "bg-destructive text-destructive-foreground border-destructive-hover hover:bg-destructive-hover",
        success: "bg-success text-success-foreground border-success-hover hover:bg-success-hover",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px]",
        md: "px-5 py-2.5 text-[14px]",
        lg: "px-6 py-3 text-[15px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
      size: "md", 
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
