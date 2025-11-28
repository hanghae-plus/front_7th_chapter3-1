import {
  useUsers,
  USER_ROLES_MAP,
  USER_STATES_MAP,
  userService,
  createUserSchema,
  type CreateUserFormData,
} from '@/entities/user';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateUser = () => {
  const { refetch: refetchUsers } = useUsers();
  const { onOpenAlert } = useAlert();

  const { mutate } = useMutation(userService.create);

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      email: '',
      role: USER_ROLES_MAP.USER,
      status: USER_STATES_MAP.ACTIVE,
    },
    mode: 'onChange',
  });

  const onCreateUser = (
    data: CreateUserFormData,
    onSuccess?: () => void,
    onError?: (error: Error) => void
  ) => {
    mutate(data, {
      onSuccess: () => {
        refetchUsers();
        onSuccess?.();
        form.reset(); // 폼 초기화
        onOpenAlert({ title: '성공', type: 'success', message: '사용자가 생성되었습니다.' });
      },
      onError: (error) => {
        onOpenAlert({
          title: '오류',
          type: 'error',
          message: error.message || '사용자 생성에 실패했습니다.',
        });
        onError?.(error);
      },
    });
  };

  return { form, onCreateUser };
};
