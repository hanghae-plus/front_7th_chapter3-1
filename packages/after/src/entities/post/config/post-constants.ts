import type { Post, PostCategory, PostStatus } from '../model/post-type';

/** 포스트 데이터 저장 키 */
export const POSTS_STORAGE_KEY = 'posts_data';

export const POST_CATEGORIES_MAP: Record<string, PostCategory> = {
  development: 'development',
  design: 'design',
  accessibility: 'accessibility',
} as const;

export const POST_STATUSES_MAP: Record<string, PostStatus> = {
  draft: 'draft',
  published: 'published',
  archived: 'archived',
} as const;

/** 포스트 데이터 기본 값 */
export const DEFAULT_POSTS: Post[] = [
  {
    id: 1,
    title: '디자인 시스템 구축 가이드',
    content: '디자인 시스템은...',
    author: '김철수',
    category: POST_CATEGORIES_MAP.development,
    status: POST_STATUSES_MAP.published,
    views: 1234,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'React 19 새로운 기능',
    content: 'React 19에서는...',
    author: '이영희',
    category: POST_CATEGORIES_MAP.development,
    status: POST_STATUSES_MAP.published,
    views: 856,
    createdAt: '2024-01-18',
  },
  {
    id: 3,
    title: 'TailwindCSS vs CSS-in-JS',
    content: '두 방식을 비교하면...',
    author: '박민수',
    category: POST_CATEGORIES_MAP.design,
    status: POST_STATUSES_MAP.draft,
    views: 432,
    createdAt: '2024-01-20',
  },
  {
    id: 4,
    title: '웹 접근성 체크리스트',
    content: '접근성을 위해서는...',
    author: '김철수',
    category: POST_CATEGORIES_MAP.accessibility,
    status: POST_STATUSES_MAP.published,
    views: 2341,
    createdAt: '2024-01-22',
  },
  {
    id: 5,
    title: 'TypeScript 고급 타입',
    content: 'TypeScript의 고급 타입 시스템...',
    author: '정수진',
    category: POST_CATEGORIES_MAP.development,
    status: POST_STATUSES_MAP.archived,
    views: 567,
    createdAt: '2024-01-10',
  },
];
