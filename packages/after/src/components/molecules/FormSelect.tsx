import React from 'react';
import { Form } from '@/components/ui/Form';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (props, ref) => {
    const {
      name,
      value,
      onChange,
      options,
      label,
      placeholder = 'Select an option...',
      required = false,
      disabled = false,
      error,
      helpText,
      size = 'md',
    } = props;

    return (
      <Form.Field
        name={name}
        label={label}
        error={error}
        helpText={helpText}
        required={required}
        size={size}
      >
        <Form.Select
          ref={ref}
          options={options}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          disabled={disabled}
        />
      </Form.Field>
    );
  }
);
