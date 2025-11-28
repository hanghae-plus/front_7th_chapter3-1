import React from "react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";
import { Label } from "../ui/Label";

interface FormSelectProps {
  selectOptions: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  selectOptions,
  value,
  onChange,
  onBlur,
  name,
  disabled,
  label,
  required = false,
}) => {
  return (
    <div className="grid items-center gap-3">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span style={{ color: "#d32f2f" }}>*</span>}
        </Label>
      )}
      <NativeSelect name={name} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
        {selectOptions.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};

export default FormSelect;
