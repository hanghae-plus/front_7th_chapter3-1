import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: '사용자' },
};

export const Success: Story = {
  args: { variant: 'success', children: '활성' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: '임시저장' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: '정지' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: '보관됨' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Design' },
};

export const Pill: Story = {
  args: { variant: 'primary', pill: true, children: 'Development' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="primary" size="small">Small</Badge>
      <Badge variant="primary" size="medium">Medium</Badge>
      <Badge variant="primary" size="large">Large</Badge>
    </div>
  ),
  args: { variant: 'primary', children: '' },
};
