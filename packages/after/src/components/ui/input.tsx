import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles matching form-input from components.css
        "w-full px-[10px] py-2 text-sm font-base text-black",
        "border border-input rounded-[3px] bg-card",
        "box-border outline-none transition-colors",
        // Placeholder
        "placeholder:text-muted-foreground",
        // Focus state
        "focus:border-primary",
        // Error state
        "aria-invalid:border-destructive",
        // Disabled state
        "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-disabled",
        // File input
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Selection
        "selection:bg-primary selection:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Input }
