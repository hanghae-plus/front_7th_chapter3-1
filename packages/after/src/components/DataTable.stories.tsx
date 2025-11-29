import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DataTable, type Column } from './DataTable';
import { Badge } from '@bento/ui/badge';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleUsers: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: 'User', status: 'active' },
  { id: 3, name: '이영희', email: 'lee@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: '박지민', email: 'park@example.com', role: 'Moderator', status: 'active' },
  { id: 5, name: '최수진', email: 'choi@example.com', role: 'User', status: 'inactive' },
];

const columns: Column<User>[] = [
  { key: 'id', label: 'ID', width: '60px', align: 'center' },
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'role', label: '역할' },
  {
    key: 'status',
    label: '상태',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'secondary'}>
        {row.status === 'active' ? '활성' : '비활성'}
      </Badge>
    ),
  },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Composed/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: () => <DataTable columns={columns} data={sampleUsers} />,
};

export const Striped: Story = {
  render: () => <DataTable columns={columns} data={sampleUsers} striped />,
};

export const Bordered: Story = {
  render: () => <DataTable columns={columns} data={sampleUsers} bordered />,
};

export const CompactSize: Story = {
  render: () => <DataTable columns={columns} data={sampleUsers} size="sm" striped />,
};

export const LargeSize: Story = {
  render: () => <DataTable columns={columns} data={sampleUsers} size="lg" bordered />,
};

export const EmptyState: Story = {
  render: () => <DataTable columns={columns} data={[]} emptyMessage="사용자가 없습니다." />,
};

export const ClickableRows: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={sampleUsers}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
      striped
    />
  ),
};

export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;
    const paginatedData = sampleUsers.slice((page - 1) * pageSize, page * pageSize);

    return (
      <DataTable
        columns={columns}
        data={paginatedData}
        striped
        pagination={{
          page,
          pageSize,
          totalCount: sampleUsers.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};
