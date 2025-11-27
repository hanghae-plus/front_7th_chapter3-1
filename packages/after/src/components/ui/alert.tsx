import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const iconMap = {
  info: "ℹ️",
  success: "✓",
  warning: "⚠️",
  error: "✕",
  default: "•",
} as const

const alertVariants = cva(
  "relative flex items-start gap-[var(--space-alert-title-margin-bottom)] rounded-(--radius-3) border px-(--space-alert-padding-inline) py-(--space-alert-padding-block) font-[var(--font-family-base)]",
  {
    variants: {
      variant: {
        default:
          "bg-(--color-bg-alert-default) border-(--color-border-alert-default) text-(--color-text-alert-default)",
        info:
          "bg-(--color-alert-info-bg) border-(--color-alert-info-border) text-(--color-alert-info-text)",
        success:
          "bg-(--color-alert-success-bg) border-(--color-alert-success-border) text-(--color-alert-success-text)",
        warning:
          "bg-(--color-alert-warning-bg) border-(--color-alert-warning-border) text-(--color-alert-warning-text)",
        error:
          "bg-(--color-alert-error-bg) border-(--color-alert-error-border) text-(--color-alert-error-text)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  onClose?: () => void
  showIcon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant = "default", title, onClose, showIcon = true, children, ...props },
    ref
  ) => {
    const icon = variant ? iconMap[variant] : iconMap.default

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        role="alert"
        {...props}
      >
        {showIcon && (
          <span className="shrink-0 text-(length:--font-size-icon-lg) leading-none select-none">
            {icon}
          </span>
        )}

        <div className="flex-1">
          {title && (
            <div className="font-bold mb-(--space-alert-title-margin-bottom) text-(length:--font-size-alert-title)">
              {title}
            </div>
          )}
          <div className="text-(length:--font-size-alert-body) leading-(--line-height-normal)">
            {children}
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto shrink-0 bg-transparent border-0 cursor-pointer text-(length:--font-size-icon-lg) px-(--space-alert-close-padding) text-(--color-text-muted) hover:opacity-80"
          >
            ×
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }

