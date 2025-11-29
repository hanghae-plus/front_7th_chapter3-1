import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions,
  type alertVariants,
} from '@bento/ui/alert';
import type { VariantProps } from 'class-variance-authority';

interface DismissibleAlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

function DismissibleAlert({ title, children, variant, size, onClose }: DismissibleAlertProps) {
  return (
    <Alert variant={variant} size={size} className="flex items-start gap-3">
      <div className="flex-1 space-y-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </div>
      <AlertActions>
        <button
          type="button"
          onClick={onClose}
          className="opacity-70 hover:opacity-100 transition-opacity"
          aria-label="닫기"
        >
          ×
        </button>
      </AlertActions>
    </Alert>
  );
}

export { DismissibleAlert };
export type { DismissibleAlertProps };
