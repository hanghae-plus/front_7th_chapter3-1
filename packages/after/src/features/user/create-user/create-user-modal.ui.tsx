import Modal from '@/shared/ui/modal/modal';
import { CreateUserForm } from './create-user-form.ui';
import { useCreateUser } from './use-create-user.model';
import type { BaseModalProps } from '@/shared/model/hooks';
import { Button } from '@/shared/ui/button';

export const CreateUserModal = ({ onCloseModal }: BaseModalProps) => {
  const { form, onCreateUser } = useCreateUser();

  const handleSubmit = form.handleSubmit((data) => {
    onCreateUser(data, onCloseModal);
  });

  return (
    <Modal onClose={onCloseModal} size="lg">
      <Modal.Header>사용자 만들기</Modal.Header>
      <Modal.Content>
        <CreateUserForm form={form} />
      </Modal.Content>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          취소
        </Button>
        <Button onClick={handleSubmit}>생성</Button>
      </Modal.Footer>
    </Modal>
  );
};
