import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // token 폴더의 토큰 기반 badge 베이스 스타일
  "inline-flex items-center justify-center font-[var(--font-family-base)] font-[var(--font-weight-bold)] whitespace-nowrap leading-[var(--line-height-none)]",
  {
    variants: {
      variant: {
        // semantic.css의 badge 배경색 토큰 사용
        primary: "bg-[var(--color-bg-badge-primary)] text-[var(--color-text-badge)]",
        secondary: "bg-[var(--color-bg-badge-secondary)] text-[var(--color-text-badge)]",
        success: "bg-[var(--color-bg-badge-success)] text-[var(--color-text-badge)]",
        danger: "bg-[var(--color-bg-badge-danger)] text-[var(--color-text-badge)]",
        warning: "bg-[var(--color-bg-badge-warning)] text-[var(--color-text-badge)]",
        info: "bg-[var(--color-bg-badge-info)] text-[var(--color-text-badge)]",
        default: "bg-[var(--color-bg-badge-primary)] text-[var(--color-text-badge)]",
        destructive: "bg-[var(--color-bg-badge-danger)] text-[var(--color-text-badge)]",
        outline: "border border-[var(--color-border-default)] text-[var(--color-text-default)] bg-transparent",
      },
      size: {
        // semantic.css의 badge spacing, size, font-size 토큰 사용
        small: "px-[var(--space-badge-padding-inline-sm)] py-0 h-[var(--size-badge-height-sm)] text-[length:var(--font-size-badge-sm)]",
        medium: "px-[var(--space-badge-padding-inline-md)] py-0 h-[var(--size-badge-height-md)] text-[length:var(--font-size-badge-md)]",
        large: "px-[var(--space-badge-padding-inline-lg)] py-0 h-[var(--size-badge-height-lg)] text-[length:var(--font-size-badge-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
)

type BadgeType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
type BadgeSize = 'small' | 'medium' | 'large'
type StatusType = 'published' | 'draft' | 'archived' | 'pending' | 'rejected'
type UserRoleType = 'admin' | 'moderator' | 'user' | 'guest'
type PriorityType = 'high' | 'medium' | 'low'
type PaymentStatusType = 'paid' | 'pending' | 'failed' | 'refunded'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  // atoms/Badge.tsx 호환성을 위한 props
  type?: BadgeType
  size?: BadgeSize
  pill?: boolean
  status?: StatusType
  userRole?: UserRoleType
  priority?: PriorityType
  paymentStatus?: PaymentStatusType
  showIcon?: boolean
  // shadcn 스타일 props (호환성을 위해 유지)
  variant?: BadgeType | 'default' | 'destructive' | 'outline'
}

function Badge({
  className,
  type: typeProp = 'primary',
  size: sizeProp = 'medium',
  pill = false,
  status,
  userRole,
  priority,
  paymentStatus,
  showIcon = false,
  children,
  variant,
  ...props
}: BadgeProps) {
  // atoms/Badge.tsx와의 호환성을 위한 로직
  let actualVariant: BadgeType | 'default' | 'destructive' | 'outline' = variant || typeProp || 'primary'
  let actualContent = children

  // variant prop이 있으면 type으로 변환 (shadcn 호환성)
  if (variant && !typeProp && variant !== 'outline') {
    if (variant === 'default' || variant === 'destructive') {
      actualVariant = variant
    } else {
      actualVariant = variant as BadgeType
    }
  } else if (typeProp && !variant) {
    actualVariant = typeProp
  }

  // status prop 처리
  if (status) {
    switch (status) {
      case 'published':
        actualVariant = 'success'
        actualContent = actualContent || '게시됨'
        break
      case 'draft':
        actualVariant = 'warning'
        actualContent = actualContent || '임시저장'
        break
      case 'archived':
        actualVariant = 'secondary'
        actualContent = actualContent || '보관됨'
        break
      case 'pending':
        actualVariant = 'info'
        actualContent = actualContent || '대기중'
        break
      case 'rejected':
        actualVariant = 'danger'
        actualContent = actualContent || '거부됨'
        break
    }
  }

  // userRole prop 처리
  if (userRole) {
    switch (userRole) {
      case 'admin':
        actualVariant = 'danger'
        actualContent = actualContent || '관리자'
        break
      case 'moderator':
        actualVariant = 'warning'
        actualContent = actualContent || '운영자'
        break
      case 'user':
        actualVariant = 'primary'
        actualContent = actualContent || '사용자'
        break
      case 'guest':
        actualVariant = 'secondary'
        actualContent = actualContent || '게스트'
        break
    }
  }

  // priority prop 처리
  if (priority) {
    switch (priority) {
      case 'high':
        actualVariant = 'danger'
        actualContent = actualContent || '높음'
        break
      case 'medium':
        actualVariant = 'warning'
        actualContent = actualContent || '보통'
        break
      case 'low':
        actualVariant = 'info'
        actualContent = actualContent || '낮음'
        break
    }
  }

  // paymentStatus prop 처리
  if (paymentStatus) {
    switch (paymentStatus) {
      case 'paid':
        actualVariant = 'success'
        actualContent = actualContent || '결제완료'
        break
      case 'pending':
        actualVariant = 'warning'
        actualContent = actualContent || '결제대기'
        break
      case 'failed':
        actualVariant = 'danger'
        actualContent = actualContent || '결제실패'
        break
      case 'refunded':
        actualVariant = 'secondary'
        actualContent = actualContent || '환불됨'
        break
    }
  }

  // showIcon은 현재 사용하지 않지만 호환성을 위해 유지
  void showIcon

  // primitive.css의 radius 토큰 사용
  const radiusClass = pill 
    ? "rounded-[var(--radius-control-pill)]" 
    : "rounded-[var(--radius-3)]"

  return (
    <span
      className={cn(
        badgeVariants({ variant: actualVariant, size: sizeProp }),
        radiusClass,
        className
      )}
      {...props}
    >
      {actualContent}
    </span>
  )
}

export { Badge, badgeVariants }
