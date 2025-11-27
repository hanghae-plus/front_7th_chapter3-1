import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';
import type { PostStatus } from '@/features/post/types/post';

const meta = {
	title: 'Shared/StatusBadge',
	component: StatusBadge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: ['published', 'draft', 'archived', 'pending', 'rejected'],
			description: 'Post status type',
		},
	},
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
	args: {
		status: 'published',
	},
};

export const Draft: Story = {
	args: {
		status: 'draft',
	},
};

export const Archived: Story = {
	args: {
		status: 'archived',
	},
};

export const Pending: Story = {
	args: {
		status: 'pending',
	},
};

export const Rejected: Story = {
	args: {
		status: 'rejected',
	},
};

export const AllStatuses: Story = {
	render: () => {
		const statuses: PostStatus[] = ['published', 'draft', 'archived', 'pending', 'rejected'];
		return (
			<div className="flex gap-3 items-center flex-wrap">
				{statuses.map((status) => (
					<StatusBadge key={status} status={status} />
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
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Post Title</th>
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Author</th>
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Introduction to React
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">John Doe</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<StatusBadge status="published" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Advanced TypeScript
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Jane Smith</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<StatusBadge status="draft" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Old Tutorial Series
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Bob Johnson</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<StatusBadge status="archived" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							New Feature Announcement
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Alice Williams</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<StatusBadge status="pending" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Controversial Topic
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">Charlie Brown</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<StatusBadge status="rejected" />
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
				<span className="text-gray-900 dark:text-gray-100">Getting Started Guide</span>
				<StatusBadge status="published" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<span className="text-gray-900 dark:text-gray-100">Work in Progress</span>
				<StatusBadge status="draft" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<span className="text-gray-900 dark:text-gray-100">Awaiting Review</span>
				<StatusBadge status="pending" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<span className="text-gray-900 dark:text-gray-100">Old Documentation</span>
				<StatusBadge status="archived" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<span className="text-gray-900 dark:text-gray-100">Content Violation</span>
				<StatusBadge status="rejected" />
			</div>
		</div>
	),
};

export const InCard: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">Live Article</h3>
					<StatusBadge status="published" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					This article is currently published and visible to all users.
				</p>
				<div className="mt-3 text-xs text-gray-500">Published 2 days ago</div>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">Editing Draft</h3>
					<StatusBadge status="draft" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					This article is still being edited and not yet published.
				</p>
				<div className="mt-3 text-xs text-gray-500">Last edited 1 hour ago</div>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">Under Review</h3>
					<StatusBadge status="pending" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					This article is awaiting approval from moderators.
				</p>
				<div className="mt-3 text-xs text-gray-500">Submitted 3 hours ago</div>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">Old Content</h3>
					<StatusBadge status="archived" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					This article has been archived and is no longer active.
				</p>
				<div className="mt-3 text-xs text-gray-500">Archived 30 days ago</div>
			</div>
		</div>
	),
};

export const StatusFilter: Story = {
	render: () => (
		<div className="max-w-2xl space-y-4">
			<div>
				<h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Filter by Status</h3>
				<div className="flex flex-wrap gap-2">
					<button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
						<StatusBadge status="published" />
						<span className="text-sm text-gray-900 dark:text-gray-100">Published (12)</span>
					</button>
					<button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
						<StatusBadge status="draft" />
						<span className="text-sm text-gray-900 dark:text-gray-100">Drafts (5)</span>
					</button>
					<button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
						<StatusBadge status="pending" />
						<span className="text-sm text-gray-900 dark:text-gray-100">Pending (3)</span>
					</button>
					<button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
						<StatusBadge status="archived" />
						<span className="text-sm text-gray-900 dark:text-gray-100">Archived (8)</span>
					</button>
					<button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
						<StatusBadge status="rejected" />
						<span className="text-sm text-gray-900 dark:text-gray-100">Rejected (2)</span>
					</button>
				</div>
			</div>
		</div>
	),
};
