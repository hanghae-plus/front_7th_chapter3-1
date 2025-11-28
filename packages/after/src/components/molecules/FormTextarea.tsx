import { cn } from '@/lib/utils';

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
  rows?: number;
}

export const FormTextarea = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}: FormTextareaProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1.5 text-[#333] text-[13px] font-bold font-sans">
          {label}
          {required && <span className="text-[#d32f2f]">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(
          // Base styles
          'w-full min-h-[6em] py-4 px-3.5 text-base font-normal leading-[1.1876em] text-[rgba(0,0,0,0.87)] border border-[rgba(0,0,0,0.23)] rounded-md bg-white box-border resize-y outline-none',
          // Transition
          'transition-[border-color] duration-200 ease-[cubic-bezier(0.0,0,0.2,1)]',
          // Focus styles - border-width changes from 1px to 2px, padding adjusts
          'focus:border-[#1976d2] focus:border-2 focus:py-[15.5px] focus:px-[13px]',
          // Error styles
          error && 'border-[#d32f2f]',
          // Disabled styles
          'disabled:bg-[rgba(0,0,0,0.12)]'
        )}
        style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif" }}
      />

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