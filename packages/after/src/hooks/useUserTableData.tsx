import type { User } from "@/services/userService";
import { useState } from "react";
import { userService } from "@/services/userService";
import UserDialogContent from "@/components/domain/user/UserDialogContent";
import { useDialog } from "./useDialog";

const useUserTableData = ({
  setAlertState,
}: {
  setAlertState: (state: { show: boolean; message: string; variant: "success" | "error" }) => void;
}) => {
  const { openDialog, closeDialog } = useDialog();
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserTableData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await userService.getAll();
      setUserData(result);
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "데이터를 불러오는데 실패했습니다", variant: "error" });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createUserTableData = async (data: Omit<User, "id" | "createdAt">) => {
    setError(null);
    try {
      await userService.create(data);
      await getUserTableData();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "사용자 생성에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const editUserTableData = async (userId: number, data: Partial<Omit<User, "id" | "createdAt">>) => {
    setError(null);
    try {
      await userService.update(userId, data);
      await getUserTableData();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "사용자 수정에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const deleteUserTableData = async (id: number) => {
    setError(null);
    try {
      await userService.delete(id);
      await getUserTableData();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "삭제에 실패했습니다", variant: "error" });
      throw error;
    }
  };

  const handleCreateUser = () => {
    const createUserData = async (data: Omit<User, "id" | "createdAt">) => {
      try {
        await createUserTableData(data);
        setAlertState({ show: true, message: "사용자가 생성되었습니다", variant: "success" });
        closeDialog();
      } catch (error: any) {
        setAlertState({ show: true, message: error.message || "사용자 생성에 실패했습니다", variant: "error" });
        closeDialog();
      }
    };

    openDialog({
      title: "새 사용자 만들기",
      content: <UserDialogContent type="create" onClose={() => closeDialog()} onCreate={createUserData} />,
    });
  };

  const handleEditUser = (item: User) => {
    const editUserData = async ({
      username,
      email,
      role,
      status,
    }: {
      username: string;
      email: string;
      role: "admin" | "moderator" | "user";
      status: "active" | "inactive" | "suspended";
    }) => {
      try {
        await editUserTableData(item.id, {
          username,
          email,
          role,
          status,
        });
        setAlertState({ show: true, message: "사용자가 수정되었습니다", variant: "success" });
        closeDialog();
      } catch (error: any) {
        setAlertState({ show: true, message: error.message || "사용자 수정에 실패했습니다", variant: "error" });
        closeDialog();
      }
    };

    openDialog({
      title: "사용자 수정",
      content: <UserDialogContent type="edit" onClose={() => closeDialog()} onEdit={editUserData} initialData={item} />,
    });
  };

  return {
    userData,
    isLoading,
    error,
    getUserTableData,
    editUserTableData,
    createUserTableData,
    deleteUserTableData,
    handleCreateUser,
    handleEditUser,
  };
};

export default useUserTableData;
