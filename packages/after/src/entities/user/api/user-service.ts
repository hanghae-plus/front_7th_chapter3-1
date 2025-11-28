import { createStorageAdapter } from '@/shared/lib/storage';
import { DEFAULT_USERS, USERS_STORAGE_KEY } from '../config/user-constants';
import type { User } from '../model/user-type';
import {
  checkEmailDuplicated,
  checkUsernameDuplicated,
  createNewUser,
  createNewUsers,
  createUpdatedUser,
  createUpdatedUsers,
  filterUserById,
  findUserById,
  isUserAlreadyExistsByEmail,
  isUserAlreadyExistsByUsername,
} from '../lib/user-utils';

const userStorage = createStorageAdapter<User[]>(USERS_STORAGE_KEY, DEFAULT_USERS);

export const userService = {
  async getAll(): Promise<User[]> {
    return userStorage.get();
  },

  async getById(id: number): Promise<User | null> {
    const users = userStorage.get();
    return findUserById(users, id);
  },

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = userStorage.get();

    if (checkUsernameDuplicated(users, userData.username)) {
      throw new Error('Username already exists');
    }

    if (checkEmailDuplicated(users, userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = createNewUser(users, userData);
    const newUsers = createNewUsers(users, newUser);

    userStorage.set(newUsers);
    return newUser;
  },

  async update({
    id,
    userData,
  }: {
    id: number;
    userData: Partial<Omit<User, 'id' | 'createdAt'>>;
  }): Promise<User> {
    const users = userStorage.get();
    const user = findUserById(users, id);

    if (!user) {
      throw new Error('User not found');
    }

    const filteredUsers = filterUserById(users, id);

    if (isUserAlreadyExistsByUsername(filteredUsers, userData)) {
      throw new Error('Username already exists');
    }

    if (isUserAlreadyExistsByEmail(filteredUsers, userData)) {
      throw new Error('Email already exists');
    }

    const updatedUser = createUpdatedUser(user, userData);
    const updatedUsers = createUpdatedUsers(users, updatedUser);

    userStorage.set(updatedUsers);
    return updatedUser;
  },

  async delete(id: number): Promise<void> {
    const users = userStorage.get();
    const filteredUsers = filterUserById(users, id);

    if (users.length === filteredUsers.length) {
      throw new Error('User not found');
    }

    userStorage.set(filteredUsers);
  },

  async checkUsernameAvailable(username: string): Promise<boolean> {
    const users = userStorage.get();
    return !checkUsernameDuplicated(users, username);
  },

  async checkEmailAvailable(email: string): Promise<boolean> {
    const users = userStorage.get();
    return !checkEmailDuplicated(users, email);
  },
};
