import { z } from 'zod';

// Banned words in post titles
const BANNED_WORDS = ['광고', '스팸', '홍보'];

// Post validation schema (based on useFormValidation hook)
export const postFormSchema = z.object({
	title: z
		.string()
		.min(1, '제목을 입력하세요')
		.min(5, '제목은 5자 이상이어야 합니다')
		.max(100, '제목은 100자 이하여야 합니다')
		.refine(
			(value) => !BANNED_WORDS.some((word) => value.includes(word)),
			'제목에 금지된 단어가 포함되어 있습니다',
		),
	content: z
		.string()
		.min(1, '내용을 입력하세요')
		.min(10, '내용은 최소 10자 이상이어야 합니다'),
	author: z
		.string()
		.min(1, '작성자를 입력하세요')
		.min(2, '작성자명은 최소 2자 이상이어야 합니다')
		.max(50, '작성자명은 최대 50자까지 입력 가능합니다'),
	category: z.enum(['development', 'design', 'accessibility'], {
		message: '카테고리를 선택하세요',
	}),
	status: z.enum(['published', 'draft', 'archived', 'pending', 'rejected'], {
		message: '상태를 선택하세요',
	}),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;
