import type { StatMetric } from "./types";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

export const entityCopy = {
  user: {
    label: "사용자",
    description: "역할과 상태 기반 계정을 관리합니다.",
  },
  post: {
    label: "게시글",
    description: "콘텐츠 상태와 참여 지표를 확인합니다.",
  },
} as const;

export const userDefaultValues = {
  username: "",
  email: "",
  role: "user",
  status: "active",
} as const;

export const postDefaultValues = {
  title: "",
  author: "",
  category: "development",
  status: "draft",
  content: "",
} as const;

export const postCategoryOptions = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "accessibility", label: "Accessibility" },
] as const;

export const postStatusOptions = [
  { value: "draft", label: "임시저장" },
  { value: "published", label: "게시됨" },
  { value: "archived", label: "보관됨" },
] as const;

export const userRoleOptions = [
  { value: "user", label: "사용자" },
  { value: "moderator", label: "운영자" },
  { value: "admin", label: "관리자" },
] as const;

export const userStatusOptions = [
  { value: "active", label: "활성" },
  { value: "inactive", label: "비활성" },
  { value: "suspended", label: "정지" },
] as const;

export const buildStats = (_type: "user", data: User[]): StatMetric[] => {
  const active = data.filter((user) => user.status === "active").length;
  const inactive = data.filter((user) => user.status === "inactive").length;
  const suspended = data.filter((user) => user.status === "suspended").length;
  const admins = data.filter((user) => user.role === "admin").length;

  return [
    { label: "전체 사용자", value: data.length, tone: "default" },
    { label: "활성", value: active, tone: "success" },
    { label: "비활성", value: inactive, tone: "warning" },
    { label: "정지", value: suspended, tone: "danger" },
    { label: "관리자", value: admins, tone: "muted" },
  ];
};

export const buildPostStats = (data: Post[]): StatMetric[] => {
  const published = data.filter((post) => post.status === "published").length;
  const draft = data.filter((post) => post.status === "draft").length;
  const archived = data.filter((post) => post.status === "archived").length;
  const totalViews = data.reduce((sum, post) => sum + (post.views ?? 0), 0);

  return [
    { label: "전체 게시글", value: data.length, tone: "default" },
    { label: "게시됨", value: published, tone: "success" },
    { label: "임시저장", value: draft, tone: "warning" },
    { label: "보관됨", value: archived, tone: "danger" },
    { label: "총 조회수", value: totalViews, tone: "muted" },
  ];
};

