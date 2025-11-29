import { Button } from '@bento/ui/button';
import { Badge, type BadgeProps } from '@bento/ui/badge';
import { DataTable, type Column } from '../../components/DataTable';
import type { Post } from '../../services/postService';
import { POST_CATEGORY, POST_STATUS } from '../../services/post-constants';

interface PostTableProps {
  data: Post[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (page: number) => void;
  };
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => void;
}

export function PostTable({
  data,
  pagination,
  onEdit,
  onDelete,
  onStatusAction,
}: PostTableProps) {
  const columns: Column<Post>[] = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'title', label: '제목' },
    { key: 'author', label: '작성자', width: '120px' },
    {
      key: 'category',
      label: '카테고리',
      width: '140px',
      render: (row: Post) => {
        let variant: BadgeProps['variant'] = 'secondary';
        if (row.category === 'development') variant = 'primary';
        if (row.category === 'design') variant = 'info';
        if (row.category === 'accessibility') variant = 'danger';
        return (
          <Badge variant={variant} shape="pill">
            {POST_CATEGORY[row.category as keyof typeof POST_CATEGORY]}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      label: '상태',
      width: '120px',
      render: (row: Post) => {
        let variant: BadgeProps['variant'] = 'primary';
        if (row.status === 'published') variant = 'success';
        if (row.status === 'draft') variant = 'warning';
        if (row.status === 'archived') variant = 'primary';
        return <Badge variant={variant}>{POST_STATUS[row.status]}</Badge>;
      },
    },
    {
      key: 'views',
      label: '조회수',
      width: '100px',
      render: (row: Post) => <>{row.views?.toLocaleString() || '0'}</>,
    },
    { key: 'createdAt', label: '작성일', width: '120px' },
    {
      key: 'actions',
      label: '관리',
      width: '250px',
      render: (row: Post) => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" variant="primary" onClick={() => onEdit(row)}>
            수정
          </Button>
          {row.status === 'draft' && (
            <Button size="sm" variant="success" onClick={() => onStatusAction(row.id, 'publish')}>
              게시
            </Button>
          )}
          {row.status === 'published' && (
            <Button size="sm" variant="secondary" onClick={() => onStatusAction(row.id, 'archive')}>
              보관
            </Button>
          )}
          {row.status === 'archived' && (
            <Button size="sm" variant="primary" onClick={() => onStatusAction(row.id, 'restore')}>
              복원
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => onDelete(row.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable<Post> columns={columns} data={data} striped pagination={pagination} />;
}
