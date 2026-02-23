import { useMemo } from "react";

import type { EntityType, StatCard } from "@/type/management";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

type Entity = User | Post;

export const useManagementStats = (
  entityType: EntityType,
  data: Entity[]
): StatCard[] => {
  return useMemo(() => {
    if (entityType === "user") {
      const users = data as User[];
      return [
        {
          id: "total",
          title: users.length,
          description: "전체",
          variant: "info",
        },
        {
          id: "active",
          title: users.filter((user) => user.status === "active").length,
          description: "활성",
          variant: "success",
        },
        {
          id: "inactive",
          title: users.filter((user) => user.status === "inactive").length,
          description: "비활성",
          variant: "warning",
        },
        {
          id: "suspended",
          title: users.filter((user) => user.status === "suspended").length,
          description: "정지",
          variant: "danger",
        },
        {
          id: "admin",
          title: users.filter((user) => user.role === "admin").length,
          description: "관리자",
          variant: "muted",
        },
      ];
    }

    const posts = data as Post[];
    return [
      {
        id: "total",
        title: posts.length,
        description: "전체",
        variant: "info",
      },
      {
        id: "published",
        title: posts.filter((post) => post.status === "published").length,
        description: "게시됨",
        variant: "success",
      },
      {
        id: "draft",
        title: posts.filter((post) => post.status === "draft").length,
        description: "임시저장",
        variant: "warning",
      },
      {
        id: "archived",
        title: posts.filter((post) => post.status === "archived").length,
        description: "보관됨",
        variant: "muted",
      },
      {
        id: "views",
        title: posts.reduce((sum, post) => sum + post.views, 0),
        description: "총 조회수",
        variant: "danger",
      },
    ];
  }, [entityType, data]);
};


