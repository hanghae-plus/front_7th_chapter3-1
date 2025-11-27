import { Alert, Button, OverviewCards } from "@/shared/ui";
import { useCallback, useMemo, useState } from "react";
import type { User } from "@/shared/api/userService";
import { getUserCountStats } from "../libs";
import { UserTable } from "@/features/user";
import { UserFormModal } from "./UserFormModal";
import { useUserAction } from "../model/useUserAction";
import type { UserFormData } from "@/features/user/types";

export function UserDashboard() {
  const { userList, deleteUser, createUser, updateUser, alert, closeAlert } =
    useUserAction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const overviewData = useMemo(() => {
    const stats = getUserCountStats(userList);
    return [
      { label: "전체", value: stats.total, color: "blue" },
      { label: "활성", value: stats.active, color: "green" },
      { label: "비활성", value: stats.inactive, color: "yellow" },
      { label: "정지", value: stats.suspended, color: "red" },
      { label: "관리자", value: stats.roleAdmin, color: "gray" },
    ];
  }, [userList]);

  const handleOpenCreateModal = useCallback(() => {
    setSelectedUser(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCreateUser = useCallback(
    async (formData: UserFormData) => {
      await createUser(formData, () => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
    },
    [createUser]
  );

  const handleUpdateUser = useCallback(
    async (formData: UserFormData) => {
      if (!selectedUser) return;

      await updateUser(selectedUser.id, formData, () => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
    },
    [selectedUser, updateUser]
  );

  const toggleModal = useCallback((isOpen: boolean) => {
    setIsModalOpen(isOpen);
    if (!isOpen) {
      setSelectedUser(null);
    }
  }, []);

  return (
    <>
      <Button className="flex w-fit self-end" onClick={handleOpenCreateModal}>
        새로 만들기
      </Button>
      {alert && (
        <Alert
          variant={alert.type === "success" ? "success" : "error"}
          className="flex justify-between items-start"
        >
          <div>
            <span className="font-bold block">{alert.type}</span>
            <p>{alert.message}</p>
          </div>
          <button className="cursor-pointer" onClick={closeAlert}>
            ✕
          </button>
        </Alert>
      )}
      <OverviewCards overviewData={overviewData} />
      <UserTable
        userList={userList}
        onEdit={handleOpenEditModal}
        onDelete={deleteUser}
      />
      <UserFormModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        user={selectedUser}
        onCreate={handleCreateUser}
        onUpdate={handleUpdateUser}
      />
    </>
  );
}
