import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

/**
 * # Button 컴포넌트
 *
 * Button은 사용자 인터랙션을 위한 핵심 UI 컴포넌트입니다.
 * 다양한 스타일과 크기를 제공하여 여러 상황에 맞게 사용할 수 있습니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Button } from '@/shared/ui/button';
 *
 * function MyComponent() {
 *   return (
 *     <Button
 *       variant="primary"
 *       size="md"
 *       onClick={handleClick}
 *     >
 *       Click me
 *     </Button>
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **다양한 변형(Variants)**: primary, secondary, danger, success
 * - **크기 옵션**: sm, md, lg
 * - **전체 너비 옵션**: fullWidth 속성으로 부모 컨테이너 너비에 맞춤
 * - **Slot 패턴 지원**: asChild 속성으로 커스텀 엘리먼트 렌더링
 * - **비활성화 상태**: disabled 속성으로 상호작용 차단
 */
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button 컴포넌트는 사용자 액션을 트리거하는 인터랙티브 요소입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Button의 시각적 스타일을 결정합니다',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success'],
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Button의 크기를 설정합니다',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      description: '버튼이 부모 컨테이너의 전체 너비를 차지하도록 설정',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '버튼 비활성화 여부',
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
    onClick: {
      description: '버튼 클릭 시 실행될 함수',
      action: 'clicked',
    },
    children: {
      description: 'Button 내부에 표시될 텍스트나 컨텐츠',
      control: { type: 'text' },
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
    type: {
      description: 'HTML button 타입 속성',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 기본 Button 스타일입니다.
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
};

/**
 * Primary 변형 Button입니다.
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Secondary 변형 Button입니다.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Danger 변형 Button입니다.
 */
export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

/**
 * Success 변형 Button입니다.
 */
export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

/**
 * 다양한 크기의 Button입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
};

/**
 * 전체 너비 Button입니다.
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Button fullWidth variant="primary">Full Width Button</Button>
      <div style={{ marginTop: '8px' }}>
        <Button variant="primary">Normal Width Button</Button>
      </div>
    </div>
  ),
};

/**
 * 비활성화된 Button입니다.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary" disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button variant="danger" disabled>Disabled Danger</Button>
      <Button variant="success" disabled>Disabled Success</Button>
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
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" size="sm">Small Primary</Button>
        <Button variant="secondary" size="sm">Small Secondary</Button>
        <Button variant="danger" size="sm">Small Danger</Button>
        <Button variant="success" size="sm">Small Success</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" size="lg">Large Primary</Button>
        <Button variant="secondary" size="lg">Large Secondary</Button>
        <Button variant="danger" size="lg">Large Danger</Button>
        <Button variant="success" size="lg">Large Success</Button>
      </div>
    </div>
  ),
};

/**
 * 실제 사용 사례: 폼 제출 버튼
 */
export const FormButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="secondary" type="button">Cancel</Button>
      <Button variant="secondary" type="reset">Reset</Button>
    </div>
  ),
};

/**
 * 실제 사용 사례: 액션 버튼
 */
export const ActionButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="success" size="sm">Save</Button>
      <Button variant="primary" size="sm">Edit</Button>
      <Button variant="danger" size="sm">Delete</Button>
      <Button variant="secondary" size="sm">Share</Button>
    </div>
  ),
};

/**
 * 실제 사용 사례: 다이얼로그 버튼
 */
export const DialogButtons: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end',
      padding: '16px',
      background: '#f5f5f5',
      borderRadius: '4px'
    }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </div>
  ),
};

/**
 * 실제 사용 사례: 로딩 상태를 표현하는 버튼
 */
export const LoadingState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary" disabled>Loading...</Button>
      <Button variant="secondary" disabled>Processing...</Button>
      <Button variant="success" disabled>Saving...</Button>
    </div>
  ),
};

/**
 * 긴 텍스트가 들어간 Button입니다.
 */
export const LongText: Story = {
  args: {
    children: 'This is a very long button text example',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * 아이콘과 함께 사용하는 Button 예제입니다.
 */
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button variant="primary" size="sm">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>⬇️</span>
          Download
        </span>
      </Button>
      <Button variant="secondary" size="sm">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>⚙️</span>
          Settings
        </span>
      </Button>
      <Button variant="success" size="sm">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>✓</span>
          Complete
        </span>
      </Button>
      <Button variant="danger" size="sm">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>🗑️</span>
          Delete
        </span>
      </Button>
    </div>
  ),
};