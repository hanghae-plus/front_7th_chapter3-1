import { z } from "zod";

export const postSchema = z.object({
    title: z
        .string()
        .min(5, '제목은 5자 이상이어야 합니다')
        .max(100, '제목은 100자 이하여야 합니다')
        .refine((value) => !['광고', '스팸', '홍보'].includes(value), '제목에 금지된 단어가 포함되어 있습니다'),
    author: z.string(),
    content: z.string(),
    category: z.enum(['development', 'design', 'accessibility']),
});
