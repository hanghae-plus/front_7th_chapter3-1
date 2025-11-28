import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(1, "사용자명을 입력하세요"),
  email: z.string().min(1, "이메일을 입력하세요").email("올바른 이메일 형식이 아닙니다"),
  role: z.enum(['admin', 'moderator', 'user']),
  status: z.enum(['active', 'inactive', 'suspended']),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
