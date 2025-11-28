import { usePosts, POST_STATUSES_MAP, type Post } from '@/entities/post';
import { useDeletePost } from '@/features/post/delete-post';
import { useUpdatePostStatus } from '@/features/post/update-post-status';
import { useModal } from '@/shared/model/hooks';
import { MODAL_TYPES } from '@/shared/model/hooks/use-modal';
import { AlertManager } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { StatCard, type StatCardVariant } from '@/shared/ui/stat-card/stat-card';
import { PostManagementTable } from './post-table';

export const PostManagementContainer = () => {
  const { posts } = usePosts();

  const { onOpenModal } = useModal();
  const { onDeletePost } = useDeletePost();
  const { onUpdatePostStatus } = useUpdatePostStatus();

  const handleOpenCreatePostModal = () => {
    onOpenModal(MODAL_TYPES.CREATE_POST);
  };

  const handleOpenEditPostModal = (post: Post) => {
    onOpenModal(MODAL_TYPES.UPDATE_POST, { post });
  };

  const handleDeletePost = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    onDeletePost(id);
  };

  const stats = getPostStats(posts);

  return (
    <div>
      <div className="mb-pxr-15 text-right">
        <Button variant="primary" size="md" onClick={handleOpenCreatePostModal}>
          새로 만들기
        </Button>
      </div>

      <AlertManager />

      <div className="mb-pxr-15 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[10px]">
        {stats.map((stat) => (
          <StatCard key={stat.label} variant={stat.variant}>
            <StatCard.Label>{stat.label}</StatCard.Label>
            <StatCard.Value>{stat.value}</StatCard.Value>
          </StatCard>
        ))}
      </div>

      <div className="bg-background border-border overflow-auto border">
        <PostManagementTable
          posts={posts}
          onEdit={handleOpenEditPostModal}
          onDelete={handleDeletePost}
          onPublish={(id) => onUpdatePostStatus(id, 'publish', {})}
          onArchive={(id) => onUpdatePostStatus(id, 'archive', {})}
          onRestore={(id) => onUpdatePostStatus(id, 'restore', {})}
        />
      </div>
    </div>
  );
};

const getPostStats = (
  posts: Post[]
): { label: string; value: number; variant: StatCardVariant['variant'] }[] => {
  return [
    { label: '전체', value: posts.length, variant: 'primary' },
    {
      label: '게시됨',
      value: posts.filter((p) => p.status === POST_STATUSES_MAP.published).length,
      variant: 'success',
    },
    {
      label: '임시저장',
      value: posts.filter((p) => p.status === POST_STATUSES_MAP.draft).length,
      variant: 'warning',
    },
    {
      label: '보관됨',
      value: posts.filter((p) => p.status === POST_STATUSES_MAP.archived).length,
      variant: 'danger',
    },
    { label: '총 조회수', value: posts.reduce((sum, p) => sum + p.views, 0), variant: 'default' },
  ];
};
