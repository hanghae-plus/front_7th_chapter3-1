import { useState, useCallback } from 'react';

/**
 * Modal 상태를 관리하는 커스텀 훅
 * 
 * @template T - Modal에서 다룰 데이터 타입
 * @returns {Object} Modal 상태 및 제어 함수들
 * 
 * @example
 * ```tsx
 * const createModal = useModal();
 * const editModal = useModal<User>();
 * 
 * // 열기
 * createModal.open();
 * editModal.open(userData);
 * 
 * // 닫기
 * createModal.close();
 * 
 * // 사용
 * <Dialog isOpen={createModal.isOpen} onClose={createModal.close}>
 *   ...
 * </Dialog>
 * ```
 */
export const useModal = <T = unknown>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  /**
   * Modal을 열고 선택적으로 데이터를 설정
   */
  const open = useCallback((item?: T) => {
    if (item !== undefined) {
      setData(item);
    }
    setIsOpen(true);
  }, []);

  /**
   * Modal을 닫고 데이터를 초기화
   */
  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
  };
};

