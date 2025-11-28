import { useCallback, useMemo } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type EntityType = 'user' | 'post';

type UserFormData = Pick<User, 'username' | 'email' | 'role' | 'status'>;
type PostFormData = Pick<Post, 'title' | 'content' | 'author' | 'category' | 'status'>;
type EntityFormData = UserFormData | PostFormData;

interface UseEntityFormReturn {
  form: UseFormReturn<Record<string, string>>;
  reset: () => void;
  populate: (data: Partial<User | Post>) => void;
  getData: () => EntityFormData;
}

/**
 * Entity(User/Post) 폼 상태를 관리하는 커스텀 훅
 * react-hook-form을 사용하여 폼 상태, 유효성 검사, 제출을 처리합니다.
 */
export const useEntityForm = (entityType: EntityType): UseEntityFormReturn => {
  const defaultValues = useMemo(() => 
    entityType === 'user'
      ? { username: '', email: '', role: 'user', status: 'active' }
      : { title: '', content: '', author: '', category: '', status: 'draft' },
    [entityType]
  );

  const form = useForm<Record<string, string>>({
    defaultValues,
    mode: 'onChange',
  });

  /**
   * 폼을 초기 상태로 리셋
   */
  const reset = useCallback(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  /**
   * 기존 데이터로 폼을 채움 (편집 모드)
   */
  const populate = useCallback((data: Partial<User | Post>) => {
    if (entityType === 'user') {
      const user = data as User;
      form.reset({
        username: user.username || '',
        email: user.email || '',
        role: user.role || 'user',
        status: user.status || 'active',
      });
    } else {
      const post = data as Post;
      form.reset({
        title: post.title || '',
        content: post.content || '',
        author: post.author || '',
        category: post.category || '',
        status: post.status || 'draft',
      });
    }
  }, [entityType, form]);

  /**
   * 현재 폼 데이터를 가져옴
   */
  const getData = useCallback((): EntityFormData => {
    return form.getValues() as EntityFormData;
  }, [form]);

  return { form, reset, populate, getData };
};

