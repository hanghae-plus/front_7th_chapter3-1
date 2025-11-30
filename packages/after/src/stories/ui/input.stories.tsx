import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@/components/ui/input"

const meta = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "값을 입력하세요",
  },
  argTypes: {
    type: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: "프리셋 값",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "형식 오류",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "읽기 전용",
  },
}

