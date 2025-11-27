import * as React from 'react';

import { Checkbox, type checkboxVariants } from './ui/checkbox';
import { Field, FieldDescription, FieldError, getFieldDescriptionId } from './ui/field';
import { Label } from './ui/label';
import type { VariantProps } from 'class-variance-authority';

interface FormCheckboxProps extends VariantProps<typeof checkboxVariants> {
  id: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
}

function FormCheckbox({
  id,
  checked,
  onCheckedChange,
  label,
  disabled,
  invalid,
  invalidText,
  helpText,
}: FormCheckboxProps) {
  const descriptionId = getFieldDescriptionId(id, !!(helpText || invalidText));

  return (
    <Field orientation="horizontal">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        variant={invalid ? 'error' : 'default'}
        aria-invalid={invalid || undefined}
        aria-describedby={descriptionId}
      />
      <div className="flex flex-col gap-1">
        <Label
          htmlFor={id}
          className={disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        >
          {label}
        </Label>
        {!invalid && helpText && <FieldDescription id={descriptionId}>{helpText}</FieldDescription>}
        {invalid && invalidText && <FieldError id={descriptionId}>{invalidText}</FieldError>}
      </div>
    </Field>
  );
}

export { FormCheckbox };
