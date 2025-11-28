import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { User, UserFormData, UserUpdateData } from '../types/user.types';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || '데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (userData: UserFormData): Promise<void> => {
    setError(null);
    try {
      await userService.create(userData);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || '생성에 실패했습니다');
      throw err;
    }
  };

  const updateUser = async (id: number, userData: UserUpdateData): Promise<void> => {
    setError(null);
    try {
      await userService.update(id, userData);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || '수정에 실패했습니다');
      throw err;
    }
  };

  const deleteUser = async (id: number): Promise<void> => {
    setError(null);
    try {
      await userService.delete(id);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || '삭제에 실패했습니다');
      throw err;
    }
  };

  const getStats = () => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      suspended: users.filter(u => u.status === 'suspended').length,
      admins: users.filter(u => u.role === 'admin').length,
    };
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    getStats,
    reload: loadUsers,
  };
};
