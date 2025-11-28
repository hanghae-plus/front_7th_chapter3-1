import type React from 'react';
import { useModal } from '@/shared/model/hooks';
import type { BaseModalProps } from '@/shared/model/hooks';
import { modalComponentMap } from './modal-registry';

export const ModalRoot = () => {
  const { openModals, onCloseModal } = useModal();

  return (
    <>
      {openModals.map((modal) => {
        const Component = modalComponentMap[
          modal.type as keyof typeof modalComponentMap
        ] as React.ComponentType<BaseModalProps & Record<string, unknown>>;

        if (!Component) {
          console.warn(`Modal component not found for type: ${modal.type}`);
          return null;
        }

        const handleClose = () => {
          onCloseModal(modal.type);
        };

        return <Component key={modal.type} {...modal.props} onCloseModal={handleClose} />;
      })}
    </>
  );
};
