import type { Meta, StoryObj } from "@storybook/react";
import StatsCard from "@/components/composed/StatsCard";

const meta = {
  title: "Composed/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
  args: {
    title: "Total Users",
    subtitle: "1,245",
    variant: "default",
    color: "primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "flat"],
    },
    color: {
      control: "select",
      options: ["primary", "green", "orange", "red", "neutral"],
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ElevatedWarning: Story = {
  args: {
    variant: "elevated",
    color: "orange",
    title: "Pending Approvals",
    subtitle: "32",
  },
};
