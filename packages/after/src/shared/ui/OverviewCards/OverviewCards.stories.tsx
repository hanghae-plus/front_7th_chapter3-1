import type { Meta, StoryObj } from "@storybook/react";
import { OverviewCards } from "./OverviewCards";
import type { OverviewData } from "./OverviewCards";

const meta = {
  title: "Shared/OverviewCards",
  component: OverviewCards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OverviewCards>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: OverviewData[] = [
  { label: "총 사용자", value: 1234, color: "blue" },
  { label: "활성 사용자", value: 856, color: "green" },
  { label: "대기 중", value: 234, color: "yellow" },
  { label: "비활성", value: 144, color: "red" },
];

export const Default: Story = {
  args: {
    overviewData: sampleData,
  },
};

export const SingleCard: Story = {
  args: {
    overviewData: [{ label: "총 사용자", value: 1234, color: "blue" }],
  },
};

export const TwoCards: Story = {
  args: {
    overviewData: [
      { label: "활성", value: 856, color: "green" },
      { label: "비활성", value: 144, color: "red" },
    ],
  },
};

export const AllColors: Story = {
  args: {
    overviewData: [
      { label: "Blue", value: 100, color: "blue" },
      { label: "Green", value: 200, color: "green" },
      { label: "Yellow", value: 300, color: "yellow" },
      { label: "Red", value: 400, color: "red" },
      { label: "Gray", value: 500, color: "gray" },
    ],
  },
};

