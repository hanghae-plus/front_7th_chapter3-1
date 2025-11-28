/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold leading-none whitespace-nowrap rounded-[3px]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-[var(--gray-600)] text-white",
        success: "bg-success text-success-foreground",
        danger: "bg-destructive text-destructive-foreground",
        warning: "bg-warning text-white",
        info: "bg-info text-white",
      },
      size: {
        small: "px-1 h-4 text-[0.625rem]",
        medium: "px-2 h-5 text-xs",
        large: "px-[10px] h-6 text-[0.8125rem]",
      },
      pill: {
        true: "rounded-[10px]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      pill: false,
    },
  }
)

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

/**
 * 순수 UI Badge 컴포넌트
 * 
 * @description
 * 도메인 로직 없이 순수하게 UI만 담당하는 Badge 컴포넌트입니다.
 * 도메인별 매핑은 별도 mapper 유틸리티를 사용하세요.
 * 
 * @example
 * ```tsx
 * // 직접 사용
 * <Badge variant="success" size="medium">게시됨</Badge>
 * 
 * // 도메인 매핑과 함께 사용
 * const { variant, label } = mapStatusToBadge(post.status);
 * <Badge variant={variant}>{label}</Badge>
 * ```
 */
function Badge({
  className,
  variant,
  size,
  pill,
  asChild = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, pill }), className)}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
