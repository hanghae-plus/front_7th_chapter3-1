type PostStatus = "published" | "draft" | "archived" | "pending" | "rejected";
type UserRole = "admin" | "moderator" | "user";

const getStatusConfig = (status: PostStatus) => {
  switch (status) {
    case "published":
      return { variant: "success" as const, text: "게시됨" };
    case "draft":
      return { variant: "warning" as const, text: "임시저장" };
    case "archived":
      return { variant: "secondary" as const, text: "보관됨" };
    case "pending":
      return { variant: "info" as const, text: "대기중" };
    case "rejected":
      return { variant: "danger" as const, text: "거부됨" };
    default:
      return null;
  }
};

const getUserRoleConfig = (userRole: UserRole) => {
  switch (userRole) {
    case "admin":
      return { variant: "danger" as const, text: "관리자" };
    case "moderator":
      return { variant: "warning" as const, text: "운영자" };
    case "user":
      return { variant: "primary" as const, text: "사용자" };
    default:
      return null;
  }
};

export { getStatusConfig, getUserRoleConfig };
