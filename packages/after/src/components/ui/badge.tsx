import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[3px] border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#1976d2] text-white shadow hover:bg-[#1565c0]",
        primary:
          "border-transparent bg-[#1976d2] text-white shadow hover:bg-[#1565c0]",
        secondary:
          "border-transparent bg-[#757575] text-white hover:bg-[#616161]",
        success:
          "border-transparent bg-[#388e3c] text-white shadow hover:bg-[#2e7d32]",
        danger:
          "border-transparent bg-[#d32f2f] text-white shadow hover:bg-[#c62828]",
        warning:
          "border-transparent bg-[#f57c00] text-white shadow hover:bg-[#ef6c00]",
        info:
          "border-transparent bg-[#0288d1] text-white shadow hover:bg-[#0277bd]",
        destructive:
          "border-transparent bg-[#d32f2f] text-white shadow hover:bg-[#c62828]",
        outline: "text-foreground",
      },
      size: {
        small: "text-xs px-2 py-0.5",
        medium: "text-sm px-2.5 py-0.5",
        large: "text-base px-3 py-1",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
      pill: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  status?: 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
  userRole?: 'admin' | 'moderator' | 'user' | 'guest';
  showIcon?: boolean;
}

import { Check, X, Clock, FileText, User, Shield, ShieldAlert } from "lucide-react";

function Badge({ className, variant, type, status, userRole, size, pill, showIcon, children, ...props }: BadgeProps) {
  
  let actualVariant = variant;
  let actualContent = children;
  let IconComponent = null;

  // Before 호환: type prop 지원
  if (type) {
    actualVariant = type as any;
  }

  // Before 호환: status prop 지원
  if (status) {
    switch (status) {
      case 'published':
        actualVariant = 'success';
        actualContent = actualContent || '게시됨';
        IconComponent = Check;
        break;
      case 'draft':
        actualVariant = 'warning';
        actualContent = actualContent || '임시저장';
        IconComponent = FileText;
        break;
      case 'archived':
        actualVariant = 'secondary';
        actualContent = actualContent || '보관됨';
        IconComponent = Clock;
        break;
      case 'pending':
        actualVariant = 'info';
        actualContent = actualContent || '대기중';
        IconComponent = Clock;
        break;
      case 'rejected':
        actualVariant = 'danger';
        actualContent = actualContent || '거부됨';
        IconComponent = X;
        break;
    }
  }

  // Before 호환: userRole prop 지원
  if (userRole) {
    switch (userRole) {
      case 'admin':
        actualVariant = 'danger';
        actualContent = actualContent || '관리자';
        IconComponent = ShieldAlert;
        break;
      case 'moderator':
        actualVariant = 'warning';
        actualContent = actualContent || '운영자';
        IconComponent = Shield;
        break;
      case 'user':
        actualVariant = 'primary';
        actualContent = actualContent || '사용자';
        IconComponent = User;
        break;
      case 'guest':
        actualVariant = 'secondary';
        actualContent = actualContent || '게스트';
        IconComponent = User;
        break;
    }
  }

  return (
    <div className={cn(badgeVariants({ variant: actualVariant, size, pill }), className)} {...props}>
      {showIcon && IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
      {actualContent}
    </div>
  )
}

export { Badge, badgeVariants }
