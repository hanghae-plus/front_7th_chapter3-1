import { Modal } from '@/shared/ui/modal';
import { CreatePostForm } from './create-post-form.ui';
import { useCreatePost } from './use-create-post.model';
import type { BaseModalProps } from '@/shared/model/hooks';
import { Button } from '@/shared/ui/button';

export const CreatePostModal = ({ onCloseModal }: BaseModalProps) => {
  const { form, onCreatePost } = useCreatePost();

  const handleSubmit = form.handleSubmit((data) => {
    onCreatePost(data, onCloseModal);
  });

  return (
    <Modal onClose={onCloseModal} size="lg">
      <Modal.Header>게시글 만들기</Modal.Header>
      <Modal.Content>
        <CreatePostForm form={form} />
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
