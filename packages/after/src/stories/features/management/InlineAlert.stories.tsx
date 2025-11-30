import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { InlineAlert } from "@/features/management/components/InlineAlert"

const meta = {
  title: "Features/Management/InlineAlert",
  component: InlineAlert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof InlineAlert>

export default meta

type Story = StoryObj<typeof meta>

export const Variants: Story = {
  args: {
    title: "저장 완료",
    variant: "success",
    children: "변경 사항이 성공적으로 저장되었습니다.",
  },
  render: (args) => {
    const [visible, setVisible] = useState(true)
    if (!visible) {
      return (
        <button
          type="button"
          className="rounded-md border px-3 py-1 text-sm"
          onClick={() => setVisible(true)}
        >
          알림 다시 보기
        </button>
      )
    }
    return (
      <InlineAlert {...args} onClose={() => setVisible(false)}>
        {args.children}
      </InlineAlert>
    )
  },
}

