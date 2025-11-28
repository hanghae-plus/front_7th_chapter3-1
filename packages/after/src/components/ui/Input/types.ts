import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import type { inputVariants } from './styles';

/**
 * Input 컴포넌트의 Props
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Input의 타입
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'url';

  /**
   * Input의 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 에러 상태 표시
   * @default false
   */
  error?: boolean;
}
