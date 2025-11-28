import {
  compareEqual,
  compareLowerCase,
  getCurrentDate,
  getMaxValueInArrayByKey,
} from '@/shared/lib/utils';
import type { User } from '../model/user-type';

/** 유저명 중복 체크 */
export const checkUsernameDuplicated = (users: User[], username: string) => {
  return users.some((u) => compareLowerCase(u.username, username));
};

/** 이메일 중복 체크 */
export const checkEmailDuplicated = (users: User[], email: string) => {
  return users.some((u) => compareLowerCase(u.email, email));
};

/** Post에서 동일한 로직 사용 시 shared로 이동 */
const getIncrementedUserId = (users: User[]) => {
  return getMaxValueInArrayByKey(users, 'id') + 1;
};

// TODO: features/user/create-user로 이동
/** 새로운 유저 생성  */
export const createNewUser = (users: User[], userData: Omit<User, 'id' | 'createdAt'>) => {
  return {
    id: getIncrementedUserId(users),
    ...userData,
    createdAt: getCurrentDate(),
  };
};

export const createNewUsers = (users: User[], newUser: User): User[] => {
  return [...users, newUser];
};

// TODO: features/user/update-user로 이동
export const isUserAlreadyExistsByUsername = (users: User[], compareUser: Partial<User>) => {
  if (!compareUser.username) return false;

  return users.some(
    (u) =>
      compareLowerCase(u.username, compareUser.username!) && !compareEqual(u.id, compareUser.id)
  );
};

// TODO: features/user/update-user로 이동
export const isUserAlreadyExistsByEmail = (users: User[], compareUser: Partial<User>) => {
  if (!compareUser.email) return false;

  return users.some(
    (u) => compareLowerCase(u.email, compareUser.email!) && !compareEqual(u.id, compareUser.id)
  );
};

export const findUserById = (users: User[], id: number): User | null => {
  return users.find((u) => u.id === id) ?? null;
};

export const createUpdatedUsers = (users: User[], userData: User) => {
  return users.map((user) => {
    if (user.id === userData.id) {
      return { ...user, ...userData };
    }
    return user;
  });
};

export const createUpdatedUser = (user: User, userData: Partial<User>) => {
  return { ...user, ...userData };
};

export const filterUserById = (users: User[], id: number) => {
  return users.filter((u) => u.id !== id);
};
