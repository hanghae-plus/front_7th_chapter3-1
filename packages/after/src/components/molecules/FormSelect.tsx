import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options: Option[];
  className?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      name,
      label,
      description,
      error,
      value,
      onChange,
      placeholder,
      disabled,
      required,
      options,
      className,
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={name} className={cn(error && "text-destructive")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <select
          id={name}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${name}-error`
              : description
              ? `${name}-description`
              : undefined
          }
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}

        {description && !error && (
          <p
            id={`${name}-description`}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";