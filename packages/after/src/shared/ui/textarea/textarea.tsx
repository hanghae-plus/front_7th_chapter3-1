import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'font-roboto ox-border transition-border-color min-h-[6em] w-full resize-y rounded-md border border-border-strong bg-background px-[14px] py-[16.5px] text-lg leading-tight font-normal text-foreground-emphasis outline-none',
        'focus:border-border-focus border-2 px-[13px] py-[15.5px] focus:outline-none',
        'aria-invalid:border-border-error',
        'disabled:bg-disabled disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
