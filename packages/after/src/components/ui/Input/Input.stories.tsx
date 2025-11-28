import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './index';
import { useState } from 'react';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input의 크기',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url'],
      description: 'Input 타입',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요...',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    placeholder: 'Error state',
    value: 'Invalid value',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

const InteractiveInput = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-sm text-gray-600">
        입력된 값: <strong>{value || '(없음)'}</strong>
      </p>
      <p className="text-xs text-gray-500">글자 수: {value.length}</p>
    </div>
  );
};

export const Playground: Story = {
  args: {
    placeholder: '타이핑 해보세요...',
    size: 'md',
    error: false,
    disabled: false,
    type: 'text',
  },
  render: (args) => <InteractiveInput {...args} />,
};
