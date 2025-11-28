import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useFormField } from "../Form/Form";

const inputVariants = cva(
  "w-full px-2 py-2 text-base border rounded-sm bg-white box-border transition-colors duration-200 focus:outline-none",
  {
    variants: {
      error: {
        true: "border-form-border-error",
        false: "border-form-border focus:border-form-border-focus",
      },
      disabled: {
        true: "bg-form-bg-disabled cursor-not-allowed",
        false: "",
      },
      width: {
        small: "max-w-xs",
        medium: "max-w-md",
        large: "max-w-lg",
        full: "w-full",
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
      width: "full",
    },
  }
);

const helperTextVariants = cva("text-xs mt-1 block", {
  variants: {
    error: {
      true: "text-form-border-error",
      false: "text-form-placeholder",
    },
  },
  defaultVariants: {
    error: false,
  },
});

interface FormInputProps
  extends Omit<VariantProps<typeof inputVariants>, "error" | "disabled">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "width"> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "url";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  noWrapper?: boolean; // FormControl 내부에서 사용할 때 true
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      name,
      value,
      onChange,
      label,
      type = "text",
      placeholder,
      required = false,
      disabled = false,
      error,
      helpText,
      width = "full",
      noWrapper = false,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    // FormField context에서 에러 상태 가져오기
    let fieldError;
    try {
      const field = useFormField();
      fieldError = field.error;
    } catch {
      // FormField context 외부에서 사용될 경우 무시
      fieldError = undefined;
    }

    // aria-invalid 속성으로 에러 상태 감지 (FormControl에서 전달됨)
    const ariaInvalid = props["aria-invalid"];
    const hasError = !!error || !!fieldError || ariaInvalid === true || ariaInvalid === "true";

    const inputElement = (
      <input
        ref={ref}
        {...props}
        id={props.id || name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputVariants({ error: hasError, disabled: !!disabled, width })}
      />
    );

    // FormControl 내부에서 사용할 때는 순수 input만 반환
    if (noWrapper) {
      return inputElement;
    }

    // 독립적으로 사용할 때는 label과 error를 포함한 전체 구조 반환
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={name} className="block mb-2 text-sm font-bold text-form-text">
            {label}
            {required && <span className="text-red-700">*</span>}
          </label>
        )}

        {inputElement}

        {error && <span className={helperTextVariants({ error: true })}>{error}</span>}
        {helpText && !error && <span className={helperTextVariants({ error: false })}>{helpText}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
