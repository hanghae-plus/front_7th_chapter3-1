import { Button, AlertMessage } from '@/components/ui';
import {
  EntityStats,
  EntityTable,
  CreateEntityModal,
  EditEntityModal,
} from '@/components/features/entity';
import { EntityProvider, useEntityContext } from '@/contexts/EntityContext';
import { useModal } from '@/hooks/useModal';
import { useAlert } from '@/hooks/useAlert';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';
import '../styles/index.css';

type Entity = User | Post;

/**
 * ManagementPage 내부 컨텐츠
 * EntityProvider 내부에서 Context를 사용
 */
function ManagementContent() {
  const { entityType, setEntityType } = useEntityContext();
  
  // UI 상태
  const createModal = useModal();
  const editModal = useModal<Entity>();
  const { alert, showSuccess, showError, hide: hideAlert } = useAlert();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-5">
        {/* 헤더 */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 text-foreground">관리 시스템</h1>
          <p className="text-muted-foreground text-sm">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-card border border-border p-2.5">
          {/* 탭 */}
          <div className="flex gap-2 border-b-2 pb-1 mb-4">
            <Button
              variant={entityType === 'post' ? 'primary' : 'secondary'}
              size="md"
              onClick={() => setEntityType('post')}
            >
              게시글
            </Button>
            <Button
              variant={entityType === 'user' ? 'primary' : 'secondary'}
              size="md"
              onClick={() => setEntityType('user')}
            >
              사용자
            </Button>
          </div>

          <div>
            {/* 액션 버튼 */}
            <div className="mb-4 text-right">
              <Button variant="primary" size="md" onClick={createModal.open}>
                새로 만들기
              </Button>
            </div>

            {/* 알림 */}
            {alert.show && (
              <AlertMessage
                type={alert.type}
                message={alert.message}
                onClose={hideAlert}
                className="mb-2.5"
              />
            )}

            {/* 통계 */}
            <EntityStats />

            {/* 테이블 */}
            <EntityTable
              onEdit={editModal.open}
              onSuccess={showSuccess}
              onError={showError}
            />
          </div>
        </div>
      </div>

      {/* 생성 모달 */}
      <CreateEntityModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSuccess={showSuccess}
        onError={showError}
      />

      {/* 수정 모달 */}
      <EditEntityModal
        isOpen={editModal.isOpen}
        data={editModal.data}
        onClose={editModal.close}
        onSuccess={showSuccess}
        onError={showError}
      />
    </div>
  );
}

/**
 * 관리 페이지
 * EntityProvider로 감싸서 모든 하위 컴포넌트가 상태를 공유
 */
export function ManagementPage() {
  return (
    <EntityProvider>
      <ManagementContent />
    </EntityProvider>
  );
}
