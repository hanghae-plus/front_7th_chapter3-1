import React from "react";
import { cva } from "class-variance-authority";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

// 🚨 Bad Practice: UI 컴포넌트가 도메인 규칙을 알고 있음
interface FormInputProps {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "url";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  width?: "small" | "medium" | "large" | "full";
  messageData?: { type: "error" | "success"; message: string };
}

const messageVariants = cva("", {
  variants: {
    type: {
      error: "text-input-error",
      success: "text-input-success",
    },
  },
});

const widthVariants = cva("grid items-center gap-3", {
  variants: {
    width: {
      small: "input-width-small",
      medium: "input-width-medium",
      large: "input-width-large",
      full: "input-width-full",
    },
  },
  defaultVariants: {
    width: "full",
  },
});

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  width = "full",
  messageData,
}) => {
  return (
    <div className={cn(widthVariants({ width }))}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span style={{ color: "#d32f2f" }}>*</span>}
        </Label>
      )}

      <Input
        id={name}
        name={name}
        type={type}
        {...(value !== undefined && { value })}
        {...(onChange && { onChange })}
        {...(onBlur && { onBlur })}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />

      {messageData && <span className={cn(messageVariants({ type: messageData.type }))}>{messageData.message}</span>}
    </div>
  );
};
