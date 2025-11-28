import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './index';
import { useState } from 'react';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Textarea의 크기',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    rows: {
      control: 'number',
      description: '행 수',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요...',
    value: '',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: '여러 줄의\n텍스트를\n입력할 수 있습니다.',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    error: true,
    placeholder: 'Error state',
    value: 'Invalid content',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '수정할 수 없는 내용입니다.',
    onChange: () => {},
  },
};

export const CustomRows: Story = {
  args: {
    rows: 10,
    placeholder: '10줄 높이의 textarea',
    value: '',
    onChange: () => {},
  },
};

const InteractiveTextarea = (args: React.ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState('');
  const maxLength = 200;

  return (
    <div className="space-y-4">
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={value.length > maxLength}
      />
      <div className="space-y-1">
        <p className="text-sm text-gray-600">
          글자 수: {value.length} / {maxLength}
        </p>
        {value.length > maxLength && (
          <p className="text-sm text-red-500">최대 글자 수를 초과했습니다!</p>
        )}
      </div>
    </div>
  );
};

export const Playground: Story = {
  args: {
    placeholder: '여기에 입력하세요...',
    size: 'md',
    rows: 4,
    disabled: false,
  },
  render: (args) => <InteractiveTextarea {...args} />,
};
