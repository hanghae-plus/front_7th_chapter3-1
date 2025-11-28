import {
  useUsers,
  userService,
  type User,
  updateUserSchema,
  type UpdateUserFormData,
} from '@/entities/user';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export const useUpdateUser = (initialUser: User) => {
  const { refetch: refetchUsers } = useUsers();

  const { mutate } = useMutation(userService.update);
  const { onOpenAlert } = useAlert();

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: initialUser.username,
      email: initialUser.email,
      role: initialUser.role,
      status: initialUser.status,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset({
      username: initialUser.username,
      email: initialUser.email,
      role: initialUser.role,
      status: initialUser.status,
    });
  }, [initialUser, form]);

  const onUpdateUser = (
    data: UpdateUserFormData,
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  ) => {
    mutate(
      { id: initialUser.id, userData: data },
      {
        onSuccess: () => {
          refetchUsers();
          onSuccess?.();
          form.reset();
          onOpenAlert({ title: '성공', type: 'success', message: '사용자가 수정되었습니다.' });
        },
        onError: (error) => {
          console.error(error);
          onError?.(error);
          onOpenAlert({
            title: '오류',
            type: 'error',
            message: error.message || '수정에 실패했습니다.',
          });
        },
      }
    );
  };

  return { form, onUpdateUser };
};
