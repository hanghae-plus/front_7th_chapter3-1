import { useMemo } from 'react';
import type { Entity, EntityType } from './useEntityManagement';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type StatVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

interface Stat {
  label: string;
  value: number;
  variant: StatVariant;
}

export const useEntityStats = (data: Entity[], entityType: EntityType): Stat[] => {
  return useMemo(() => {
    if (entityType === 'user') {
      const users = data as User[];
      return [
        { label: '전체', value: users.length, variant: 'info' as const },
        {
          label: '활성',
          value: users.filter((u) => u.status === 'active').length,
          variant: 'success' as const,
        },
        {
          label: '비활성',
          value: users.filter((u) => u.status === 'inactive').length,
          variant: 'warning' as const,
        },
        {
          label: '정지',
          value: users.filter((u) => u.status === 'suspended').length,
          variant: 'error' as const,
        },
        {
          label: '관리자',
          value: users.filter((u) => u.role === 'admin').length,
          variant: 'info' as const,
        },
      ];
    } else {
      const posts = data as Post[];
      return [
        { label: '전체', value: posts.length, variant: 'info' as const },
        {
          label: '게시됨',
          value: posts.filter((p) => p.status === 'published').length,
          variant: 'success' as const,
        },
        {
          label: '임시저장',
          value: posts.filter((p) => p.status === 'draft').length,
          variant: 'warning' as const,
        },
        {
          label: '보관됨',
          value: posts.filter((p) => p.status === 'archived').length,
          variant: 'error' as const,
        },
        {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
          variant: 'default' as const,
        },
      ];
    }
  }, [data, entityType]);
};

