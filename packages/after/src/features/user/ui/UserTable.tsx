import type { User } from "@/shared/api/userService";
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import {
  getUserRoleColor,
  getUserRoleText,
  getUserStatusColor,
  getUserStatusText,
} from "../libs";

export function UserTable({
  userList,
  onEdit,
  onDelete,
}: {
  userList: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>사용자명</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>생성일</TableHead>
          <TableHead>마지막 로그인</TableHead>
          <TableHead>관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user, idx) => (
          <TableRow key={user.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={getUserRoleColor(user.role)}>
                {getUserRoleText(user.role)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getUserStatusColor(user.status)}>
                {getUserStatusText(user.status)}
              </Badge>
            </TableCell>
            <TableCell>{user.createdAt}</TableCell>
            <TableCell>{user.lastLogin || "-"}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button size="sm" onClick={() => onEdit(user)}>
                수정
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(user.id)}
              >
                삭제
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
