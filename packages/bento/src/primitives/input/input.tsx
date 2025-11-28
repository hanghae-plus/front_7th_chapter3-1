import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const inputVariants = cva(
  "file:text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] dark:bg-[var(--input)]/30 border-[var(--input)] flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px]",
        error:
          "border-[var(--destructive)] ring-[var(--destructive)]/20 dark:ring-[var(--destructive)]/40 focus-visible:border-[var(--destructive)] focus-visible:ring-[var(--destructive)]/30 focus-visible:ring-[3px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
