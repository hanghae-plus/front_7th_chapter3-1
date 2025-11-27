import type { Meta, StoryObj } from '@storybook/react';
import CategoryBadge from './CategoryBadge';
import type { Category } from '@/features/post/types/post';

const meta = {
	title: 'Post/CategoryBadge',
	component: CategoryBadge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		category: {
			control: 'select',
			options: ['development', 'design', 'accessibility'],
			description: 'Post category type',
		},
	},
} satisfies Meta<typeof CategoryBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Development: Story = {
	args: {
		category: 'development',
	},
};

export const Design: Story = {
	args: {
		category: 'design',
	},
};

export const Accessibility: Story = {
	args: {
		category: 'accessibility',
	},
};

export const AllCategories: Story = {
	render: () => {
		const categories: Category[] = ['development', 'design', 'accessibility'];
		return (
			<div className="flex gap-3 items-center">
				{categories.map((category) => (
					<CategoryBadge key={category} category={category} />
				))}
			</div>
		);
	},
};

export const InTable: Story = {
	render: () => (
		<div className="max-w-2xl">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-gray-100 dark:bg-gray-800">
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Title</th>
						<th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Category</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Building a React Component Library
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<CategoryBadge category="development" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Design System Principles
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<CategoryBadge category="design" />
						</td>
					</tr>
					<tr>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							Creating Accessible Web Apps
						</td>
						<td className="border border-gray-300 dark:border-gray-600 p-2">
							<CategoryBadge category="accessibility" />
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
				<span className="text-gray-900 dark:text-gray-100">Frontend Best Practices</span>
				<CategoryBadge category="development" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<span className="text-gray-900 dark:text-gray-100">UI/UX Guidelines</span>
				<CategoryBadge category="design" />
			</div>
			<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
				<span className="text-gray-900 dark:text-gray-100">ARIA Patterns</span>
				<CategoryBadge category="accessibility" />
			</div>
		</div>
	),
};

export const InCard: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">React Hooks Guide</h3>
					<CategoryBadge category="development" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Learn about React hooks and how to use them effectively in your applications.
				</p>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">Color Theory</h3>
					<CategoryBadge category="design" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Understanding color theory and how to apply it to your design projects.
				</p>
			</div>
			<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-bold text-gray-900 dark:text-gray-100">WCAG Guidelines</h3>
					<CategoryBadge category="accessibility" />
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Web Content Accessibility Guidelines for creating inclusive web experiences.
				</p>
			</div>
		</div>
	),
};

export const Comparison: Story = {
	render: () => (
		<div className="space-y-6 max-w-2xl">
			<div>
				<h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
					Regular vs Pill Shape
				</h3>
				<div className="flex gap-4 items-center">
					<div>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Default (Pill)</p>
						<CategoryBadge category="development" />
					</div>
				</div>
			</div>
			<div>
				<h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">All Categories</h3>
				<div className="flex flex-wrap gap-2">
					<CategoryBadge category="development" />
					<CategoryBadge category="design" />
					<CategoryBadge category="accessibility" />
				</div>
			</div>
		</div>
	),
};
