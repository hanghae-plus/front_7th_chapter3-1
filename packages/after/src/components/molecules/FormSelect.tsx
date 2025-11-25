import React from 'react';

// Select Component - Inconsistent with Input component
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
  // size?: 'sm' | 'md' | 'lg';
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  // value,
  // onChange,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,

  invalid,
  invalidText,
  helpText,
  // size = 'md',
  ...props
}) => {
  // void size; // Keep for API consistency but not used in rendering
  const selectClasses = ['form-select', invalid && 'error'].filter(Boolean).join(' ');
  const helperClasses = ['form-helper-text', invalid && 'error'].filter(Boolean).join(' ');

  const message = invalid ? invalidText : helpText;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <select
        id={id}
        required={required}
        disabled={disabled}
        className={selectClasses}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {message && <span id={`${id}-helper-text`} className={helperClasses}>{message}</span>}
    </div>
  );
};