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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="역할" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">사용자</SelectItem>
                    <SelectItem value="moderator">운영자</SelectItem>
                    <SelectItem value="admin">관리자</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                    <SelectItem value="suspended">정지</SelectItem>
                  </SelectContent>
                </Select>
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
