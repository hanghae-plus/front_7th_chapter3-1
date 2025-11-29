import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/organisms/Table';

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: '줄무늬 스타일',
    },
    hover: {
      control: 'boolean',
      description: '호버 효과',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUsers = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-20 14:30',
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-03-19 09:15',
  },
  {
    id: 3,
    username: 'bob_jones',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-03-10',
    lastLogin: '2024-03-10 16:45',
  },
];

const samplePosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    author: 'John Doe',
    category: 'development',
    status: 'published',
    views: 1234,
    createdAt: '2024-03-15',
  },
  {
    id: 2,
    title: 'Design System Best Practices',
    author: 'Jane Smith',
    category: 'design',
    status: 'draft',
    views: 567,
    createdAt: '2024-03-18',
  },
  {
    id: 3,
    title: 'Accessibility Guidelines',
    author: 'Bob Jones',
    category: 'accessibility',
    status: 'archived',
    views: 890,
    createdAt: '2024-03-10',
  },
];

const userColumns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: 'Username', width: '150px' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', width: '120px' },
  { key: 'status', header: 'Status', width: '120px' },
  { key: 'createdAt', header: 'Created', width: '120px' },
  { key: 'lastLogin', header: 'Last Login', width: '140px' },
];

const postColumns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: 'Title' },
  { key: 'author', header: 'Author', width: '120px' },
  { key: 'category', header: 'Category', width: '140px' },
  { key: 'status', header: 'Status', width: '120px' },
  { key: 'views', header: 'Views', width: '100px' },
  { key: 'createdAt', header: 'Created', width: '120px' },
];

export const UserTable: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers,
    entityType: 'user',
    striped: false,
    hover: false,
  },
};

export const PostTable: Story = {
  args: {
    columns: postColumns,
    data: samplePosts,
    entityType: 'post',
    striped: false,
    hover: false,
  },
};

export const StripedTable: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers,
    entityType: 'user',
    striped: true,
    hover: false,
  },
};

export const HoverTable: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers,
    entityType: 'user',
    striped: false,
    hover: true,
  },
};

export const StripedAndHover: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers,
    entityType: 'user',
    striped: true,
    hover: true,
  },
};

export const EmptyTable: Story = {
  args: {
    columns: userColumns,
    data: [],
    entityType: 'user',
    striped: true,
    hover: true,
  },
};

export const WithActions: Story = {
  args: {
    columns: [...userColumns, { key: 'actions', header: 'Actions', width: '200px' }],
    data: sampleUsers,
    entityType: 'user',
    striped: true,
    hover: true,
    onEdit: (item) => console.log('Edit:', item),
    onDelete: (id) => console.log('Delete:', id),
  },
};
