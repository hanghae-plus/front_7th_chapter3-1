import { useState, useEffect, useCallback } from "react";
import { postService, type Post } from "@/shared/api/postService";
import type { PostFormData } from "@/features/post/types";

export function usePostAction() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const loadPosts = useCallback(async () => {
    try {
      const posts = await postService.getAll();
      setPostList(posts);
    } catch (error) {
      setAlert({
        type: "실패",
        message: "게시글을 불러오는데 실패했습니다",
      });
    }
  }, []);

  const deletePost = useCallback(
    async (id: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
        await postService.delete(id);
        await loadPosts();
        setAlert({
          type: "성공",
          message: "삭제되었습니다",
        });
      } catch (error) {
        setAlert({
          type: "실패",
          message: "게시글 삭제에 실패했습니다",
        });
      }
    },
    [loadPosts]
  );

  const restorePost = useCallback(
    async (id: number) => {
      try {
        await postService.restore(id);
        await loadPosts();
        setAlert({
          type: "성공",
          message: "복원되었습니다",
        });
      } catch (error) {
        setAlert({
          type: "실패",
          message: "게시글 복원에 실패했습니다",
        });
      }
    },
    [loadPosts]
  );

  const publishPost = useCallback(
    async (id: number) => {
      try {
        await postService.publish(id);
        await loadPosts();
        setAlert({
          type: "성공",
          message: "게시되었습니다",
        });
      } catch (error) {
        setAlert({
          type: "실패",
          message: "게시글 게시에 실패했습니다",
        });
      }
    },
    [loadPosts]
  );

  const archivePost = useCallback(
    async (id: number) => {
      try {
        await postService.archive(id);
        await loadPosts();
        setAlert({
          type: "성공",
          message: "보관되었습니다",
        });
      } catch (error) {
        setAlert({
          type: "실패",
          message: "게시글 보관에 실패했습니다",
        });
      }
    },
    [loadPosts]
  );

  const createPost = useCallback(
    async (formData: PostFormData, onComplete?: () => void) => {
      await postService.create({
        ...formData,
        status: "draft",
      });
      await loadPosts();
      onComplete?.();
    },
    [loadPosts]
  );

  const updatePost = useCallback(
    async (
      id: number,
      formData: PostFormData,
      status: Post["status"],
      onComplete?: () => void
    ) => {
      await postService.update(id, {
        ...formData,
        status,
      });
      await loadPosts();
      onComplete?.();
    },
    [loadPosts]
  );

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    postList,
    deletePost,
    restorePost,
    publishPost,
    archivePost,
    createPost,
    updatePost,
    alert,
    closeAlert,
  };
}
