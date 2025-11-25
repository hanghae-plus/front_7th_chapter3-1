import React from 'react';

/* TODO
- pagination white theme 토큰 추가하기 or 커스텀 허용
- 다중 type 허용?
*/

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  // type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  // type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
}) => {

  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
  ].filter(Boolean).join(' ');

  return (
    <button
      // type={type}
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};
