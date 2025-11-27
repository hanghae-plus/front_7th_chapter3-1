import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Alert,
} from "@/shared/ui";
import { useCallback, useEffect, useState } from "react";
import { PostForm } from "@/features/post/ui/PostForm";
import type { PostFormData } from "@/features/post/types";
import type { Post } from "@/shared/api/postService";

type PostFormModalProps = {
  isOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  post?: Post | null;
  onCreate: (formData: PostFormData) => void;
  onUpdate: (formData: PostFormData) => void;
};

export function PostFormModal({
  isOpen,
  toggleModal,
  post,
  onCreate,
  onUpdate,
}: PostFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
  });
  const isValidForm = formData.title && formData.author && formData.category;
  const isEdit = !!post;

  const handleChange = useCallback((key: keyof PostFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      if (isEdit) {
        await onUpdate(formData);
      } else {
        await onCreate(formData);
      }

      setFormData({ title: "", author: "", category: "", content: "" });
      toggleModal(false);
    } catch (error) {
      console.error(error);
    }
  }, [isEdit, formData, onCreate, onUpdate]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: post?.title || "",
        author: post?.author || "",
        category: post?.category || "",
        content: post?.content || "",
      });
    }
  }, [isOpen, post]);

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "게시글 수정" : "새 게시글 만들기"}
          </DialogTitle>
        </DialogHeader>
        {isEdit && (
          <Alert variant="info">
            ℹ️
            <span className="ml-2">
              ID: {post.id} | 생성일: {post.createdAt} | 조회수: {post.views}
            </span>
          </Alert>
        )}
        <PostForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button disabled={!isValidForm} onClick={handleSubmit}>
            {isEdit ? "수정 완료" : "생성"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
