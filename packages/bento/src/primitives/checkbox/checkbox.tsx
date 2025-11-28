import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const checkboxVariants = cva(
  "peer border-[var(--input)] dark:bg-[var(--input)]/30 data-[state=checked]:bg-[var(--primary)] data-[state=checked]:text-[var(--primary-foreground)] dark:data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50",
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

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, variant, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
