import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

// Form 데이터 타입 정의
type UserFormData = Partial<Pick<User, 'username' | 'email' | 'role' | 'status'>>;
type PostFormData = Partial<Pick<Post, 'title' | 'content' | 'author' | 'category' | 'status'>>;
type EntityFormData = UserFormData | PostFormData;

/**
 * 에러 객체에서 메시지를 추출하는 유틸리티 함수
 * @description unknown 타입의 에러를 안전하게 처리
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return '알 수 없는 오류가 발생했습니다';
}

interface UseEntityManagementReturn {
  data: Entity[];
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  createEntity: (formData: EntityFormData) => Promise<void>;
  updateEntity: (id: number, formData: EntityFormData) => Promise<void>;
  deleteEntity: (id: number) => Promise<boolean>;
  publishPost: (id: number) => Promise<void>;
  archivePost: (id: number) => Promise<void>;
  restorePost: (id: number) => Promise<void>;
}

export const useEntityManagement = (entityType: EntityType): UseEntityManagementReturn => {
  const [data, setData] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let result: Entity[];
      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }
      setData(result);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  const createEntity = useCallback(async (formData: EntityFormData) => {
    try {
      if (entityType === 'user') {
        const userData = formData as UserFormData;
        await userService.create({
          username: userData.username || '',
          email: userData.email || '',
          role: userData.role || 'user',
          status: userData.status || 'active',
        });
      } else {
        const postData = formData as PostFormData;
        await postService.create({
          title: postData.title || '',
          content: postData.content || '',
          author: postData.author || '',
          category: postData.category || '',
          status: postData.status || 'draft',
        });
      }
      await loadData();
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  }, [entityType, loadData]);

  const updateEntity = useCallback(async (id: number, formData: EntityFormData) => {
    try {
      if (entityType === 'user') {
        await userService.update(id, formData as UserFormData);
      } else {
        await postService.update(id, formData as PostFormData);
      }
      await loadData();
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  }, [entityType, loadData]);

  const deleteEntity = useCallback(async (id: number): Promise<boolean> => {
    if (!confirm('정말 삭제하시겠습니까?')) return false;
    
    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }
      await loadData();
      return true;
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  }, [entityType, loadData]);

  const publishPost = useCallback(async (id: number) => {
    if (entityType !== 'post') return;
    try {
      await postService.publish(id);
      await loadData();
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  }, [entityType, loadData]);

  const archivePost = useCallback(async (id: number) => {
    if (entityType !== 'post') return;
    try {
      await postService.archive(id);
      await loadData();
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  }, [entityType, loadData]);

  const restorePost = useCallback(async (id: number) => {
    if (entityType !== 'post') return;
    try {
      await postService.restore(id);
      await loadData();
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    }
  }, [entityType, loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    loadData,
    createEntity,
    updateEntity,
    deleteEntity,
    publishPost,
    archivePost,
    restorePost,
  };
};

