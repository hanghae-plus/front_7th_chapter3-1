import * as React from 'react';

import {
  NativeSelect,
  NativeSelectOption,
  type nativeSelectVariants,
} from '@bento/ui/native-select';
import { FormField, getFieldDescriptionId } from '@bento/ui/field';
import type { VariantProps } from 'class-variance-authority';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof nativeSelectVariants> {
  id: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      id,
      options,
      label,
      placeholder = 'Select an option...',
      required,
      disabled,
      invalid,
      invalidText,
      helpText,
      size,
      ...props
    },
    ref
  ) => {
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
        <NativeSelect
          id={id}
          ref={ref}
          disabled={disabled}
          required={required}
          variant={invalid ? 'error' : 'default'}
          size={size}
          aria-label={!label ? placeholder : undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={descriptionId}
          {...props}
        >
          {placeholder && (
            <NativeSelectOption value="" hidden>
              {placeholder}
            </NativeSelectOption>
          )}
          {options.map(option => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </FormField>
    );
  }
);
FormSelect.displayName = 'FormSelect';

export { FormSelect };
export type { Option as SelectOption };
