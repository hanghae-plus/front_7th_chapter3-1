import type { Meta, StoryObj } from '@storybook/react';
import {
	TableRoot,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from './table';

const meta = {
	title: 'UI/Table',
	component: TableRoot,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TableRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<TableRoot>
			<table className="w-full caption-bottom text-sm">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>John Doe</TableCell>
						<TableCell>john@example.com</TableCell>
						<TableCell>Admin</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Jane Smith</TableCell>
						<TableCell>jane@example.com</TableCell>
						<TableCell>User</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Bob Johnson</TableCell>
						<TableCell>bob@example.com</TableCell>
						<TableCell>Moderator</TableCell>
					</TableRow>
				</TableBody>
			</table>
		</TableRoot>
	),
};

export const WithCaption: Story = {
	render: () => (
		<TableRoot>
			<table className="w-full caption-bottom text-sm">
				<TableCaption>A list of recent users</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Alice Williams</TableCell>
						<TableCell>alice@example.com</TableCell>
						<TableCell>Active</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Charlie Brown</TableCell>
						<TableCell>charlie@example.com</TableCell>
						<TableCell>Inactive</TableCell>
					</TableRow>
				</TableBody>
			</table>
		</TableRoot>
	),
};

export const WithFooter: Story = {
	render: () => (
		<TableRoot>
			<table className="w-full caption-bottom text-sm">
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead className="text-right">Price</TableHead>
						<TableHead className="text-right">Quantity</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Item 1</TableCell>
						<TableCell className="text-right">$10.00</TableCell>
						<TableCell className="text-right">2</TableCell>
						<TableCell className="text-right">$20.00</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Item 2</TableCell>
						<TableCell className="text-right">$15.00</TableCell>
						<TableCell className="text-right">1</TableCell>
						<TableCell className="text-right">$15.00</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Item 3</TableCell>
						<TableCell className="text-right">$8.00</TableCell>
						<TableCell className="text-right">3</TableCell>
						<TableCell className="text-right">$24.00</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className="text-right">$59.00</TableCell>
					</TableRow>
				</TableFooter>
			</table>
		</TableRoot>
	),
};

export const LargeDataset: Story = {
	render: () => (
		<TableRoot>
			<table className="w-full caption-bottom text-sm">
				<TableCaption>User Management Table</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Joined</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(10)].map((_, i) => (
						<TableRow key={i}>
							<TableCell>{i + 1}</TableCell>
							<TableCell>User {i + 1}</TableCell>
							<TableCell>user{i + 1}@example.com</TableCell>
							<TableCell>{i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Moderator' : 'User'}</TableCell>
							<TableCell>{i % 2 === 0 ? 'Active' : 'Inactive'}</TableCell>
							<TableCell>2024-01-{String(i + 1).padStart(2, '0')}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</table>
		</TableRoot>
	),
};

export const Striped: Story = {
	render: () => (
		<TableRoot>
			<table className="w-full caption-bottom text-sm">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Department</TableHead>
						<TableHead>Position</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="even:bg-muted/50">
						<TableCell>John Doe</TableCell>
						<TableCell>Engineering</TableCell>
						<TableCell>Senior Developer</TableCell>
					</TableRow>
					<TableRow className="even:bg-muted/50">
						<TableCell>Jane Smith</TableCell>
						<TableCell>Design</TableCell>
						<TableCell>UI Designer</TableCell>
					</TableRow>
					<TableRow className="even:bg-muted/50">
						<TableCell>Bob Johnson</TableCell>
						<TableCell>Marketing</TableCell>
						<TableCell>Marketing Manager</TableCell>
					</TableRow>
					<TableRow className="even:bg-muted/50">
						<TableCell>Alice Williams</TableCell>
						<TableCell>Sales</TableCell>
						<TableCell>Sales Representative</TableCell>
					</TableRow>
				</TableBody>
			</table>
		</TableRoot>
	),
};
