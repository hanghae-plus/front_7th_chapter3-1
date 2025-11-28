import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(5, "제목은 최소 5자 이상이어야 합니다"),
  author: z.string().min(2, "작성자명은 최소 2자 이상이어야 합니다"),
  category: z.string().min(1, "카테고리를 선택하세요"),
  content: z.string().min(10, "내용은 최소 10자 이상이어야 합니다"),
  status: z.enum(['draft', 'published', 'archived']),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
