import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, forwardRef } from "react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui";
import type { PostFormData } from "@/features/post/types";

type PostFormValues = z.infer<typeof postFormSchema>;

type PostFormProps = {
  formData: PostFormData;
  onSubmit: (formData: PostFormData) => void;
};
const postFormSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다"),
  author: z.string().min(1, "작성자를 입력해주세요"),
  category: z
    .string()
    .min(1, "카테고리를 선택해주세요")
    .refine(
      (val) => ["development", "design", "accessibility"].includes(val),
      "올바른 카테고리를 선택해주세요"
    ),
  content: z.string().optional(),
});

export const PostForm = forwardRef<HTMLFormElement, PostFormProps>(
  ({ formData, onSubmit }, ref) => {
    const form = useForm({
      resolver: zodResolver(postFormSchema),
      defaultValues: {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        content: formData.content,
      },
    });

    useEffect(() => {
      form.reset({
        title: formData.title,
        author: formData.author,
        category: formData.category,
        content: formData.content,
      });
    }, [formData, form]);

    const handleSubmit = (values: PostFormValues) => {
      onSubmit(values as PostFormData);
    };

    return (
      <Form {...form}>
        <form
          ref={ref}
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
                  제목
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
                  작성자
                </FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
                  카테고리
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="accessibility">Accessibility</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea placeholder="게시글 내용을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);
PostForm.displayName = "PostForm";
