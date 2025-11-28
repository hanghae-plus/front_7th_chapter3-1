import { Form, FormInputField, FormSelectField } from '@/shared/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { UpdateUserFormData } from '@/entities/user';

interface UpdateUserFormProps {
  form: UseFormReturn<UpdateUserFormData>;
}

export const UpdateUserForm = ({ form }: UpdateUserFormProps) => {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormInputField
          control={form.control}
          name="username"
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          required
        />
        <FormInputField
          control={form.control}
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          type="email"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <FormSelectField
            control={form.control}
            name="role"
            label="역할"
            options={[
              { value: 'user', label: '사용자' },
              { value: 'moderator', label: '운영자' },
              { value: 'admin', label: '관리자' },
            ]}
          />
          <FormSelectField
            control={form.control}
            name="status"
            label="상태"
            options={[
              { value: 'active', label: '활성' },
              { value: 'inactive', label: '비활성' },
              { value: 'suspended', label: '정지' },
            ]}
          />
        </div>
      </div>
    </Form>
  );
};
