import React from 'react';
import { Button, Alert } from '@/components/ui/index';

type ActionsBarProps = {
  onCreateOpen: () => void;
  successMessage?: string;
  errorMessage?: string;
  onCloseSuccess?: () => void;
  onCloseError?: () => void;
};
// 알림 + 새로 만들기 버튼 컴포넌트
export const ActionsBar: React.FC<ActionsBarProps> = ({
  onCreateOpen,
  successMessage,
  errorMessage,
  onCloseSuccess,
  onCloseError,
}) => {
  return (
    <div className="space-y-[var(--spacing-component-md)]">
      {errorMessage && (
        <Alert variant="destructive" title="오류" onClose={onCloseError}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert variant="success" title="성공" onClose={onCloseSuccess}>
          {successMessage}
        </Alert>
      )}
      <div className="flex justify-end gap-[var(--spacing-component-sm)]">
        <Button 
          variant="default" 
          size="sm" 
          onClick={onCreateOpen}
        >
          새로 만들기
        </Button>
      </div>
    </div>
  );
};
