import * as SelectPrimitive from '@radix-ui/react-select';

export interface SelectRootProps extends SelectPrimitive.SelectProps {
  /**
   * Select의 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Select Trigger 컴포넌트의 Props
 */
export interface SelectTriggerProps extends SelectPrimitive.SelectTriggerProps {
  /**
   * 에러 상태 표시
   * @default false
   */
  error?: boolean;
}

export type SelectScrollUpButtonProps =
  SelectPrimitive.SelectScrollUpButtonProps;

export type SelectScrollDownButtonProps =
  SelectPrimitive.SelectScrollDownButtonProps;

export type SelectProps = SelectPrimitive.SelectProps;

export interface SelectContentProps extends SelectPrimitive.SelectContentProps {
  /**
   * 드롭다운이 렌더링될 컨테이너
   */
  container?: HTMLElement;
}

export type SelectItemProps = SelectPrimitive.SelectItemProps;
