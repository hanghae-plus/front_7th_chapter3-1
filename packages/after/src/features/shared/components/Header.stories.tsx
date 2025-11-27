import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
	title: 'Shared/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
	args: {},
	render: () => (
		<div>
			<Header />
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">Page Content</h1>
				<p>
					The header is sticky and will remain at the top when scrolling. Try scrolling down to see
					the effect.
				</p>
				<div className="space-y-4 mt-8">
					{Array.from({ length: 20 }, (_, i) => (
						<p key={i}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</p>
					))}
				</div>
			</div>
		</div>
	),
};

export const DarkMode: Story = {
	args: {},
	render: () => (
		<div className="dark">
			<div className="bg-gray-900 min-h-screen">
				<Header />
				<div className="p-6 text-white">
					<h1 className="text-2xl font-bold mb-4">Dark Mode Content</h1>
					<p>This demonstrates the header in dark mode.</p>
				</div>
			</div>
		</div>
	),
};

export const InContext: Story = {
	args: {},
	render: () => (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />
			<main className="max-w-7xl mx-auto px-6 py-8">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
					<h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
						Dashboard Overview
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
						<div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
							<h3 className="font-semibold text-blue-900 dark:text-blue-100">Total Users</h3>
							<p className="text-2xl font-bold text-blue-600 dark:text-blue-300">1,234</p>
						</div>
						<div className="bg-green-50 dark:bg-green-900 p-4 rounded">
							<h3 className="font-semibold text-green-900 dark:text-green-100">Active Now</h3>
							<p className="text-2xl font-bold text-green-600 dark:text-green-300">856</p>
						</div>
						<div className="bg-orange-50 dark:bg-orange-900 p-4 rounded">
							<h3 className="font-semibold text-orange-900 dark:text-orange-100">Pending</h3>
							<p className="text-2xl font-bold text-orange-600 dark:text-orange-300">23</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	),
};
