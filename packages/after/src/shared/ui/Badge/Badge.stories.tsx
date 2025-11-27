import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Shared/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "green",
        "yellow",
        "red",
        "gray",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Green: Story = {
  args: {
    children: "Green",
    variant: "green",
  },
};

export const Yellow: Story = {
  args: {
    children: "Yellow",
    variant: "yellow",
  },
};

export const Red: Story = {
  args: {
    children: "Red",
    variant: "red",
  },
};

export const Gray: Story = {
  args: {
    children: "Gray",
    variant: "gray",
  },
};

