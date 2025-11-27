import * as React from "react"

import { cn } from "@/lib/utils"

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full border border-(--color-border-input) bg-(--color-bg-input) box-border",
        "px-(--space-form-control-padding-inline) py-(--space-form-control-padding-block)",
        "text-(length:--font-size-14) leading-(--line-height-normal) text-(--color-text-input)",
        "font-(--font-family-alt)",
        "rounded-(--radius-control-md) transition-[border-color] duration-(--motion-duration-normal) ease-(--motion-easing-standard)",
        "focus:border-(--color-border-focus) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)",
        "disabled:bg-(--color-bg-input-disabled) disabled:cursor-not-allowed disabled:opacity-(--opacity-control-disabled)",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }

