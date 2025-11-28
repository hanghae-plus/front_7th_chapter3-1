import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../shared/ui";
import { postFormSchema, type PostFormValues } from "../schemas/post.schema";

interface PostFormProps {
  formData: Partial<PostFormValues>;
  onChange: (data: Partial<PostFormValues>) => void;
  onSubmit?: (data: PostFormValues) => void;
  serverError?: { field?: keyof PostFormValues; message: string } | null;
}

export const PostForm: React.FC<PostFormProps> = ({
  formData,
  onChange,
  onSubmit,
  serverError
}) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: formData.title || "",
      author: formData.author || "",
      category: formData.category || "",
      content: formData.content || "",
      status: formData.status || "draft",
    },
  });

  // 폼 값이 변경될 때마다 부모에게 알림
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onChange(value as Partial<PostFormValues>);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // 서버 에러를 form에 설정
  React.useEffect(() => {
    if (serverError && serverError.field) {
      console.log('PostForm serverError:', serverError);
      console.log(`Setting error on field: ${serverError.field}`);
      form.setError(serverError.field, {
        type: "server",
        message: serverError.message,
      });
    }
  }, [serverError, form]);

  return (
    <Form {...form}>
      <form
        id="post-create-form"
        onSubmit={form.handleSubmit((data) => {
          if (onSubmit) {
            onSubmit(data);
          }
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <FormInput
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="게시글 제목을 입력하세요"
                  required
                  width="full"
                  noWrapper
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>작성자</FormLabel>
                <FormControl>
                  <FormInput
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="작성자명"
                    required
                    width="full"
                    noWrapper
                  />
                </FormControl>
                <FormMessage />
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
                  <FormSelect
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "development", label: "Development" },
                      { value: "design", label: "Design" },
                      { value: "accessibility", label: "Accessibility" },
                    ]}
                    placeholder="카테고리 선택"
                    size="md"
                    noWrapper
                  />
                </FormControl>
                <FormMessage />
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
                <FormTextarea
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="게시글 내용을 입력하세요"
                  rows={6}
                  noWrapper
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
