import type { Meta, StoryObj } from '@storybook/react';
import UserRoleBadge from './UserRoleBadge';
import type { UserRole } from '@/features/user/types/user';

const meta = {
	title: 'User/UserRoleBadge',
	component: UserRoleBadge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		userRole: {
			control: 'select',
			options: ['admin', 'moderator', 'user', 'guest'],
			description: 'User role type',
		},
	},
} satisfies Meta<typeof UserRoleBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
	args: {
		userRole: 'admin',
	},
};

export const Moderator: Story = {
	args: {
		userRole: 'moderator',
	},
};

export const User: Story = {
	args: {
		userRole: 'user',
	},
};

export const Guest: Story = {
	args: {
		userRole: 'guest',
	},
};

export const AllRoles: Story = {
	render: () => {
		const roles: UserRole[] = ['admin', 'moderator', 'user', 'guest'];
		return (
			<div className="flex gap-3 items-center flex-wrap">
				{roles.map((role) => (
					<UserRoleBadge key={role} userRole={role} />
				))}
			</div>
		);
	},
};

export const InTable: Story = {
	render: () => (
		<div className="max-w-3xl">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-gray-100 dark:bg-gray-800">
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Name</th>
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Email</th>
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">John Doe</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">john@example.com</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<UserRoleBadge userRole="admin" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Jane Smith</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">jane@example.com</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<UserRoleBadge userRole="moderator" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Bob Johnson</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">bob@example.com</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<UserRoleBadge userRole="user" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Anonymous</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">-</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<UserRoleBadge userRole="guest" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	),
};

export const InList: Story = {
	render: () => (
		<div className="space-y-3 max-w-md">
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<div>
					<div className="font-medium text-gray-900 dark:text-gray-100">John Doe</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">john@example.com</div>
				</div>
				<UserRoleBadge userRole="admin" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<div>
					<div className="font-medium text-gray-900 dark:text-gray-100">Jane Smith</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">jane@example.com</div>
				</div>
				<UserRoleBadge userRole="moderator" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<div>
					<div className="font-medium text-gray-900 dark:text-gray-100">Bob Johnson</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">bob@example.com</div>
				</div>
				<UserRoleBadge userRole="user" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<div>
					<div className="font-medium text-gray-900 dark:text-gray-100">Anonymous User</div>
					<div className="text-sm text-gray-600 dark:text-gray-400">Not logged in</div>
				</div>
				<UserRoleBadge userRole="guest" />
			</div>
		</div>
	),
};

export const InCard: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center gap-4 mb-3">
					<div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-300 font-bold">
						AD
					</div>
					<div className="flex-1">
						<h3 className="font-bold text-gray-900 dark:text-gray-100">John Doe</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
					</div>
					<UserRoleBadge userRole="admin" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Full access to all system features and settings.
				</p>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center gap-4 mb-3">
					<div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-300 font-bold">
						MO
					</div>
					<div className="flex-1">
						<h3 className="font-bold text-gray-900 dark:text-gray-100">Jane Smith</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">jane@example.com</p>
					</div>
					<UserRoleBadge userRole="moderator" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Can manage content and moderate user activities.
				</p>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center gap-4 mb-3">
					<div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
						US
					</div>
					<div className="flex-1">
						<h3 className="font-bold text-gray-900 dark:text-gray-100">Bob Johnson</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">bob@example.com</p>
					</div>
					<UserRoleBadge userRole="user" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Regular user with standard permissions.
				</p>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center gap-4 mb-3">
					<div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
						GU
					</div>
					<div className="flex-1">
						<h3 className="font-bold text-gray-900 dark:text-gray-100">Anonymous</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">Visitor</p>
					</div>
					<UserRoleBadge userRole="guest" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Limited access, view-only permissions.
				</p>
			</div>
		</div>
	),
};

export const RoleHierarchy: Story = {
	render: () => (
		<div className="max-w-md space-y-4">
			<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Role Hierarchy</h3>
			<div className="space-y-3">
				<div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
					<UserRoleBadge userRole="admin" />
					<div className="flex-1">
						<div className="font-medium text-gray-900 dark:text-gray-100">Administrator</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Highest level access</div>
					</div>
				</div>
				<div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded border-l-4 border-orange-500">
					<UserRoleBadge userRole="moderator" />
					<div className="flex-1">
						<div className="font-medium text-gray-900 dark:text-gray-100">Moderator</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Content management</div>
					</div>
				</div>
				<div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
					<UserRoleBadge userRole="user" />
					<div className="flex-1">
						<div className="font-medium text-gray-900 dark:text-gray-100">User</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Standard access</div>
					</div>
				</div>
				<div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded border-l-4 border-gray-500">
					<UserRoleBadge userRole="guest" />
					<div className="flex-1">
						<div className="font-medium text-gray-900 dark:text-gray-100">Guest</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Limited access</div>
					</div>
				</div>
			</div>
		</div>
	),
};
