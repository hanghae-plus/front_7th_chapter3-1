import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: '새로 만들기' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: '취소' },
};

export const Danger: Story = {
  args: { variant: 'danger', size: 'sm', children: '삭제' },
};

export const Success: Story = {
  args: { variant: 'success', size: 'sm', children: '게시' },
};

