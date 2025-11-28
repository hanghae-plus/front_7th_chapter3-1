import React from 'react';
import { DataTable } from '@/components/ui';
import { UserCellRenderer, PostCellRenderer } from '../EntityTableCells';
import { useTableColumns } from '@/hooks/useTableColumns';
import { useEntityContext } from '@/contexts/EntityContext';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';

type Entity = User | Post;

interface EntityTableProps {
  onEdit: (item: Entity) => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return '알 수 없는 오류가 발생했습니다';
}

/**
 * Entity 테이블을 표시하는 컴포넌트
 * 
 * @description
 * Context에서 데이터와 액션을 가져와 테이블을 표시합니다.
 */
export const EntityTable: React.FC<EntityTableProps> = ({
  onEdit,
  onSuccess,
  onError,
}) => {
  const { entityType, data, deleteEntity, publishPost, archivePost, restorePost } = useEntityContext();
  const columns = useTableColumns(entityType);

  const handleDelete = async (id: number) => {
    try {
      const deleted = await deleteEntity(id);
      if (deleted) onSuccess?.('삭제되었습니다');
    } catch (error: unknown) {
      onError?.(getErrorMessage(error));
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;
    try {
      if (action === 'publish') await publishPost(id);
      else if (action === 'archive') await archivePost(id);
      else if (action === 'restore') await restorePost(id);

      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      onSuccess?.(`${message}되었습니다`);
    } catch (error: unknown) {
      onError?.(getErrorMessage(error));
    }
  };

  return (
    <div className="border border-border bg-card overflow-auto">
      <DataTable
        columns={columns}
        data={data}
        striped
        hover
        renderCell={(row, columnKey) => {
          if (entityType === 'user') {
            return (
              <UserCellRenderer
                user={row as User}
                columnKey={columnKey}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            );
          } else {
            return (
              <PostCellRenderer
                post={row as Post}
                columnKey={columnKey}
                onEdit={onEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, 'publish')}
                onArchive={(id) => handleStatusAction(id, 'archive')}
                onRestore={(id) => handleStatusAction(id, 'restore')}
              />
            );
          }
        }}
      />
    </div>
  );
};
