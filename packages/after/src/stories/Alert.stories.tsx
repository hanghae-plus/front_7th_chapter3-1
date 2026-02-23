import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoAlert } from "@/components/InfoAlert";

const variantOptions = [
  "success",
  "danger",
  "warning",
  "info",
  "muted",
] as const;

const meta = {
  title: "UI/InfoAlert",
  component: InfoAlert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
      description: "Alert tone",
      table: {
        type: { summary: variantOptions.join(" | ") },
        defaultValue: { summary: "success" },
      },
    },
    title: {
      control: "text",
      description: "Alert title",
    },
    description: {
      control: "text",
      description: "Alert message",
    },
    onClose: {
      action: "closed",
      description: "Callback when alert is closed",
    },
  },
  args: {
    variant: "success",
    title: "Title",
    description: "Description",
    onClose: () => {},
  },
} satisfies Meta<typeof InfoAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {variantOptions.map((variant) => (
        <InfoAlert
          key={variant}
          {...args}
          variant={variant}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} 알림`}
          description="현재 상태 메시지"
          onClose={() => {}}
        />
      ))}
    </div>
  ),
};
