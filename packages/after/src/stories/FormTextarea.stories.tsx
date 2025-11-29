import type { Meta, StoryObj } from '@storybook/react';
import { FormTextarea } from '../components/molecules/FormTextarea';
import { useState } from 'react';

const meta = {
  title: 'Forms/FormTextarea',
  component: FormTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
      description: 'Textarea 행 수',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <FormTextarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: 'content',
    label: 'Content',
    placeholder: 'Enter your content here...',
    rows: 4,
    value: '',
    onChange: () => {},
  },
};

export const WithDescription: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <FormTextarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: 'description',
    label: 'Description',
    placeholder: 'Write a detailed description...',
    helpText: 'Provide a clear and concise description.',
    rows: 4,
    value: '',
    onChange: () => {},
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <FormTextarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: 'comment',
    label: 'Comment',
    placeholder: 'Leave a comment...',
    error: 'Comment must be at least 10 characters long',
    rows: 3,
    value: '',
    onChange: () => {},
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <FormTextarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message...',
    required: true,
    rows: 6,
    value: '',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-textarea',
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit this field',
    disabled: true,
    value: 'This content cannot be edited.',
    onChange: () => {},
    rows: 4,
  },
};

export const LargeArea: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <FormTextarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: 'article',
    label: 'Article Content',
    placeholder: 'Write your article here...',
    helpText: 'Write a comprehensive article. Minimum 100 words.',
    rows: 10,
    value: '',
    onChange: () => {},
  },
};

export const SmallArea: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <FormTextarea {...args} value={value} onChange={setValue} />;
  },
  args: {
    name: 'note',
    label: 'Quick Note',
    placeholder: 'Add a quick note...',
    rows: 2,
    value: '',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    name: 'bio',
    label: 'Biography',
    value: 'This is a pre-filled biography text that demonstrates how the textarea looks with existing content.',
    onChange: () => {},
    rows: 4,
  },
};
