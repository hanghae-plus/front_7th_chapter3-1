import { useState, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertState {
  show: boolean;
  type: AlertType;
  message: string;
}

/**
 * Alert 상태를 관리하는 커스텀 훅
 * 
 * @returns {Object} Alert 상태 및 제어 함수들
 * 
 * @example
 * ```tsx
 * const { alert, showSuccess, showError, hide } = useAlert();
 * 
 * // 성공 메시지 표시
 * showSuccess('저장되었습니다');
 * 
 * // 에러 메시지 표시
 * showError('저장에 실패했습니다');
 * 
 * // 사용
 * {alert.show && (
 *   <Alert variant={alert.type} onClose={hide}>
 *     {alert.message}
 *   </Alert>
 * )}
 * ```
 */
export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: 'success',
    message: '',
  });

  /**
   * 성공 메시지 Alert 표시
   */
  const showSuccess = useCallback((message: string) => {
    setAlert({ show: true, type: 'success', message });
  }, []);

  /**
   * 에러 메시지 Alert 표시
   */
  const showError = useCallback((message: string) => {
    setAlert({ show: true, type: 'error', message });
  }, []);

  /**
   * 정보 메시지 Alert 표시
   */
  const showInfo = useCallback((message: string) => {
    setAlert({ show: true, type: 'info', message });
  }, []);

  /**
   * 경고 메시지 Alert 표시
   */
  const showWarning = useCallback((message: string) => {
    setAlert({ show: true, type: 'warning', message });
  }, []);

  /**
   * Alert 숨기기
   */
  const hide = useCallback(() => {
    setAlert({ show: false, type: 'success', message: '' });
  }, []);

  return {
    alert,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hide,
  };
};

