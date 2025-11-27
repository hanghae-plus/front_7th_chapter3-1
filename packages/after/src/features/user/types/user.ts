export interface User {
	id: number;
	username: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	createdAt: string;
	lastLogin: string | null;
}

export type UserStatus = 'active' | 'inactive' | 'suspended';
export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';
export type UserFormData = Omit<User, 'id' | 'createdAt' | 'lastLogin'>;
