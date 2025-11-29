import * as React from "react";
import {
  Alert as ShadcnAlert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";

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
      case 'info': return 'ℹ️';
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✕';
      default: return '•';
    }
  };

  return (
    <ShadcnAlert variant={variant} className="relative">
      <div className="flex items-start gap-3">
        {showIcon && <div className="text-lg">{getIcon()}</div>}
        <div className="flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-2xl leading-none hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </ShadcnAlert>
  );
};

