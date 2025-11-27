export const getUserRoleText = (role: string) => {
  switch (role) {
    case "admin":
      return "관리자";
    case "moderator":
      return "운영자";
    case "user":
      return "사용자";
    case "guest":
      return "게스트";
  }
};
