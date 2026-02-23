import type { PostStatus, UserRole, UserStatus } from "@/type/management";

export const USER_ROLES: Record<
  "user" | "moderator" | "admin",
  { value: UserRole; label: string }
> = {
  user: { value: "user", label: "사용자" },
  moderator: { value: "moderator", label: "운영자" },
  admin: { value: "admin", label: "관리자" },
};

export const USER_STATUSES: Record<
  "active" | "inactive" | "suspended",
  { value: UserStatus; label: string }
> = {
  active: { value: "active", label: "활성" },
  inactive: { value: "inactive", label: "비활성" },
  suspended: { value: "suspended", label: "정지" },
};

export const POST_STATUSES: Record<
  "draft" | "published" | "archived",
  { value: PostStatus; label: string }
> = {
  draft: { value: "draft", label: "임시저장" },
  published: { value: "published", label: "게시됨" },
  archived: { value: "archived", label: "보관됨" },
};

export const CATEGORY_OPTIONS = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "accessibility", label: "Accessibility" },
];

export const ROLE_BADGE_VARIANT: Record<
  UserRole,
  { variant: "danger" | "primary" | "warning"; label: string }
> = {
  admin: { variant: "danger", label: "관리자" },
  user: { variant: "primary", label: "사용자" },
  moderator: { variant: "warning", label: "운영자" },
};

export const STATUS_BADGE_VARIANT: Record<
  PostStatus | UserStatus,
  { variant: "success" | "danger" | "warning" | "info" | "muted"; label: string }
> = {
  active: { variant: "success", label: "게시됨" },
  inactive: { variant: "danger", label: "보관됨" },
  suspended: { variant: "danger", label: "거부됨" },
  published: { variant: "success", label: "게시됨" },
  draft: { variant: "warning", label: "임시저장" },
  archived: { variant: "muted", label: "보관됨" },
};

