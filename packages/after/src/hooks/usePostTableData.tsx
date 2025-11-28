import type { Post } from "@/services/postService";
import { useState } from "react";
import { postService } from "@/services/postService";
import PostDialogContent from "@/components/domain/post/PostDialogContent";
import { useDialog } from "./useDialog";

const usePostTableData = ({
  setAlertState,
}: {
  setAlertState: (state: { show: boolean; message: string; variant: "success" | "error" }) => void;
}) => {
  const { openDialog, closeDialog } = useDialog();
  const [postData, setPostData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPostTableData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await postService.getAll();
      setPostData(result);
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "데이터를 불러오는데 실패했습니다", variant: "error" });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createPostTableData = async (data: { title: string; content: string; author: string; category: string }) => {
    setError(null);
    try {
      await postService.create({
        ...data,
        status: "draft",
      });
      await getPostTableData();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "게시글 생성에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const editPostTableData = async (
    postId: number,
    data: { title: string; content: string; author: string; category: string }
  ) => {
    setError(null);
    try {
      await postService.update(postId, data);
      await getPostTableData();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "게시글 수정에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const deletePostTableData = async (id: number) => {
    setError(null);
    try {
      await postService.delete(id);
      await getPostTableData();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "삭제에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const handleStatusAction = async (id: number, action: "publish" | "archive" | "restore") => {
    setError(null);
    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await getPostTableData();
      const message = action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertState({ show: true, message: `${message}되었습니다`, variant: "success" });
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "작업에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const handleCreatePost = () => {
    const createPostData = async (data: { title: string; content: string; author: string; category: string }) => {
      try {
        await createPostTableData(data);
        setAlertState({ show: true, message: "게시글이 생성되었습니다", variant: "success" });
        closeDialog();
      } catch (error: any) {
        setAlertState({ show: true, message: error.message || "게시글 생성에 실패했습니다", variant: "error" });
        closeDialog();
      }
    };

    openDialog({
      title: "게시글 생성",
      content: <PostDialogContent type="create" onClose={() => closeDialog()} onCreate={createPostData} />,
    });
  };

  const handleEditPost = (item: Post) => {
    const editPostData = async (data: { title: string; content: string; author: string; category: string }) => {
      try {
        await editPostTableData(item.id, data);
        setAlertState({ show: true, message: "게시글이 수정되었습니다", variant: "success" });
        closeDialog();
      } catch (error: any) {
        setAlertState({ show: true, message: error.message || "게시글 수정에 실패했습니다", variant: "error" });
        closeDialog();
      }
    };

    openDialog({
      title: "게시글 수정",
      content: (
        <PostDialogContent type="edit" onClose={() => closeDialog()} onEdit={editPostData} initialData={item} />
      ),
    });
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deletePostTableData(id);
      setAlertState({ show: true, message: "삭제되었습니다", variant: "success" });
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "삭제에 실패했습니다", variant: "error" });
    }
  };

  return {
    postData,
    isLoading,
    error,
    getPostTableData,
    editPostTableData,
    createPostTableData,
    deletePostTableData,
    handleCreatePost,
    handleEditPost,
    handleDeletePost,
    handleStatusAction,
  };
};

export default usePostTableData;

