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
        // Layout
        "flex items-center gap-2",
        
        // Typography
        "text-[length:var(--label-font-size)]",
        "font-[var(--label-font-weight)]",
        "leading-none",
        
        // Colors
        "text-[var(--label-fg)]",
        
        // Behavior
        "select-none",
        
        // Disabled states
        "group-data-[disabled=true]:pointer-events-none",
        "group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed",
        "peer-disabled:opacity-50",
        
        className
      )}
      {...props}
    />
  )
}

export { Label }
