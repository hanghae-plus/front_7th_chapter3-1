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
import { UserForm } from "@/features/user/ui/UserForm";
import type { UserFormData } from "@/features/user/types";
import type { User } from "@/shared/api/userService";

type UserFormModalProps = {
  isOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  user?: User | null;
  onCreate: (formData: UserFormData) => void;
  onUpdate: (formData: UserFormData) => void;
};

export function UserFormModal({
  isOpen,
  toggleModal,
  user,
  onCreate,
  onUpdate,
}: UserFormModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!user;

  const defaultFormData: UserFormData = {
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "",
    status: user?.status || "",
  };

  const handleFormSubmit = useCallback(
    async (formData: UserFormData) => {
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
            {isEdit ? "사용자 수정" : "새 사용자 만들기"}
          </DialogTitle>
        </DialogHeader>
        {isEdit && user && (
          <Alert variant="info">
            ℹ️
            <span className="ml-2">
              ID: {user.id} | 생성일: {user.createdAt}
            </span>
          </Alert>
        )}
        <UserForm
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
