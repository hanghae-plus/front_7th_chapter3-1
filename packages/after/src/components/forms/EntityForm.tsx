import React from 'react';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  NativeSelect,
  NativeSelectOption,
  Textarea,
} from '@/components/ui';

type EntityType = 'user' | 'post';

interface EntityFormProps {
  entityType: EntityType;
  form: UseFormReturn<FieldValues>;
}

export const EntityForm: React.FC<EntityFormProps> = ({
  entityType,
  form,
}) => {

  if (entityType === 'user') {
    return (
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  사용자명<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="사용자명을 입력하세요" 
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  이메일<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="이메일을 입력하세요" 
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>역할</FormLabel>
                  <FormControl>
                    <NativeSelect 
                      {...field}
                      value={field.value || 'user'}
                      className="w-full"
                    >
                      <NativeSelectOption value="user">사용자</NativeSelectOption>
                      <NativeSelectOption value="moderator">운영자</NativeSelectOption>
                      <NativeSelectOption value="admin">관리자</NativeSelectOption>
                    </NativeSelect>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상태</FormLabel>
                  <FormControl>
                    <NativeSelect 
                      {...field}
                      value={field.value || 'active'}
                      className="w-full"
                    >
                      <NativeSelectOption value="active">활성</NativeSelectOption>
                      <NativeSelectOption value="inactive">비활성</NativeSelectOption>
                      <NativeSelectOption value="suspended">정지</NativeSelectOption>
                    </NativeSelect>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                제목<span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="게시글 제목을 입력하세요" 
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  작성자<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="작성자명" 
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <FormControl>
                  <NativeSelect 
                    {...field}
                    value={field.value || ''}
                    className="w-full"
                  >
                    <NativeSelectOption value="">카테고리 선택</NativeSelectOption>
                    <NativeSelectOption value="development">Development</NativeSelectOption>
                    <NativeSelectOption value="design">Design</NativeSelectOption>
                    <NativeSelectOption value="accessibility">Accessibility</NativeSelectOption>
                  </NativeSelect>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="게시글 내용을 입력하세요" 
                  rows={6} 
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
            </FormItem>
          )}
        /> 
      </div>
    </Form>
  );
};
