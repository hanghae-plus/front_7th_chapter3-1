import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormSelect } from './FormSelect';
import { useState } from 'react';

const meta = {
  title: 'Molecules/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Select의 name 속성',
    },
    options: {
      control: 'object',
      description: '선택 옵션 배열',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select의 크기',
    },
    required: {
      control: 'boolean',
      description: '필수 선택 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    helpText: {
      control: 'text',
      description: '도움말 텍스트',
    },
    label: {
      control: 'text',
      description: 'Select의 라벨 텍스트',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
  args: {
    size: 'md',
    required: false,
    disabled: false,
    helpText: '',
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

export const Default: Story = {
  argTypes: {
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  args: {
    name: 'select',
    label: '옵션 선택',
    options: sampleOptions,
    placeholder: '옵션을 선택하세요',
    value: '',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    name: 'select-error',
    label: '필수 선택',
    options: sampleOptions,
    placeholder: '옵션을 선택하세요',
    error: '옵션을 선택해주세요',
    required: true,
    value: '',
    onChange: () => {},
  },
  argTypes: {
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

export const Disabled: Story = {
  args: {
    name: 'select-disabled',
    label: '비활성화',
    options: sampleOptions,
    value: 'option1',
    disabled: true,
    onChange: () => {},
  },
  argTypes: {
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

const InteractiveFormSelect = (
  args: React.ComponentProps<typeof FormSelect>
) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const options = [
    { value: 'korea', label: '한국' },
    { value: 'usa', label: '미국' },
    { value: 'japan', label: '일본' },
    { value: 'china', label: '중국' },
  ];

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (!newValue) {
      setError('국가를 선택해주세요');
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-4">
      <FormSelect
        {...args}
        options={options}
        value={value}
        onChange={handleChange}
        error={error}
      />
      <p className="text-sm text-gray-600">선택된 값: {value || '(없음)'}</p>
    </div>
  );
};

export const Playground: Story = {
  args: {
    name: 'country',
    label: '국가 선택',
    placeholder: '국가를 선택하세요',
    required: true,
    value: '',
    onChange: () => {},
    options: [],
  },
  argTypes: {
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  render: (args) => <InteractiveFormSelect {...args} />,
};
