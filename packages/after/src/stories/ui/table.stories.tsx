import type { Meta, StoryObj } from "@storybook/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const meta = {
  title: "Components/UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

const rows = [
  { name: "디자인 시스템 구축", owner: "홍길동", status: "진행중", updatedAt: "2024-02-01" },
  { name: "접근성 리뷰", owner: "김UX", status: "대기", updatedAt: "2024-01-29" },
  { name: "React 19 마이그레이션", owner: "이프론트", status: "완료", updatedAt: "2024-01-25" },
]

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-3xl rounded-xl border bg-background p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>프로젝트</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>업데이트</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}

