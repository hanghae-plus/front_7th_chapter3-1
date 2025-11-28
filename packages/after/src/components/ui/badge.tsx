import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-foreground)',
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: 'var(--color-background-subtle)',
    color: 'var(--color-foreground)',
    borderColor: 'var(--color-border)',
  },
  destructive: {
    backgroundColor: 'var(--color-danger-light)',
    color: 'var(--color-danger)',
    borderColor: 'var(--color-danger-border)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--color-foreground)',
    borderColor: 'var(--color-border)',
  },
  success: {
    backgroundColor: 'var(--color-success-light)',
    color: 'var(--color-success)',
    borderColor: 'var(--color-success-border)',
  },
  info: {
    backgroundColor: 'var(--color-info-light)',
    color: 'var(--color-info)',
    borderColor: 'var(--color-info-border)',
  },
};

function Badge({ className, variant = "default", style, ...props }: BadgeProps) {
  return (
    <div 
      className={cn("inline-flex items-center", className)}
      style={{
        padding: 'var(--space-1) var(--space-3)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        border: '1px solid',
        borderRadius: 'var(--radius-full)',
        transition: 'colors 150ms',
        ...variantStyles[variant],
        ...style,
      }}
      {...props} 
    />
  )
}

export { Badge }
