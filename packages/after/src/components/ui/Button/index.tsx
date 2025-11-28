import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ButtonProps } from './types';
import { buttonVariants } from './styles';

/**
 *
 * @see /src/hooks/useEntityAction.ts - 비즈니스 로직 Hook
 *
 * 사용 예시:
 * ```tsx
 * // Hook에서 비즈니스 로직 처리
 * const { variant, isDisabled, label, disabledReason } = useEntityAction({
 *   entityType: 'user',
 *   action: 'delete',
 *   entity: user
 * });
 *
 * // UI 컴포넌트는 순수하게 UI만 담당
 * <Button
 *   variant={variant}
 *   disabled={isDisabled}
 *   title={disabledReason}
 *   onClick={handleDelete}
 * >
 *   {label}
 * </Button>
 * ```
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'primary',
      size = 'md',
      outline = false,
      fullWidth,
      asChild = false,
      children,
      disabled = false,
      ...restProps
    } = props;

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            outline,
            fullWidth,
            className,
          })
        )}
        ref={ref}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </Comp>
    );
  }
);
