import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './card';
import { Button } from '../button/button';

/**
 * # Card 컴포넌트
 *
 * Card는 관련 콘텐츠를 그룹화하고 구조화하는 컨테이너 컴포넌트입니다.
 * 헤더, 콘텐츠, 푸터 영역으로 구성되며 다양한 스타일 변형을 제공합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
 *
 * function MyComponent() {
 *   return (
 *     <Card variant="default">
 *       <CardHeader>
 *         <CardTitle>Card Title</CardTitle>
 *       </CardHeader>
 *       <CardContent>
 *         Card content goes here
 *       </CardContent>
 *     </Card>
 *   );
 * }
 * ```
 *
 * ## 구성 요소
 *
 * - **Card**: 루트 컨테이너 컴포넌트
 * - **CardHeader**: 헤더 영역 컴포넌트
 * - **CardTitle**: 제목 텍스트 컴포넌트
 * - **CardDescription**: 설명 텍스트 컴포넌트
 * - **CardAction**: 헤더 액션 영역 컴포넌트
 * - **CardContent**: 메인 콘텐츠 영역 컴포넌트
 * - **CardFooter**: 푸터 영역 컴포넌트
 */
const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card 컴포넌트는 콘텐츠를 구조화하고 그룹화하는 컨테이너입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'landmark-complementary', enabled: false },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Card의 시각적 스타일을 결정합니다',
      control: { type: 'select' },
      options: ['default', 'bordered', 'elevated', 'flat'],
      table: {
        type: { summary: 'CardVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      description: 'Card 내부에 표시될 컨텐츠',
      control: false,
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * 기본 Card 스타일입니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          This is the default card style with standard border and shadow.
        </CardContent>
      </>
    ),
  },
};

/**
 * Bordered 변형 Card입니다.
 */
export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <>
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
        </CardHeader>
        <CardContent>
          This card has a border without shadow for a simpler appearance.
        </CardContent>
      </>
    ),
  },
};

/**
 * Elevated 변형 Card입니다.
 */
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>
          This card has a stronger shadow for more visual prominence.
        </CardContent>
      </>
    ),
  },
};

/**
 * Flat 변형 Card입니다.
 */
export const Flat: Story = {
  args: {
    variant: 'flat',
    children: (
      <>
        <CardHeader>
          <CardTitle>Flat Card</CardTitle>
        </CardHeader>
        <CardContent>
          This card has an elevated background with subtle border.
        </CardContent>
      </>
    ),
  },
};

/**
 * 설명이 포함된 Card입니다.
 */
export const WithDescription: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Description</CardTitle>
          <CardDescription>
            This is a helpful description that provides more context about the card content
          </CardDescription>
        </CardHeader>
        <CardContent>
          Main content area with detailed information.
        </CardContent>
      </>
    ),
  },
};

/**
 * 액션 버튼이 포함된 Card입니다.
 */
export const WithAction: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
              <CardTitle>Card with Action</CardTitle>
              <CardDescription>Includes action buttons in the header</CardDescription>
            </div>
            <CardAction>
              <Button size="sm" variant="secondary">Edit</Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          This card demonstrates how to add action buttons in the header area.
        </CardContent>
      </>
    ),
  },
};

/**
 * 푸터가 포함된 Card입니다.
 */
export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
        </CardHeader>
        <CardContent>
          Main content goes here. The footer below contains action buttons.
        </CardContent>
        <CardFooter style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', padding: '16px' }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </CardFooter>
      </>
    ),
  },
};

/**
 * 완전한 구조의 Card입니다.
 */
export const CompleteStructure: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
            <div>
              <CardTitle>Complete Card Structure</CardTitle>
              <CardDescription>This card demonstrates all available components</CardDescription>
            </div>
            <CardAction>
              <Button size="sm" variant="secondary">Options</Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card. It can contain any type of content including text, images, forms, or other components.</p>
          <p style={{ marginTop: '12px' }}>The card structure provides clear visual hierarchy and organization for your content.</p>
        </CardContent>
        <CardFooter style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', padding: '16px', borderTop: '1px solid #e5e5e5' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Last updated: 2 hours ago</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm">Share</Button>
            <Button variant="primary" size="sm">View Details</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

/**
 * 실제 사용 사례: 사용자 프로필 카드
 */
export const UserProfileCard: Story = {
  render: () => (
    <Card variant="default" style={{ maxWidth: '400px' }}>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#007bff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            JD
          </div>
          <div style={{ flex: 1 }}>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Senior Developer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>📧 john.doe@example.com</div>
          <div>📱 +1 234 567 8900</div>
          <div>📍 San Francisco, CA</div>
        </div>
      </CardContent>
      <CardFooter style={{ display: 'flex', gap: '8px', padding: '16px' }}>
        <Button fullWidth variant="primary">Contact</Button>
        <Button fullWidth variant="secondary">View Profile</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 실제 사용 사례: 통계 카드
 */
export const StatisticsCard: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Monthly Statistics</CardTitle>
        <CardDescription>Performance overview for October 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Total Users</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>1,234</div>
            <div style={{ fontSize: '12px', color: '#28a745' }}>↑ 12% from last month</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Revenue</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>$45.6K</div>
            <div style={{ fontSize: '12px', color: '#28a745' }}>↑ 8% from last month</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Active Projects</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>28</div>
            <div style={{ fontSize: '12px', color: '#ffc107' }}>→ No change</div>
          </div>
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Conversion Rate</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>3.2%</div>
            <div style={{ fontSize: '12px', color: '#dc3545' }}>↓ 2% from last month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * 실제 사용 사례: 상품 카드
 */
export const ProductCard: Story = {
  render: () => (
    <Card variant="bordered" style={{ maxWidth: '300px' }}>
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px'
      }}>
        Product Image
      </div>
      <CardHeader>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>Wireless Bluetooth 5.0</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', marginBottom: '8px' }}>$199.99</div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          High-quality wireless headphones with active noise cancellation and 30-hour battery life.
        </div>
      </CardContent>
      <CardFooter style={{ padding: '16px', display: 'flex', gap: '8px' }}>
        <Button fullWidth variant="primary">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 여러 Card를 그리드로 배치한 예제입니다.
 */
export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      <Card variant="default">
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
        </CardHeader>
        <CardContent>First card content</CardContent>
      </Card>
      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
        </CardHeader>
        <CardContent>Second card content</CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
        </CardHeader>
        <CardContent>Third card content</CardContent>
      </Card>
      <Card variant="flat">
        <CardHeader>
          <CardTitle>Card 4</CardTitle>
        </CardHeader>
        <CardContent>Fourth card content</CardContent>
      </Card>
    </div>
  ),
};