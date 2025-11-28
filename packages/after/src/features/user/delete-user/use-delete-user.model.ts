import { userService, useUsers } from '@/entities/user';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';

export const useDeleteUser = () => {
  const { refetch: refetchUsers } = useUsers();

  const { mutate } = useMutation(userService.delete);
  const { onOpenAlert } = useAlert();

  const onDeleteUser = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        refetchUsers();
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
  return { onDeleteUser };
};
