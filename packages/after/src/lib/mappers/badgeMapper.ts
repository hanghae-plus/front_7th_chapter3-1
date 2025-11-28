import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

interface BadgeConfig {
  variant: BadgeVariant;
  label: string;
  icon?: string;
}

/**
 * Post 상태를 Badge 설정으로 매핑
 */
export function mapPostStatusToBadge(status: string): BadgeConfig {
  const statusMap: Record<string, BadgeConfig> = {
    published: { variant: 'success', label: '게시됨' },
    draft: { variant: 'warning', label: '임시저장' },
    archived: { variant: 'secondary', label: '보관됨' },
  };

  return statusMap[status] || { variant: 'secondary', label: status };
}

/**
 * User 상태를 Badge 설정으로 매핑
 */
export function mapUserStatusToBadge(status: string): BadgeConfig {
  const statusMap: Record<string, BadgeConfig> = {
    active: { variant: 'success', label: '활성' },
    inactive: { variant: 'warning', label: '비활성' },
    suspended: { variant: 'danger', label: '정지' },
  };

  return statusMap[status] || { variant: 'secondary', label: status };
}

/**
 * User 역할을 Badge 설정으로 매핑
 */
export function mapUserRoleToBadge(role: string): BadgeConfig {
  const roleMap: Record<string, BadgeConfig> = {
    admin: { variant: 'danger', label: '관리자' },
    moderator: { variant: 'warning', label: '운영자' },
    user: { variant: 'primary', label: '사용자' },
    guest: { variant: 'secondary', label: '게스트' },
  };

  return roleMap[role] || { variant: 'secondary', label: role };
}

/**
 * Post 카테고리를 Badge 설정으로 매핑
 */
export function mapCategoryToBadge(category: string): BadgeConfig {
  const categoryMap: Record<string, BadgeConfig> = {
    development: { variant: 'primary', label: category },
    design: { variant: 'info', label: category },
    accessibility: { variant: 'danger', label: category },
  };

  return categoryMap[category] || { variant: 'secondary', label: category };
}

/**
 * 우선순위를 Badge 설정으로 매핑
 */
export function mapPriorityToBadge(priority: string): BadgeConfig {
  const priorityMap: Record<string, BadgeConfig> = {
    high: { variant: 'danger', label: '높음' },
    medium: { variant: 'warning', label: '보통' },
    low: { variant: 'info', label: '낮음' },
  };

  return priorityMap[priority] || { variant: 'secondary', label: priority };
}

/**
 * 결제 상태를 Badge 설정으로 매핑
 */
export function mapPaymentStatusToBadge(status: string): BadgeConfig {
  const statusMap: Record<string, BadgeConfig> = {
    paid: { variant: 'success', label: '결제완료' },
    pending: { variant: 'warning', label: '결제대기' },
    failed: { variant: 'danger', label: '결제실패' },
    refunded: { variant: 'secondary', label: '환불됨' },
  };

  return statusMap[status] || { variant: 'secondary', label: status };
}

