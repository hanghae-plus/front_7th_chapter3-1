/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const nativeSelectVariants = cva(
  "border-[var(--input)] placeholder:text-[var(--muted-foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] dark:bg-[var(--input)]/30 dark:hover:bg-[var(--input)]/50 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px]",
        error:
          "border-[var(--destructive)] ring-[var(--destructive)]/20 dark:ring-[var(--destructive)]/40 focus-visible:border-[var(--destructive)] focus-visible:ring-[var(--destructive)]/30 focus-visible:ring-[3px]",
      },
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof nativeSelectVariants> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { className, variant, size, "aria-label": ariaLabel, title, ...props },
    ref
  ) => {
    return (
      <div
        className="group/native-select relative w-full has-[select:disabled]:opacity-50"
        data-slot="native-select-wrapper"
      >
        <select
          ref={ref}
          data-slot="native-select"
          title={title ?? ""}
          aria-label={ariaLabel ?? ""}
          className={cn(nativeSelectVariants({ variant, size }), className)}
          {...props}
        />
        <ChevronDownIcon
          className="text-[var(--muted-foreground)] pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-50 select-none"
          aria-hidden="true"
          data-slot="native-select-icon"
        />
      </div>
    );
  }
);
NativeSelect.displayName = "NativeSelect";

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[var(--popover)] text-[var(--popover-foreground)]", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  nativeSelectVariants,
};
export type { NativeSelectProps };
