import type { ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './styles';

/**
 * Button 컴포넌트의 Props
 * 순수한 UI 관심사만 포함
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    Omit<VariantProps<typeof buttonVariants>, 'variant' | 'size' | 'outline'> {
  /**
   * Radix UI Slot을 사용하여 자식 요소를 버튼으로 렌더링
   * @default false
   */
  asChild?: boolean;

  /**
   * 버튼의 색상 variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';

  /**
   * 버튼의 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Outline 스타일 적용 여부
   * @default false
   */
  outline?: boolean;

  /**
   * 전체 너비 사용 여부
   * @default false
   */
  fullWidth?: boolean;
}
