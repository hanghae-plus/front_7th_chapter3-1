import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Layout
        "flex w-full min-h-[80px]",
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
        "text-sm leading-relaxed",
        
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
        
        // Shadow
        "shadow-sm",
        
        // Resize
        "resize-y",
        
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
