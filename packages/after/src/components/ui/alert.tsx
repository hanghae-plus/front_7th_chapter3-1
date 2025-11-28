import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "flex w-full rounded border px-4 py-3 text-sm gap-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        info: "bg-[var(--bg-primary-subtle)] text-primary border-[var(--border-primary)]",
        success: "bg-[var(--bg-success-subtle)] text-success border-[var(--border-success)]",
        warning: "bg-[var(--bg-warning-subtle)] text-warning border-[var(--border-warning)]",
        error: "bg-[var(--bg-destructive-subtle)] text-destructive border-[var(--border-destructive)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {
  onClose?: () => void;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, onClose, showIcon = false, children, ...props }, ref) => {
    const getIcon = () => {
      if (!showIcon) return null;
      switch (variant) {
        case 'info': return 'ℹ️';
        case 'success': return '✓';
        case 'warning': return '⚠️';
        case 'error': return '✕';
        default: return '•';
      }
    };

    const icon = getIcon();

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

