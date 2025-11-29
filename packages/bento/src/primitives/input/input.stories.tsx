import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from '../label';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 w-[280px]">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Error state',
    defaultValue: 'Invalid input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 w-[280px]">
      <div className="grid gap-2">
        <Label>Default</Label>
        <Input placeholder="Default input" />
      </div>
      <div className="grid gap-2">
        <Label>Error</Label>
        <Input variant="error" placeholder="Error input" />
      </div>
      <div className="grid gap-2">
        <Label>Disabled</Label>
        <Input disabled placeholder="Disabled input" />
      </div>
    </div>
  ),
};
