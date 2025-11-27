import { useState, useCallback } from 'react';
import { userService } from '@/features/user/services/userService';
import type { User, UserFormData } from '@/features/user/types/user';

interface UseUserManagementReturn {
	users: User[];
	isLoading: boolean;
	error: string | null;
	loadUsers: () => Promise<void>;
	createUser: (userData: UserFormData) => Promise<void>;
	updateUser: (id: number, userData: Partial<UserFormData>) => Promise<void>;
	deleteUser: (id: number) => Promise<void>;
}

export const useUserManagement = (): UseUserManagementReturn => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadUsers = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await userService.getAll();
			setUsers(data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('사용자 데이터를 불러오는데 실패했습니다');
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const createUser = useCallback(
		async (userData: UserFormData) => {
			setError(null);
			try {
				await userService.create(userData);
				await loadUsers();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('사용자 생성에 실패했습니다');
				}
				throw err;
			}
		},
		[loadUsers],
	);

	const updateUser = useCallback(
		async (id: number, userData: Partial<UserFormData>) => {
			setError(null);
			try {
				await userService.update(id, userData);
				await loadUsers();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('사용자 수정에 실패했습니다');
				}
				throw err;
			}
		},
		[loadUsers],
	);

	const deleteUser = useCallback(
		async (id: number) => {
			setError(null);
			try {
				await userService.delete(id);
				await loadUsers();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('사용자 삭제에 실패했습니다');
				}
				throw err;
			}
		},
		[loadUsers],
	);

	return {
		users,
		isLoading,
		error,
		loadUsers,
		createUser,
		updateUser,
		deleteUser,
	};
};
