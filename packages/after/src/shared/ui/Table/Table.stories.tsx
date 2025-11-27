import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta = {
  title: "Shared/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>hong@example.com</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center text-muted-foreground">
            데이터가 없습니다
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const ManyRows: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>사용자 {i + 1}</TableCell>
            <TableCell>user{i + 1}@example.com</TableCell>
            <TableCell>{i % 2 === 0 ? "활성" : "비활성"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

