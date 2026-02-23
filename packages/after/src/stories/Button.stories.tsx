import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";

const variantOptions = [
  "primary",
  "secondary",
  "danger",
  "success",
  "warning",
  "info",
  "outline",
  "ghost",
] as const;
const sizeOptions = ["default", "sm", "lg"] as const;

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
      description: "Button variant style",
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: sizeOptions,
      description: "Button size",
      table: {
        type: { summary: sizeOptions.join(" | ") },
        defaultValue: { summary: "default" },
      },
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {variantOptions.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-end">
      {sizeOptions.map((size) => (
        <Button key={size} {...args} size={size}>
          {size === "default"
            ? "Default"
            : size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  ),
};
