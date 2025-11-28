import React from 'react';
import { cn } from '@/lib/utils';

type EntityModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClass = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
};

export const EntityModal: React.FC<EntityModalProps> = ({
  open,
  title,
  onClose,
  children,
  footer,
  size = 'lg',
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          'w-full rounded-md border bg-white shadow-xl',
          'flex flex-col',
          sizeClass[size],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title &&
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <button
              type="button"
              className="text-muted-foreground transition hover:text-foreground"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        }

        <div className="px-6 py-4">{children}</div>

        {footer && <div className="border-t px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
};
