import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "@/components/composed/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", status: "active" },
  { id: 2, name: "Bob", email: "bob@example.com", status: "inactive" },
  { id: 3, name: "Charlie", email: "charlie@example.com", status: "active" },
  { id: 4, name: "Dana", email: "dana@example.com", status: "pending" },
  { id: 5, name: "Eve", email: "eve@example.com", status: "active" },
  { id: 6, name: "Frank", email: "frank@example.com", status: "inactive" },
];

const meta = {
  title: "Composed/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    tableData: sampleData,
    pageSize: 5,
    columns: [
      { key: "id", header: "ID", width: "64px" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      {
        key: "status",
        header: "Status",
        render: (row: User) => row.status.toUpperCase(),
      },
    ],
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SmallPageSize: Story = {
  args: {
    pageSize: 2,
  },
};
