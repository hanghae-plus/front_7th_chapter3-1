export type PostStatus = 'draft' | 'published' | 'archived';

export type PostCategory = 'development' | 'design' | 'accessibility';
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: PostCategory;
  status: PostStatus;
  views: number;
  createdAt: string;
  updatedAt?: string;
}
