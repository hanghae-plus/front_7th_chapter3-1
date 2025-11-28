import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeStyles = {
  small: 'max-w-[400px]',
  medium: 'max-w-[600px]',
  large: 'max-w-[900px]',
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
  footer,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-white rounded-md shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col w-full',
          sizeStyles[size],
          'font-["Roboto","Helvetica","Arial",sans-serif]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="py-4 px-6 border-b border-[rgba(0,0,0,0.12)] flex justify-between items-center">
            <h3 className="m-0 text-xl font-medium text-[rgba(0,0,0,0.87)]">
              {title}
            </h3>
            <button
              className="bg-transparent border-none text-[28px] leading-none text-[rgba(0,0,0,0.54)] cursor-pointer p-0 w-8 h-8 rounded-full flex items-center justify-center transition-[background-color] duration-150 hover:bg-[rgba(0,0,0,0.04)]"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="py-6 px-6 overflow-y-auto flex-1">{children}</div>
        {(footer || (showFooter && footerContent)) && (
          <div className="py-4 px-6 border-t border-[rgba(0,0,0,0.12)] flex gap-2 justify-end">
            {footer || footerContent}
          </div>
        )}
      </div>
    </div>
  );
};
