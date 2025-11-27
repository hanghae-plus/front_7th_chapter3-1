import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    pill: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Badge',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Badge',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Badge',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Badge',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Badge',
  },
};

export const Pill: Story = {
  args: {
    variant: 'primary',
    pill: true,
    children: 'Pill Badge',
  },
};

