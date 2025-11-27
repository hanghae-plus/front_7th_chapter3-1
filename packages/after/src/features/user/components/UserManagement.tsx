import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/ui/button';
import { Alert } from '@/features/shared/components/Alert';
import { Modal } from '@/features/shared/components/Modal';
import DashboardCard, { statsCardVariants } from '@/features/shared/components/DashboardCard';
import UserRoleBadge from '@/features/user/components/UserRoleBadge';
import StatusBadge from '@/features/shared/components/StatusBadge';
import { useUserManagement } from '@/features/user/hooks/useUserManagement';
import { useAlert } from '@/features/shared/hooks/useAlert';
import { UserFormFields } from '@/features/user/components/UserFormFields';
import { userFormSchema, type UserFormSchema } from '@/features/user/schemas';
import type { VariantProps } from 'class-variance-authority';
import { PaginationTable } from '@/features/shared/components/PaginationTable';
import type { User, UserFormData } from '@/features/user/types/user';
import type { TableColumn } from '@/features/shared/components/PaginationTable';
import type { PostStatus } from '@/features/post/types/post';

const UserManagement = () => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const { users, loadUsers, createUser, updateUser, deleteUser, error } = useUserManagement();

	const alert = useAlert();

	// Create form
	const createForm = useForm<UserFormSchema>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			username: '',
			email: '',
			role: 'user',
			status: 'active',
		},
		mode: 'onChange',
	});

	// Edit form
	const editForm = useForm<UserFormSchema>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			username: '',
			email: '',
			role: 'user',
			status: 'active',
		},
		mode: 'onChange',
	});

	useEffect(() => {
		loadUsers();
	}, []);

	useEffect(() => {
		if (error) {
			alert.displayError(error);
		}
	}, [error, alert]);

	const handleCreateModalOpen = () => {
		createForm.reset();
		setIsCreateModalOpen(true);
	};

	const handleCreateModalClose = () => {
		setIsCreateModalOpen(false);
		createForm.reset();
	};

	const handleCreate = async (data: UserFormSchema) => {
		try {
			const userData: UserFormData = {
				username: data.username,
				email: data.email,
				role: data.role,
				status: data.status,
			};
			await createUser(userData);

			handleCreateModalClose();
			alert.displaySuccess('사용자가 생성되었습니다');
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert.displayError(error.message);
			} else {
				alert.displayError('생성에 실패했습니다');
			}
		}
	};

	const handleEdit = (user: User) => {
		setSelectedUser(user);
		editForm.reset({
			username: user.username,
			email: user.email,
			role: user.role,
			status: user.status,
		});
		setIsEditModalOpen(true);
	};

	const handleEditModalClose = () => {
		setIsEditModalOpen(false);
		setSelectedUser(null);
		editForm.reset();
	};

	const handleUpdate = async (data: UserFormSchema) => {
		if (!selectedUser) return;

		try {
			await updateUser(selectedUser.id, data);

			handleEditModalClose();
			alert.displaySuccess('사용자가 수정되었습니다');
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert.displayError(error.message);
			} else {
				alert.displayError('수정에 실패했습니다');
			}
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm('정말 삭제하시겠습니까?')) return;

		try {
			await deleteUser(id);
			alert.displaySuccess('삭제되었습니다');
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert.displayError(error.message);
			} else {
				alert.displayError('삭제에 실패했습니다');
			}
		}
	};

	const renderCell = (row: User, column: TableColumn<User>): React.ReactNode => {
		const columnKey = column.key;

		if (columnKey === 'role') {
			return <UserRoleBadge userRole={row.role} />;
		}

		if (columnKey === 'status') {
			const statusMap: Record<User['status'], PostStatus> = {
				active: 'published',
				inactive: 'draft',
				suspended: 'rejected',
			};
			return <StatusBadge status={statusMap[row.status]} />;
		}

		if (columnKey === 'lastLogin') {
			return row.lastLogin || '-';
		}

		if (columnKey === 'actions') {
			return (
				<div className="flex gap-2">
					<Button size="sm" variant="primary" onClick={() => handleEdit(row)}>
						수정
					</Button>
					<Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
						삭제
					</Button>
				</div>
			);
		}

		return row[columnKey];
	};

	const columns: TableColumn<User>[] = [
		{ key: 'id', header: 'ID', width: '60px' },
		{ key: 'username', header: '사용자명', width: '150px' },
		{ key: 'email', header: '이메일' },
		{ key: 'role', header: '역할', width: '120px' },
		{ key: 'status', header: '상태', width: '120px' },
		{ key: 'createdAt', header: '생성일', width: '120px' },
		{ key: 'lastLogin', header: '마지막 로그인', width: '140px' },
		{ key: 'actions', header: '관리', width: '200px' },
	];

	const statList: {
		label: string;
		value: number;
		color: VariantProps<typeof statsCardVariants>['color'];
	}[] = useMemo(
		() => [
			{
				label: '전체',
				value: users.length,
				color: 'blue',
			},
			{
				label: '활성',
				value: users.filter((u) => u.status === 'active').length,
				color: 'green',
			},
			{
				label: '비활성',
				value: users.filter((u) => u.status === 'inactive').length,
				color: 'orange',
			},
			{
				label: '정지',
				value: users.filter((u) => u.status === 'suspended').length,
				color: 'red',
			},
			{
				label: '관리자',
				value: users.filter((u) => u.role === 'admin').length,
				color: 'gray',
			},
		],
		[users],
	);

	return (
		<>
			<div className="mb-4 text-right">
				<Button variant="primary" size="md" onClick={handleCreateModalOpen}>
					새로 만들기
				</Button>
			</div>

			{alert.showSuccess && (
				<div className="mb-2.5">
					<Alert variant="success" title="성공" onClose={alert.hideSuccess}>
						{alert.successMessage}
					</Alert>
				</div>
			)}

			{alert.showError && (
				<div className="mb-2.5">
					<Alert variant="error" title="오류" onClose={alert.hideError}>
						{alert.errorMessage}
					</Alert>
				</div>
			)}

			<div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
				{statList.map(({ label, value, color }) => {
					return <DashboardCard key={label} label={label} value={value} color={color} />;
				})}
			</div>

			<div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-auto">
				<PaginationTable
					columns={columns}
					data={users}
					striped
					hover
					renderCell={renderCell}
					getRowKey={(row) => row.id}
				/>
			</div>

			{/* Create Modal */}
			<Modal
				isOpen={isCreateModalOpen}
				onClose={handleCreateModalClose}
				title="새 사용자 만들기"
				size="large"
				showFooter
				footerContent={
					<>
						<Button variant="secondary" size="md" onClick={handleCreateModalClose}>
							취소
						</Button>
						<Button variant="primary" size="md" onClick={createForm.handleSubmit(handleCreate)}>
							생성
						</Button>
					</>
				}
			>
				<FormProvider {...createForm}>
					<UserFormFields />
				</FormProvider>
			</Modal>

			{/* Edit Modal */}
			<Modal
				isOpen={isEditModalOpen}
				onClose={handleEditModalClose}
				title="사용자 수정"
				size="large"
				showFooter
				footerContent={
					<>
						<Button variant="secondary" size="md" onClick={handleEditModalClose}>
							취소
						</Button>
						<Button variant="primary" size="md" onClick={editForm.handleSubmit(handleUpdate)}>
							수정 완료
						</Button>
					</>
				}
			>
				<div className="space-y-4">
					{selectedUser && (
						<Alert variant="info">
							ID: {selectedUser.id} | 생성일: {selectedUser.createdAt}
						</Alert>
					)}

					<FormProvider {...editForm}>
						<UserFormFields />
					</FormProvider>
				</div>
			</Modal>
		</>
	);
};

export default UserManagement;
