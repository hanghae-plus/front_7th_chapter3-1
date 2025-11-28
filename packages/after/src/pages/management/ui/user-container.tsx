import { type User, useUsers } from '@/entities/user';
import { useDeleteUser } from '@/features/user/delete-user';

import { useModal } from '@/shared/model/hooks';
import { MODAL_TYPES } from '@/shared/model/hooks/use-modal';
import { AlertManager } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { StatCard } from '@/shared/ui/stat-card/stat-card';
import { UserManagementTable } from './user-table';

export const UserManagementContainer = () => {
  const { users } = useUsers();
  const { onDeleteUser } = useDeleteUser();

  const { onOpenModal } = useModal();

  const handleOpenCreateUserModal = () => {
    onOpenModal(MODAL_TYPES.CREATE_USER);
  };

  const handleOpenEditUserModal = (user: User) => {
    onOpenModal(MODAL_TYPES.UPDATE_USER, { user });
  };
  const handleDeleteUser = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    onDeleteUser(id);
  };

  const stats = getUserStats(users);

  return (
    <div>
      <div className="mb-pxr-15 text-right">
        <Button variant="primary" size="md" onClick={handleOpenCreateUserModal}>
          새로 만들기
        </Button>
      </div>

      <AlertManager />

      <div className="mb-pxr-15 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[10px]">
        <StatCard variant="primary">
          <StatCard.Label>전체</StatCard.Label>
          <StatCard.Value>{stats.total}</StatCard.Value>
        </StatCard>

        <StatCard variant="success">
          <StatCard.Label>{stats.stat1.label}</StatCard.Label>
          <StatCard.Value>{stats.stat1.value}</StatCard.Value>
        </StatCard>

        <StatCard variant="warning">
          <StatCard.Label>{stats.stat2.label}</StatCard.Label>
          <StatCard.Value>{stats.stat2.value}</StatCard.Value>
        </StatCard>

        <StatCard variant="danger">
          <StatCard.Label>{stats.stat3.label}</StatCard.Label>
          <StatCard.Value>{stats.stat3.value}</StatCard.Value>
        </StatCard>

        <StatCard variant="default">
          <StatCard.Label>{stats.stat4.label}</StatCard.Label>
          <StatCard.Value>{stats.stat4.value}</StatCard.Value>
        </StatCard>
      </div>

      <div className="bg-background border-border overflow-auto border">
        <UserManagementTable
          users={users}
          onEdit={handleOpenEditUserModal}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
};

const getUserStats = (users: User[]) => {
  return {
    total: users.length,
    stat1: {
      label: '활성',
      value: users.filter((u) => u.status === 'active').length,
    },
    stat2: {
      label: '비활성',
      value: users.filter((u) => u.status === 'inactive').length,
    },
    stat3: {
      label: '정지',
      value: users.filter((u) => u.status === 'suspended').length,
    },
    stat4: {
      label: '관리자',
      value: users.filter((u) => u.role === 'admin').length,
    },
  };
};
