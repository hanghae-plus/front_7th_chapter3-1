import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './index';
import { useState } from 'react';

const meta = {
  title: 'UI/Select',
  component: Select,

  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select의 크기',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 값',
      table: {
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      description: '값 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(value: string) => void' },
      },
      control: false,
    },
    defaultValue: {
      control: 'text',
      description: '기본값 (uncontrolled)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' },
  { value: 'strawberry', label: '딸기' },
];

export const Default: Story = {
  render: () => (
    <Select size="md">
      <Select.Trigger className="w-[200px]">
        <Select.Value placeholder="과일을 선택하세요" />
      </Select.Trigger>
      <Select.Content>
        {fruits.map((fruit) => (
          <Select.Item key={fruit.value} value={fruit.value}>
            {fruit.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select size="md">
      <Select.Trigger className="w-[200px]" error>
        <Select.Value placeholder="에러 상태" />
      </Select.Trigger>
      <Select.Content>
        {fruits.map((fruit) => (
          <Select.Item key={fruit.value} value={fruit.value}>
            {fruit.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select size="md" disabled>
      <Select.Trigger className="w-[200px]">
        <Select.Value placeholder="비활성화됨" />
      </Select.Trigger>
      <Select.Content>
        {fruits.map((fruit) => (
          <Select.Item key={fruit.value} value={fruit.value}>
            {fruit.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select size="md">
      <Select.Trigger className="w-[200px]">
        <Select.Value placeholder="음식 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
            과일
          </div>
          <Select.Item value="apple">사과</Select.Item>
          <Select.Item value="banana">바나나</Select.Item>
          <Select.Item value="orange">오렌지</Select.Item>
        </Select.Group>
        <Select.Group>
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
            채소
          </div>
          <Select.Item value="carrot">당근</Select.Item>
          <Select.Item value="tomato">토마토</Select.Item>
          <Select.Item value="cucumber">오이</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
};

const InteractiveSelect = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <Select {...args} value={value} onValueChange={setValue}>
        <Select.Trigger className="w-[200px]">
          <Select.Value placeholder="과일을 선택하세요" />
        </Select.Trigger>
        <Select.Content>
          {fruits.map((fruit) => (
            <Select.Item key={fruit.value} value={fruit.value}>
              {fruit.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <p className="text-sm text-gray-600">
        선택된 값: <strong>{value || '(없음)'}</strong>
      </p>
    </div>
  );
};

export const Playground: Story = {
  args: {
    size: 'md',
    value: '',
  },
  render: (args) => <InteractiveSelect {...args} />,
};
