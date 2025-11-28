import React from "react";
import { cva } from "class-variance-authority";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
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

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
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

      <textarea
        id={name}
        name={name}
        {...(value !== undefined && { value })}
        {...(onChange && { onChange })}
        {...(onBlur && { onBlur })}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
      />

      {messageData && <span className={cn(messageVariants({ type: messageData.type }))}>{messageData.message}</span>}
    </div>
  );
};
