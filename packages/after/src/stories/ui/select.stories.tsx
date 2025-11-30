import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta = {
  title: "Components/UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const options = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "accessibility", label: "Accessibility" },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(options[0].value)
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="min-w-[220px]">
          <SelectValue placeholder="옵션 선택" />
        </SelectTrigger>
        <SelectContent align="start" className="min-w-[220px]">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
}

