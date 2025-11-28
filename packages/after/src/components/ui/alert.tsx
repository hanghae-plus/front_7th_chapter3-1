import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-[var(--spacing-card-body)] [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-alert-default-bg)] border-[var(--color-alert-default-border)] text-[var(--color-alert-default-text)]",
        destructive: "bg-[var(--color-alert-error-bg)] border-[var(--color-alert-error-border)] text-[var(--color-alert-error-text)] [&>svg]:text-[var(--color-alert-error-text)]",
        info: "bg-[var(--color-alert-info-bg)] border-[var(--color-alert-info-border)] text-[var(--color-alert-info-text)] [&>svg]:text-[var(--color-alert-info-text)]",
        success: "bg-[var(--color-alert-success-bg)] border-[var(--color-alert-success-border)] text-[var(--color-alert-success-text)] [&>svg]:text-[var(--color-alert-success-text)]",
        warning: "bg-[var(--color-alert-warning-bg)] border-[var(--color-alert-warning-border)] text-[var(--color-alert-warning-text)] [&>svg]:text-[var(--color-alert-warning-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const alertTitleVariants = cva("font-medium leading-none tracking-tight", {
  variants: {
    size: {
      default: "mb-1 text-[var(--font-size-alert-title)]",
      sm: "mb-0.5 text-[var(--font-size-md)]",
      lg: "mb-1.5 text-[var(--font-size-lg)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof alertTitleVariants> {}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, size, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(alertTitleVariants({ size }), className)}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const alertDescriptionVariants = cva("[&_p]:leading-[var(--line-height-relaxed)]", {
  variants: {
    size: {
      default: "text-[var(--font-size-alert-body)]",
      sm: "text-[var(--font-size-sm)]",
      lg: "text-[var(--font-size-md)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof alertDescriptionVariants> {}

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertDescriptionVariants({ size }), className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants, alertTitleVariants, alertDescriptionVariants }
