import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  [
    "relative w-full rounded-[var(--alert-radius)] border",
    "px-[var(--alert-padding)] py-[var(--alert-padding)]",
    "text-[var(--alert-font-size)]",
  ],
  {
    variants: {
      variant: {
        default: ["bg-background text-foreground", "border-border"],
        success: [
          "bg-[var(--alert-success-bg)]",
          "text-[var(--alert-success-fg)]",
          "border-[var(--alert-success-border)]",
          "[&>svg]:text-[var(--alert-success-fg)]",
        ],
        destructive: [
          "bg-[var(--alert-danger-bg)]",
          "text-[var(--alert-danger-fg)]",
          "border-[var(--alert-danger-border)]",
          "[&>svg]:text-[var(--alert-danger-fg)]",
        ],
        warning: [
          "bg-[var(--alert-warning-bg)]",
          "text-[var(--alert-warning-fg)]",
          "border-[var(--alert-warning-border)]",
          "[&>svg]:text-[var(--alert-warning-fg)]",
        ],
        info: [
          "bg-[var(--alert-info-bg)]",
          "text-[var(--alert-info-fg)]",
          "border-[var(--alert-info-border)]",
          "[&>svg]:text-[var(--alert-info-fg)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Variant별 아이콘 매핑
const variantIcons = {
  default: null,
  success: CheckCircle2,
  destructive: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    title?: string
    onClose?: () => void
    showIcon?: boolean  // 아이콘 표시 여부 (기본: true)
  }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = "default", 
    title, 
    onClose, 
    showIcon = true,
    children, 
    ...props 
  }, ref) => {
    const isConvenienceMode = title !== undefined || onClose !== undefined
    const Icon = variantIcons[variant || "default"]
    const hasIcon = showIcon && Icon
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {isConvenienceMode ? (
          <>
            {hasIcon && (
              <Icon className="absolute left-4 top-4 size-4" />
            )}
            
            <div className={cn(hasIcon && "pl-7")}>
              {title && <AlertTitle>{title}</AlertTitle>}
              <AlertDescription>{children}</AlertDescription>
            </div>
            
            {/* 닫기 버튼 */}
            {onClose && (
              <button
                onClick={onClose}
                className={cn(
                  "absolute right-2 top-2",
                  "rounded-sm p-1",
                  "opacity-70 hover:opacity-100",
                  "transition-opacity",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
                aria-label="닫기"
              >
                <X className="size-4" />
              </button>
            )}
          </>
        ) : (
          children
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
    className={cn(
      "mb-1",
      "font-[var(--alert-title-font-weight)]",
      "text-[var(--alert-title-font-size)]",
      "leading-none tracking-tight",
      className
    )}
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
