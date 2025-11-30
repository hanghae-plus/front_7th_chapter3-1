import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const meta = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>콘텐츠 카드</CardTitle>
        <CardDescription>카드 레이아웃과 액션 영역을 보여줍니다.</CardDescription>
        <CardAction>
          <Button size="sm" variant="secondary">
            설정
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          카드 컴포넌트는 제목, 본문, 액션으로 구성되어 정보성 블록을 쉽게 표현할 수 있습니다.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-3 border-t">
        <Button variant="ghost" size="sm">
          취소
        </Button>
        <Button size="sm">확인</Button>
      </CardFooter>
    </Card>
  ),
}

