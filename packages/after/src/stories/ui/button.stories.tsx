import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "danger", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon", "icon-sm", "icon-lg"],
    },
    fullWidth: {
      control: "boolean",
    },
    asChild: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "기본 버튼",
    variant: "primary",
    size: "md",
  },
}

export const Secondary: Story = {
  args: {
    children: "보조 버튼",
    variant: "secondary",
  },
}

export const Destructive: Story = {
  args: {
    children: "위험 작업",
    variant: "destructive",
  },
}

export const FullWidth: Story = {
  args: {
    children: "넓게 확장",
    variant: "primary",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
}

export const Icon: Story = {
  args: {
    variant: "ghost",
    size: "icon",
    children: "☆",
    "aria-label": "아이콘 버튼",
  },
}

