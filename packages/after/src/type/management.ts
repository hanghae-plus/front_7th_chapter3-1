import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

export type EntityType = "user" | "post";

export type UserRole = User["role"];
export type UserStatus = User["status"];
export type PostStatus = Post["status"];

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
}

export type StatVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "muted";

export interface StatCard {
  id: string;
  title: string | number;
  description: string;
  variant: StatVariant;
}

export type AlertType = "success" | "danger";

export interface ManagementAlert {
  type: AlertType;
  message: string;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface UserFormData {
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface PostFormData {
  title: string;
  content: string;
  author: string;
  category: Post["category"];
  status: PostStatus;
}

export interface ManagementFormData {
  username?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus | PostStatus;
  title?: string;
  content?: string;
  author?: string;
  category?: Post["category"];
}

