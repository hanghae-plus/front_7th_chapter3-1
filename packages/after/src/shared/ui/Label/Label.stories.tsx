import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta = {
  title: "Shared/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "라벨 텍스트",
  },
};

export const WithHtmlFor: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="input-id">입력 필드 라벨</Label>
      <input
        id="input-id"
        type="text"
        placeholder="입력하세요"
        className="border rounded px-2 py-1"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <Label>
      필수 항목 <span className="text-red-500">*</span>
    </Label>
  ),
};

