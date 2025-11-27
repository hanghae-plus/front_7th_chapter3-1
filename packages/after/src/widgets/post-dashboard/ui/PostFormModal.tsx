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
import { useCallback, useRef } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!post;

  const defaultFormData: PostFormData = {
    title: post?.title || "",
    author: post?.author || "",
    category: post?.category || "",
    content: post?.content || "",
  };

  const handleFormSubmit = useCallback(
    async (formData: PostFormData) => {
      try {
        if (isEdit) {
          await onUpdate(formData);
        } else {
          await onCreate(formData);
        }
        toggleModal(false);
      } catch (error) {
        console.error(error);
      }
    },
    [isEdit, onCreate, onUpdate, toggleModal]
  );

  const handleSubmit = useCallback(() => {
    formRef.current?.requestSubmit();
  }, []);

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
          ref={formRef}
          formData={defaultFormData}
          onSubmit={handleFormSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            {isEdit ? "수정 완료" : "생성"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
