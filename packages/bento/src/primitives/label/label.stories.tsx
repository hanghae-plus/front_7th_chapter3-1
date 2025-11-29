import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from '../input';
import { Checkbox } from '../checkbox';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2 w-[280px]">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid gap-2 w-[280px]">
      <Label htmlFor="name">
        Name <span className="text-red-500">*</span>
      </Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
};
