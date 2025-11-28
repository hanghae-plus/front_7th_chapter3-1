import { forwardRef } from 'react';
import { Form } from '@/components/ui/Form';
import type { InputProps } from '@/components/ui/Input/types';

interface FormInputProps
  extends Omit<InputProps, 'onChange' | 'size' | 'error'> {
  name: string;
  label?: string;
  helpText?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  onChange?: (value: string) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const {
    name,
    value,
    onChange,
    label,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    error,
    helpText,
    size = 'md',
    ...restProps
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <Form.Field
      name={name}
      label={label}
      error={error}
      helpText={helpText}
      required={required}
      size={size}
    >
      <Form.Input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        {...restProps}
      />
    </Form.Field>
  );
});

FormInput.displayName = 'FormInput';

export { FormInput };
export type { FormInputProps };
