import type { Meta, StoryObj } from "@storybook/react";
import { Table, Column } from "./Table";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    striped: {
      control: "boolean",
      description: "Striped rows",
    },
    bordered: {
      control: "boolean",
      description: "Bordered table",
    },
    hover: {
      control: "boolean",
      description: "Hover effect",
    },
    searchable: {
      control: "boolean",
      description: "Enable search",
    },
    sortable: {
      control: "boolean",
      description: "Enable sorting",
    },
    pageSize: {
      control: "number",
      description: "Items per page",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: string;
}

const userData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 28, status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 34, status: "active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 45, status: "inactive" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", age: 23, status: "active" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", age: 37, status: "pending" },
  { id: 6, name: "Diana Prince", email: "diana@example.com", age: 31, status: "active" },
  { id: 7, name: "Ethan Hunt", email: "ethan@example.com", age: 42, status: "inactive" },
  { id: 8, name: "Fiona Green", email: "fiona@example.com", age: 29, status: "active" },
  { id: 9, name: "George Wilson", email: "george@example.com", age: 55, status: "pending" },
  { id: 10, name: "Helen Davis", email: "helen@example.com", age: 26, status: "active" },
];

const userColumns: Column<User>[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "age", header: "Age", width: "100px" },
  {
    key: "status",
    header: "Status",
    width: "120px",
    render: (value) => {
      const status = String(value);
      const variant = status === "active" ? "success" : status === "inactive" ? "danger" : "warning";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

export const Default: Story = {
  args: {
    columns: userColumns,
    data: userData,
  },
};

export const Striped: Story = {
  args: {
    columns: userColumns,
    data: userData,
    striped: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: userColumns,
    data: userData,
    bordered: true,
  },
};

export const Hover: Story = {
  args: {
    columns: userColumns,
    data: userData,
    hover: true,
  },
};

export const WithSearch: Story = {
  args: {
    columns: userColumns,
    data: userData,
    searchable: true,
  },
};

export const WithSorting: Story = {
  args: {
    columns: userColumns,
    data: userData,
    sortable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns: userColumns,
    data: userData,
    pageSize: 5,
  },
};

export const FullFeatured: Story = {
  args: {
    columns: userColumns,
    data: userData,
    striped: true,
    hover: true,
    searchable: true,
    sortable: true,
    pageSize: 5,
  },
};

export const WithRowClick: Story = {
  args: {
    columns: userColumns,
    data: userData,
    hover: true,
    onRowClick: (row: User) => alert(`Clicked on ${row.name}`),
  },
};

export const EmptyData: Story = {
  args: {
    columns: userColumns,
    data: [],
    searchable: true,
  },
};

export const SmallDataset: Story = {
  args: {
    columns: userColumns,
    data: userData.slice(0, 3),
    striped: true,
    bordered: true,
  },
};

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const productData: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 15 },
  { id: 2, name: "Mouse", category: "Electronics", price: 25, stock: 150 },
  { id: 3, name: "Keyboard", category: "Electronics", price: 75, stock: 80 },
  { id: 4, name: "Monitor", category: "Electronics", price: 300, stock: 45 },
  { id: 5, name: "Desk Chair", category: "Furniture", price: 250, stock: 30 },
];

const productColumns: Column<Product>[] = [
  { key: "id", header: "Product ID", width: "100px" },
  { key: "name", header: "Product Name" },
  { key: "category", header: "Category", width: "150px" },
  {
    key: "price",
    header: "Price",
    width: "120px",
    render: (value) => `$${value}`,
  },
  {
    key: "stock",
    header: "Stock",
    width: "100px",
    render: (value) => {
      const stock = Number(value);
      return (
        <Badge variant={stock > 50 ? "success" : stock > 20 ? "warning" : "danger"}>
          {stock}
        </Badge>
      );
    },
  },
];

export const ProductTable: Story = {
  args: {
    columns: productColumns,
    data: productData,
    striped: true,
    hover: true,
    sortable: true,
  },
};

export const AutoColumns: Story = {
  args: {
    data: userData.slice(0, 5),
    striped: true,
  },
};
