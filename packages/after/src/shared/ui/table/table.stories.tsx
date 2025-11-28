import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { useState } from 'react';

/**
 * # Table 컴포넌트
 *
 * Table은 데이터를 행과 열로 구조화하여 표시하는 컴포넌트입니다.
 * 다양한 스타일 변형과 정렬, 정렬 기능을 제공합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import {
 *   Table,
 *   TableHeader,
 *   TableBody,
 *   TableHead,
 *   TableRow,
 *   TableCell
 * } from '@/shared/ui/table';
 *
 * function MyComponent() {
 *   return (
 *     <Table variant="default">
 *       <TableHeader>
 *         <TableRow>
 *           <TableHead>Name</TableHead>
 *           <TableHead>Email</TableHead>
 *         </TableRow>
 *       </TableHeader>
 *       <TableBody>
 *         <TableRow>
 *           <TableCell>John Doe</TableCell>
 *           <TableCell>john@example.com</TableCell>
 *         </TableRow>
 *       </TableBody>
 *     </Table>
 *   );
 * }
 * ```
 *
 * ## 구성 요소
 *
 * - **Table**: 루트 테이블 컴포넌트 (자동으로 스크롤 가능한 컨테이너로 감싸짐)
 * - **TableHeader**: 테이블 헤더 영역 (thead)
 * - **TableBody**: 테이블 본문 영역 (tbody)
 * - **TableFooter**: 테이블 푸터 영역 (tfoot)
 * - **TableRow**: 테이블 행 (tr)
 * - **TableHead**: 테이블 헤더 셀 (th) - 정렬 기능 지원
 * - **TableCell**: 테이블 데이터 셀 (td)
 * - **TableCaption**: 테이블 캡션 (caption)
 *
 * ## 특징
 *
 * - **다양한 변형(Variants)**: default, bordered, striped, hover
 * - **정렬 가능한 헤더**: isSortable과 sortDirection props로 정렬 표시
 * - **반응형 디자인**: 자동 가로 스크롤 지원
 * - **접근성**: 시맨틱 HTML 구조와 ARIA 속성 지원
 */
