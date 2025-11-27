import * as React from 'react';

import { cn } from '@/lib/utils';
import { Field, FieldLabel, FieldDescription, FieldError } from './field';
import { cva } from 'class-variance-authority';

interface InputProps extends React.ComponentProps<'input'> {
  id?: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  required?: boolean;
  disabled?: boolean;
  width?: 'small' | 'medium' | 'large' | 'full';
  placeholder?: string;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
}

const formInputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      width: {
        small: 'w-1/4',
        medium: 'w-1/2',
        large: 'w-3/4',
        full: 'w-full',
      },
    },
    defaultVariants: {
      width: 'full',
    },
  }
);

function FormInput({
  id,
  className,
  type,
  label,
  helpText,
  invalid,
  invalidText,
  required,
  width = 'full',
  ...props
}: InputProps) {
  const descriptionId = (helpText || invalidText) && id ? `${id}-description` : undefined;

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={invalid}
        aria-describedby={descriptionId}
        data-slot="input"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          formInputVariants({ width, className })
        )}
        {...props}
      />
      {!invalid && helpText && <FieldDescription id={descriptionId}>{helpText}</FieldDescription>}
      {invalid && <FieldError id={descriptionId}>{invalidText}</FieldError>}
    </Field>
  );
}

export { FormInput, formInputVariants };
