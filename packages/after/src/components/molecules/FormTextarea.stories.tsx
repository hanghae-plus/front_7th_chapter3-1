import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormTextarea } from './FormTextarea';
import { useState } from 'react';

const meta = {
  title: 'Molecules/FormTextarea',
  component: FormTextarea,
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
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  args: {
    size: 'md',
    required: false,
    disabled: false,
    helpText: '',
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'description',
    label: '설명',
    placeholder: '내용을 입력하세요',
    value: '',
    onChange: () => {},
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

export const WithError: Story = {
  args: {
    name: 'content',
    label: '내용',
    placeholder: '내용을 입력하세요',
    error: '최소 10자 이상 입력해주세요',
    value: '',
    onChange: () => {},
  },
};

export const Required: Story = {
  args: {
    name: 'required-content',
    label: '필수 입력',
    placeholder: '필수로 입력해야 합니다',
    required: true,
    value: '',
    onChange: () => {},
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-textarea',
    label: '비활성화',
    value: '수정할 수 없는 내용입니다',
    disabled: true,
    onChange: () => {},
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

export const WithRows: Story = {
  args: {
    name: 'rows-textarea',
    label: '행 수 지정',
    placeholder: '5줄 높이의 텍스트 영역',
    rows: 5,
    value: '',
    onChange: () => {},
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

const InteractiveTextarea = (args: typeof Default.args) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const maxLength = 200;

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length < 10) {
      setError('최소 10자 이상 입력하세요');
    } else if (newValue.length > maxLength) {
      setError(`최대 ${maxLength}자까지 입력 가능합니다`);
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        최소 10자 이상 입력해야 합니다. / 최대 {maxLength}자까지 입력
        가능합니다.
      </p>
      <FormTextarea
        {...args}
        value={value}
        onChange={handleChange}
        error={error}
      />
      <p className="text-sm text-gray-600">
        {value.length} / {maxLength} 자
      </p>
    </div>
  );
};

export const Playground: Story = {
  args: {
    name: 'playground-textarea',
    label: 'Textarea',
    placeholder: '입력해보세요',
    required: true,
    value: '',
    onChange: () => {},
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
  render: (args) => <InteractiveTextarea {...args} />,
};
