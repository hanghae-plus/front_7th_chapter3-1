import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
}) => {
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

  const sizeClasses: Record<string, string> = {
    small: 'w-80 min-h-[180px]',
    medium: 'w-120 min-h-[240px]',
    large: 'w-160 min-h-[320px]',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl font-sans text-base p-8 relative ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold m-0">{title}</h3>
            <button
              onClick={onClose}
              className="bg-none border-none text-gray-500 text-lg cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div className={showFooter && footerContent ? "mb-6" : ""}>
          {children}
        </div>
        {showFooter && footerContent && (
          <div className="border-t pt-6">{footerContent}</div>
        )}
      </div>
    </div>
  );
};
