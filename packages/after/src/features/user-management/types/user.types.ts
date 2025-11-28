export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export type UserFormData = Omit<User, 'id' | 'createdAt' | 'lastLogin'>;
export type UserUpdateData = Partial<UserFormData>;
