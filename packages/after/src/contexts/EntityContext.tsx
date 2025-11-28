import React, { createContext, useContext, useState, useMemo } from 'react';
import { useEntityManagement } from '@/hooks/useEntityManagement';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

// Form 데이터 타입 정의
type UserFormData = Partial<Pick<User, 'username' | 'email' | 'role' | 'status'>>;
type PostFormData = Partial<Pick<Post, 'title' | 'content' | 'author' | 'category' | 'status'>>;
type EntityFormData = UserFormData | PostFormData;

interface EntityContextValue {
  // 상태
  entityType: EntityType;
  data: Entity[];
  loading: boolean;
  error: string | null;
  
  // 액션
  setEntityType: (type: EntityType) => void;
  loadData: () => Promise<void>;
  createEntity: (formData: EntityFormData) => Promise<void>;
  updateEntity: (id: number, formData: EntityFormData) => Promise<void>;
  deleteEntity: (id: number) => Promise<boolean>;
  publishPost: (id: number) => Promise<void>;
  archivePost: (id: number) => Promise<void>;
  restorePost: (id: number) => Promise<void>;
}

const EntityContext = createContext<EntityContextValue | null>(null);

interface EntityProviderProps {
  children: React.ReactNode;
  initialEntityType?: EntityType;
}

/**
 * Entity 상태를 관리하는 Context Provider
 * 
 * @description
 * useEntityManagement 훅을 내부적으로 사용하여
 * 모든 하위 컴포넌트가 동일한 상태를 공유합니다.
 */
export const EntityProvider: React.FC<EntityProviderProps> = ({ 
  children, 
  initialEntityType = 'post' 
}) => {
  const [entityType, setEntityType] = useState<EntityType>(initialEntityType);
  
  const {
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
  } = useEntityManagement(entityType);

  const value = useMemo<EntityContextValue>(() => ({
    entityType,
    data,
    loading,
    error,
    setEntityType,
    loadData,
    createEntity,
    updateEntity,
    deleteEntity,
    publishPost,
    archivePost,
    restorePost,
  }), [
    entityType,
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
  ]);

  return (
    <EntityContext.Provider value={value}>
      {children}
    </EntityContext.Provider>
  );
};

/**
 * Entity Context를 사용하는 커스텀 훅
 * 
 * @throws EntityProvider 외부에서 사용 시 에러
 * 
 * @example
 * ```tsx
 * const { data, createEntity, entityType } = useEntityContext();
 * ```
 */
export const useEntityContext = (): EntityContextValue => {
  const context = useContext(EntityContext);
  
  if (!context) {
    throw new Error('useEntityContext must be used within EntityProvider');
  }
  
  return context;
};

// 타입 export
export type { EntityType, Entity, EntityFormData, UserFormData, PostFormData };
