import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { EntityTable } from "@/features/management/components/EntityTable"
import type { Entity } from "@/features/management/types"

const userRows: Entity[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-02-02",
  },
  {
    id: 2,
    username: "designer",
    email: "designer@example.com",
    role: "moderator",
    status: "inactive",
    createdAt: "2024-01-05",
    lastLogin: "2024-02-01",
  },
  {
    id: 3,
    username: "reader",
    email: "reader@example.com",
    role: "user",
    status: "suspended",
    createdAt: "2024-01-10",
  },
]

const postRows: Entity[] = [
  {
    id: 11,
    title: "디자인 시스템 구축 가이드",
    author: "김디자",
    category: "design",
    status: "published",
    views: 1200,
    createdAt: "2024-01-12",
    content: "디자인 시스템을 구축하는 방법...",
  },
  {
    id: 12,
    title: "React 19 새 기능",
    author: "프론트",
    category: "development",
    status: "draft",
    views: 450,
    createdAt: "2024-01-18",
    content: "React 19에서 추가된 기능...",
  },
  {
    id: 13,
    title: "접근성 체크리스트",
    author: "UX팀",
    category: "accessibility",
    status: "archived",
    views: 980,
    createdAt: "2024-01-22",
    content: "WCAG를 기반으로 한 체크리스트...",
  },
]

const meta = {
  title: "Features/Management/EntityTable",
  component: EntityTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onEdit: fn(),
    onDelete: fn(),
    onStatusAction: fn(),
    onOpenCreateDialog: fn(),
  },
} satisfies Meta<typeof EntityTable>

export default meta

type Story = StoryObj<typeof meta>

export const Users: Story = {
  args: {
    entityType: "user",
    data: userRows,
  },
}

export const Posts: Story = {
  args: {
    entityType: "post",
    data: postRows,
  },
}

