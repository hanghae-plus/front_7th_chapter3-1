import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormInput,
  FormSelect,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../shared/ui";
import { userFormSchema, type UserFormValues } from "../schemas/user.schema";

interface UserFormProps {
  formData: Partial<UserFormValues>;
  onChange: (data: Partial<UserFormValues>) => void;
  onSubmit?: (data: UserFormValues) => void;
  serverError?: { field?: keyof UserFormValues; message: string } | null;
}

export const UserForm: React.FC<UserFormProps> = ({ formData, onChange, onSubmit, serverError }) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: formData.username || "",
      email: formData.email || "",
      role: formData.role || "user",
      status: formData.status || "active",
    },
  });

  // 폼 값이 변경될 때마다 부모에게 알림
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onChange(value as Partial<UserFormValues>);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // 서버 에러를 form에 설정
  React.useEffect(() => {
    if (serverError && serverError.field) {
      console.log('UserForm serverError:', serverError);
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
        id="user-create-form"
        onSubmit={form.handleSubmit((data) => {
          if (onSubmit) {
            onSubmit(data);
          }
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <FormInput
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="사용자명을 입력하세요"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <FormInput
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="이메일을 입력하세요"
                  type="email"
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>역할</FormLabel>
                <FormControl>
                  <FormSelect
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "user", label: "사용자" },
                      { value: "moderator", label: "운영자" },
                      { value: "admin", label: "관리자" },
                    ]}
                    size="md"
                    noWrapper
                  />
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
                  <FormSelect
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "active", label: "활성" },
                      { value: "inactive", label: "비활성" },
                      { value: "suspended", label: "정지" },
                    ]}
                    size="md"
                    noWrapper
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
