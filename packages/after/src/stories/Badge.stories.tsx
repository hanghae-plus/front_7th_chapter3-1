import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/ui/badge';

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
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: '배지 스타일 variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '배지 크기',
    },
    pill: {
      control: 'boolean',
      description: '둥근 pill 스타일',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Information',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    pill: true,
    children: 'Pill Badge',
  },
};

export const UserStatusActive: Story = {
  args: {
    status: 'published',
    children: 'Active',
  },
};

export const UserStatusInactive: Story = {
  args: {
    status: 'draft',
    children: 'Inactive',
  },
};

export const UserStatusSuspended: Story = {
  args: {
    status: 'rejected',
    children: 'Suspended',
  },
};

export const UserRoleAdmin: Story = {
  args: {
    userRole: 'admin',
    children: 'Admin',
  },
};

export const UserRoleModerator: Story = {
  args: {
    userRole: 'moderator',
    children: 'Moderator',
  },
};

export const UserRoleUser: Story = {
  args: {
    userRole: 'user',
    children: 'User',
  },
};
