import { z } from "zod";

export const userSchema = z.object({
    username: z
        .string()
        .min(3, '사용자명은 3자 이상이어야 합니다')
        .max(20, '사용자명은 20자 이하여야 합니다')
        .regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다')
        .refine((value) => !['admin', 'user', 'system', 'administrator'].includes(value), '예약된 사용자명입니다'),
    email: z
        .string()
        .email('이메일 형식이 아닙니다')
        .refine(
            (val) => val.endsWith('@company.com') || val.endsWith('@example.com'),
            '회사 이메일만 사용 가능합니다'
        ),
    role: z.enum(['user', 'moderator', 'admin']),
    status: z.enum(['active', 'inactive', 'suspended']),
});
