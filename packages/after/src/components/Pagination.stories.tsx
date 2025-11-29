import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Composed/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <Pagination page={page} pageSize={10} totalCount={100} onPageChange={setPage} />
    );
  },
};

export const FirstPage: Story = {
  args: {
    page: 1,
    pageSize: 10,
    totalCount: 50,
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    page: 3,
    pageSize: 10,
    totalCount: 50,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    page: 5,
    pageSize: 10,
    totalCount: 50,
    onPageChange: () => {},
  },
};

export const SmallDataset: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <Pagination page={page} pageSize={10} totalCount={25} onPageChange={setPage} />
    );
  },
};

export const LargeDataset: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <Pagination page={page} pageSize={20} totalCount={500} onPageChange={setPage} />
    );
  },
};

export const SinglePage: Story = {
  render: () => (
    <div className="text-gray-500 text-sm">
      <p className="mb-4">페이지가 1개일 때는 Pagination이 렌더링되지 않습니다:</p>
      <Pagination page={1} pageSize={10} totalCount={5} onPageChange={() => {}} />
      <p className="mt-2 italic">(아무것도 표시되지 않음)</p>
    </div>
  ),
};

export const Interactive: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalCount = 87;

    return (
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <label className="text-sm">페이지 크기:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={setPage}
        />
        <div className="text-sm text-gray-600">
          현재 페이지: {page}, 페이지 크기: {pageSize}, 총 개수: {totalCount}
        </div>
      </div>
    );
  },
};
