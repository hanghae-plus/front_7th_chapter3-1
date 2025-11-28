import React from 'react';

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
      case 'info': return 'ℹ️';
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✕';
      default: return '•';
    }
  };

  const variantClasses: Record<string, string> = {
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    success: 'bg-green-50 text-green-600 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    default: 'bg-gray-50 text-gray-600 border border-gray-200',
  };

  return (
    <div className={`flex items-start gap-4 p-4 rounded-md shadow-sm font-sans text-base relative ${variantClasses[variant]}`}>
      {showIcon && (
        <div className="text-lg mr-2">{getIcon()}</div>
      )}
      <div className="flex-1">
        {title && (
          <div className="font-bold mb-1">{title}</div>
        )}
        <div>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="bg-none border-none text-gray-500 text-lg cursor-pointer absolute top-4 right-4"
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};
