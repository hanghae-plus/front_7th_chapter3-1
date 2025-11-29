import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@bento/ui/alert';
import { FormModal } from '../../components/FormModal';
import { FormInput } from '../../components/FormInput';
import { FormSelect } from '../../components/FormSelect';
import { userService } from '../../services/user/userService';
import type { User } from '../../services/user/userService';
import { userSchema, type UserFormData } from './user-schema';

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  user?: User | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function UserFormModal({
  open,
  onOpenChange,
  mode,
  user,
  onSuccess,
  onError,
}: UserFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      role: 'user',
      status: 'active',
    },
  });

  useEffect(() => {
    if (open && mode === 'edit' && user) {
      reset({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else if (open && mode === 'create') {
      reset({
        username: '',
        email: '',
        role: 'user',
        status: 'active',
      });
    }
  }, [open, mode, user, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      if (mode === 'create') {
        await userService.create({
          username: data.username,
          email: data.email,
          role: data.role || 'user',
          status: data.status || 'active',
        });
        onSuccess('사용자가 생성되었습니다');
      } else if (user) {
        await userService.update(user.id, data);
        onSuccess('사용자가 수정되었습니다');
      }
      onOpenChange(false);
      reset();
    } catch (error: any) {
      onError(error.message || `${mode === 'create' ? '생성' : '수정'}에 실패했습니다`);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={mode === 'create' ? '새 사용자 만들기' : '사용자 수정'}
      size="lg"
      onSubmit={handleSubmit(handleFormSubmit)}
      onCancel={handleCancel}
      submitText={mode === 'create' ? '생성' : '수정 완료'}
      cancelText="취소"
      isSubmitting={isSubmitting}
    >
      <div>
        {mode === 'edit' && user && (
          <Alert variant="info">
            ID: {user.id} | 생성일: {user.createdAt}
          </Alert>
        )}

        <FormInput
          id="username"
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          required
          width="full"
          invalid={!!errors.username}
          invalidText={errors.username?.message}
          {...register('username')}
        />
        <FormInput
          id="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          type="email"
          required
          width="full"
          invalid={!!errors.email}
          invalidText={errors.email?.message}
          {...register('email')}
        />
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <FormSelect
            id="role"
            options={[
              { value: 'user', label: '사용자' },
              { value: 'moderator', label: '운영자' },
              { value: 'admin', label: '관리자' },
            ]}
            label="역할"
            placeholder="역할 선택"
            invalid={!!errors.role}
            invalidText={errors.role?.message}
            {...register('role')}
          />
          <FormSelect
            id="status"
            options={[
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'suspended', label: '정지' },
            ]}
            label="상태"
            placeholder="상태 선택"
            invalid={!!errors.status}
            invalidText={errors.status?.message}
            {...register('status')}
          />
        </div>
      </div>
    </FormModal>
  );
}
