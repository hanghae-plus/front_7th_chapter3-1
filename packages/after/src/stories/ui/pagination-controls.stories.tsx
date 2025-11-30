import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { PaginationControls } from "@/components/ui/pagination-controls"

const meta = {
  title: "Components/UI/PaginationControls",
  component: PaginationControls,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PaginationControls>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    page: 1,
    totalPages: 12,
    onPrev: () => {},
    onNext: () => {},
  },
  render: (args) => {
    const [page, setPage] = useState(args.page ?? 1)
    const totalPages = args.totalPages ?? 1
    return (
      <PaginationControls
        {...args}
        page={page}
        totalPages={totalPages}
        onPrev={() => {
          setPage((prev) => Math.max(1, prev - 1))
          args.onPrev?.()
        }}
        onNext={() => {
          setPage((prev) => Math.min(totalPages, prev + 1))
          args.onNext?.()
        }}
      />
    )
  },
}

