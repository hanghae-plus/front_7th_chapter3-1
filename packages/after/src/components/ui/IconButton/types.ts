import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { iconButtonVariants } from './styles';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  /**
   * 아이콘 요소 (lucide-react 등)
   */
  icon: ReactNode;

  /**
   * 접근성을 위한 필수 레이블
   * 아이콘만 있는 버튼의 경우 스크린 리더를 위해 필수
   */
  'aria-label': string;

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
}
