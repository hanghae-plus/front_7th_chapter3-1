import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "form-label",
        "block mb-(--space-form-label-margin-bottom) p-0 m-0",
        "text-(length:--font-size-label) leading-(--line-height-tight) font-bold",
        "text-(--color-text-label) font-(--font-family-base)",
        "select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-(--opacity-control-disabled)",
        className
      )}
      {...props}
    />
  )
}

export { Label }
