import { z } from 'zod';
import { POST_CATEGORIES_MAP, POST_STATUSES_MAP } from '../config/post-constants';

// Base schema for post creation
export const createPostSchema = z.object({
  title: z.string().min(5, '제목은 5자 이상이어야 합니다').max(100, '제목은 100자 이하여야 합니다'),
  content: z
    .string()
    .min(10, '내용은 10자 이상이어야 합니다')
    .max(5000, '내용은 5000자 이하여야 합니다'),
  author: z
    .string()
    .min(2, '작성자명은 2자 이상이어야 합니다')
    .max(50, '작성자명은 50자 이하여야 합니다'),
  category: z.enum(Object.values(POST_CATEGORIES_MAP)),
  status: z.enum(Object.values(POST_STATUSES_MAP)),
});

// Schema for post update
export const updatePostSchema = createPostSchema.partial();

export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
