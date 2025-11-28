import { cn } from '@/lib/utils';
import type { TextareaProps } from './types';
import { forwardRef } from 'react';
import { textareaVariants } from './styles';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ value, onChange, className, size, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size, error, className }))}
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
);
