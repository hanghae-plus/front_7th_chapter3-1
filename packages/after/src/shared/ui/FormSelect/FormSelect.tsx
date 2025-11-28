import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useFormField } from "../Form/Form";

interface Option {
  value: string;
  label: string;
}

const formSelectVariants = cva(
  "w-full border rounded-sm bg-white box-border transition-colors duration-200 focus:outline-none text-form-text",
  {
    variants: {
      error: {
        true: "border-form-border-error",
        false: "border-form-border focus:border-form-border-focus",
      },
      size: {
        sm: "px-2 py-2 text-sm",
        md: "px-2 py-2 text-base",
        lg: "px-4 py-4 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

const formGroupVariants = cva("mb-4");

const formLabelVariants = cva("block mb-2 text-sm font-bold text-form-text");

const formHelperTextVariants = cva("text-xs mt-1 block", {
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

export interface FormSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "size">,
    Omit<VariantProps<typeof formSelectVariants>, "error"> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: string;
  helpText?: string;
  noWrapper?: boolean; // FormControl 내부에서 사용할 때 true
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      className,
      name,
      value,
      onChange,
      options,
      label,
      placeholder = "Select an option...",
      required = false,
      disabled = false,
      error,
      helpText,
      size = "md",
      noWrapper = false,
      ...props
    },
    ref
  ) => {
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
    const hasError = !!error || !!fieldError || props["aria-invalid"] === true || props["aria-invalid"] === "true";

    const selectElement = (
      <select
        ref={ref}
        {...props}
        id={props.id || name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={formSelectVariants({ error: hasError, size, className })}
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
    );

    // FormControl 내부에서 사용할 때는 순수 select만 반환
    if (noWrapper) {
      return selectElement;
    }

    // 독립적으로 사용할 때는 label과 error를 포함한 전체 구조 반환
    return (
      <div className={formGroupVariants()}>
        {label && (
          <label className={formLabelVariants()}>
            {label}
            {required && <span className="text-red-700">*</span>}
          </label>
        )}

        {selectElement}

        {error && <span className={formHelperTextVariants({ error: true })}>{error}</span>}
        {helpText && !error && <span className={formHelperTextVariants()}>{helpText}</span>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
