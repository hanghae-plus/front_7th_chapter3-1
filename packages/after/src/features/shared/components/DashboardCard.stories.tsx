import type { Meta, StoryObj } from '@storybook/react';
import DashboardCard from './DashboardCard';

const meta = {
	title: 'Shared/DashboardCard',
	component: DashboardCard,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: ['blue', 'green', 'orange', 'red', 'gray'],
			description: 'Card color theme',
		},
	},
} satisfies Meta<typeof DashboardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
	args: {
		label: 'Total Users',
		value: 1234,
		color: 'blue',
	},
};

export const Green: Story = {
	args: {
		label: 'Active Users',
		value: 856,
		color: 'green',
	},
};

export const Orange: Story = {
	args: {
		label: 'Pending Reviews',
		value: 23,
		color: 'orange',
	},
};

export const Red: Story = {
	args: {
		label: 'Critical Issues',
		value: 5,
		color: 'red',
	},
};

export const Gray: Story = {
	args: {
		label: 'Total Posts',
		value: 456,
		color: 'gray',
	},
};

export const LargeNumbers: Story = {
	render: () => (
		<div className="grid grid-cols-3 gap-4">
			<DashboardCard label="Total Revenue" value={1234567} color="blue" />
			<DashboardCard label="Page Views" value={987654} color="green" />
			<DashboardCard label="Downloads" value={543210} color="orange" />
		</div>
	),
};

export const Dashboard: Story = {
	render: () => (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
			<DashboardCard label="Total Users" value={1234} color="blue" />
			<DashboardCard label="Active Sessions" value={856} color="green" />
			<DashboardCard label="Pending Tasks" value={23} color="orange" />
			<DashboardCard label="Critical Alerts" value={5} color="red" />
		</div>
	),
};

export const MixedColors: Story = {
	render: () => (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
			<DashboardCard label="Blue Card" value={100} color="blue" />
			<DashboardCard label="Green Card" value={200} color="green" />
			<DashboardCard label="Orange Card" value={300} color="orange" />
			<DashboardCard label="Red Card" value={400} color="red" />
			<DashboardCard label="Gray Card" value={500} color="gray" />
		</div>
	),
};

export const SmallValues: Story = {
	render: () => (
		<div className="grid grid-cols-3 gap-4">
			<DashboardCard label="New" value={3} color="blue" />
			<DashboardCard label="In Progress" value={7} color="orange" />
			<DashboardCard label="Completed" value={12} color="green" />
		</div>
	),
};

export const ZeroValues: Story = {
	render: () => (
		<div className="grid grid-cols-4 gap-4">
			<DashboardCard label="Errors" value={0} color="green" />
			<DashboardCard label="Warnings" value={0} color="blue" />
			<DashboardCard label="Issues" value={0} color="gray" />
			<DashboardCard label="Alerts" value={0} color="orange" />
		</div>
	),
};

export const LongLabels: Story = {
	render: () => (
		<div className="grid grid-cols-2 gap-4 max-w-2xl">
			<DashboardCard label="Total Active Users This Month" value={1234} color="blue" />
			<DashboardCard label="Pending Approval Requests" value={45} color="orange" />
			<DashboardCard label="Completed Tasks This Week" value={89} color="green" />
			<DashboardCard label="Critical System Alerts Today" value={2} color="red" />
		</div>
	),
};

export const CompleteDashboardExample: Story = {
	render: () => (
		<div className="space-y-6 max-w-7xl">
			<div>
				<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
					Overview Dashboard
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<DashboardCard label="Total Users" value={12543} color="blue" />
					<DashboardCard label="Active Now" value={2341} color="green" />
					<DashboardCard label="Pending" value={156} color="orange" />
					<DashboardCard label="Issues" value={8} color="red" />
				</div>
			</div>
			<div>
				<h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
					Content Statistics
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<DashboardCard label="Total Posts" value={5678} color="gray" />
					<DashboardCard label="Published" value={4523} color="green" />
					<DashboardCard label="Drafts" value={1155} color="blue" />
				</div>
			</div>
		</div>
	),
};
