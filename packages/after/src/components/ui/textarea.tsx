import * as React from 'react';

import { cn } from '@/lib/utils';
import { Field, FieldLabel, FieldDescription, FieldError } from './field';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  helpText?: string;
  invalid?: boolean;
  invalidText?: string;
}

function FormTextarea({
  id,
  label,
  helpText,
  invalid,
  invalidText,
  required,
  disabled,
  placeholder,
  rows = 4,
  className,
  ...props
}: TextareaProps) {
  const descriptionId = (helpText || invalidText) && id ? `${id}-description` : undefined;

  return (
    <Field>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <textarea
        id={id}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        data-slot="textarea"
        aria-invalid={invalid}
        aria-describedby={descriptionId}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        {...props}
      />
      {!invalid && helpText && <FieldDescription id={descriptionId}>{helpText}</FieldDescription>}
      {invalid && <FieldError id={descriptionId}>{invalidText}</FieldError>}
    </Field>
  );
}

export { FormTextarea };
