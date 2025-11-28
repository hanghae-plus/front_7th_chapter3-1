import * as React from "react";
import { Alert } from "./alert";
import { mapAlertTypeToTitle } from "@/lib/mappers/alertMapper";

interface AlertMessageProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
  showIcon?: boolean;
  className?: string;
}

/**
 * 재사용 가능한 AlertMessage 컴포넌트
 * 
 * @description
 * 일관된 Alert UI를 제공하며, 타입에 따른 제목 매핑을 자동으로 처리합니다.
 * 
 * @example
 * ```tsx
 * <AlertMessage
 *   type="success"
 *   message="저장되었습니다"
 *   onClose={handleClose}
 * />
 * ```
 */
export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  onClose,
  showIcon = true,
  className,
}) => {
  const title = mapAlertTypeToTitle(type);

  return (
    <Alert variant={type} onClose={onClose} showIcon={showIcon} className={className}>
      <div>
        <div className="font-bold mb-1">{title}</div>
        <div>{message}</div>
      </div>
    </Alert>
  );
};

