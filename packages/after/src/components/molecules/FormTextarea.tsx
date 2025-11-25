import React from 'react';

// Textarea Component - Yet another inconsistent API
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  placeholder,
  required = false,
  disabled = false,
  invalid,
  invalidText,
  helpText,
  rows = 4,
  ...props
}) => {
  const textareaClasses = ['form-textarea', invalid && 'error'].filter(Boolean).join(' ');
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

      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
        {...props}
      />

      {message && <span id={`${id}-helper-text`} className={helperClasses}>{message}</span>}
    </div>
  );
};