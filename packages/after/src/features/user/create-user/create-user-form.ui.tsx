import { Form, FormSelectField, FormInputField } from '@/shared/ui/form';
import { type CreateUserFormData, USER_ROLE_OPTIONS, USER_STATE_OPTIONS } from '@/entities/user';
import type { UseFormReturn } from 'react-hook-form';

interface CreateUserFormProps {
  form: UseFormReturn<CreateUserFormData>;
}

export const CreateUserForm = ({ form }: CreateUserFormProps) => {
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
            options={USER_ROLE_OPTIONS}
          />
          <FormSelectField
            control={form.control}
            name="status"
            label="상태"
            options={USER_STATE_OPTIONS}
          />
        </div>
      </div>
    </Form>
  );
};
