import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { InputProps } from './types';
import { inputVariants } from './styles';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    type = 'text',
    size = 'md',
    error,
    value,
    onChange,
    ...restProps
  } = props;

  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      className={cn(inputVariants({ size, error, className }))}
      {...restProps}
    />
  );
});
