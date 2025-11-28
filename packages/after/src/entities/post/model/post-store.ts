import type { Post } from './post-type';
import { postService } from '../api/post-service';
import { POSTS_STORAGE_KEY } from '../config/post-constants';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
}

// 전역 상태
let state: PostsState = {
  posts: [],
  isLoading: true,
  error: null,
};

// 구독자 리스트
let listeners: Array<() => void> = [];

// 초기화 여부
let isInitialized = false;

/**
 * 상태 변경 알림
 */
function notify() {
  listeners.forEach((listener) => listener());
}

/**
 * 데이터 로드
 */
async function loadPosts() {
  state = { ...state, isLoading: true, error: null };
  notify();

  try {
    const posts = await postService.getAll();
    state = { posts, isLoading: false, error: null };
    notify();
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to fetch posts');
    state = { ...state, isLoading: false, error };
    notify();
  }
}

/**
 * 구독 함수
 */
function subscribe(listener: () => void) {
  listeners.push(listener);

  // 첫 구독 시 초기화
  if (!isInitialized) {
    isInitialized = true;
    loadPosts();
  }

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

/**
 * 현재 상태 스냅샷 반환
 */
function getSnapshot(): PostsState {
  return state;
}

/**
 * SSR용 스냅샷 (서버에서는 초기 상태 반환)
 */
function getServerSnapshot(): PostsState {
  return {
    posts: [],
    isLoading: true,
    error: null,
  };
}

/**
 * 데이터 다시 가져오기
 */
async function refetch() {
  await loadPosts();
}

// localStorage 변경 감지 (다른 탭에서의 변경)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === POSTS_STORAGE_KEY && e.newValue !== null) {
      // storage 변경 시 데이터 다시 로드
      loadPosts();
    }
  });
}

export const postStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  refetch,
};
