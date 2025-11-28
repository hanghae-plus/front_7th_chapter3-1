import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type dialogContentVariants,
} from '@bento/ui/dialog';
import { Button } from '@bento/ui/button';
import type { VariantProps } from 'class-variance-authority';
import { Separator } from '@bento/ui/separator';

interface FormModalProps extends VariantProps<typeof dialogContentVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;

  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;

  footer?: React.ReactNode;
}

function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  size,

  onSubmit,
  onCancel,
  submitText = '확인',
  cancelText = '취소',
  isSubmitting = false,
  footer,
}: FormModalProps) {
  const showDefaultFooter = !footer && (onSubmit || onCancel);
  const showCustomFooter = !!footer;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Separator />
        {children}
        <Separator />

        {showCustomFooter && <DialogFooter>{footer}</DialogFooter>}
        {showDefaultFooter && (
          <DialogFooter>
            {onCancel && (
              <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
                {cancelText}
              </Button>
            )}
            {onSubmit && (
              <Button variant="primary" onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? '처리중...' : submitText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { FormModal };
