import {
  postService,
  usePosts,
  type Post,
  updatePostSchema,
  type UpdatePostFormData,
} from '@/entities/post';
import { useMutation } from '@/shared/model/hooks';
import { useAlert } from '@/shared/model/hooks/use-alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export const useUpdatePost = (initialPost: Post) => {
  const { refetch: refetchPosts } = usePosts();

  const { mutate } = useMutation(postService.update);
  const { onOpenAlert } = useAlert();

  const form = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: initialPost.title,
      content: initialPost.content,
      author: initialPost.author,
      category: initialPost.category,
      status: initialPost.status,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset({
      title: initialPost.title,
      content: initialPost.content,
      author: initialPost.author,
      category: initialPost.category,
      status: initialPost.status,
    });
  }, [initialPost, form]);

  const onUpdatePost = (
    data: UpdatePostFormData,
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    }
  ) => {
    mutate(
      { id: initialPost.id, postData: data },
      {
        onSuccess: () => {
          refetchPosts();
          onSuccess?.();
          form.reset();
          onOpenAlert({ title: '성공', type: 'success', message: '게시글이 수정되었습니다.' });
        },
        onError: (error) => {
          console.error(error);
          onError?.(error);
          onOpenAlert({
            title: '오류',
            type: 'error',
            message: error.message || '수정에 실패했습니다.',
          });
        },
      }
    );
  };

  return { form, onUpdatePost };
};
