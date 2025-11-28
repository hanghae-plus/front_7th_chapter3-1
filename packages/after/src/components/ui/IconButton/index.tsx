import { forwardRef } from 'react';
import { Button } from '../Button';
import { cn } from '@/lib/utils';
import { iconButtonVariants } from './styles';
import type { IconButtonProps } from './types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'primary',
      size = 'md',
      outline = false,
      icon,
      'aria-label': ariaLabel,
      ...restProps
    } = props;

    if (!ariaLabel) {
      console.warn(
        'IconButton: aria-label is required for accessibility. Please provide a descriptive label.'
      );
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        outline={outline}
        className={cn(iconButtonVariants({ size }), className)}
        aria-label={ariaLabel}
        {...restProps}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';
