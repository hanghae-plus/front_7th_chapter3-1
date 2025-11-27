import { PostTable } from "@/features/post/ui/PostTable";
import { Alert, Button, OverviewCards } from "@/shared/ui";
import { useCallback, useMemo, useState } from "react";
import type { Post } from "@/shared/api/postService";
import { getPostCountStats } from "../libs";
import { PostFormModal } from "./PostFormModal";
import type { PostFormData } from "@/features/post/types";
import { usePostAction } from "../model/usePostAction";

export function PostDashboard() {
  const {
    postList,
    deletePost,
    restorePost,
    publishPost,
    archivePost,
    createPost,
    updatePost,
    alert,
    closeAlert,
  } = usePostAction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const overviewData = useMemo(() => {
    const stats = getPostCountStats(postList);
    return [
      { label: "전체", value: stats.total, color: "blue" },
      { label: "게시됨", value: stats.published, color: "green" },
      { label: "임시저장", value: stats.draft, color: "yellow" },
      { label: "보관됨", value: stats.archived, color: "red" },
      { label: "총 조회수", value: stats.views, color: "gray" },
    ];
  }, [postList]);

  const handleOpenCreateModal = useCallback(() => {
    setSelectedPost(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  const handleCreatePost = useCallback(
    async (formData: PostFormData) => {
      await createPost(formData, () => {
        setIsModalOpen(false);
        setSelectedPost(null);
      });
    },
    [createPost]
  );

  const handleUpdatePost = useCallback(
    async (formData: PostFormData) => {
      if (!selectedPost) return;

      await updatePost(selectedPost.id, formData, selectedPost.status, () => {
        setIsModalOpen(false);
        setSelectedPost(null);
      });
    },
    [updatePost]
  );

  const toggleModal = useCallback((isOpen: boolean) => {
    setIsModalOpen(isOpen);
    setSelectedPost(null);
  }, []);

  return (
    <>
      <Button className="flex w-fit self-end" onClick={handleOpenCreateModal}>
        새로 만들기
      </Button>
      {alert && (
        <Alert
          variant={alert.type as "success" | "error"}
          className="flex justify-between items-start"
        >
          <div>
            <span className="font-bold block">
              {alert.type === "success" ? "성공" : "실패"}
            </span>
            <p>{alert.message}</p>
          </div>
          <button className="cursor-pointer" onClick={closeAlert}>
            ✕
          </button>
        </Alert>
      )}
      <OverviewCards overviewData={overviewData} />
      <PostTable
        postList={postList}
        onEdit={handleOpenEditModal}
        onDelete={deletePost}
        onRestore={restorePost}
        onPublish={publishPost}
        onArchive={archivePost}
      />
      <PostFormModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        post={selectedPost}
        onCreate={handleCreatePost}
        onUpdate={handleUpdatePost}
      />
    </>
  );
}
