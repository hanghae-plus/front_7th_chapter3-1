import { useState, useEffect, useCallback } from "react";
import { userService, type User } from "@/shared/api/userService";
import type { UserFormData } from "@/features/user/types";

export function useUserAction() {
  const [userList, setUserList] = useState<User[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const loadUsers = useCallback(async () => {
    try {
      const users = await userService.getAll();
      setUserList(users);
    } catch (error) {
      setAlert({
        type: "error",
        message: "사용자를 불러오는데 실패했습니다",
      });
    }
  }, []);

  const deleteUser = useCallback(
    async (id: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
        await userService.delete(id);
        await loadUsers();
        setAlert({
          type: "success",
          message: "삭제되었습니다",
        });
      } catch (error) {
        setAlert({
          type: "error",
          message: "사용자 삭제에 실패했습니다",
        });
      }
    },
    [loadUsers]
  );

  const createUser = useCallback(
    async (formData: UserFormData, onComplete?: () => void) => {
      try {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role as User["role"],
          status: formData.status as User["status"],
        });
        await loadUsers();
        setAlert({
          type: "success",
          message: "사용자가 생성되었습니다",
        });
        onComplete?.();
      } catch (error: any) {
        setAlert({
          type: "error",
          message: error.message || "사용자 생성에 실패했습니다",
        });
      }
    },
    [loadUsers]
  );

  const updateUser = useCallback(
    async (id: number, formData: UserFormData, onComplete?: () => void) => {
      try {
        await userService.update(id, {
          username: formData.username,
          email: formData.email,
          role: formData.role as User["role"],
          status: formData.status as User["status"],
        });
        await loadUsers();
        setAlert({
          type: "success",
          message: "사용자가 수정되었습니다",
        });
        onComplete?.();
      } catch (error: any) {
        setAlert({
          type: "error",
          message: error.message || "사용자 수정에 실패했습니다",
        });
      }
    },
    [loadUsers]
  );

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    userList,
    deleteUser,
    createUser,
    updateUser,
    alert,
    closeAlert,
  };
}
