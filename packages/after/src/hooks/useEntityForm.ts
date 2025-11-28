import { useState } from 'react';
import type { Entity, EntityType } from './useEntityManagement';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

interface UseEntityFormReturn {
  formData: any;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedItem: Entity | null;
  setFormData: (data: any) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (item: Entity, entityType: EntityType) => void;
  closeEditModal: () => void;
  resetForm: () => void;
}

export const useEntityForm = (): UseEntityFormReturn => {
  const [formData, setFormData] = useState<any>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);

  const openCreateModal = () => {
    setFormData({});
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormData({});
  };

  const openEditModal = (item: Entity, entityType: EntityType) => {
    setSelectedItem(item);

    if (entityType === 'user') {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedItem(null);
  };

  const resetForm = () => {
    setFormData({});
    setSelectedItem(null);
  };

  return {
    formData,
    isCreateModalOpen,
    isEditModalOpen,
    selectedItem,
    setFormData,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    resetForm,
  };
};

