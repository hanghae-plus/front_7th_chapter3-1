import { createContext } from '@radix-ui/react-context';

interface FormFieldContextValue {
  id: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  required?: boolean;
}

export const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContextValue>('FormField', {
    id: '',
    name: '',
    size: 'md',
    error: undefined,
    required: false,
  });
