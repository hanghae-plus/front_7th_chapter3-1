import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@/components/ui/Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    title: "알림 제목",
    children: "상세한 설명이 이곳에 들어갑니다.",
    showIcon: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "정보",
    children: "정보성 메시지를 보여줄 때 사용합니다.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "성공",
    children: "성공적으로 처리되었을 때 사용합니다.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "경고",
    children: "주의가 필요한 상황일 때 사용합니다.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "에러",
    children: "처리 중 오류가 발생했을 때 사용합니다.",
  },
};


