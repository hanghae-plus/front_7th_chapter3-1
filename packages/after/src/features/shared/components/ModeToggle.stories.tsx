import type { Meta, StoryObj } from '@storybook/react';
import { ModeToggle } from './ModeToggle';

const meta = {
	title: 'Shared/ModeToggle',
	component: ModeToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InHeader: Story = {
	render: () => (
		<div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Application Header</h1>
					<p className="text-sm text-gray-600 dark:text-gray-400">Theme toggle example</p>
				</div>
				<ModeToggle />
			</div>
		</div>
	),
};

export const WithText: Story = {
	render: () => (
		<div className="flex items-center gap-3 p-4">
			<span className="text-sm text-gray-700 dark:text-gray-300">Theme:</span>
			<ModeToggle />
		</div>
	),
};

export const InNavigation: Story = {
	render: () => (
		<nav className="bg-white dark:bg-gray-800 shadow">
			<div className="max-w-7xl mx-auto px-4 py-3">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<div className="text-xl font-bold text-gray-900 dark:text-gray-100">MyApp</div>
						<div className="hidden md:flex space-x-4">
							<a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
								Home
							</a>
							<a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
								About
							</a>
							<a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
								Contact
							</a>
						</div>
					</div>
					<ModeToggle />
				</div>
			</div>
		</nav>
	),
};

export const MultipleToggles: Story = {
	render: () => (
		<div className="space-y-4 p-4">
			<div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded">
				<span className="text-gray-900 dark:text-gray-100">Section 1</span>
				<ModeToggle />
			</div>
			<div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded">
				<span className="text-gray-900 dark:text-gray-100">Section 2</span>
				<ModeToggle />
			</div>
			<div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded">
				<span className="text-gray-900 dark:text-gray-100">Section 3</span>
				<ModeToggle />
			</div>
		</div>
	),
};

export const InSettings: Story = {
	render: () => (
		<div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
			<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Settings</h2>
			<div className="space-y-4">
				<div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
					<div>
						<div className="font-medium text-gray-900 dark:text-gray-100">Appearance</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">
							Choose your preferred theme
						</div>
					</div>
					<ModeToggle />
				</div>
				<div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
					<div>
						<div className="font-medium text-gray-900 dark:text-gray-100">Notifications</div>
						<div className="text-sm text-gray-600 dark:text-gray-400">Manage notification settings</div>
					</div>
					<button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded text-sm">
						Configure
					</button>
				</div>
			</div>
		</div>
	),
};

export const LightModeOnly: Story = {
	render: () => (
		<div className="bg-white p-6 rounded-lg shadow">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-bold text-gray-900">Light Mode</h3>
					<p className="text-sm text-gray-600">This view shows light mode styling</p>
				</div>
				<ModeToggle />
			</div>
		</div>
	),
};

export const DarkModeOnly: Story = {
	render: () => (
		<div className="dark">
			<div className="bg-gray-800 p-6 rounded-lg shadow">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="font-bold text-gray-100">Dark Mode</h3>
						<p className="text-sm text-gray-400">This view shows dark mode styling</p>
					</div>
					<ModeToggle />
				</div>
			</div>
		</div>
	),
};
