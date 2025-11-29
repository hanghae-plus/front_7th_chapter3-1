import { Button } from '@bento/ui/button';
import { Badge, type BadgeProps } from '@bento/ui/badge';
import { DataTable, type Column } from '../../components/DataTable';
import type { User } from '../../services/userService';
import { USER_ROLE, USER_STATUS } from '../../services/user-constants';

interface UserTableProps {
  data: User[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (page: number) => void;
  };
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ data, pagination, onEdit, onDelete }: UserTableProps) {
  const columns: Column<User>[] = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'username', label: '사용자명', width: '150px' },
    { key: 'email', label: '이메일' },
    {
      key: 'role',
      label: '역할',
      width: '120px',
      render: (row: User) => {
        let variant: BadgeProps['variant'] = 'primary';
        if (row.role === 'admin') variant = 'danger';
        if (row.role === 'moderator') variant = 'warning';
        if (row.role === 'user') variant = 'primary';
        return <Badge variant={variant}>{USER_ROLE[row.role]}</Badge>;
      },
    },
    {
      key: 'status',
      label: '상태',
      width: '120px',
      render: (row: User) => {
        let variant: BadgeProps['variant'] = 'primary';
        if (row.status === 'active') variant = 'success';
        if (row.status === 'inactive') variant = 'warning';
        if (row.status === 'suspended') variant = 'danger';
        return <Badge variant={variant}>{USER_STATUS[row.status]}</Badge>;
      },
    },
    { key: 'createdAt', label: '생성일', width: '120px' },
    { key: 'lastLogin', label: '마지막 로그인', width: '140px' },
    {
      key: 'actions',
      label: '관리',
      width: '200px',
      render: (row: User) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="primary" onClick={() => onEdit(row)}>
            수정
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(row.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable<User> columns={columns} data={data} striped pagination={pagination} />;
}
