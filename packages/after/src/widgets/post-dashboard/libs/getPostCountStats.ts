import type { Post } from "@/shared/api/postService";

export const getPostCountStats = (posts: Post[]) => {
  return posts.reduce(
    (acc, post) => {
      acc.total += 1;
      acc.views += post.views;
      if (post.status === "published") acc.published += 1;
      if (post.status === "draft") acc.draft += 1;
      if (post.status === "archived") acc.archived += 1;
      return acc;
    },
    { total: 0, published: 0, draft: 0, archived: 0, views: 0 }
  );
};
