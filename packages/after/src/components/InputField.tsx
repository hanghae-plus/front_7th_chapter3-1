import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.ComponentProps<typeof Input> {
  label?: string;
  description?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  type?: string;
}

// Browser-compatible UUID generator
const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  description,
  helperText,
  error,
  required,
  className,
  id,
  name,
  type = "text",
  ...props
}) => {
  const generatedId = generateId();
  const inputId = id ?? name ?? generatedId;
  const message = error ?? helperText;

  return (
    <div className="grid w-full gap-1.5 text-left">
      {label && (
        <Label
          htmlFor={inputId}
          className="flex items-center gap-1 text-sm font-semibold text-app-foreground"
        >
          {label}
          {required && <span className="text-danger">*</span>}
        </Label>
      )}
      {description && (
        <p className="text-xs text-app-text-tertiary">{description}</p>
      )}
      <Input
        id={inputId}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        className={cn(
          error &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
          className
        )}
        {...props}
      />
      {message && (
        <p
          className={cn(
            "text-xs",
            error ? "text-danger" : "text-app-text-tertiary"
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};
