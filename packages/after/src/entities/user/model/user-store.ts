import type { User } from './user-type';
import { userService } from '../api/user-service';
import { USERS_STORAGE_KEY } from '../config/user-constants';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: Error | null;
}

// 전역 상태
let state: UsersState = {
  users: [],
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
async function loadUsers() {
  state = { ...state, isLoading: true, error: null };
  notify();

  try {
    const users = await userService.getAll();
    state = { users, isLoading: false, error: null };
    notify();
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to fetch users');
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
    loadUsers();
  }

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

/**
 * 현재 상태 스냅샷 반환
 */
function getSnapshot(): UsersState {
  return state;
}

/**
 * SSR용 스냅샷 (서버에서는 초기 상태 반환)
 */
function getServerSnapshot(): UsersState {
  return {
    users: [],
    isLoading: true,
    error: null,
  };
}

/**
 * 데이터 다시 가져오기
 */
async function refetch() {
  await loadUsers();
}

// localStorage 변경 감지 (다른 탭에서의 변경)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === USERS_STORAGE_KEY && e.newValue !== null) {
      // storage 변경 시 데이터 다시 로드
      loadUsers();
    }
  });
}

export const userStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  refetch,
};
