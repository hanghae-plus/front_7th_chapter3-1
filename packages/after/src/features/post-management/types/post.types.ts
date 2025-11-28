export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export type PostFormData = Omit<Post, 'id' | 'createdAt' | 'views' | 'updatedAt'>;
export type PostUpdateData = Partial<PostFormData>;
