import React, { useEffect } from 'react';
import {
  Button,
  Alert,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui';
import { EntityForm } from '@/components/forms/EntityForm';
import { useEntityForm } from '@/hooks/useEntityForm';
import { useEntityContext } from '@/contexts/EntityContext';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';

type Entity = User | Post;

interface EditEntityModalProps {
  isOpen: boolean;
  data: Entity | null;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return '알 수 없는 오류가 발생했습니다';
}

/**
 * Entity 수정 모달 컴포넌트
 * 
 * @description
 * Context에서 entityType과 updateEntity를 가져와 수정 로직을 처리합니다.
 */
export const EditEntityModal: React.FC<EditEntityModalProps> = ({
  isOpen,
  data,
  onClose,
  onSuccess,
  onError,
}) => {
  const { entityType, updateEntity } = useEntityContext();
  const { form, reset, populate, getData } = useEntityForm(entityType);
  
  const entityLabel = entityType === 'user' ? '사용자' : '게시글';

  // data가 변경되면 폼에 데이터 채우기
  useEffect(() => {
    if (data && isOpen) {
      populate(data);
    }
  }, [data, isOpen, populate]);

  const handleSubmit = async () => {
    if (!data) return;
    
    try {
      await updateEntity(data.id, getData());
      reset();
      onClose();
      onSuccess?.(`${entityLabel}이 수정되었습니다`);
    } catch (error: unknown) {
      onError?.(getErrorMessage(error));
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogContent size="large" onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>{`${entityLabel} 수정`}</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {data && (
            <Alert variant="info" showIcon>
              <div>
                ID: {data.id} | 생성일: {data.createdAt}
                {entityType === 'post' && ` | 조회수: ${(data as Post).views || 0}`}
              </div>
            </Alert>
          )}

          <EntityForm entityType={entityType} form={form} />
        </div>

        <DialogFooter>
          <Button variant="secondary" size="md" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit}>
            수정 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
