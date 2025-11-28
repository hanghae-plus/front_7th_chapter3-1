import { cn } from '@/lib/utils';

// Select Component - Inconsistent with Input component
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
  size?: 'small' | 'medium' | 'large';
}

export const FormSelect = ({
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
  size = 'medium',
}: FormSelectProps) => {
  void size; // Keep for API consistency but not used in rendering

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1.5 text-[#333] text-[13px] font-bold font-sans">
          {label}
          {required && <span className="text-[#d32f2f]">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={cn(
          // Base styles
          'w-full py-2 px-2.5 text-[14px] font-sans text-black border border-[#ccc] rounded-[3px] bg-white box-border',
          // Focus styles
          'focus:border-[#1976d2] focus:outline-none',
          // Error styles
          error && 'border-[#d32f2f]',
          // Disabled styles
          'disabled:bg-[#f5f5f5] disabled:cursor-not-allowed'
        )}
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

      {error && (
        <span className="text-[#d32f2f] text-[12px] font-sans mt-1 block">
          {error}
        </span>
      )}
      {helpText && !error && (
        <span className="text-[#666] text-[12px] font-sans mt-1 block">
          {helpText}
        </span>
      )}
    </div>
  );
};