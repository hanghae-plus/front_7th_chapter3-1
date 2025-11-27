import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";
import { Info as InfoIcon } from "lucide-react";

const meta = {
  title: "Shared/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>알림 제목</AlertTitle>
      <AlertDescription>이것은 기본 알림 메시지입니다.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>오류가 발생했습니다.</AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <InfoIcon />
      <AlertTitle>정보</AlertTitle>
      <AlertDescription>이것은 정보 메시지입니다.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <AlertTitle>성공</AlertTitle>
      <AlertDescription>작업이 성공적으로 완료되었습니다.</AlertDescription>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert variant="error">
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>오류가 발생했습니다.</AlertDescription>
    </Alert>
  ),
};
