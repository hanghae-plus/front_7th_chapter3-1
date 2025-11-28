import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Alert as ShadcnAlert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

const variantStyles = {
  info: 'bg-[#e3f2fd] border-[#90caf9] text-[#0d47a1]',
  success: 'bg-[#e8f5e9] border-[#81c784] text-[#1b5e20]',
  warning: 'bg-[#fff3e0] border-[#ffb74d] text-[#e65100]',
  error: 'bg-[#ffebee] border-[#e57373] text-[#b71c1c]',
  default: 'bg-[#f5f5f5] border-[#bdbdbd] text-[#424242]',
};

export const Alert = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
}: AlertProps) => {
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
    <ShadcnAlert
      className={cn(
        'py-2.5 px-3 mb-4 rounded-[3px] border border-solid flex gap-2 items-start relative',
        variantStyles[variant],
        '[&>svg]:hidden' // shadcn/ui의 SVG 아이콘 숨김
      )}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {showIcon && <div className="text-xl flex-shrink-0">{getIcon()}</div>}
      <div className="flex-1">
        {title && (
          <AlertTitle className="font-bold mb-1 text-[15px]">
            {title}
          </AlertTitle>
        )}
        <AlertDescription className="text-sm leading-[1.5]">
          {children}
        </AlertDescription>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="bg-transparent border-none cursor-pointer text-xl py-0 px-1 ml-auto flex-shrink-0"
        >
          ×
        </button>
      )}
    </ShadcnAlert>
  );
};
