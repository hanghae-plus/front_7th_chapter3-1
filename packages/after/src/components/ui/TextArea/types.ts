import type { VariantProps } from 'class-variance-authority';
import { textareaVariants } from './styles';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}
