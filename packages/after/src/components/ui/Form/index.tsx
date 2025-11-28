import { forwardRef, useId, type FormHTMLAttributes } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/TextArea';
import { cn } from '@/lib/utils';
import type {
  FormDescriptionProps,
  FormFieldProps,
  FormInputProps,
  FormLabelProps,
  FormMessageProps,
  FormSelectProps,
  FormTextareaProps,
} from './types';
import { FormFieldProvider, useFormFieldContext } from './contexts';
import { sizeStyles } from './styles';

const FormField = forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const {
    name,
    label,
    error,
    helpText,
    required = false,
    size = 'md',
    children,
  } = props;

  const id = useId();

  return (
    <FormFieldProvider
      id={id}
      name={name}
      size={size}
      error={error}
      required={required}
    >
      <div ref={ref} className="space-y-2">
        {label && (
          <FormLabel>
            {label}
            {required && (
              <span className="text-[var(--color-danger-500)]">*</span>
            )}
          </FormLabel>
        )}
        {children}
        {error && <FormMessage>{error}</FormMessage>}
        {helpText && !error && <FormDescription>{helpText}</FormDescription>}
      </div>
    </FormFieldProvider>
  );
});

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { className, ...restProps } = props;
  const { id, size, error } = useFormFieldContext('Form.Label');

  return (
    <label
      ref={ref}
      htmlFor={id}
      className={cn(
        'block mb-[var(--spacing-sm)] text-[var(--color-gray-900)] font-[var(--font-weight-bold)]',
        sizeStyles[size || 'md'],
        error && 'text-[var(--color-danger-500)]',
        className
      )}
      {...restProps}
    />
  );
});

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { id, name, size, error, required } = useFormFieldContext('Form.Input');

  return (
    <Input
      ref={ref}
      id={id}
      name={name}
      size={size}
      error={!!error}
      required={required}
      {...props}
    />
  );
});

const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (props, ref) => {
    const { options, placeholder, ...restProps } = props;
    const { id, name, size, error } = useFormFieldContext('Form.Select');

    return (
      <Select size={size} {...restProps}>
        <Select.Trigger ref={ref} id={id} name={name} error={!!error}>
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Select.Content>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    );
  }
);

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => {
    const { id, name, size, error, required } =
      useFormFieldContext('Form.Textarea');

    return (
      <Textarea
        ref={ref}
        id={id}
        name={name}
        size={size}
        error={!!error}
        required={required}
        {...props}
      />
    );
  }
);

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <p
        ref={ref}
        className={cn(
          'block mt-[var(--spacing-xs)] text-[length:var(--font-size-sm)] text-[var(--color-gray-600)]',
          className
        )}
        {...restProps}
      />
    );
  }
);

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { size } = useFormFieldContext('Form.Message');

    return (
      <p
        ref={ref}
        className={cn(
          'block text-[length:var(--font-size-sm)]',
          sizeStyles[size || 'md'],
          'text-[var(--color-danger-500)]',
          className
        )}
        {...restProps}
      />
    );
  }
);

const FormRoot = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  return <form ref={ref} {...props} />;
});

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Label: FormLabel,
  Input: FormInput,
  Select: FormSelect,
  Textarea: FormTextarea,
  Description: FormDescription,
  Message: FormMessage,
});
