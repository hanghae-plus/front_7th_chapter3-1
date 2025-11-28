import { CreateUserModal } from '@/features/user/create-user';
import { UpdateUserModal } from '@/features/user/update-user';
import { CreatePostModal } from '@/features/post/create-post';
import { UpdatePostModal } from '@/features/post/update-post';
import { MODAL_TYPES } from '@/shared/model/hooks/use-modal';

export const modalComponentMap = {
  [MODAL_TYPES.CREATE_USER]: CreateUserModal,
  [MODAL_TYPES.UPDATE_USER]: UpdateUserModal,
  [MODAL_TYPES.CREATE_POST]: CreatePostModal,
  [MODAL_TYPES.UPDATE_POST]: UpdatePostModal,
};
