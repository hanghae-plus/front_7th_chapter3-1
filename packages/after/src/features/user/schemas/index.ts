import { z } from 'zod';

// Reserved username words
const RESERVED_USERNAMES = ['admin', 'root', 'system', 'administrator'];

// User validation schema (based on useFormValidation hook)
export const userFormSchema = z.object({
	username: z
		.string()
		.min(1, '사용자명을 입력하세요')
		.min(3, '사용자명은 3자 이상이어야 합니다')
		.max(20, '사용자명은 20자 이하여야 합니다')
		.regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다')
		.refine(
			(value) => !RESERVED_USERNAMES.includes(value.toLowerCase()),
			'예약된 사용자명입니다',
		),
	email: z
		.string()
		.min(1, '이메일을 입력하세요')
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '올바른 이메일 형식이 아닙니다'),
	role: z.enum(['admin', 'moderator', 'user', 'guest'], {
		message: '역할을 선택하세요',
	}),
	status: z.enum(['active', 'inactive', 'suspended'], {
		message: '상태를 선택하세요',
	}),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

// Optional: User form schema with company email requirement
export const userFormSchemaWithCompanyEmail = userFormSchema.extend({
	email: z
		.string()
		.min(1, '이메일을 입력하세요')
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '올바른 이메일 형식이 아닙니다')
		.refine(
			(value) => value.endsWith('@company.com') || value.endsWith('@example.com'),
			'회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다',
		),
});