const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Table 컴포넌트는 구조화된 데이터를 행과 열로 표시하는 컴포넌트입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'table-duplicate-name', enabled: true },
          { id: 'th-has-data-cells', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Table의 시각적 스타일을 결정합니다',
      control: { type: 'select' },
      options: ['default', 'bordered', 'striped', 'hover'],
      table: {
        type: { summary: 'TableVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      description: 'Table 내부에 표시될 컨텐츠',
      control: false,
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * 기본 Table 스타일입니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
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
            <TableCell>Developer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Manager</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

/**
 * Bordered 변형 Table입니다. 모든 셀에 경계선이 표시됩니다.
 */
export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Laptop</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mouse</TableCell>
            <TableCell>$29</TableCell>
            <TableCell>120</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Keyboard</TableCell>
            <TableCell>$79</TableCell>
            <TableCell>45</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

/**
 * Striped 변형 Table입니다. 짝수 행에 배경색이 적용됩니다.
 */
export const Striped: Story = {
  args: {
    variant: 'striped',
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Project Alpha</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Project Beta</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Project Gamma</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>Project Delta</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

/**
 * Hover 변형 Table입니다. 마우스 오버 시 행이 강조됩니다.
 */
export const Hover: Story = {
  args: {
    variant: 'hover',
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>#12345</TableCell>
            <TableCell>Alice Brown</TableCell>
            <TableCell>$450.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#12346</TableCell>
            <TableCell>Charlie Davis</TableCell>
            <TableCell>$320.50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#12347</TableCell>
            <TableCell>Diana Evans</TableCell>
            <TableCell>$680.00</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

/**
 * 캡션이 포함된 Table입니다.
 */
export const WithCaption: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <TableCaption>Employee directory for Q4 2024</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Emma Wilson</TableCell>
            <TableCell>Engineering</TableCell>
            <TableCell>$120,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Frank Miller</TableCell>
            <TableCell>Marketing</TableCell>
            <TableCell>$95,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Grace Lee</TableCell>
            <TableCell>Sales</TableCell>
            <TableCell>$110,000</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
};

/**
 * 푸터가 포함된 Table입니다.
 */
export const WithFooter: Story = {
  args: {
    variant: 'bordered',
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Product A</TableCell>
            <TableCell>2</TableCell>
            <TableCell>$50.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product B</TableCell>
            <TableCell>1</TableCell>
            <TableCell>$30.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product C</TableCell>
            <TableCell>3</TableCell>
            <TableCell>$45.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>6</TableCell>
            <TableCell>$125.00</TableCell>
          </TableRow>
        </TableFooter>
      </>
    ),
  },
};

/**
 * 정렬 가능한 헤더가 포함된 Table입니다.
 */
export const SortableHeaders: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    return (
      <Table variant="hover">
        <TableHeader>
          <TableRow>
            <TableHead
              isSortable
              sortDirection={sortColumn === 'name' ? sortDirection : undefined}
              onClick={() => handleSort('name')}
            >
              Name
            </TableHead>
            <TableHead
              isSortable
              sortDirection={sortColumn === 'age' ? sortDirection : undefined}
              onClick={() => handleSort('age')}
            >
              Age
            </TableHead>
            <TableHead
              isSortable
              sortDirection={sortColumn === 'salary' ? sortDirection : undefined}
              onClick={() => handleSort('salary')}
            >
              Salary
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>28</TableCell>
            <TableCell>$85,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Smith</TableCell>
            <TableCell>35</TableCell>
            <TableCell>$92,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Carol White</TableCell>
            <TableCell>42</TableCell>
            <TableCell>$105,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
};

/**
 * 실제 사용 사례: 사용자 목록 테이블
 */
export const UserListTable: Story = {
  render: () => (
    <Table variant="hover">
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#007bff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>John Doe</div>
              </div>
            </div>
          </TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>
            <Badge variant="info">Admin</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="success">Active</Badge>
          </TableCell>
          <TableCell>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="secondary">
                Edit
              </Button>
              <Button size="sm" variant="danger">
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#28a745',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                JS
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Jane Smith</div>
              </div>
            </div>
          </TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>
            <Badge variant="secondary">Moderator</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="success">Active</Badge>
          </TableCell>
          <TableCell>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="secondary">
                Edit
              </Button>
              <Button size="sm" variant="danger">
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#6c757d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                BJ
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Bob Johnson</div>
              </div>
            </div>
          </TableCell>
          <TableCell>bob.johnson@example.com</TableCell>
          <TableCell>
            <Badge variant="info">User</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="warning">Suspended</Badge>
          </TableCell>
          <TableCell>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="secondary">
                Edit
              </Button>
              <Button size="sm" variant="danger">
                Delete
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 실제 사용 사례: 주문 내역 테이블
 */
export const OrderHistoryTable: Story = {
  render: () => (
    <Table variant="striped">
      <TableCaption>Recent order history - Last 30 days</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#ORD-001</TableCell>
          <TableCell>2024-10-15</TableCell>
          <TableCell>Alice Brown</TableCell>
          <TableCell>3</TableCell>
          <TableCell>$450.00</TableCell>
          <TableCell>
            <Badge variant="success">Delivered</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#ORD-002</TableCell>
          <TableCell>2024-10-16</TableCell>
          <TableCell>Charlie Davis</TableCell>
          <TableCell>1</TableCell>
          <TableCell>$320.50</TableCell>
          <TableCell>
            <Badge variant="warning">Processing</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#ORD-003</TableCell>
          <TableCell>2024-10-17</TableCell>
          <TableCell>Diana Evans</TableCell>
          <TableCell>5</TableCell>
          <TableCell>$680.00</TableCell>
          <TableCell>
            <Badge variant="info">Shipped</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#ORD-004</TableCell>
          <TableCell>2024-10-18</TableCell>
          <TableCell>Frank Miller</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$195.00</TableCell>
          <TableCell>
            <Badge variant="success">Delivered</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#ORD-005</TableCell>
          <TableCell>2024-10-19</TableCell>
          <TableCell>Grace Lee</TableCell>
          <TableCell>4</TableCell>
          <TableCell>$820.00</TableCell>
          <TableCell>
            <Badge variant="danger">Cancelled</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Revenue</TableCell>
          <TableCell>$2,465.50</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * 실제 사용 사례: 프로젝트 대시보드 테이블
 */
export const ProjectDashboardTable: Story = {
  render: () => (
    <Table variant="bordered">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div style={{ fontWeight: 600 }}>Website Redesign</div>
            <div style={{ fontSize: '12px', color: '#666' }}>UI/UX Improvements</div>
          </TableCell>
          <TableCell>Design Team</TableCell>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  background: '#e5e5e5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '75%',
                    height: '100%',
                    background: '#28a745',
                    borderRadius: '4px',
                  }}
                ></div>
              </div>
              <span style={{ fontSize: '12px', color: '#666' }}>75%</span>
            </div>
          </TableCell>
          <TableCell>2024-11-30</TableCell>
          <TableCell>
            <Badge variant="danger">High</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="warning">In Progress</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div style={{ fontWeight: 600 }}>Mobile App</div>
            <div style={{ fontSize: '12px', color: '#666' }}>iOS & Android</div>
          </TableCell>
          <TableCell>Dev Team A</TableCell>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  background: '#e5e5e5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '45%',
                    height: '100%',
                    background: '#007bff',
                    borderRadius: '4px',
                  }}
                ></div>
              </div>
              <span style={{ fontSize: '12px', color: '#666' }}>45%</span>
            </div>
          </TableCell>
          <TableCell>2024-12-15</TableCell>
          <TableCell>
            <Badge variant="warning">Medium</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="warning">In Progress</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div style={{ fontWeight: 600 }}>API Migration</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Backend Upgrade</div>
          </TableCell>
          <TableCell>Dev Team B</TableCell>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  background: '#e5e5e5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#28a745',
                    borderRadius: '4px',
                  }}
                ></div>
              </div>
              <span style={{ fontSize: '12px', color: '#666' }}>100%</span>
            </div>
          </TableCell>
          <TableCell>2024-10-31</TableCell>
          <TableCell>
            <Badge variant="danger">High</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="success">Completed</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 실제 사용 사례: 재고 관리 테이블
 */
export const InventoryTable: Story = {
  render: () => (
    <Table variant="hover">
      <TableHeader>
        <TableRow>
          <TableHead>SKU</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>In Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>SKU-001</TableCell>
          <TableCell>Wireless Keyboard</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>45</TableCell>
          <TableCell>$79.99</TableCell>
          <TableCell>
            <Badge variant="success">In Stock</Badge>
          </TableCell>
          <TableCell>
            <Button size="sm" variant="secondary">
              Reorder
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>SKU-002</TableCell>
          <TableCell>USB-C Cable</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell>8</TableCell>
          <TableCell>$12.99</TableCell>
          <TableCell>
            <Badge variant="warning">Low Stock</Badge>
          </TableCell>
          <TableCell>
            <Button size="sm" variant="primary">
              Reorder
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>SKU-003</TableCell>
          <TableCell>Monitor Stand</TableCell>
          <TableCell>Furniture</TableCell>
          <TableCell>0</TableCell>
          <TableCell>$45.00</TableCell>
          <TableCell>
            <Badge variant="danger">Out of Stock</Badge>
          </TableCell>
          <TableCell>
            <Button size="sm" variant="danger">
              Reorder
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>SKU-004</TableCell>
          <TableCell>Laptop Bag</TableCell>
          <TableCell>Accessories</TableCell>
          <TableCell>120</TableCell>
          <TableCell>$34.99</TableCell>
          <TableCell>
            <Badge variant="success">In Stock</Badge>
          </TableCell>
          <TableCell>
            <Button size="sm" variant="secondary">
              Reorder
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * 긴 테이블로 스크롤 동작을 보여주는 예제입니다.
 */
export const LongScrollableTable: Story = {
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>Item {i + 1}</TableCell>
            <TableCell>This is a description for item {i + 1}</TableCell>
            <TableCell>2024-10-{String(i + 1).padStart(2, '0')}</TableCell>
            <TableCell>
              <Badge variant={i % 3 === 0 ? 'success' : i % 3 === 1 ? 'warning' : 'info'}>
                {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="secondary">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * 모든 변형을 한눈에 볼 수 있는 예제입니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Default</h3>
        <Table variant="default">
          <TableHeader>
            <TableRow>
              <TableHead>Column 1</TableHead>
              <TableHead>Column 2</TableHead>
              <TableHead>Column 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
              <TableCell>Data 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data 4</TableCell>
              <TableCell>Data 5</TableCell>
              <TableCell>Data 6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Bordered</h3>
        <Table variant="bordered">
          <TableHeader>
            <TableRow>
              <TableHead>Column 1</TableHead>
              <TableHead>Column 2</TableHead>
              <TableHead>Column 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
              <TableCell>Data 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data 4</TableCell>
              <TableCell>Data 5</TableCell>
              <TableCell>Data 6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Striped</h3>
        <Table variant="striped">
          <TableHeader>
            <TableRow>
              <TableHead>Column 1</TableHead>
              <TableHead>Column 2</TableHead>
              <TableHead>Column 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
              <TableCell>Data 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data 4</TableCell>
              <TableCell>Data 5</TableCell>
              <TableCell>Data 6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Hover</h3>
        <Table variant="hover">
          <TableHeader>
            <TableRow>
              <TableHead>Column 1</TableHead>
              <TableHead>Column 2</TableHead>
              <TableHead>Column 3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
              <TableCell>Data 3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data 4</TableCell>
              <TableCell>Data 5</TableCell>
              <TableCell>Data 6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};
