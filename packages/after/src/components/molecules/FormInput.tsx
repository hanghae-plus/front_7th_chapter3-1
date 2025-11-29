import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  name: string;
  label?: string;
  description?: string; // helpText를 description으로 통일
  error?: string;
  onChange?: (value: string) => void;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, description, error, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={name} className={cn(error && "text-destructive")}>
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        <Input
          id={name}
          name={name}
          ref={ref}
          onChange={handleChange}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${name}-error` : description ? `${name}-description` : undefined
          }
          {...props}
        />

        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}
        
        {description && !error && (
          <p id={`${name}-description`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
