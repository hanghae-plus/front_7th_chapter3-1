import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, forwardRef } from "react";
import {
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/ui";
import type { UserFormData } from "@/features/user/types";

type UserFormValues = z.infer<typeof userFormSchema>;

type UserFormProps = {
  formData: UserFormData;
  onSubmit: (formData: UserFormData) => void;
};

const userFormSchema = z.object({
  username: z.string().min(1, "사용자명을 입력해주세요"),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  role: z
    .string()
    .min(1, "역할을 선택해주세요")
    .refine(
      (val) => ["user", "moderator", "admin"].includes(val),
      "올바른 역할을 선택해주세요"
    ),
  status: z
    .string()
    .min(1, "상태를 선택해주세요")
    .refine(
      (val) => ["active", "inactive", "suspended"].includes(val),
      "올바른 상태를 선택해주세요"
    ),
});

export const UserForm = forwardRef<HTMLFormElement, UserFormProps>(
  ({ formData, onSubmit }, ref) => {
    const form = useForm({
      resolver: zodResolver(userFormSchema),
      defaultValues: {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      },
    });

    useEffect(() => {
      form.reset({
        username: formData.username,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      });
    }, [formData, form]);

    const handleSubmit = (values: UserFormValues) => {
      onSubmit(values as UserFormData);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
                  사용자명
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
                  이메일
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
                  역할
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">역할을 선택하세요</option>
                    <option value="user">사용자</option>
                    <option value="moderator">운영자</option>
                    <option value="admin">관리자</option>
                  </select>
                </FormControl>
                <FormMessage />
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
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">상태를 선택하세요</option>
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                    <option value="suspended">정지</option>
                  </select>
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
UserForm.displayName = "UserForm";
