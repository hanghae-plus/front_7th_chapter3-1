import type { User } from '@/services/userService';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/button';
import Table from '../ui/Table';

const UserTable = ({
	data,
	onEdit,
	onDelete,
}: {
	data: User[];
	onEdit?: (row: User) => void;
	onDelete?: (id: number) => void;
}) => {
	const statusType = {
		active: { type: 'success', label: '게시됨' },
		inactive: { type: 'warning', label: '임시저장' },
		suspended: { type: 'danger', label: '거부됨' },
	} as const;

	const roleType = {
		admin: { type: 'danger', label: '관리자' },
		moderator: { type: 'warning', label: '운영자' },
		user: { type: 'primary', label: '사용자' },
		guest: { type: 'secondary', label: '게스트' },
	} as const;

	const columns = [
		{ key: 'id', header: 'ID', width: '60px' },
		{ key: 'username', header: '사용자명', width: '150px' },
		{ key: 'email', header: '이메일' },
		{
			key: 'role',
			header: '역할',
			width: '120px',
			render: ({
				role,
			}: {
				role: 'admin' | 'moderator' | 'user' | 'guest';
			}) => <Badge type={roleType[role]?.type}>{roleType[role]?.label}</Badge>,
		},
		{
			key: 'status',
			header: '상태',
			width: '120px',
			render: ({ status }: { status: 'active' | 'inactive' | 'suspended' }) => (
				<Badge type={statusType[status]?.type}>
					{statusType[status]?.label}
				</Badge>
			),
		},
		{ key: 'createdAt', header: '생성일', width: '120px' },
		{ key: 'lastLogin', header: '마지막 로그인', width: '140px' },
		{
			key: 'actions',
			header: '관리',
			width: '200px',
			render: (row: User) => (
				<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
					<Button size='sm' variant='primary' onClick={() => onEdit?.(row)}>
						수정
					</Button>
					<Button size='sm' variant='danger' onClick={() => onDelete?.(row.id)}>
						삭제
					</Button>
				</div>
			),
		},
	];

	return <Table tableData={data} columns={columns} pageSize={10} />;
};

export default UserTable;
