import React, { createContext, useContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

interface AlertContextValue {
  variant: AlertVariant;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('Alert 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

const alertVariants = cva(
  'mb-md px-base py-sm rounded-sm border border-solid gap-sm flex items-start font-sans',
  {
    variants: {
      variant: {
        default: 'bg-default border-default-border text-default-foreground',
        info: 'bg-info-weak border-info-border text-info-weak-foreground',
        success: 'bg-success-weak border-success-border text-success-weak-foreground',
        warning: 'bg-warning-weak border-warning-border text-warning-weak-foreground' as const,
        error: 'bg-danger-weak border-danger-border text-danger-weak-foreground' as const,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: AlertVariant;
}

const Alert = ({ children, variant = 'default', className, ...props }: AlertProps) => {
  return (
    <AlertContext.Provider value={{ variant }}>
      <div className={cn(alertVariants({ variant }), className)} {...props}>
        {children}
      </div>
    </AlertContext.Provider>
  );
};

const Icon = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { variant } = useAlert();
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
  return (
    <div className={cn('shrink-0 text-2xl', className)} {...props}>
      {children || getIcon()}
    </div>
  );
};

const Content = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex-1', className)} {...props}>
      {children}
    </div>
  );
};

const Title = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('label-md mb-1', className)} {...props}>
      {children}
    </div>
  );
};

const Body = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('body-base', className)} {...props}>
      {children}
    </div>
  );
};

const Close = ({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'ml-auto shrink-0 cursor-pointer border-none bg-transparent p-0 px-1 text-2xl',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Alert.Icon = Icon;
Alert.Content = Content;
Alert.Title = Title;
Alert.Body = Body;
Alert.Close = Close;

export default Alert;
