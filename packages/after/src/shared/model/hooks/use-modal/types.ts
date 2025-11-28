export interface BaseModalProps {
  onCloseModal: () => void;
}

export interface ModalState {
  type: string;
  props: BaseModalProps & Record<string, unknown>;
}

export type ModalSubscriber = () => void;
