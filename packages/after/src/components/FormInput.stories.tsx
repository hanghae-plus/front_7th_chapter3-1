import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormInput } from './FormInput';

const meta: Meta<typeof FormInput> = {
  title: 'Composed/FormInput',
  component: FormInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    id: 'input-default',
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const WithHelpText: Story = {
  args: {
    id: 'input-help',
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    helpText: '회원 가입에 사용할 이메일을 입력하세요.',
  },
};

export const Required: Story = {
  args: {
    id: 'input-required',
    label: '사용자명',
    placeholder: '사용자명을 입력하세요',
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    id: 'input-invalid',
    label: '이메일',
    type: 'email',
    value: 'invalid-email',
    invalid: true,
    invalidText: '올바른 이메일 형식이 아닙니다.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'input-disabled',
    label: '비활성화',
    value: '수정 불가',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    id: 'input-password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    helpText: '8자 이상 입력하세요.',
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const isValid = value.length >= 3;

    return (
      <div className="w-[300px] space-y-4">
        <FormInput
          id="username"
          label="사용자명"
          placeholder="3자 이상 입력하세요"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          required
          invalid={touched && !isValid}
          invalidText={touched && !isValid ? '3자 이상 입력해주세요.' : undefined}
          helpText={!touched || isValid ? '영문, 숫자 조합으로 입력하세요.' : undefined}
        />
        <div className="text-sm text-gray-600">
          입력값: {value || '(없음)'} ({value.length}자)
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: function Render() {
    const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
    });

    return (
      <div className="w-[350px] space-y-4">
        <FormInput
          id="name"
          label="이름"
          placeholder="홍길동"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <FormInput
          id="email"
          label="이메일"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          helpText="업무용 이메일을 권장합니다."
        />
        <FormInput
          id="phone"
          label="전화번호"
          type="tel"
          placeholder="010-1234-5678"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </div>
    );
  },
};
