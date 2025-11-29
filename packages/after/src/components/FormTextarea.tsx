import * as React from 'react';

import { Textarea, type textareaVariants } from '@bento/ui/textarea';
import { FormField, getFieldDescriptionId } from '@bento/ui/field';
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
      <Textarea
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

export { FormTextarea };
