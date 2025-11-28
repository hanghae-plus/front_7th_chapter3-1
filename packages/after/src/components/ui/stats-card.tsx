/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statsCardVariants = cva(
  "py-3 px-4 rounded border",
  {
    variants: {
      variant: {
        primary: "bg-bg-primary-subtle border-border-primary",
        success: "bg-bg-success-subtle border-border-success",
        warning: "bg-bg-warning-subtle border-border-warning",
        destructive: "bg-bg-destructive-subtle border-border-destructive",
        muted: "bg-bg-muted-subtle border-border-muted",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

const statsValueVariants = cva(
  "text-2xl font-semibold font-sans",
  {
    variants: {
      variant: {
        primary: "text-primary",
        success: "text-success",
        warning: "text-warning",
        destructive: "text-destructive",
        muted: "text-[var(--gray-800)]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

interface StatsCardProps extends React.ComponentProps<"div">, VariantProps<typeof statsCardVariants> {
  label: string;
  value: string | number;
}

function StatsCard({
  className,
  variant,
  label,
  value,
  ...props
}: StatsCardProps) {
  // NaN 방지: 숫자가 아닌 경우 0으로 처리
  const displayValue = typeof value === 'number' && !isNaN(value) ? value : (value || 0);
  
  return (
    <div
      data-slot="stats-card"
      className={cn(statsCardVariants({ variant }), className)}
      {...props}
    >
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={statsValueVariants({ variant })}>{displayValue}</div>
    </div>
  )
}

export { StatsCard, statsCardVariants }

