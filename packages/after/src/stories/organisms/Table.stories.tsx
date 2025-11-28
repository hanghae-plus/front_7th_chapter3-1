import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from '@/components/organisms/Table';

const meta = {
  title: 'Organisms/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_COLUMNS = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const SAMPLE_DATA = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' },
];

const generateTableData = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: ['Active', 'Inactive', 'Pending'][i % 3] as 'Active' | 'Inactive' | 'Pending',
  }));

export const Default: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
  },
};

export const Striped: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
    striped: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
    bordered: true,
  },
};

export const Hover: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
    hover: true,
  },
};

export const Sortable: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
    sortable: true,
  },
};

export const Searchable: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: SAMPLE_DATA,
    searchable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: generateTableData(25),
    pageSize: 5,
  },
};

export const AllFeatures: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    data: generateTableData(15),
    striped: true,
    hover: true,
    sortable: true,
    searchable: true,
    pageSize: 5,
  },
};

