import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@bento/ui/alert';
import { FormModal } from '../../components/FormModal';
import { FormInput } from '../../components/FormInput';
import { FormSelect } from '../../components/FormSelect';
import { FormTextarea } from '../../components/FormTextarea';
import { postService } from '../../services/postService';
import type { Post } from '../../services/postService';
import { postSchema, type PostFormData } from './post-schema';

interface PostFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  post?: Post | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function PostFormModal({
  open,
  onOpenChange,
  mode,
  post,
  onSuccess,
  onError,
}: PostFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      author: '',
      category: 'development',
    },
  });

  useEffect(() => {
    if (open && mode === 'edit' && post) {
      reset({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
      });
    } else if (open && mode === 'create') {
      reset({
        title: '',
        content: '',
        author: '',
        category: 'development',
      });
    }
  }, [open, mode, post, reset]);

  const handleFormSubmit = async (data: PostFormData) => {
    try {
      if (mode === 'create') {
        await postService.create({
          title: data.title,
          content: data.content || '',
          author: data.author,
          category: data.category,
        });
        onSuccess('게시글이 생성되었습니다');
      } else if (post) {
        await postService.update(post.id, data);
        onSuccess('게시글이 수정되었습니다');
      }
      onOpenChange(false);
      reset();
    } catch (error: any) {
      onError(error.message || `${mode === 'create' ? '생성' : '수정'}에 실패했습니다`);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={mode === 'create' ? '새 게시글 만들기' : '게시글 수정'}
      size="lg"
      onSubmit={handleSubmit(handleFormSubmit)}
      onCancel={handleCancel}
      submitText={mode === 'create' ? '생성' : '수정 완료'}
      cancelText="취소"
      isSubmitting={isSubmitting}
    >
      <div>
        {mode === 'edit' && post && (
          <Alert variant="info">
            ID: {post.id} | 생성일: {post.createdAt} | 조회수: {post.views}
          </Alert>
        )}

        <FormInput
          id="title"
          label="제목"
          placeholder="게시글 제목을 입력하세요"
          required
          width="full"
          invalid={!!errors.title}
          invalidText={errors.title?.message}
          {...register('title')}
        />
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <FormInput
            id="author"
            label="작성자"
            placeholder="작성자명"
            required
            width="full"
            invalid={!!errors.author}
            invalidText={errors.author?.message}
            {...register('author')}
          />
          <FormSelect
            id="category"
            options={[
              { value: 'development', label: 'Development' },
              { value: 'design', label: 'Design' },
              { value: 'accessibility', label: 'Accessibility' },
            ]}
            label="카테고리"
            placeholder="카테고리 선택"
            invalid={!!errors.category}
            invalidText={errors.category?.message}
            {...register('category')}
          />
        </div>
        <FormTextarea
          id="content"
          label="내용"
          placeholder="게시글 내용을 입력하세요"
          rows={6}
          invalid={!!errors.content}
          invalidText={errors.content?.message}
          {...register('content')}
        />
      </div>
    </FormModal>
  );
}
