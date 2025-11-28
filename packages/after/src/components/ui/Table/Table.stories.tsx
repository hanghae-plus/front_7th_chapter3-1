import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './index';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleUsers = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: 'admin' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: 'user' },
  { id: 3, name: '박민수', email: 'park@example.com', role: 'moderator' },
  { id: 4, name: '정수현', email: 'jung@example.com', role: 'user' },
  { id: 5, name: '최동욱', email: 'choi@example.com', role: 'user' },
];

const sampleInvoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>이름</Table.Head>
          <Table.Head>이메일</Table.Head>
          <Table.Head>역할</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <Table.Caption>사용자 목록</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>ID</Table.Head>
          <Table.Head>이름</Table.Head>
          <Table.Head>이메일</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Method</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleInvoices.map((invoice) => (
          <Table.Row key={invoice.invoice}>
            <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
            <Table.Cell>{invoice.paymentStatus}</Table.Cell>
            <Table.Cell>{invoice.paymentMethod}</Table.Cell>
            <Table.Cell className="text-right">
              {invoice.totalAmount}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell className="text-right">$1,200.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>이름</Table.Head>
          <Table.Head>이메일</Table.Head>
          <Table.Head>역할</Table.Head>
          <Table.Head>상태</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>김철수</Table.Cell>
          <Table.Cell>kim@example.com</Table.Cell>
          <Table.Cell>
            <Badge type="danger">Admin</Badge>
          </Table.Cell>
          <Table.Cell>
            <Badge status="published" showIcon />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>이영희</Table.Cell>
          <Table.Cell>lee@example.com</Table.Cell>
          <Table.Cell>
            <Badge type="info">User</Badge>
          </Table.Cell>
          <Table.Cell>
            <Badge status="published" showIcon />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>박민수</Table.Cell>
          <Table.Cell>park@example.com</Table.Cell>
          <Table.Cell>
            <Badge type="warning">Moderator</Badge>
          </Table.Cell>
          <Table.Cell>
            <Badge status="draft" showIcon />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>이름</Table.Head>
          <Table.Head>이메일</Table.Head>
          <Table.Head>역할</Table.Head>
          <Table.Head className="text-right">액션</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="primary">
                  수정
                </Button>
                <Button size="sm" variant="danger">
                  삭제
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const HoverableRows: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>ID</Table.Head>
          <Table.Head>이름</Table.Head>
          <Table.Head>이메일</Table.Head>
          <Table.Head>역할</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleUsers.map((user) => (
          <Table.Row
            key={user.id}
            className="cursor-pointer"
            onClick={() => alert(`${user.name} 클릭됨`)}
          >
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell className="font-medium">{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const SelectableRows: Story = {
  render: () => {
    const SelectedTable = () => {
      const [selectedRows, setSelectedRows] = useState<number[]>([]);

      const toggleRow = (id: number) => {
        setSelectedRows((prev) =>
          prev.includes(id)
            ? prev.filter((rowId) => rowId !== id)
            : [...prev, id]
        );
      };

      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-12">
                <input type="checkbox" className="cursor-pointer" />
              </Table.Head>
              <Table.Head>이름</Table.Head>
              <Table.Head>이메일</Table.Head>
              <Table.Head>역할</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sampleUsers.map((user) => (
              <Table.Row
                key={user.id}
                data-state={
                  selectedRows.includes(user.id) ? 'selected' : undefined
                }
              >
                <Table.Cell>
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => toggleRow(user.id)}
                  />
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    };

    return <SelectedTable />;
  },
};

export const EmptyState: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>이름</Table.Head>
          <Table.Head>이메일</Table.Head>
          <Table.Head>역할</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={3} className="h-24 text-center">
            데이터가 없습니다.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const ComplexTable: Story = {
  render: () => {
    const posts = [
      {
        id: 1,
        title: 'React 18의 새로운 기능',
        author: '김철수',
        category: 'Development',
        status: 'published',
        views: 1234,
        date: '2024-01-15',
      },
      {
        id: 2,
        title: 'UX 디자인 원칙',
        author: '이영희',
        category: 'Design',
        status: 'draft',
        views: 456,
        date: '2024-01-14',
      },
      {
        id: 3,
        title: '접근성 가이드라인',
        author: '박민수',
        category: 'Accessibility',
        status: 'archived',
        views: 789,
        date: '2024-01-13',
      },
    ];

    return (
      <Table>
        <Table.Caption>블로그 게시물 목록</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-12">ID</Table.Head>
            <Table.Head>제목</Table.Head>
            <Table.Head>작성자</Table.Head>
            <Table.Head>카테고리</Table.Head>
            <Table.Head>상태</Table.Head>
            <Table.Head className="text-right">조회수</Table.Head>
            <Table.Head>작성일</Table.Head>
            <Table.Head className="text-right">액션</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {posts.map((post) => (
            <Table.Row key={post.id}>
              <Table.Cell className="font-medium">{post.id}</Table.Cell>
              <Table.Cell className="font-medium">{post.title}</Table.Cell>
              <Table.Cell>{post.author}</Table.Cell>
              <Table.Cell>
                <Badge
                  type={
                    post.category === 'Development'
                      ? 'primary'
                      : post.category === 'Design'
                        ? 'info'
                        : 'danger'
                  }
                  pill
                >
                  {post.category}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge
                  status={
                    post.status as
                      | 'published'
                      | 'draft'
                      | 'archived'
                      | 'rejected'
                  }
                  showIcon
                />
              </Table.Cell>
              <Table.Cell className="text-right">
                {post.views.toLocaleString()}
              </Table.Cell>
              <Table.Cell>{post.date}</Table.Cell>
              <Table.Cell className="text-right">
                <div className="flex gap-1 justify-end">
                  <Button size="sm" variant="primary">
                    수정
                  </Button>
                  {post.status === 'draft' && (
                    <Button size="sm" variant="success">
                      게시
                    </Button>
                  )}
                  {post.status === 'published' && (
                    <Button size="sm" variant="secondary">
                      보관
                    </Button>
                  )}
                  <Button size="sm" variant="danger">
                    삭제
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={5}>총 게시물</Table.Cell>
            <Table.Cell className="text-right">
              {posts
                .reduce((sum, post) => sum + post.views, 0)
                .toLocaleString()}
            </Table.Cell>
            <Table.Cell colSpan={2}>{posts.length}개</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  },
};

export const ResponsiveTable: Story = {
  render: () => (
    <div className="max-w-full">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>이름</Table.Head>
            <Table.Head className="hidden md:table-cell">이메일</Table.Head>
            <Table.Head className="hidden sm:table-cell">역할</Table.Head>
            <Table.Head>액션</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sampleUsers.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell className="font-medium">{user.name}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {user.email}
              </Table.Cell>
              <Table.Cell className="hidden sm:table-cell">
                <Badge type="info">{user.role}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button size="sm" variant="primary">
                  보기
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};
