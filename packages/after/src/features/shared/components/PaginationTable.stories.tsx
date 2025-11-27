import type { Meta, StoryObj } from '@storybook/react';
import { PaginationTable } from './PaginationTable';
import type { TableColumn } from './PaginationTable';

const meta = {
	title: 'Shared/PaginationTable',
	component: PaginationTable,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		striped: {
			control: 'boolean',
			description: 'Striped rows',
		},
		bordered: {
			control: 'boolean',
			description: 'Bordered table',
		},
		hover: {
			control: 'boolean',
			description: 'Hover effect on rows',
		},
		searchable: {
			control: 'boolean',
			description: 'Enable search',
		},
		sortable: {
			control: 'boolean',
			description: 'Enable sorting',
		},
		pageSize: {
			control: 'number',
			description: 'Rows per page',
		},
	},
} satisfies Meta<typeof PaginationTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
}

const sampleData: User[] = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
	{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
	{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
	{ id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User' },
	{ id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' },
];

const columns: TableColumn<User>[] = [
	{ key: 'id', header: 'ID', width: '80px' },
	{ key: 'name', header: 'Name' },
	{ key: 'email', header: 'Email' },
	{ key: 'role', header: 'Role', width: '150px' },
];

export const Default: Story = {
	args: {
		columns,
		data: sampleData,
	},
};

export const Striped: Story = {
	args: {
		columns,
		data: sampleData,
		striped: true,
	},
};

export const Bordered: Story = {
	args: {
		columns,
		data: sampleData,
		bordered: true,
	},
};

export const Hover: Story = {
	args: {
		columns,
		data: sampleData,
		hover: true,
	},
};

export const Searchable: Story = {
	args: {
		columns,
		data: sampleData,
		searchable: true,
	},
};

export const Sortable: Story = {
	args: {
		columns,
		data: sampleData,
		sortable: true,
	},
};

export const WithPagination: Story = {
	args: {
		columns,
		data: Array.from({ length: 25 }, (_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@example.com`,
			role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Moderator' : 'User',
		})),
		pageSize: 10,
	},
};

export const AllFeatures: Story = {
	args: {
		columns,
		data: Array.from({ length: 50 }, (_, i) => ({
			id: i + 1,
			name: `User ${i + 1}`,
			email: `user${i + 1}@example.com`,
			role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Moderator' : 'User',
		})),
		striped: true,
		bordered: true,
		hover: true,
		searchable: true,
		sortable: true,
		pageSize: 10,
	},
};

export const SmallPageSize: Story = {
	args: {
		columns,
		data: sampleData,
		pageSize: 2,
		striped: true,
	},
};

export const EmptyTable: Story = {
	args: {
		columns,
		data: [],
	},
};

export const CustomRendering: Story = {
	render: () => {
		const customColumns: TableColumn<User>[] = [
			{ key: 'id', header: 'ID', width: '80px' },
			{ key: 'name', header: 'Name' },
			{ key: 'email', header: 'Email' },
			{ key: 'role', header: 'Role' },
			{ key: 'actions', header: 'Actions', width: '150px' },
		];

		return (
			<PaginationTable
				columns={customColumns}
				data={sampleData}
				renderCell={(row, column) => {
					if (column.key === 'actions') {
						return (
							<div className="flex gap-2">
								<button className="text-blue-600 hover:text-blue-800">Edit</button>
								<button className="text-red-600 hover:text-red-800">Delete</button>
							</div>
						);
					}
					if (column.key === 'role') {
						const colorMap: Record<string, string> = {
							Admin: 'bg-red-500',
							Moderator: 'bg-orange-500',
							User: 'bg-blue-500',
						};
						const role = row[column.key] as string;
						return (
							<span className={`px-2 py-1 rounded text-white text-xs ${colorMap[role]}`}>{role}</span>
						);
					}
					return String(row[column.key as keyof User] ?? '');
				}}
				striped
				hover
			/>
		);
	},
};

export const ClickableRows: Story = {
	render: () => {
		const handleRowClick = (row: User) => {
			alert(`Clicked on ${row.name}`);
		};

		return (
			<PaginationTable
				columns={columns}
				data={sampleData}
				onRowClick={handleRowClick}
				hover
				striped
			/>
		);
	},
};

export const CompleteExample: Story = {
	render: () => {
		interface Product {
			id: number;
			name: string;
			category: string;
			price: number;
			stock: number;
			status: string;
		}

		const products: Product[] = [
			{ id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 15, status: 'Active' },
			{ id: 2, name: 'Mouse', category: 'Accessories', price: 29, stock: 50, status: 'Active' },
			{ id: 3, name: 'Keyboard', category: 'Accessories', price: 79, stock: 30, status: 'Active' },
			{
				id: 4,
				name: 'Monitor',
				category: 'Electronics',
				price: 299,
				stock: 8,
				status: 'Low Stock',
			},
			{
				id: 5,
				name: 'Headphones',
				category: 'Accessories',
				price: 149,
				stock: 0,
				status: 'Out of Stock',
			},
			{ id: 6, name: 'Webcam', category: 'Electronics', price: 89, stock: 25, status: 'Active' },
			{
				id: 7,
				name: 'USB Cable',
				category: 'Accessories',
				price: 9,
				stock: 100,
				status: 'Active',
			},
			{
				id: 8,
				name: 'External SSD',
				category: 'Storage',
				price: 199,
				stock: 12,
				status: 'Active',
			},
		];

		const productColumns: TableColumn<Product>[] = [
			{ key: 'id', header: 'ID', width: '60px' },
			{ key: 'name', header: 'Product Name' },
			{ key: 'category', header: 'Category', width: '150px' },
			{ key: 'price', header: 'Price', width: '100px' },
			{ key: 'stock', header: 'Stock', width: '100px' },
			{ key: 'status', header: 'Status', width: '120px' },
		];

		return (
			<div className="space-y-4">
				<h2 className="text-2xl font-bold">Product Inventory</h2>
				<PaginationTable
					columns={productColumns}
					data={products}
					renderCell={(row, column) => {
						if (column.key === 'price') {
							return `$${row.price}`;
						}
						if (column.key === 'status') {
							const colorMap: Record<string, string> = {
								Active: 'bg-green-500',
								'Low Stock': 'bg-orange-500',
								'Out of Stock': 'bg-red-500',
							};
							return (
								<span
									className={`px-2 py-1 rounded text-white text-xs ${colorMap[row.status]}`}
								>
									{row.status}
								</span>
							);
						}
						return String(row[column.key as keyof Product] ?? '');
					}}
					striped
					bordered
					hover
					searchable
					sortable
					pageSize={5}
				/>
			</div>
		);
	},
};
