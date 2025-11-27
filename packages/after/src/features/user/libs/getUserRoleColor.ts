import type { User } from "@/shared/api/userService";

export const getUserRoleColor = (role: User["role"]) => {
  switch (role) {
    case "admin":
      return "yellow";
    case "moderator":
      return "green";
    case "user":
      return "gray";
    default:
      return "gray";
  }
};
