import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from '../components/molecules/FormInput';

const meta = {
  title: 'Forms/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'Input 타입',
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
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithDescription: Story = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    description: 'We will never share your email with anyone.',
  },
};

export const WithError: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
  },
};

export const Required: Story = {
  args: {
    name: 'required-field',
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-field',
    label: 'Disabled Field',
    placeholder: 'Cannot edit this field',
    disabled: true,
    value: 'Disabled value',
  },
};

export const EmailType: Story = {
  args: {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'example@domain.com',
    required: true,
  },
};

export const NumberType: Story = {
  args: {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: '18',
    description: 'Enter your age',
  },
};
