import type { Post } from '@/features/post/types/post';
import type { User } from '@/features/user/types/user';

// Entity Type Union
export type Entity = User | Post;
export type EntityType = 'user' | 'post';
