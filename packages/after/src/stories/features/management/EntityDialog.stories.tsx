import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { EntityDialog } from "@/features/management/components/EntityDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "Features/Management/EntityDialog",
  component: EntityDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof EntityDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    open: false,
    entityType: "post",
    mode: "create",
    onClose: () => {},
    children: null,
  },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
        <EntityDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input id="title" placeholder="게시글 제목" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button type="button" onClick={() => setOpen(false)}>
                저장
              </Button>
            </div>
          </div>
        </EntityDialog>
      </>
    )
  },
}

