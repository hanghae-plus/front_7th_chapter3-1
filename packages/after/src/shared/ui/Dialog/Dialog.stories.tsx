import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "../Button";

const meta = {
  title: "Shared/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            이것은 다이얼로그 설명입니다. 여기에 추가 정보를 표시할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>다이얼로그 내용이 여기에 표시됩니다.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Simple: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>간단한 다이얼로그</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>간단한 다이얼로그</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>내용만 있는 간단한 다이얼로그입니다.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};
