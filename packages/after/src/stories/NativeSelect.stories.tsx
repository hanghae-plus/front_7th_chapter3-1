import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const meta = {
  title: "Form/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <NativeSelectOption value="user">사용자</NativeSelectOption>
        <NativeSelectOption value="moderator">운영자</NativeSelectOption>
        <NativeSelectOption value="admin">관리자</NativeSelectOption>
      </>
    ),
    defaultValue: "user",
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-1.5 text-left">
      <label className="text-sm font-semibold text-app-foreground">상태</label>
      <NativeSelect defaultValue="active" className="w-full max-w-xs">
        <NativeSelectOption value="draft">임시저장</NativeSelectOption>
        <NativeSelectOption value="published">게시됨</NativeSelectOption>
        <NativeSelectOption value="archived">보관됨</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};
