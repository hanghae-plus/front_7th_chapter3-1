import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Shared/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    rows: {
      control: "number",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "이미 입력된 텍스트입니다.",
    placeholder: "텍스트를 입력하세요",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화된 텍스트 영역",
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    placeholder: "큰 텍스트 영역",
    rows: 10,
    className: "w-[500px]",
  },
};

export const Small: Story = {
  args: {
    placeholder: "작은 텍스트 영역",
    rows: 3,
    className: "w-[300px]",
  },
};

