import { z } from 'zod';
import { USER_ROLES_MAP, USER_STATES_MAP } from '../config/user-constants';

// Base schema for user creation
export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .max(20, '사용자명은 20자 이하여야 합니다')
    .regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다'),
  email: z.email('올바른 이메일 형식이 아닙니다').min(1, '이메일은 필수입니다'),
  role: z.enum(Object.values(USER_ROLES_MAP)),
  status: z.enum(Object.values(USER_STATES_MAP)),
});

// Schema for user update
export const updateUserSchema = createUserSchema.partial();

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
