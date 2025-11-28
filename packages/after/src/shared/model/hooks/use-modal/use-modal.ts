import { useSyncExternalStore } from 'react';
import { modalStore } from './modal-store';

export function useModal() {
  const openModals = useSyncExternalStore(modalStore.subscribe, modalStore.getSnapshot);

  const onOpenModal = (type: string, props?: Record<string, unknown>) => {
    modalStore.openModal(type, props);
  };

  const onCloseModal = (type: string) => {
    modalStore.closeModal(type);
  };

  return {
    openModals,
    onOpenModal,
    onCloseModal,
  };
}
