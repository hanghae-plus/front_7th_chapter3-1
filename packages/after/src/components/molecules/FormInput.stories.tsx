import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormInput } from './FormInput';
import { useState } from 'react';

const meta = {
  title: 'Molecules/FormInput',
  component: FormInput,
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
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'username',
    label: '사용자명',
    placeholder: '사용자명을 입력하세요',
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
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    error: '올바른 이메일 형식이 아닙니다',
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

export const Required: Story = {
  args: {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    required: true,
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    label: '비활성화된 Input',
    value: '수정할 수 없습니다',
    disabled: true,
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
};

const InteractiveFormInput = (args: React.ComponentProps<typeof FormInput>) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length < 3) {
      setError('최소 3자 이상 입력하세요');
    } else {
      setError('');
    }
  };

  return (
    <>
      <p> 최소 3자 이상 입력해야 합니다.</p>
      <br />

      <FormInput
        {...args}
        value={value}
        onChange={handleChange}
        error={error}
      />
    </>
  );
};

export const Playground: Story = {
  args: {
    name: 'input',
    label: 'Input',
    placeholder: '입력해보세요',
  },
  argTypes: {
    onChange: {
      table: { disable: true },
    },
    error: {
      table: { disable: true },
    },
  },
  render: (args) => <InteractiveFormInput {...args} />,
};
