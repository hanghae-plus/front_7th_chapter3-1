import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './index';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'ghost'],
      description: 'Button의 색상 variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button의 크기',
    },
    outline: {
      control: 'boolean',
      description: 'Outline 스타일 적용 여부',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    outline: false,
    fullWidth: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 모든 Variant 한눈에 보기
export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ minWidth: '600px' }}>
      <div className="space-y-2">
        <h3 className="font-bold text-sm">Filled Buttons</h3>
        <div className="flex gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Outline Buttons</h3>
        <div className="flex gap-2">
          <Button variant="primary" outline>
            Primary
          </Button>
          <Button variant="secondary" outline>
            Secondary
          </Button>
          <Button variant="danger" outline>
            Danger
          </Button>
          <Button variant="success" outline>
            Success
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Ghost Buttons</h3>
        <div className="flex gap-2">
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Sizes</h3>
        <div className="flex gap-2 items-center">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">States</h3>
        <div className="flex gap-2">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Full Width</h3>
        <Button variant="primary" fullWidth>
          Full Width Button
        </Button>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => {
    return (
      <div className="w-[600px] flex justify-center items-center">
        <Button {...args}>Button</Button>
      </div>
    );
  },
};
