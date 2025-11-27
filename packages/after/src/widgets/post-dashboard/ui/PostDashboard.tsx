import { PostTable } from "@/features/post/ui/PostTable";
import { OverviewCards } from "@/shared/ui";
import { useMemo } from "react";
import type { Post } from "@/shared/api/postService";
import { getPostCountStats } from "../libs";

export function PostDashboard({ data }: { data: Post[] }) {
  const overviewData = useMemo(() => {
    const stats = getPostCountStats(data);
    return [
      { label: "전체", value: stats.total, color: "blue" },
      { label: "게시됨", value: stats.published, color: "green" },
      { label: "임시저장", value: stats.draft, color: "yellow" },
      { label: "보관됨", value: stats.archived, color: "red" },
      { label: "총 조회수", value: stats.views, color: "gray" },
    ];
  }, [data]);

  return (
    <>
      <OverviewCards overviewData={overviewData} />
      <PostTable postList={data} onEdit={() => {}} onDelete={() => {}} />
    </>
  );
}
