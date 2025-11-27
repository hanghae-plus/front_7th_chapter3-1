import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // token 기반 textarea 베이스 스타일 (primitive/semantic 토큰과 정렬)
        "flex min-h-[6em] w-full resize-y border border-(--color-border-textarea) bg-(--color-white) box-border",
        "px-(--space-textarea-padding-inline) py-(--space-textarea-padding-block)",
        "font-(--font-family-alt) text-(length:--font-size-16) leading-(--line-height-custom) text-(--color-text-input)",
        "rounded-(--radius-4) transition-[border-color] duration-(--motion-duration-normal) ease-(--motion-easing-standard)",
        "placeholder:text-(--color-text-placeholder)",
        "focus:border-(--color-border-focus) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)",
        "disabled:bg-(--color-black-12) disabled:cursor-not-allowed disabled:opacity-(--opacity-control-disabled)",
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

