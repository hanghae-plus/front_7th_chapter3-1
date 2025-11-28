import { Form, FormSelectField, FormInputField, FormTextareaField } from '@/shared/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { UpdatePostFormData } from '@/entities/post';

interface UpdatePostFormProps {
  form: UseFormReturn<UpdatePostFormData>;
}

export const UpdatePostForm = ({ form }: UpdatePostFormProps) => {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormInputField
          control={form.control}
          name="title"
          label="제목"
          placeholder="게시글 제목을 입력하세요"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInputField
            control={form.control}
            name="author"
            label="작성자"
            placeholder="작성자명"
            required
          />
          <FormSelectField
            control={form.control}
            name="category"
            label="카테고리"
            placeholder="카테고리 선택"
            options={[
              { value: 'development', label: 'Development' },
              { value: 'design', label: 'Design' },
              { value: 'accessibility', label: 'Accessibility' },
            ]}
          />
        </div>
        <FormTextareaField
          control={form.control}
          name="content"
          label="내용"
          placeholder="게시글 내용을 입력하세요"
          rows={6}
        />
      </div>
    </Form>
  );
};
