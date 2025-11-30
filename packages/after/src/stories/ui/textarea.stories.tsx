import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "Components/UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "내용을 입력하세요",
    rows: 5,
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: "기존에 저장된 텍스트",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "읽기 전용 상태",
  },
}

