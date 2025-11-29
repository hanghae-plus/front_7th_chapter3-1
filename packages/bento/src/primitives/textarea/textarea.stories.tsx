import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';
import { Label } from '../label';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 w-[350px]">
      <Label htmlFor="message">Your Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Error state',
    defaultValue: 'Invalid content',
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithRows: Story = {
  args: {
    placeholder: 'Fixed height textarea',
    rows: 6,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 w-[350px]">
      <div className="grid gap-2">
        <Label>Default</Label>
        <Textarea placeholder="Default textarea" />
      </div>
      <div className="grid gap-2">
        <Label>Error</Label>
        <Textarea variant="error" placeholder="Error textarea" />
      </div>
      <div className="grid gap-2">
        <Label>Disabled</Label>
        <Textarea disabled placeholder="Disabled textarea" />
      </div>
    </div>
  ),
};
