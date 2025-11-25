import React from 'react';

// 🚨 Bad Practice: UI 컴포넌트가 도메인 규칙을 알고 있음
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  required?: boolean;
  width?: 'small' | 'medium' | 'large' | 'full';
  disabled?: boolean;
  placeholder?: string;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  width = 'full',
  invalid,
  invalidText,
  helpText,
  ...props
}) => {

  const inputClasses = ['form-input', invalid && 'error', `input-width-${width}`].filter(Boolean).join(' ');
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

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />

      {message && <span id={`${id}-helper-text`} className={helperClasses}>{message}</span>}
    </div>
  );
};
