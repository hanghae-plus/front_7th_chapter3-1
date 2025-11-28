import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

/**
 * # Badge 컴포넌트
 *
 * Badge는 상태, 카테고리, 라벨 등의 짧은 정보를 표시하는 컴포넌트입니다.
 * 다양한 색상과 크기 변형을 제공하여 다목적으로 사용할 수 있습니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Badge } from '@/shared/ui/badge';
 *
 * function MyComponent() {
 *   return (
 *     <Badge variant="success" size="md" pill>
 *       Active
 *     </Badge>
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **다양한 변형(Variants)**: primary, secondary, success, danger, warning, info
 * - **크기 옵션**: sm, md, lg
 * - **Pill 스타일**: 둥근 모서리 옵션
 * - **Slot 패턴 지원**: asChild 속성으로 커스텀 엘리먼트 렌더링 가능
 */
const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge 컴포넌트는 상태나 카테고리를 나타내는 작은 라벨입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Badge의 색상 테마를 결정합니다',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      table: {
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Badge의 크기를 설정합니다',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    pill: {
      description: '둥근 모서리 스타일 적용 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    asChild: {
      description: 'Slot 패턴 사용 여부 (커스텀 엘리먼트 렌더링)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      description: 'Badge 내부에 표시될 텍스트나 컨텐츠',
      control: { type: 'text' },
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * 기본 Badge 스타일입니다.
 */
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'primary',
    size: 'md',
    pill: false,
  },
};

/**
 * Primary 변형 Badge입니다.
 */
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

/**
 * Secondary 변형 Badge입니다.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/**
 * Success 변형 Badge입니다.
 */
export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

/**
 * Danger 변형 Badge입니다.
 */
export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

/**
 * Warning 변형 Badge입니다.
 */
export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

/**
 * Info 변형 Badge입니다.
 */
export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

/**
 * 다양한 크기의 Badge입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge size="sm" variant="primary">Small</Badge>
      <Badge size="md" variant="primary">Medium</Badge>
      <Badge size="lg" variant="primary">Large</Badge>
    </div>
  ),
};

/**
 * Pill 스타일이 적용된 Badge입니다.
 */
export const PillStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge pill={false} variant="primary">Default</Badge>
      <Badge pill={true} variant="primary">Pill Style</Badge>
    </div>
  ),
};

/**
 * 모든 변형을 한눈에 볼 수 있는 예제입니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="primary" pill>Primary Pill</Badge>
        <Badge variant="secondary" pill>Secondary Pill</Badge>
        <Badge variant="success" pill>Success Pill</Badge>
        <Badge variant="danger" pill>Danger Pill</Badge>
        <Badge variant="warning" pill>Warning Pill</Badge>
        <Badge variant="info" pill>Info Pill</Badge>
      </div>
    </div>
  ),
};

/**
 * 실제 사용 사례: 상태 표시
 */
export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge variant="success" size="sm" pill>Active</Badge>
      <Badge variant="warning" size="sm" pill>Pending</Badge>
      <Badge variant="danger" size="sm" pill>Inactive</Badge>
      <Badge variant="secondary" size="sm" pill>Archived</Badge>
    </div>
  ),
};

/**
 * 실제 사용 사례: 카테고리 태그
 */
export const CategoryTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="info">Technology</Badge>
      <Badge variant="info">Design</Badge>
      <Badge variant="info">Marketing</Badge>
      <Badge variant="info">Business</Badge>
      <Badge variant="info">Development</Badge>
    </div>
  ),
};

/**
 * 실제 사용 사례: 알림 카운트
 */
export const NotificationCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span>Messages</span>
        <Badge
          variant="danger"
          size="sm"
          pill
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-12px'
          }}
        >
          5
        </Badge>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span>Notifications</span>
        <Badge
          variant="primary"
          size="sm"
          pill
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-12px'
          }}
        >
          12
        </Badge>
      </div>
    </div>
  ),
};

/**
 * 실제 사용 사례: 사용자 역할
 */
export const UserRoles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="primary" size="sm">Admin</Badge>
      <Badge variant="secondary" size="sm">Moderator</Badge>
      <Badge variant="info" size="sm">User</Badge>
      <Badge variant="warning" size="sm">Guest</Badge>
    </div>
  ),
};

/**
 * 긴 텍스트가 들어간 Badge입니다.
 */
export const LongText: Story = {
  args: {
    children: 'Very Long Badge Text Example',
    variant: 'primary',
    size: 'md',
  },
};