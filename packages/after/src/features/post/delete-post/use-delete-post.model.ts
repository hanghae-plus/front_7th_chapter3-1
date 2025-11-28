import { usePosts, postService } from '@/entities/post';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';

export const useDeletePost = () => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.delete);
  const { onOpenAlert } = useAlert();

  const onDeletePost = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        refetchPosts();
        onOpenAlert({ title: '성공', type: 'success', message: '삭제되었습니다.' });
      },
      onError: (error) => {
        onOpenAlert({
          title: '오류',
          type: 'error',
          message: error.message || '삭제에 실패했습니다.',
        });
      },
    });
  };
  return { onDeletePost };
};
