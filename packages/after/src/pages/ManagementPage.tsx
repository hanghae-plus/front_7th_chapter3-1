import React, { useState, useEffect } from 'react';
import { Button } from '@bento/ui/button';
import { DismissibleAlert } from '../components/DismissibleAlert';
import { StatCard } from '../components/StatCard';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import type { PaginatedResponse, UserStats, PostStats } from '../services/types';
import { UserFormModal, UserTable } from '../features/users';
import { PostFormModal, PostTable } from '../features/posts';

type EntityType = 'user' | 'post';

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [userData, setUserData] = useState<PaginatedResponse<User, UserStats>>({
    results: [],
    total: 0,
    stats: { total: 0, active: 0, inactive: 0, suspended: 0, admins: 0 },
  });
  const [postData, setPostData] = useState<PaginatedResponse<Post, PostStats>>({
    results: [],
    total: 0,
    stats: { total: 0, published: 0, draft: 0, archived: 0, totalViews: 0 },
  });

  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    selectedUser?: User | null;
    selectedPost?: Post | null;
  }>({ open: false, mode: 'create' });

  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData(currentPage);
    setModalState({ open: false, mode: 'create' });
  }, [entityType, currentPage]);

  const loadData = async (page: number) => {
    try {
      if (entityType === 'user') {
        const result = await userService.getPaginated(page, 10);
        setUserData(result);
      } else {
        const result = await postService.getPaginated(page, 10);
        setPostData(result);
      }
    } catch {
      showAlert('error', '데이터를 불러오는데 실패했습니다');
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });
  };

  const handleSuccess = (message: string) => {
    showAlert('success', message);
    loadData(currentPage);
  };

  const handleError = (message: string) => {
    showAlert('error', message);
  };

  const handleCreate = () => {
    setModalState({ open: true, mode: 'create' });
  };

  const handleEditUser = (user: User) => {
    setModalState({ open: true, mode: 'edit', selectedUser: user });
  };

  const handleEditPost = (post: Post) => {
    setModalState({ open: true, mode: 'edit', selectedPost: post });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }
      showAlert('success', '삭제되었습니다');
      loadData(currentPage);
    } catch (error: any) {
      showAlert('error', error.message || '삭제에 실패했습니다');
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      showAlert('success', `${message}되었습니다`);
      loadData(currentPage);
    } catch (error: any) {
      showAlert('error', error.message || '작업에 실패했습니다');
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const { stats } = userData;
      return {
        total: stats.total,
        stat1: { label: '활성', value: stats.active },
        stat2: { label: '비활성', value: stats.inactive },
        stat3: { label: '정지', value: stats.suspended },
        stat4: { label: '관리자', value: stats.admins },
      };
    } else {
      const { stats } = postData;
      return {
        total: stats.total,
        stat1: { label: '게시됨', value: stats.published },
        stat2: { label: '임시저장', value: stats.draft },
        stat3: { label: '보관됨', value: stats.archived },
        stat4: { label: '총 조회수', value: stats.totalViews },
      };
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-foreground">관리 시스템</h1>
          <p className="text-muted-foreground text-sm">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-card border border-border p-4">
          <div className="mb-6 border-b border-border pb-2 flex gap-2">
            <Button
              size="sm"
              variant={entityType === 'post' ? 'primary' : 'secondary'}
              onClick={() => setEntityType('post')}
            >
              게시글
            </Button>
            <Button
              size="sm"
              variant={entityType === 'user' ? 'primary' : 'secondary'}
              onClick={() => setEntityType('user')}
            >
              사용자
            </Button>
          </div>

          <div>
            <div className="mb-6 text-right">
              <Button variant="primary" size="md" onClick={handleCreate}>
                새로 만들기
              </Button>
            </div>

            {alert.show && (
              <div className="mb-4">
                <DismissibleAlert
                  variant={alert.type}
                  title={alert.type === 'success' ? '성공' : '오류'}
                  onClose={() => setAlert({ ...alert, show: false })}
                >
                  {alert.message}
                </DismissibleAlert>
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
              <StatCard variant="info" label="전체" value={stats.total} />
              <StatCard variant="success" label={stats.stat1.label} value={stats.stat1.value} />
              <StatCard variant="warning" label={stats.stat2.label} value={stats.stat2.value} />
              <StatCard variant="error" label={stats.stat3.label} value={stats.stat3.value} />
              <StatCard variant="default" label={stats.stat4.label} value={stats.stat4.value} />
            </div>

            <div className="border border-border bg-card overflow-auto">
              {entityType === 'user' ? (
                <UserTable
                  data={userData.results}
                  pagination={{
                    page: currentPage,
                    pageSize: 10,
                    totalCount: userData.total,
                    onPageChange: setCurrentPage,
                  }}
                  onEdit={handleEditUser}
                  onDelete={handleDelete}
                />
              ) : (
                <PostTable
                  data={postData.results}
                  pagination={{
                    page: currentPage,
                    pageSize: 10,
                    totalCount: postData.total,
                    onPageChange: setCurrentPage,
                  }}
                  onEdit={handleEditPost}
                  onDelete={handleDelete}
                  onStatusAction={handleStatusAction}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {entityType === 'user' && (
        <UserFormModal
          open={modalState.open}
          onOpenChange={open => setModalState({ ...modalState, open })}
          mode={modalState.mode}
          user={modalState.selectedUser}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}

      {entityType === 'post' && (
        <PostFormModal
          open={modalState.open}
          onOpenChange={open => setModalState({ ...modalState, open })}
          mode={modalState.mode}
          post={modalState.selectedPost}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
    </div>
  );
};
