import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect } from '../components/molecules/FormSelect';

const meta = {
  title: 'Forms/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: '필수 선택 여부',
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
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'role',
    label: 'Role',
    placeholder: 'Select a role',
    options: [
      { value: 'user', label: 'User' },
      { value: 'moderator', label: 'Moderator' },
      { value: 'admin', label: 'Admin' },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    name: 'category',
    label: 'Category',
    description: 'Choose the category for your post',
    options: [
      { value: 'development', label: 'Development' },
      { value: 'design', label: 'Design' },
      { value: 'accessibility', label: 'Accessibility' },
    ],
  },
};

export const WithError: Story = {
  args: {
    name: 'status',
    label: 'Status',
    error: 'Please select a valid status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'suspended', label: 'Suspended' },
    ],
  },
};

export const Required: Story = {
  args: {
    name: 'country',
    label: 'Country',
    placeholder: 'Select your country',
    required: true,
    options: [
      { value: 'kr', label: 'Korea' },
      { value: 'us', label: 'United States' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-select',
    label: 'Disabled Select',
    disabled: true,
    value: 'user',
    options: [
      { value: 'user', label: 'User' },
      { value: 'admin', label: 'Admin' },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    name: 'timezone',
    label: 'Timezone',
    placeholder: 'Select timezone',
    options: [
      { value: 'utc-12', label: 'UTC-12:00' },
      { value: 'utc-11', label: 'UTC-11:00' },
      { value: 'utc-10', label: 'UTC-10:00' },
      { value: 'utc-9', label: 'UTC-09:00' },
      { value: 'utc-8', label: 'UTC-08:00' },
      { value: 'utc-7', label: 'UTC-07:00' },
      { value: 'utc-6', label: 'UTC-06:00' },
      { value: 'utc-5', label: 'UTC-05:00' },
      { value: 'utc-4', label: 'UTC-04:00' },
      { value: 'utc-3', label: 'UTC-03:00' },
      { value: 'utc-2', label: 'UTC-02:00' },
      { value: 'utc-1', label: 'UTC-01:00' },
      { value: 'utc', label: 'UTC+00:00' },
      { value: 'utc+1', label: 'UTC+01:00' },
      { value: 'utc+2', label: 'UTC+02:00' },
      { value: 'utc+3', label: 'UTC+03:00' },
      { value: 'utc+9', label: 'UTC+09:00 (Korea, Japan)' },
    ],
  },
};
