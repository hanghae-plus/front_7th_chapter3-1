export const MODAL_TYPES = {
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
