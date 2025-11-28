import type { Column } from "../../../shared/ui/Table";
import { Badge } from "../../../shared/ui/Badge";
import { Button } from "../../../shared/ui/Button";
import type { User } from "../types/user.types";
import { getUserRoleConfig } from "../../post-management/lib/postBadgeConfig";

interface UserTableActions {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const getUserStatusConfig = (status: User["status"]) => {
  switch (status) {
    case "active":
      return { variant: "success" as const, text: "활성" };
    case "inactive":
      return { variant: "secondary" as const, text: "비활성" };
    case "suspended":
      return { variant: "danger" as const, text: "정지됨" };
    default:
      return null;
  }
};

export const createUserTableColumns = (actions: UserTableActions): Column<User>[] => [
  { key: "id", header: "ID", width: "60px" },
  { key: "username", header: "사용자명", width: "150px" },
  { key: "email", header: "이메일" },
  {
    key: "role",
    header: "역할",
    width: "120px",
    render: (value: unknown) => {
      const roleConfig = getUserRoleConfig(value as User["role"]);
      return roleConfig ? <Badge variant={roleConfig.variant}>{roleConfig.text}</Badge> : String(value);
    },
  },
  {
    key: "status",
    header: "상태",
    width: "120px",
    render: (value: unknown) => {
      const statusConfig = getUserStatusConfig(value as User["status"]);
      return statusConfig ? <Badge variant={statusConfig.variant}>{statusConfig.text}</Badge> : String(value);
    },
  },
  { key: "createdAt", header: "생성일", width: "120px" },
  {
    key: "lastLogin",
    header: "마지막 로그인",
    width: "140px",
    render: (value: unknown) => (value as string | undefined) || "-",
  },
  {
    key: "actions",
    header: "관리",
    width: "200px",
    sortable: false,
    render: (_value: unknown, user: User) => (
      <div className="flex gap-2">
        <Button size="sm" variant="primary" onClick={() => actions.onEdit(user)}>
          수정
        </Button>
        <Button size="sm" variant="danger" onClick={() => actions.onDelete(user.id)}>
          삭제
        </Button>
      </div>
    ),
  },
];
