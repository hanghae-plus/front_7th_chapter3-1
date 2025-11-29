import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormTextarea } from './FormTextarea';

const meta: Meta<typeof FormTextarea> = {
  title: 'Composed/FormTextarea',
  component: FormTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormTextarea>;

export const Default: Story = {
  args: {
    id: 'textarea-default',
    label: '내용',
    placeholder: '내용을 입력하세요...',
  },
};

export const WithHelpText: Story = {
  args: {
    id: 'textarea-help',
    label: '설명',
    placeholder: '설명을 입력하세요...',
    helpText: '최대 500자까지 입력할 수 있습니다.',
  },
};

export const Required: Story = {
  args: {
    id: 'textarea-required',
    label: '필수 내용',
    placeholder: '필수 입력 항목입니다.',
    required: true,
  },
};

export const Invalid: Story = {
  args: {
    id: 'textarea-invalid',
    label: '내용',
    value: '짧음',
    invalid: true,
    invalidText: '최소 20자 이상 입력해주세요.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'textarea-disabled',
    label: '읽기 전용',
    value: '이 내용은 수정할 수 없습니다.',
    disabled: true,
  },
};

export const CustomRows: Story = {
  args: {
    id: 'textarea-rows',
    label: '상세 설명',
    placeholder: '상세 설명을 입력하세요...',
    rows: 8,
    helpText: '충분한 공간에서 작성하세요.',
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    const maxLength = 200;
    const minLength = 20;
    const [touched, setTouched] = useState(false);

    const isValid = value.length >= minLength && value.length <= maxLength;

    return (
      <div className="w-[400px] space-y-2">
        <FormTextarea
          id="content"
          label="게시글 내용"
          placeholder="내용을 입력하세요..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          rows={5}
          required
          invalid={touched && !isValid}
          invalidText={
            touched && value.length < minLength
              ? `최소 ${minLength}자 이상 입력해주세요.`
              : touched && value.length > maxLength
                ? `최대 ${maxLength}자까지 입력 가능합니다.`
                : undefined
          }
          helpText={!touched || isValid ? `${minLength}자 이상, ${maxLength}자 이하` : undefined}
        />
        <div className="text-right text-sm text-gray-500">
          <span className={value.length > maxLength ? 'text-red-500' : ''}>{value.length}</span>/
          {maxLength}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: function Render() {
    const [form, setForm] = useState({
      title: '',
      summary: '',
      content: '',
    });

    return (
      <div className="w-[400px] space-y-4">
        <FormTextarea
          id="summary"
          label="요약"
          placeholder="간단한 요약을 입력하세요..."
          value={form.summary}
          onChange={e => setForm({ ...form, summary: e.target.value })}
          rows={2}
          helpText="한두 문장으로 요약하세요."
        />
        <FormTextarea
          id="content"
          label="본문"
          placeholder="본문 내용을 입력하세요..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          rows={6}
          required
        />
      </div>
    );
  },
};
