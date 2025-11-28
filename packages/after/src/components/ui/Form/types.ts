import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import type { InputProps } from '../Input/types';
import type { SelectProps } from '../Select/types';
import type { TextareaProps } from '../TextArea/types';

export interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export type FormInputProps = Omit<InputProps, 'size' | 'error'>;

export interface FormSelectProps extends Omit<SelectProps, 'size' | 'error'> {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export type FormTextareaProps = Omit<TextareaProps, 'error'>;

export type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;
