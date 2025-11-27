import * as React from 'react';

import { Textarea, type textareaVariants } from './ui/textarea';
import { Field, FieldLabel, FieldDescription, FieldError } from './ui/field';
import type { VariantProps } from 'class-variance-authority';

interface FormTextareaProps
  extends React.ComponentProps<'textarea'>,
    VariantProps<typeof textareaVariants> {
  id: string;
  label?: string;
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
  ...props
}: FormTextareaProps) {
  const descriptionId = (helpText || invalidText) && id ? `${id}-description` : undefined;

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}
      <Textarea
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

export { FormTextarea };
