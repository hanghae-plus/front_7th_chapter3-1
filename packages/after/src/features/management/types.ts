import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

export type EntityType = "user" | "post";
export type Entity = User | Post;
export type DialogMode = "create" | "edit";

export type StatusAction = "publish" | "archive" | "restore";

export type AlertVariant = "info" | "success" | "error";

export type StatMetric = {
  label: string;
  value: number;
  helper?: string;
  tone?: "default" | "success" | "warning" | "danger" | "muted";
};

