import React from 'react';
import { Form } from '@/components/ui/Form';

// Textarea Component - Yet another inconsistent API
interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'md',
  rows = 4,
}) => {
  return (
    <Form.Field
      name={name}
      label={label}
      error={error}
      helpText={helpText}
      required={required}
      size={size}
    >
      <Form.Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
      />
    </Form.Field>
  );
};
