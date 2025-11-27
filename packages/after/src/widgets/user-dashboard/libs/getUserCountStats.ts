import type { User } from "@/shared/api/userService";

export const getUserCountStats = (users: User[]) => {
  return users.reduce(
    (acc, user) => {
      acc.total += 1;
      if (user.status === "active") acc.active += 1;
      if (user.status === "inactive") acc.inactive += 1;
      if (user.status === "suspended") acc.suspended += 1;
      if (user.role === "admin") acc.roleAdmin += 1;
      return acc;
    },
    { total: 0, active: 0, inactive: 0, suspended: 0, roleAdmin: 0 }
  );
};
