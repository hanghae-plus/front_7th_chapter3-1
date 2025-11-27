import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert } from '../components/ui/alert';
import { DismissibleAlert } from '../components/DismissibleAlert';
import { FormInput } from '../components/FormInput';
import { FormTextarea } from '../components/FormTextarea';
import { FormSelect } from '../components/FormSelect';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import { useForm } from 'react-hook-form';
import { userSchema } from './user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { postSchema } from './post-schema';
import { FormModal } from '../components/FormModal';
import { DataTable, type Column } from '../components/DataTable';
import { type BadgeProps } from '../components/ui/badge';
import { USER_ROLE, USER_STATUS } from '../services/user-constants';
import { POST_CATEGORY, POST_STATUS } from '../services/post-constants';
import type { PaginatedResponse } from '../services/types';
import { StatCard } from '../components/StatCard';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<PaginatedResponse<Entity>>({ results: [], total: 0 });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData(currentPage);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, currentPage]);

  const loadData = async (page: number) => {
    try {
      let result: PaginatedResponse<Entity>;

      if (entityType === 'user') {
        result = await userService.getPaginated(page, 10);
      } else {
        result = await postService.getPaginated(page, 10);
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleUserCreate = async (data: UserFormData) => {
    try {
      await userService.create({
        username: data.username,
        email: data.email,
        role: data.role || 'user',
        status: data.status || 'active',
      });

      await loadData(currentPage);
      setIsCreateModalOpen(false);
      userReset();
      setAlertMessage('사용자가 생성되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handlePostCreate = async (data: PostFormData) => {
    try {
      await postService.create({
        title: data.title,
        content: data.content || '',
        author: data.author,
        category: data.category,
      });

      await loadData(currentPage);
      setIsCreateModalOpen(false);
      postReset();
      setAlertMessage('게시글이 생성되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === 'user') {
      const user = item as User;
      userReset({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      postReset({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUserUpdate = async (data: UserFormData) => {
    if (!selectedItem) return;

    try {
      await userService.update(selectedItem.id, data);

      await loadData(currentPage);
      setIsEditModalOpen(false);
      userReset();
      setSelectedItem(null);
      setAlertMessage('사용자가 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handlePostUpdate = async (data: PostFormData) => {
    if (!selectedItem) return;

    try {
      await postService.update(selectedItem.id, data);

      await loadData(currentPage);
      setIsEditModalOpen(false);
      postReset();
      setSelectedItem(null);
      setAlertMessage('게시글이 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData(currentPage);
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData(currentPage);
      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data.results as User[];
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter(u => u.status === 'active').length,
        },
        stat2: {
          label: '비활성',
          value: users.filter(u => u.status === 'inactive').length,
        },
        stat3: {
          label: '정지',
          value: users.filter(u => u.status === 'suspended').length,
        },
        stat4: {
          label: '관리자',
          value: users.filter(u => u.role === 'admin').length,
        },
      };
    } else {
      const posts = data.results as Post[];
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter(p => p.status === 'published').length,
        },
        stat2: {
          label: '임시저장',
          value: posts.filter(p => p.status === 'draft').length,
        },
        stat3: {
          label: '보관됨',
          value: posts.filter(p => p.status === 'archived').length,
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
        },
      };
    }
  };

  const userTableColumns: Column<User>[] = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'username', label: '사용자명', width: '150px' },
    { key: 'email', label: '이메일' },
    {
      key: 'role',
      label: '역할',
      width: '120px',
      render: (row: User, _: unknown) => {
        let type: BadgeProps['variant'] = 'primary';
        if (row.role === 'admin') type = 'danger';
        if (row.role === 'moderator') type = 'warning';
        if (row.role === 'user') type = 'primary';
        // if (row.role === 'guest') type = 'secondary';
        return <Badge variant={type}>{USER_ROLE[row.role]}</Badge>;
      },
    },
    {
      key: 'status',
      label: '상태',
      width: '120px',

      render: (row: User, _: unknown) => {
        let type: BadgeProps['variant'] = 'primary';
        if (row.status === 'active') type = 'success';
        if (row.status === 'inactive') type = 'warning';
        if (row.status === 'suspended') type = 'danger';
        return <Badge variant={type}>{USER_STATUS[row.status]}</Badge>;
      },
    },
    { key: 'createdAt', label: '생성일', width: '120px' },
    { key: 'lastLogin', label: '마지막 로그인', width: '140px' },
    {
      key: 'actions',
      label: '관리',
      width: '200px',
      render: (row: User, _: unknown) => {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="primary" onClick={() => handleEdit(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
              삭제
            </Button>
          </div>
        );
      },
    },
  ];

  const postTableColumns: Column<Post>[] = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'title', label: '제목' },
    { key: 'author', label: '작성자', width: '120px' },
    {
      key: 'category',
      label: '카테고리',
      width: '140px',
      render: (row: Post, _: unknown) => {
        let type: BadgeProps['variant'] = 'secondary';
        if (row.category === 'development') type = 'primary';
        if (row.category === 'design') type = 'info';
        if (row.category === 'accessibility') type = 'danger';
        return (
          <Badge variant={type} shape="pill">
            {POST_CATEGORY[row.category as keyof typeof POST_CATEGORY]}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      label: '상태',
      width: '120px',
      render: (row: Post, _: unknown) => {
        let type: BadgeProps['variant'] = 'primary';
        if (row.status === 'published') type = 'success';
        if (row.status === 'draft') type = 'warning';
        if (row.status === 'archived') type = 'primary';
        // if (row.status === 'pending') type = 'info';
        // if (row.status === 'rejected') type = 'danger';
        return <Badge variant={type}>{POST_STATUS[row.status]}</Badge>;
      },
    },
    {
      key: 'views',
      label: '조회수',
      width: '100px',
      render: (row: Post, _: unknown) => {
        return <>{row.views?.toLocaleString() || '0'}</>;
      },
    },
    { key: 'createdAt', label: '작성일', width: '120px' },
    {
      key: 'actions',
      label: '관리',
      width: '250px',
      render: (row: Post, _: unknown) => {
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="sm" variant="primary" onClick={() => handleEdit(row)}>
              수정
            </Button>
            {row.status === 'draft' && (
              <Button
                size="sm"
                variant="success"
                onClick={() => handleStatusAction(row.id, 'publish')}
              >
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleStatusAction(row.id, 'archive')}
              >
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleStatusAction(row.id, 'restore')}
              >
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
              삭제
            </Button>
          </div>
        );
      },
    },
  ];

  const stats = getStats();

  type UserFormData = z.infer<typeof userSchema>;
  const {
    register: userRegister,
    handleSubmit: userHandleSubmit,
    formState: { errors: userErrors, isSubmitting: isUserSubmitting },
    reset: userReset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      role: 'user',
      status: 'active',
    },
  });

  type PostFormData = z.infer<typeof postSchema>;
  const {
    register: postRegister,
    handleSubmit: postHandleSubmit,
    formState: { errors: postErrors, isSubmitting: isPostSubmitting },
    reset: postReset,
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">관리 시스템</h1>
          <p className="text-gray-600 text-sm">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-white border border-gray-200 p-4">
          <div className="mb-6 border-b border-gray-200 pb-2">
            <Button
              size="sm"
              variant={entityType === 'post' ? 'primary' : 'secondary'}
              onClick={() => setEntityType('post')}
            >
              게시글
            </Button>
            <Button
              size="sm"
              variant={entityType === 'user' ? 'primary' : 'secondary'}
              onClick={() => setEntityType('user')}
            >
              사용자
            </Button>
          </div>

          <div>
            <div className="mb-6 text-right">
              <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className="mb-4">
                <DismissibleAlert
                  variant="success"
                  title="성공"
                  onClose={() => setShowSuccessAlert(false)}
                >
                  {alertMessage}
                </DismissibleAlert>
              </div>
            )}

            {showErrorAlert && (
              <div className="mb-4">
                <DismissibleAlert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </DismissibleAlert>
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
              <StatCard variant="info" label="전체" value={stats.total} />
              <StatCard variant="success" label={stats.stat1.label} value={stats.stat1.value} />
              <StatCard variant="warning" label={stats.stat2.label} value={stats.stat2.value} />
              <StatCard variant="error" label={stats.stat3.label} value={stats.stat3.value} />
              <StatCard variant="default" label={stats.stat4.label} value={stats.stat4.value} />
            </div>

            <div className="border border-gray-200 bg-white overflow-auto">
              {entityType === 'user' ? (
                <DataTable<User>
                  columns={userTableColumns}
                  data={data.results as User[]}
                  striped
                  pagination={{
                    page: currentPage,
                    pageSize: 10,
                    totalCount: data.total,
                    onPageChange: (page: number) => {
                      setCurrentPage(page);
                    },
                  }}
                />
              ) : (
                <DataTable<Post>
                  columns={postTableColumns}
                  data={data.results as Post[]}
                  striped
                  pagination={{
                    page: currentPage,
                    pageSize: 10,
                    totalCount: data.total,
                    onPageChange: (page: number) => {
                      setCurrentPage(page);
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <FormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size="lg"
        onSubmit={
          entityType === 'user'
            ? userHandleSubmit(handleUserCreate)
            : postHandleSubmit(handlePostCreate)
        }
        onCancel={() => {
          setIsCreateModalOpen(false);
          if (entityType === 'user') userReset();
          if (entityType === 'post') postReset();
        }}
        submitText="생성"
        cancelText="취소"
        isSubmitting={entityType === 'user' ? isUserSubmitting : isPostSubmitting}
      >
        <div>
          {entityType === 'user' ? (
            <>
              <FormInput
                id="username"
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
                invalid={!!userErrors.username}
                invalidText={userErrors.username?.message}
                {...userRegister('username')}
              />
              <FormInput
                id="email"
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
                invalid={!!userErrors.email}
                invalidText={userErrors.email?.message}
                {...userRegister('email')}
              />
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <FormSelect
                  id="role"
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  placeholder="역할 선택"
                  invalid={!!userErrors.role}
                  invalidText={userErrors.role?.message}
                  {...userRegister('role')}
                />
                <FormSelect
                  id="status"
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  placeholder="상태 선택"
                  invalid={!!userErrors.status}
                  invalidText={userErrors.status?.message}
                  {...userRegister('status')}
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                id="title"
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
                invalid={!!postErrors.title}
                invalidText={postErrors.title?.message}
                {...postRegister('title')}
              />
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <FormInput
                  id="author"
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                  invalid={!!postErrors.author}
                  invalidText={postErrors.author?.message}
                  {...postRegister('author')}
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
                  invalid={!!postErrors.category}
                  invalidText={postErrors.category?.message}
                  {...postRegister('category')}
                />
              </div>
              <FormTextarea
                id="content"
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
                invalid={!!postErrors.content}
                invalidText={postErrors.content?.message}
                {...postRegister('content')}
              />
            </>
          )}
        </div>
      </FormModal>

      <FormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          if (entityType === 'user') userReset();
          if (entityType === 'post') postReset();
          setSelectedItem(null);
        }}
        onSubmit={
          entityType === 'user'
            ? userHandleSubmit(handleUserUpdate)
            : postHandleSubmit(handlePostUpdate)
        }
        submitText="수정 완료"
        cancelText="취소"
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size="lg"
        isSubmitting={entityType === 'user' ? isUserSubmitting : isPostSubmitting}
      >
        <div>
          {selectedItem && (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === 'user' ? (
            <>
              <FormInput
                id="username"
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
                invalid={!!userErrors.username}
                invalidText={userErrors.username?.message}
                {...userRegister('username')}
              />
              <FormInput
                id="email"
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
                invalid={!!userErrors.email}
                invalidText={userErrors.email?.message}
                {...userRegister('email')}
              />
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <FormSelect
                  id="role"
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  invalid={!!userErrors.role}
                  invalidText={userErrors.role?.message}
                  {...userRegister('role')}
                />
                <FormSelect
                  id="status"
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  invalid={!!userErrors.status}
                  invalidText={userErrors.status?.message}
                  {...userRegister('status')}
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                id="title"
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
                invalid={!!postErrors.title}
                invalidText={postErrors.title?.message}
                {...postRegister('title')}
              />
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <FormInput
                  id="author"
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                  invalid={!!postErrors.author}
                  invalidText={postErrors.author?.message}
                  {...postRegister('author')}
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
                  invalid={!!postErrors.category}
                  invalidText={postErrors.category?.message}
                  {...postRegister('category')}
                />
              </div>
              <FormTextarea
                id="content"
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
                invalid={!!postErrors.content}
                invalidText={postErrors.content?.message}
                {...postRegister('content')}
              />
            </>
          )}
        </div>
      </FormModal>
    </div>
  );
};
