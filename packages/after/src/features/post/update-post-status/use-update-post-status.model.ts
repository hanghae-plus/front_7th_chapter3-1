import { postService, usePosts } from '@/entities/post';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';

export const useUpdatePostStatus = () => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate: mutatePublish } = useMutation(postService.publish);
  const { mutate: mutateArchive } = useMutation(postService.archive);
  const { mutate: mutateRestore } = useMutation(postService.restore);

  const { onOpenAlert } = useAlert();

  const onUpdatePostStatus = (
    id: number,
    status: 'publish' | 'archive' | 'restore',
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  ) => {
    switch (status) {
      case 'publish':
        mutatePublish(id, {
          onSuccess: () => {
            refetchPosts();
            onSuccess?.();
            onOpenAlert({ title: '성공', type: 'success', message: '게시되었습니다.' });
          },
          onError: (error) => {
            console.error(error);
            onError?.(error);
            onOpenAlert({
              title: '오류',
              type: 'error',
              message: error.message || '작업에 실패했습니다.',
            });
          },
        });
        break;
      case 'archive':
        mutateArchive(id, {
          onSuccess: () => {
            refetchPosts();
            onSuccess?.();
            onOpenAlert({ title: '성공', type: 'success', message: '보관되었습니다.' });
          },
          onError: (error) => {
            console.error(error);
            onError?.(error);
            onOpenAlert({
              title: '오류',
              type: 'error',
              message: error.message || '작업에 실패했습니다.',
            });
          },
        });
        break;
      case 'restore':
        mutateRestore(id, {
          onSuccess: () => {
            refetchPosts();
            onSuccess?.();
            onOpenAlert({ title: '성공', type: 'success', message: '복원되었습니다.' });
          },
          onError: (error) => {
            console.error(error);
            onError?.(error);
            onOpenAlert({
              title: '오류',
              type: 'error',
              message: error.message || '작업에 실패했습니다.',
            });
          },
        });
        break;
      default:
        throw new Error('Invalid status');
    }
  };

  return { onUpdatePostStatus };
};
