import { cn } from '@/lib/utils';

// Checkbox Component - Completely different approach again
interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const FormCheckbox = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  hint,
}: FormCheckboxProps) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={cn(
          'flex items-start mb-3',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <div className="relative mr-2 mt-0.5">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => {}} // Handled by onClick
            disabled={disabled}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <div
            className={cn(
              'h-4 w-4 border-2 rounded-sm flex items-center justify-center transition-all duration-150 cursor-pointer bg-white',
              checked
                ? 'bg-[#1976d2] border-[#1976d2]'
                : 'border-[#d1d5db]',
              disabled && 'cursor-not-allowed'
            )}
          >
            <span
              className={cn(
                'text-white text-[10px] font-bold',
                checked ? 'block' : 'hidden'
              )}
            >
              ✓
            </span>
          </div>
        </div>
        <label
          className={cn(
            'text-sm cursor-pointer leading-[1.4] select-none',
            error ? 'text-[#ef4444]' : 'text-[#374151]',
            disabled && 'cursor-not-allowed'
          )}
          style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif" }}
        >
          {label}
        </label>
      </div>

      {error && (
        <span
          className="text-[#ef4444] text-xs mt-0.5 ml-6 block"
          style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif" }}
        >
          {error}
        </span>
      )}
      {hint && !error && (
        <span
          className="text-[#6b7280] text-xs mt-0.5 ml-6 block"
          style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif" }}
        >
          {hint}
        </span>
      )}
    </div>
  );
};