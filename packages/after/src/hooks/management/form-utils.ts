import type { EntityType, ManagementFormData } from "@/type/management";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

export const getInitialFormData = (
  entityType: EntityType
): ManagementFormData =>
  entityType === "user"
    ? {
        username: "",
        email: "",
        role: "user",
        status: "active",
      }
    : {
        title: "",
        content: "",
        author: "",
        category: "development",
        status: "draft",
      };

export const ensureUserRole = (role?: string): User["role"] => {
  if (role === "admin" || role === "moderator" || role === "user") {
    return role;
  }
  return "user";
};

export const ensureUserStatus = (status?: string): User["status"] => {
  if (status === "active" || status === "inactive" || status === "suspended") {
    return status;
  }
  return "active";
};

export const ensurePostStatus = (status?: string): Post["status"] => {
  if (status === "draft" || status === "published" || status === "archived") {
    return status;
  }
  return "draft";
};


