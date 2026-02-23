import type { Meta, StoryObj } from "@storybook/react-vite";

import { EntityTable } from "@/components/management/EntityTable";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

const userColumns = [
  { key: "id", header: "ID", width: "60px" },
  { key: "username", header: "사용자명" },
  { key: "email", header: "이메일" },
  { key: "role", header: "역할", width: "120px" },
  { key: "status", header: "상태", width: "120px" },
  { key: "actions", header: "관리", width: "260px" },
];

const postColumns = [
  { key: "id", header: "ID", width: "60px" },
  { key: "title", header: "제목" },
  { key: "author", header: "작성자", width: "140px" },
  { key: "category", header: "카테고리", width: "140px" },
  { key: "status", header: "상태", width: "120px" },
  { key: "actions", header: "관리", width: "360px" },
];

const sampleUsers: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20",
  },
  {
    id: 2,
    username: "john",
    email: "john@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-08",
    lastLogin: "2024-01-18",
  },
];

const samplePosts: Post[] = [
  {
    id: 1,
    title: "디자인 시스템 가이드",
    content: "",
    author: "김철수",
    category: "design",
    status: "published",
    views: 1200,
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "React 19 릴리즈 노트",
    content: "",
    author: "이영희",
    category: "development",
    status: "draft",
    views: 540,
    createdAt: "2024-01-13",
  },
];

const meta = {
  title: "Management/EntityTable",
  component: EntityTable,
  tags: ["autodocs"],
  args: {
    columns: userColumns,
    data: sampleUsers,
    entityType: "user",
    onEdit: () => {},
    onDelete: () => {},
  },
} satisfies Meta<typeof EntityTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Users: Story = {};

export const Posts: Story = {
  args: {
    columns: postColumns,
    data: samplePosts,
    entityType: "post",
    onStatusAction: () => {},
  },
};


