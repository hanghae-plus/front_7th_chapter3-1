import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
        "flex w-full border border-(--color-border-input) bg-(--color-bg-input) box-border",
          "px-(--space-form-control-padding-inline) py-(--space-form-control-padding-block)",
          "text-(length:--font-size-14) leading-(--line-height-normal) text-(--color-text-input)",
          "rounded-(--radius-control-md) transition-[border-color] duration-(--motion-duration-normal) ease-(--motion-easing-standard)",
          "placeholder:text-(--color-text-placeholder)",
          "focus:border-(--color-border-focus) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)",
          "disabled:bg-(--color-bg-input-disabled) disabled:cursor-not-allowed disabled:opacity-(--opacity-control-disabled)",
          "file:border-0 file:bg-transparent file:text-(length:--font-size-13) file:font-medium file:text-(--color-text-default)",
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
