import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout
          "flex w-full",
          "h-[var(--input-height)]",
          "px-[var(--input-padding-x)]",
          "py-[var(--input-padding-y)]",
          
          // Shape
          "rounded-[var(--input-radius)]",
          "border",
          "border-[var(--input-border)]",
          
          // Colors
          "bg-[var(--input-bg)]",
          "text-[var(--input-fg)]",
          "placeholder:text-[var(--input-placeholder)]",
          
          // Typography
          "text-sm",
          
          // Transitions
          "transition-all duration-200",
          
          // Focus
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--input-focus-ring)]",
          "focus-visible:border-[var(--input-focus-border)]",
          
          // Disabled
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "disabled:bg-[var(--input-disabled-bg)]",
          
          // File input
          "file:border-0",
          "file:bg-transparent",
          "file:text-sm",
          "file:font-medium",
          "file:text-foreground",
          
          // Shadow
          "shadow-sm",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
