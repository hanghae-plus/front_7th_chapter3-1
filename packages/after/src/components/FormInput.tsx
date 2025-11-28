import * as React from 'react';

import { Input, type inputVariants } from '@bento/ui/input';
import { FormField, getFieldDescriptionId } from '@bento/ui/field';
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
  const descriptionId = getFieldDescriptionId(id, !!(helpText || invalidText));

  return (
    <FormField
      id={id}
      label={label}
      helpText={helpText}
      invalid={invalid}
      invalidText={invalidText}
      required={required}
    >
      <Input
        id={id}
        required={required}
        variant={invalid ? 'error' : 'default'}
        aria-invalid={invalid || undefined}
        aria-describedby={descriptionId}
        {...props}
      />
    </FormField>
  );
}

export { FormInput };
