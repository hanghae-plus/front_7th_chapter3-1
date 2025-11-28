import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  SelectContentProps,
  SelectItemProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectTriggerProps,
  SelectRootProps,
} from './types';
import { SelectProvider, useSelectContext } from './contexts';
import {
  selectTriggerVariants,
  selectContentVariants,
  selectViewportVariants,
  selectItemVariants,
} from './styles';

const SelectRoot = (props: SelectRootProps) => {
  const { size = 'md', ...restProps } = props;

  return (
    <SelectProvider size={size}>
      <SelectPrimitive.Root {...restProps} />
    </SelectProvider>
  );
};

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (props, ref) => {
    const { className, children, error, ...restProps } = props;
    const { size } = useSelectContext('Select.Trigger');

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(selectTriggerVariants({ size, error, className }))}
        {...restProps}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
const SelectScrollUpButton = forwardRef<
  HTMLDivElement,
  SelectScrollUpButtonProps
>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className
      )}
      {...restProps}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
});

const SelectScrollDownButton = forwardRef<
  HTMLDivElement,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (props, ref) => {
    const {
      className,
      children,
      position = 'popper',
      container,
      ...restProps
    } = props;
    const { size } = useSelectContext('Select.Content');

    return (
      <SelectPrimitive.Portal container={container}>
        <SelectPrimitive.Content
          ref={ref}
          position={position}
          className={cn(
            selectContentVariants({ size }),
            position === 'popper' &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className
          )}
          {...restProps}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={selectViewportVariants({ position })}
          >
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  const { size } = useSelectContext('SelectItem');
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(selectItemVariants({ size, className }))}
      {...restProps}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
  Group: SelectPrimitive.Group,
  Value: SelectPrimitive.Value,
});
