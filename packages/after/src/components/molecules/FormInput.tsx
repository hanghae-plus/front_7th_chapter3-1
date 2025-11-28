import { cn } from '@/lib/utils';

// ✅ Good Practice: UI 컴포넌트는 순수하게 시각적 관심사만 다룸
interface FormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: 'small' | 'medium' | 'large' | 'full';
}

const widthClasses = {
  small: 'w-[200px]',
  medium: 'w-[300px]',
  large: 'w-[400px]',
  full: 'w-full',
};

export const FormInput = ({
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
  width = 'full',
}: FormInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1.5 text-[#333] text-[13px] font-bold font-sans">
          {label}
          {required && <span className="text-[#d32f2f]">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
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
          'disabled:bg-[#f5f5f5] disabled:cursor-not-allowed',
          // Width
          widthClasses[width]
        )}
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
