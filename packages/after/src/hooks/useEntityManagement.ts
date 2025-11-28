import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

export type EntityType = 'user' | 'post';
export type Entity = User | Post;

interface UseEntityManagementProps {
  entityType: EntityType;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

interface UseEntityManagementReturn {
  data: Entity[];
  isLoading: boolean;
  loadData: () => Promise<void>;
  handleCreate: (formData: any) => Promise<void>;
  handleUpdate: (id: number, formData: any) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => Promise<void>;
}

export const useEntityManagement = ({
  entityType,
  onSuccess,
  onError,
}: UseEntityManagementProps): UseEntityManagementReturn => {
  const [data, setData] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      let result: Entity[];

      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      onError?.('데이터를 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData: any) => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: formData.status || 'active',
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: formData.status || 'draft',
        });
      }

      await loadData();
      onSuccess?.(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
    } catch (error: any) {
      onError?.(error.message || '생성에 실패했습니다');
      throw error;
    }
  };

  const handleUpdate = async (id: number, formData: any) => {
    try {
      if (entityType === 'user') {
        await userService.update(id, formData);
      } else {
        await postService.update(id, formData);
      }

      await loadData();
      onSuccess?.(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
    } catch (error: any) {
      onError?.(error.message || '수정에 실패했습니다');
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      onSuccess?.('삭제되었습니다');
    } catch (error: any) {
      onError?.(error.message || '삭제에 실패했습니다');
    }
  };

  const handleStatusAction = async (
    id: number,
    action: 'publish' | 'archive' | 'restore'
  ) => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      onSuccess?.(`${message}되었습니다`);
    } catch (error: any) {
      onError?.(error.message || '작업에 실패했습니다');
    }
  };

  // entityType이 변경될 때마다 데이터 로드
  useEffect(() => {
    loadData();
  }, [entityType]);

  return {
    data,
    isLoading,
    loadData,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStatusAction,
  };
};

