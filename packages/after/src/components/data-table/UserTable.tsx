import type { User } from "@/services/userService";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import Table from "../ui/Table";

const UserTable = ({
  data,
  onEdit,
  onDelete,
}: {
  data: User[];
  onEdit?: (row: User) => void;
  onDelete?: (id: number) => void;
}) => {
  const StatusBadge = ({
    status,
  }: {
    status: "active" | "inactive" | "suspended";
  }) => {
    switch (status) {
      case "active":
        return <Badge status="published" showIcon />;
      case "inactive":
        return <Badge status="draft" showIcon />;
      default:
        return <Badge status="rejected" showIcon />;
    }
  };

  const columns = [
    { key: "id", header: "ID", width: "60px" },
    { key: "username", header: "사용자명", width: "150px" },
    { key: "email", header: "이메일" },
    {
      key: "role",
      header: "역할",
      width: "120px",
      render: ({
        role,
      }: {
        role: "admin" | "moderator" | "user" | "guest";
      }) => (
        <Badge
          userRole={role as "admin" | "moderator" | "user" | "guest"}
          showIcon
        />
      ),
    },
    {
      key: "status",
      header: "상태",
      width: "120px",
      render: ({ status }: { status: "active" | "inactive" | "suspended" }) => (
        <StatusBadge status={status as "active" | "inactive" | "suspended"} />
      ),
    },
    { key: "createdAt", header: "생성일", width: "120px" },
    { key: "lastLogin", header: "마지막 로그인", width: "140px" },
    {
      key: "actions",
      header: "관리",
      width: "200px",
      render: (row: User) => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
            수정
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return <Table tableData={data} columns={columns} pageSize={10} />;
};

export default UserTable;
