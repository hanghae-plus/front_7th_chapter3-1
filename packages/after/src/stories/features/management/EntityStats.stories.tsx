import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { EntityStats } from "@/features/management/components/EntityStats"
import type { EntityType, StatMetric } from "@/features/management/types"

const meta = {
  title: "Features/Management/EntityStats",
  component: EntityStats,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof EntityStats>

export default meta

type Story = StoryObj<typeof meta>

const metrics: StatMetric[] = [
  { label: "전체 게시글", value: 128, tone: "default" },
  { label: "게시됨", value: 64, tone: "success" },
  { label: "임시저장", value: 18, tone: "warning" },
  { label: "보관됨", value: 12, tone: "danger" },
  { label: "총 조회수", value: 45230, tone: "muted", helper: "지난 30일" },
]

export const Default: Story = {
  args: {
    title: "콘텐츠 현황",
    description: "게시물 상태와 주요 지표",
    metrics,
    entityType: "post" as EntityType,
    onEntityChange: () => {},
  },
  render: (args) => {
    const [entityType, setEntityType] = useState<EntityType>("post")
    return (
      <EntityStats
        {...args}
        entityType={entityType}
        onEntityChange={setEntityType}
      />
    )
  },
}

