import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap",

    "font-[var(--button-font-weight)]",
    "text-[var(--button-font-size-md)]", // 기본 크기

    "rounded-[var(--button-radius)]",

    "transition-[var(--button-transition)]",

    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--color-focus-ring)]",
    "focus-visible:ring-offset-2",

    "disabled:opacity-50",
    "disabled:pointer-events-none",
    "disabled:cursor-not-allowed",

    "[&_svg]:pointer-events-none",
    "[&_svg]:size-4",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--button-primary-bg)]",
          "!text-[var(--button-primary-fg)]",
          "hover:bg-[var(--button-primary-bg-hover)]",
          "active:bg-[var(--button-primary-bg-active)]",
        ],
        destructive: [
          "bg-[var(--button-danger-bg)]",
          "text-[var(--button-danger-fg)]",
          "hover:bg-[var(--button-danger-bg-hover)]",
        ],
        outline: [
          "bg-[var(--button-outline-bg)]",
          "text-[var(--button-outline-fg)]",
          "border border-[var(--button-outline-border)]",
          "hover:bg-[var(--button-outline-bg-hover)]",
        ],
        secondary: [
          "bg-[var(--button-secondary-bg)]",
          "text-[var(--button-secondary-fg)]",
          "hover:bg-[var(--button-secondary-bg-hover)]",
        ],
        ghost: [
          "bg-[var(--button-ghost-bg)]",
          "text-[var(--button-ghost-fg)]",
          "hover:bg-[var(--button-ghost-bg-hover)]",
        ],
      },
      size: {
        sm: [
          "h-[var(--button-height-sm)]",
          "px-[var(--button-padding-x-sm)]",
          "text-[var(--button-font-size-sm)]",
          "gap-1.5",
        ],
        default: [
          "h-[var(--button-height-md)]",
          "px-[var(--button-padding-x-md)]",
          "text-[var(--button-font-size-md)]",
        ],
        lg: [
          "h-[var(--button-height-lg)]",
          "px-[var(--button-padding-x-lg)]",
          "text-[var(--button-font-size-lg)]",
        ],

        icon: "size-[var(--button-height-md)] p-0",
        "icon-sm": "size-[var(--button-height-sm)] p-0",
        "icon-lg": "size-[var(--button-height-lg)] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
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
