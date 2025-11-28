import { getCurrentDate, getMaxValueInArrayByKey } from '@/shared/lib/utils';
import type { Post, PostStatus } from '../model/post-type';
import { POST_STATUSES_MAP } from '../config/post-constants';

// TODO: 특정 기능에 대한 유틸리티 함수는 features/post로 이동

/** ID로 포스트 찾기 */
export const findPostById = (posts: Post[], id: number): Post | null => {
  return posts.find((p) => p.id === id) ?? null;
};

/** ID로 포스트 인덱스 찾기 */
export const findPostIndexById = (posts: Post[], id: number): number => {
  return posts.findIndex((p) => p.id === id);
};

/** ID로 포스트 필터링 (제거) */
export const filterPostById = (posts: Post[], id: number): Post[] => {
  return posts.filter((p) => p.id !== id);
};

/** 포스트 제목 유효성 검증 */
export const validatePostTitle = (title: string): void => {
  if (title.length < 5) {
    throw new Error('Title must be at least 5 characters');
  }
};

/** 포스트 존재 여부 검증 */
export const validatePostExists = (post: Post | null): void => {
  if (!post) {
    throw new Error('Post not found');
  }
};

/** 포스트가 발행되지 않았는지 검증 */
export const validateNotPublished = (post: Post): void => {
  if (post.status === POST_STATUSES_MAP.published) {
    throw new Error('Post is already published');
  }
};

/** 포스트가 아카이브 상태인지 검증 */
export const validateIsArchived = (post: Post): void => {
  if (post.status !== POST_STATUSES_MAP.archived) {
    throw new Error('Only archived posts can be restored');
  }
};

/** 증가된 포스트 ID 생성 */
const getIncrementedPostId = (posts: Post[]): number => {
  return getMaxValueInArrayByKey(posts, 'id') + 1;
};

/** 새로운 포스트 생성 */
export const createNewPost = (
  posts: Post[],
  postData: Omit<Post, 'id' | 'createdAt' | 'views'>
): Post => {
  return {
    id: getIncrementedPostId(posts),
    ...postData,
    views: 0,
    createdAt: getCurrentDate(),
  };
};

/** 포스트 업데이트 */
export const createUpdatedPost = (
  post: Post,
  postData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>
): Post => {
  return {
    ...post,
    ...postData,
    updatedAt: getCurrentDate(),
  };
};

/** 포스트 상태 변경 */
export const changePostStatus = (post: Post, status: PostStatus): Post => {
  return {
    ...post,
    status,
  };
};

/** 포스트 배열에 새 포스트 추가 */
export const addNewPost = (posts: Post[], newPost: Post): Post[] => {
  return [...posts, newPost];
};

/** 포스트 배열에서 특정 포스트 업데이트 */
export const updatePostInArray = (posts: Post[], updatedPost: Post): Post[] => {
  return posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
};
