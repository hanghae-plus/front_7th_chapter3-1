import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
}) => {
  const sizeClasses = {
    small: 'sm:max-w-md',
    medium: 'sm:max-w-lg',
    large: 'sm:max-w-2xl',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={sizeClasses[size]}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div>{children}</div>
        {showFooter && footerContent && (
          <DialogFooter>
            {footerContent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

