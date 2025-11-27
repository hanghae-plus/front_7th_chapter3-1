import * as React from 'react';

import { Input, type inputVariants } from './ui/input';
import { Field, FieldLabel, FieldDescription, FieldError } from './ui/field';
import type { VariantProps } from 'class-variance-authority';

interface FormInputProps extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  id: string;
  label?: string;
  helpText?: string;
  invalid?: boolean;
  invalidText?: string;
}

function FormInput({
  id,
  label,
  helpText,
  invalid,
  invalidText,
  required,
  ...props
}: FormInputProps) {
  const descriptionId = (helpText || invalidText) && id ? `${id}-description` : undefined;

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}
      <Input
        id={id}
        required={required}
        variant={invalid ? 'error' : 'default'}
        aria-invalid={invalid || undefined}
        aria-describedby={descriptionId}
        {...props}
      />
      {!invalid && helpText && <FieldDescription id={descriptionId}>{helpText}</FieldDescription>}
      {invalid && <FieldError id={descriptionId}>{invalidText}</FieldError>}
    </Field>
  );
}

export { FormInput };
