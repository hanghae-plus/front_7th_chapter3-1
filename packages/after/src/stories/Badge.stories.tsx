import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    type: "primary",
    pill: false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger", "info"],
    },
    pill: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
  },
};

export const Success: Story = {
  args: {
    type: "success",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
  },
};

export const Info: Story = {
  args: {
    type: "info",
  },
};

export const Pill: Story = {
  args: {
    pill: true,
  },
};


