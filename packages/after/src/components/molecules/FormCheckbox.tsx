import React from 'react';

interface FormCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: string;
  helpText?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  invalid,
  invalidText,
  helpText,
}) => {
  const wrapperClasses = ['checkbox-wrapper', disabled && 'disabled'].filter(Boolean).join(' ');
  const customClasses = ['checkbox-custom', checked && 'checked', disabled && 'disabled']
    .filter(Boolean)
    .join(' ');
  const checkmarkClasses = ['checkbox-checkmark', checked && 'visible'].filter(Boolean).join(' ');
  const labelClasses = ['checkbox-label', invalid && 'error', disabled && 'disabled']
    .filter(Boolean)
    .join(' ');
  const helperClasses = ['form-helper-text', invalid && 'error'].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const message = invalid ? invalidText : helpText;

  return (
    <div className="form-group">
      <div className={wrapperClasses} onClick={handleClick}>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id={id}
            name={id}
            checked={checked}
            onChange={() => {}} // Handled by onClick
            disabled={disabled}
            className="checkbox-input"
          />
          <div className={customClasses}>
            <span className={checkmarkClasses}>✓</span>
          </div>
        </div>
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      </div>

      {message && (
        <span id={`${id}-helper-text`} className={helperClasses}>
          {message}
        </span>
      )}
    </div>
  );
};
