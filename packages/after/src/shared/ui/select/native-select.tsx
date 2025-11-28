import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const nativeSelectVariants = cva(
  cn(
    'py-xs px-sm w-full font-sans text-base text-foreground border-border box-border rounded-sm border bg-background',
    'focus:border-border-focus focus:outline-none',
    'aria-invalid:border-border-error',
    'disabled:bg-disabled disabled:cursor-not-allowed '
  ),
  {
    variants: {
      variant: {
        default: 'w-full',
        sm: 'w-[200px]',
        md: 'w-[300px]',
        lg: 'w-[400px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function NativeSelect({
  className,
  variant,
  ...props
}: React.ComponentProps<'select'> & VariantProps<typeof nativeSelectVariants>) {
  return (
    <div
      className="group/native-select relative w-full has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(nativeSelectVariants({ variant, className }))}
        {...props}
      />
      {/* <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      /> */}
    </div>
  );
}

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
  return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
  return <optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />;
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
