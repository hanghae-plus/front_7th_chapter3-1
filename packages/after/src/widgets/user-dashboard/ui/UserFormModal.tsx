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
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    role: "",
    status: "",
  });
  const isValidForm = formData.username && formData.email;
  const isEdit = !!user;

  const handleChange = useCallback((key: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (formData: UserFormData) => {
      try {
        if (isEdit) {
          await onUpdate(formData);
        } else {
          await onCreate(formData);
        }
        setFormData({ username: "", email: "", role: "", status: "" });
        toggleModal(false);
      } catch (error) {
        console.error(error);
      }
    },
    [isEdit, onCreate, onUpdate, toggleModal]
  );

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: user?.username || "",
        email: user?.email || "",
        role: user?.role || "",
        status: user?.status || "",
      });
    }
  }, [isOpen, user]);

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
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button
            disabled={!isValidForm}
            onClick={() => handleSubmit(formData)}
          >
            {isEdit ? "수정 완료" : "생성"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
