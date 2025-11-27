import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type selectTriggerVariants,
} from './ui/select';
import { Field, FieldLabel, FieldDescription, FieldError } from './ui/field';
import type { VariantProps } from 'class-variance-authority';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends VariantProps<typeof selectTriggerVariants> {
  id: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
}

function FormSelect({
  id,
  value,
  onValueChange,
  options,
  label,
  placeholder = 'Select an option...',
  required,
  disabled,
  invalid,
  invalidText,
  helpText,
  size,
}: FormSelectProps) {
  const descriptionId = (helpText || invalidText) && id ? `${id}-description` : undefined;

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={id}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
      )}
      <Select value={value} onValueChange={onValueChange} disabled={disabled} required={required}>
        <SelectTrigger
          id={id}
          variant={invalid ? 'error' : 'default'}
          size={size}
          aria-invalid={invalid || undefined}
          aria-describedby={descriptionId}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!invalid && helpText && <FieldDescription id={descriptionId}>{helpText}</FieldDescription>}
      {invalid && <FieldError id={descriptionId}>{invalidText}</FieldError>}
    </Field>
  );
}

export { FormSelect };
export type { Option as SelectOption };
