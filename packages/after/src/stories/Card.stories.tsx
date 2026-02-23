import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoCard } from "@/components/InfoCard";

const variantOptions = [
  "success",
  "danger",
  "warning",
  "info",
  "muted",
] as const;

const meta = {
  title: "UI/InfoCard",
  component: InfoCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
      description: "Card tone",
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "success" },
      },
    },
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Card subtitle/description",
    },
  },
  args: {
    title: "활성 사용자 3명",
    description: "현재 운영 중인 계정",
    variant: "success",
  },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <InfoCard
        variant="info"
        title="전체 사용자 4명"
        description="등록된 총 사용자 수"
      />
      <InfoCard
        variant="success"
        title="활성 사용자 3명"
        description="현재 운영 중인 계정"
      />
      <InfoCard
        variant="warning"
        title="비활성 계정 0명"
        description="7일 이상 접속하지 않음"
      />
      <InfoCard
        variant="danger"
        title="정지 계정 1명"
        description="조치가 필요한 사용자"
      />
      <InfoCard
        variant="muted"
        title="관리자 1명"
        description="콘솔 접근 권한 보유"
      />
    </div>
  ),
};

export const UserManagement: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <InfoCard variant="info" title="4" description="전체" />
      <InfoCard variant="success" title="3" description="활성" />
      <InfoCard variant="warning" title="0" description="비활성" />
      <InfoCard variant="danger" title="1" description="정지" />
      <InfoCard variant="muted" title="1" description="관리자" />
    </div>
  ),
};

export const PostManagement: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <InfoCard variant="info" title="5" description="전체" />
      <InfoCard variant="success" title="2" description="게시됨" />
      <InfoCard variant="warning" title="2" description="임시저장" />
      <InfoCard variant="muted" title="1" description="보관됨" />
      <InfoCard variant="danger" title="3950" description="총 조회수" />
    </div>
  ),
};
