import { X } from 'lucide-react';
import React from 'react';
import { IconButton } from '../ui/IconButton';

// Alert - Different styling approach with inconsistent variants
interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'error':
        return '✕';
      default:
        return '•';
    }
  };

  const alertClasses = ['alert', `alert-${variant}`].join(' ');

  return (
    <div className={alertClasses}>
      {showIcon && <div className="alert-icon">{getIcon()}</div>}
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-body">{children}</div>
      </div>
      {onClose && (
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="닫기"
          onClick={onClose}
          icon={<X className="h-5 w-5" />}
        />
      )}
    </div>
  );
};
