import React, { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const modalOverlayVariants = cva(
  "fixed top-0 left-0 right-0 bottom-0 bg-modal-overlay flex items-center justify-center z-[1000] p-4"
);

const modalContentVariants = cva(
  "bg-modal-bg rounded-md shadow-xl max-h-[90vh] flex flex-col",
  {
    variants: {
      size: {
        small: "w-full max-w-md",
        medium: "w-full max-w-2xl",
        large: "w-full max-w-4xl",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const modalHeaderVariants = cva(
  "p-4 px-6 border-b border-modal-header-border flex justify-between items-center"
);

const modalTitleVariants = cva(
  "m-0 text-xl font-medium text-form-text"
);

const modalCloseVariants = cva(
  "bg-transparent border-none text-[28px] leading-none text-form-placeholder cursor-pointer p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 hover:bg-form-bg-disabled"
);

const modalBodyVariants = cva(
  "p-6 overflow-y-auto flex-1"
);

const modalFooterVariants = cva(
  "p-4 px-6 border-t border-modal-footer-border flex gap-2 justify-end"
);

export interface ModalProps extends VariantProps<typeof modalContentVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showFooter = false,
  footerContent,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={modalOverlayVariants()} onClick={onClose}>
      <div className={modalContentVariants({ size, className })} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className={modalHeaderVariants()}>
            <h3 className={modalTitleVariants()}>{title}</h3>
            <button className={modalCloseVariants()} onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div className={modalBodyVariants()}>{children}</div>
        {showFooter && footerContent && <div className={modalFooterVariants()}>{footerContent}</div>}
      </div>
    </div>
  );
};
