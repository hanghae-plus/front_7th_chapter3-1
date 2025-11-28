import type { User, UserRole, UserStatus } from '../model/user-type';

/** 유저 데이터 저장 키 */
export const USERS_STORAGE_KEY = 'users_data';

export const USER_ROLES_MAP: Record<string, UserRole> = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
};

export const USER_STATES_MAP: Record<string, UserStatus> = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
};

export const USER_ROLE_OPTIONS = [
  { value: USER_ROLES_MAP.ADMIN, label: '관리자' },
  { value: USER_ROLES_MAP.MODERATOR, label: '운영자' },
  { value: USER_ROLES_MAP.USER, label: '사용자' },
];

export const USER_STATE_OPTIONS = [
  { value: USER_STATES_MAP.ACTIVE, label: '활성' },
  { value: USER_STATES_MAP.INACTIVE, label: '비활성' },
  { value: USER_STATES_MAP.SUSPENDED, label: '정지' },
];

/** 유저 데이터 기본 값 */
export const DEFAULT_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: USER_ROLES_MAP.ADMIN,
    status: USER_STATES_MAP.ACTIVE,
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20',
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    role: USER_ROLES_MAP.USER,
    status: USER_STATES_MAP.ACTIVE,
    createdAt: '2024-01-05',
    lastLogin: '2024-01-19',
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: USER_ROLES_MAP.MODERATOR,
    status: USER_STATES_MAP.ACTIVE,
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    username: 'bob',
    email: 'bob@example.com',
    role: USER_ROLES_MAP.USER,
    status: USER_STATES_MAP.SUSPENDED,
    createdAt: '2024-01-15',
  },
];
