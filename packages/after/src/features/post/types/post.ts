export interface Post {
	id: number;
	title: string;
	content: string;
	author: string;
	category: Category;
	status: PostStatus;
	views: number;
	createdAt: string;
}

export type PostStatus = 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
export type Category = 'development' | 'design' | 'accessibility';
export type PostFormData = Omit<Post, 'id' | 'createdAt' | 'views'>;
