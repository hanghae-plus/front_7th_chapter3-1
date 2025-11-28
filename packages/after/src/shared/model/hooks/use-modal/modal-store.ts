import type { ModalState, ModalSubscriber } from './types';

let openModals: ModalState[] = [];
const subscribers = new Set<ModalSubscriber>();

function emitChange() {
  subscribers.forEach((subscriber) => subscriber());
}

export const modalStore = {
  subscribe(subscriber: ModalSubscriber) {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  },

  getSnapshot(): ModalState[] {
    return openModals;
  },

  openModal(type: string, props?: Record<string, unknown>) {
    // 같은 타입의 모달이 이미 열려있으면 무시
    const isAlreadyOpen = openModals.some((modal) => modal.type === type);
    if (isAlreadyOpen) {
      return;
    }

    const modalProps = {
      onCloseModal: () => this.closeModal(type),
      ...(props || {}),
    };

    openModals = [...openModals, { type, props: modalProps }];
    emitChange();
  },

  closeModal(type: string) {
    openModals = openModals.filter((modal) => modal.type !== type);
    emitChange();
  },
};
