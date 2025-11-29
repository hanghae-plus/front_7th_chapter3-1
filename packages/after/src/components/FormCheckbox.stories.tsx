import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormCheckbox } from './FormCheckbox';

const meta: Meta<typeof FormCheckbox> = {
  title: 'Composed/FormCheckbox',
  component: FormCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormCheckbox>;

export const Default: Story = {
  args: {
    id: 'checkbox-default',
    label: '이용약관에 동의합니다',
  },
};

export const Checked: Story = {
  args: {
    id: 'checkbox-checked',
    label: '이용약관에 동의합니다',
    checked: true,
  },
};

export const WithHelpText: Story = {
  args: {
    id: 'checkbox-help',
    label: '마케팅 정보 수신',
    helpText: '이메일로 새로운 소식을 받아보세요.',
  },
};

export const Invalid: Story = {
  args: {
    id: 'checkbox-invalid',
    label: '필수 동의',
    invalid: true,
    invalidText: '필수 항목입니다.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'checkbox-disabled',
    label: '비활성화된 체크박스',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    id: 'checkbox-disabled-checked',
    label: '비활성화된 체크박스 (체크됨)',
    disabled: true,
    checked: true,
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [terms, setTerms] = useState(false);
    const [marketing, setMarketing] = useState(false);

    return (
      <div className="space-y-4">
        <FormCheckbox
          id="terms"
          label="이용약관에 동의합니다 (필수)"
          checked={terms}
          onCheckedChange={setTerms}
          invalid={!terms}
          invalidText={!terms ? '이용약관 동의는 필수입니다.' : undefined}
        />
        <FormCheckbox
          id="marketing"
          label="마케팅 정보 수신 (선택)"
          checked={marketing}
          onCheckedChange={setMarketing}
          helpText="새로운 기능과 이벤트 소식을 받아보세요."
        />
        <div className="pt-4 text-sm text-gray-600">
          <p>이용약관: {terms ? '동의함' : '미동의'}</p>
          <p>마케팅 수신: {marketing ? '동의함' : '미동의'}</p>
        </div>
      </div>
    );
  },
};
