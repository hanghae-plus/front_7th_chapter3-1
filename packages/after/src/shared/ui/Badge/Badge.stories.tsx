import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
      description: "Badge variant",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Badge size",
    },
    pill: {
      control: "boolean",
      description: "Pill style (rounded)",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    children: "Large",
  },
};

export const PillStyle: Story = {
  args: {
    variant: "primary",
    pill: true,
    children: "Pill Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
};

export const PillVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="primary" pill>Primary</Badge>
      <Badge variant="secondary" pill>Secondary</Badge>
      <Badge variant="success" pill>Success</Badge>
      <Badge variant="danger" pill>Danger</Badge>
      <Badge variant="warning" pill>Warning</Badge>
      <Badge variant="info" pill>Info</Badge>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge variant="danger" pill>5</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="info" pill>12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>New</span>
        <Badge variant="success" pill>3</Badge>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
