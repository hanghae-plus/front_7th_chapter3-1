import type { Meta, StoryObj } from "@storybook/react"
import { StatusBadge } from "@/features/management/components/StatusBadge"

const meta = {
  title: "Features/Management/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Tones: Story = {
  args: {
    label: "Primary",
    tone: "primary",
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <StatusBadge label="Primary" tone="primary" />
      <StatusBadge label="Success" tone="success" />
      <StatusBadge label="Warning" tone="warning" />
      <StatusBadge label="Danger" tone="danger" />
      <StatusBadge label="Neutral" tone="neutral" />
    </div>
  ),
}

