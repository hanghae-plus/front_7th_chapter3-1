import { Label } from "@radix-ui/react-label";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface SelectFieldRowProps {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export const SelectFieldRow = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required,
  placeholder,
}: SelectFieldRowProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="space-y-1.5 text-left">
      <Label
        htmlFor={id}
        className="flex items-center gap-1 text-sm font-semibold text-app-foreground"
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <NativeSelect
        id={id}
        name={name ?? id}
        value={value}
        onChange={handleChange}
        required={required}
        aria-invalid={required && !value}
        className="w-full"
      >
        {placeholder && (
          <NativeSelectOption value="" disabled hidden>
            {placeholder}
          </NativeSelectOption>
        )}
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};
