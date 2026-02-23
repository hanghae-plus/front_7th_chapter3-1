import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputField } from "@/components/InputField";

const typeOptions = ["text", "email", "password", "number", "tel"] as const;

const meta = {
  title: "Form/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    label: "이름",
    placeholder: "홍길동",
    description: "한글 혹은 영문 2자 이상 입력해주세요.",
    helperText: "입력 내용은 실시간으로 저장됩니다.",
    required: true,
    type: "text",
  },
  argTypes: {
    type: {
      description: "HTML input type",
      control: "select",
      options: typeOptions,
      table: {
        type: { summary: typeOptions.join(" | ") },
        defaultValue: { summary: "text" },
      },
    },
    label: { control: "text" },
    description: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <InputField
        label="이메일"
        placeholder="name@example.com"
        helperText="로그인에 사용될 이메일 주소"
        type="email"
        required
      />
      <InputField
        label="비밀번호"
        placeholder="●●●●●●●●"
        type="password"
        description="영문/숫자/특수문자 중 2가지 이상 조합"
        helperText="8~20자 사이로 입력해주세요."
        required
      />
      <InputField
        label="연락처"
        placeholder="010-1234-5678"
        type="tel"
        helperText="숫자와 하이픈(-)만 입력 가능합니다."
      />
      <InputField
        label="닉네임"
        placeholder="dev_chacha"
        error="이미 사용 중인 닉네임입니다."
      />
      <InputField
        label="회사명"
        placeholder="회사명을 입력해주세요"
        helperText="공개 프로필에 노출되지 않습니다."
        disabled
      />
    </div>
  ),
};

export const TypeShowcase: Story = {
  args: {
    helperText: "",
    description: "",
    required: false,
  },
  render: (args) => (
    <div className="grid w-full max-w-2xl gap-4 md:grid-cols-2">
      {typeOptions.map((type) => (
        <InputField
          key={type}
          {...args}
          type={type}
          label={`타입: ${type}`}
          placeholder={`${type} 입력`}
        />
      ))}
    </div>
  ),
};
