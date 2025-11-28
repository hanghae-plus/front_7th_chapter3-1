import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default:
          "min-h-[var(--min-height-textarea)] px-[var(--spacing-textarea-x)] py-[var(--spacing-textarea-y)] text-[var(--font-size-base)] leading-[var(--line-height-textarea)] focus:px-[var(--spacing-textarea-x-focus)] focus:py-[var(--spacing-textarea-y-focus)] md:text-[var(--font-size-md)]",
        sm: "min-h-[4em] px-[var(--spacing-textarea-x)] py-[var(--spacing-textarea-y)] text-[var(--font-size-sm)]",
        lg: "min-h-[8em] px-[var(--spacing-textarea-x)] py-[var(--spacing-textarea-y)] text-[var(--font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
