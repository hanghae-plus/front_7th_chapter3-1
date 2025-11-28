import type { User } from '@/entities/user';
import { useUpdateUser } from './use-update-user.model';
import { UpdateUserForm } from './update-user-form.ui';
import type { BaseModalProps } from '@/shared/model/hooks';
import { Modal } from '@/shared/ui/modal';
import { Button } from '@/shared/ui/button';
import { Alert } from '@/shared/ui/alert';

interface UpdateUserModalProps extends BaseModalProps {
  user: User;
}

export const UpdateUserModal = ({ user, onCloseModal }: UpdateUserModalProps) => {
  const { form, onUpdateUser } = useUpdateUser(user);

  const handleSubmit = form.handleSubmit((data) => {
    onUpdateUser(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  });

  return (
    <Modal onClose={onCloseModal} size="lg">
      <Modal.Header>사용자 수정</Modal.Header>
      <Modal.Content>
        <Alert variant="info">
          <Alert.Icon />
          <Alert.Content>
            <Alert.Body>
              ID: {user.id} | 생성일: {user.createdAt}
            </Alert.Body>
          </Alert.Content>
        </Alert>
        <UpdateUserForm form={form} />
      </Modal.Content>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          취소
        </Button>
        <Button onClick={handleSubmit}>수정 완료</Button>
      </Modal.Footer>
    </Modal>
  );
};
