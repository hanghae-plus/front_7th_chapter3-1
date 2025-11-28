import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui';
import { EntityForm } from '@/components/forms/EntityForm';
import { useEntityForm } from '@/hooks/useEntityForm';
import { useEntityContext } from '@/contexts/EntityContext';

interface CreateEntityModalProps {
  isOpen: boolean;
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
 * Entity 생성 모달 컴포넌트
 * 
 * @description
 * Context에서 entityType과 createEntity를 가져와 생성 로직을 처리합니다.
 */
export const CreateEntityModal: React.FC<CreateEntityModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
}) => {
  const { entityType, createEntity } = useEntityContext();
  const { form, reset, getData } = useEntityForm(entityType);
  
  const entityLabel = entityType === 'user' ? '사용자' : '게시글';

  const handleSubmit = async () => {
    try {
      await createEntity(getData());
      reset();
      onClose();
      onSuccess?.(`${entityLabel}가 생성되었습니다`);
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
          <DialogTitle>{`새 ${entityLabel} 만들기`}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <EntityForm entityType={entityType} form={form} />
        </div>

        <DialogFooter>
          <Button variant="secondary" size="md" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit}>
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
