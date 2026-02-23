import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/components/ui/badge";

const variantOptions = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
] as const;
const radiusOptions = ["default", "lg"] as const;

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
      options: variantOptions,
      description: "Badge variant style",
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "primary" },
      },
    },
    radius: {
      control: "select",
      options: radiusOptions,
      description: "Border radius size",
      table: {
        type: { summary: radiusOptions.join(" | ") },
        defaultValue: { summary: "default" },
      },
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
  args: {
    children: "Badge",
    variant: "primary",
    radius: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {variantOptions.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

export const RadiusOptions: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-end">
      {radiusOptions.map((radius) => (
        <Badge key={radius} {...args} radius={radius}>
          {radius === "default"
            ? "Default radius"
            : radius.charAt(0).toUpperCase() + radius.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};
