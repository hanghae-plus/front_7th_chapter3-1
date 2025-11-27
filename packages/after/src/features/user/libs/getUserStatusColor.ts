import type { User } from "@/shared/api/userService";

export const getUserStatusColor = (status: User["status"]) => {
  switch (status) {
    case "active":
      return "green";
    case "inactive":
      return "red";
    case "suspended":
      return "yellow";
    default:
      return "gray";
  }
};
