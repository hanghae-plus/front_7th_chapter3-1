import React from 'react';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
  mapUserRoleToBadge,
  mapUserStatusToBadge,
  mapPostStatusToBadge,
  mapCategoryToBadge,
} from '@/lib/mappers/badgeMapper';
import type { User } from '../../services/userService';
import type { Post } from '../../services/postService';

interface UserCellRendererProps {
  user: User;
  columnKey: string;
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

export const UserCellRenderer: React.FC<UserCellRendererProps> = ({
  user,
  columnKey,
  onEdit,
  onDelete,
}) => {
  const value = user[columnKey as keyof User];

  switch (columnKey) {
    case 'role': {
      const { variant, label } = mapUserRoleToBadge(value as string);
      return <Badge variant={variant}>{label}</Badge>;
    }

    case 'status': {
      const { variant, label } = mapUserStatusToBadge(value as string);
      return <Badge variant={variant}>{label}</Badge>;
    }

    case 'lastLogin':
      return <>{value || '-'}</>;

    case 'actions':
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={() => onEdit?.(user)}>
            수정
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete?.(user.id)}>
            삭제
          </Button>
        </div>
      );

    default:
      return <>{value}</>;
  }
};

interface PostCellRendererProps {
  post: Post;
  columnKey: string;
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const PostCellRenderer: React.FC<PostCellRendererProps> = ({
  post,
  columnKey,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const value = post[columnKey as keyof Post];

  switch (columnKey) {
    case 'category': {
      const { variant, label } = mapCategoryToBadge(value as string);
      return (
        <Badge variant={variant} pill>
          {label}
        </Badge>
      );
    }

    case 'status': {
      const { variant, label } = mapPostStatusToBadge(value as string);
      return <Badge variant={variant}>{label}</Badge>;
    }

    case 'views':
      return <>{(value as number)?.toLocaleString() || '0'}</>;

    case 'actions':
      return (
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="primary" onClick={() => onEdit?.(post)}>
            수정
          </Button>
          {renderPostActionButtons(post, { onPublish, onArchive, onRestore, onDelete })}
        </div>
      );

    default:
      return <>{value}</>;
  }
};

/**
 * Post 상태에 따른 액션 버튼을 렌더링
 * @description 비즈니스 룰을 별도 함수로 분리하여 테스트 가능하게 함
 */
function renderPostActionButtons(
  post: Post,
  actions: {
    onPublish?: (id: number) => void;
    onArchive?: (id: number) => void;
    onRestore?: (id: number) => void;
    onDelete?: (id: number) => void;
  }
) {
  const { onPublish, onArchive, onRestore, onDelete } = actions;

  return (
    <>
      {post.status === 'draft' && onPublish && (
        <Button size="sm" variant="success" onClick={() => onPublish(post.id)}>
          게시
        </Button>
      )}
      {post.status === 'published' && onArchive && (
        <Button size="sm" variant="secondary" onClick={() => onArchive(post.id)}>
          보관
        </Button>
      )}
      {post.status === 'archived' && onRestore && (
        <Button size="sm" variant="primary" onClick={() => onRestore(post.id)}>
          복원
        </Button>
      )}
      {onDelete && (
        <Button size="sm" variant="danger" onClick={() => onDelete(post.id)}>
          삭제
        </Button>
      )}
    </>
  );
}
