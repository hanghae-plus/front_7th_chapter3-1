import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormSelect } from './FormSelect';

const roleOptions = [
  { value: 'admin', label: '관리자' },
  { value: 'moderator', label: '중재자' },
  { value: 'user', label: '일반 사용자' },
];

const categoryOptions = [
  { value: 'tech', label: '기술' },
  { value: 'design', label: '디자인' },
  { value: 'marketing', label: '마케팅' },
  { value: 'sales', label: '영업' },
  { value: 'hr', label: '인사' },
];

const meta: Meta<typeof FormSelect> = {
  title: 'Composed/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormSelect>;

export const Default: Story = {
  args: {
    id: 'select-default',
    label: '역할 선택',
    options: roleOptions,
  },
};

export const WithHelpText: Story = {
  args: {
    id: 'select-help',
    label: '부서',
    options: categoryOptions,
    helpText: '소속 부서를 선택하세요.',
  },
};

export const Required: Story = {
  args: {
    id: 'select-required',
    label: '역할',
    options: roleOptions,
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    id: 'select-invalid',
    label: '역할',
    options: roleOptions,
    invalid: true,
    invalidText: '역할을 선택해주세요.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'select-disabled',
    label: '역할',
    options: roleOptions,
    value: 'user',
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    id: 'select-placeholder',
    label: '부서',
    options: categoryOptions,
    placeholder: '부서를 선택하세요...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <FormSelect id="select-sm" label="Small" options={roleOptions} size="sm" />
      <FormSelect id="select-md" label="Medium (기본)" options={roleOptions} size="md" />
      <FormSelect id="select-lg" label="Large" options={roleOptions} size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: function Render() {
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [touched, setTouched] = useState({ role: false, department: false });

    return (
      <div className="w-[300px] space-y-4">
        <FormSelect
          id="role"
          label="역할"
          options={roleOptions}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onBlur={() => setTouched({ ...touched, role: true })}
          required
          invalid={touched.role && !role}
          invalidText={touched.role && !role ? '역할을 선택해주세요.' : undefined}
        />
        <FormSelect
          id="department"
          label="부서"
          options={categoryOptions}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          helpText="선택 사항입니다."
        />
        <div className="pt-4 text-sm text-gray-600">
          <p>선택된 역할: {role || '(없음)'}</p>
          <p>선택된 부서: {department || '(없음)'}</p>
        </div>
      </div>
    );
  },
};
