import React, { useState, useMemo } from 'react';
import { Button, Alert, Table, Modal } from '../shared/ui';
import { useUserManagement, UserForm, UserStats, createUserTableColumns, type UserFormValues } from '../features/user-management';
import { usePostManagement, PostForm, PostStats, createPostTableColumns, type PostFormValues } from '../features/post-management';
import type { User } from '../features/user-management';
import type { Post } from '../features/post-management';

type EntityType = 'user' | 'post';

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');

  // User management
  const userManagement = useUserManagement();
  const [userFormData, setUserFormData] = useState<any>({});
  const [isUserCreateModalOpen, setIsUserCreateModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userServerError, setUserServerError] = useState<{ field?: keyof UserFormValues; message: string } | null>(null);

  // Post management
  const postManagement = usePostManagement();
  const [postFormData, setPostFormData] = useState<any>({});
  const [isPostCreateModalOpen, setIsPostCreateModalOpen] = useState(false);
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postServerError, setPostServerError] = useState<{ field?: keyof PostFormValues; message: string } | null>(null);

  // Alert state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // User handlers
  const handleUserCreate = async (data: UserFormValues) => {
    try {
      setUserServerError(null); // 에러 초기화
      await userManagement.createUser({
        username: data.username,
        email: data.email,
        role: data.role,
        status: data.status,
      });
      setIsUserCreateModalOpen(false);
      setUserFormData({});
      setAlertMessage('사용자가 생성되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      // 서버 에러 메시지에서 필드 추출
      const errorMessage = error?.message || userManagement.error || '작업에 실패했습니다';
      console.error('User creation error:', error, errorMessage);

      const lowerMessage = errorMessage.toLowerCase();

      // 에러 메시지에 따라 필드 지정
      if (lowerMessage.includes('email') || lowerMessage.includes('이메일')) {
        setUserServerError({ field: 'email', message: errorMessage });
      } else if (lowerMessage.includes('username') || lowerMessage.includes('사용자명')) {
        setUserServerError({ field: 'username', message: errorMessage });
      } else {
        // 필드를 특정할 수 없는 경우 username 필드에 표시 (첫 번째 필드)
        setUserServerError({ field: 'username', message: errorMessage });
      }
    }
  };

  const handleUserEdit = (user: User) => {
    setSelectedUser(user);
    setUserFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsUserEditModalOpen(true);
  };

  const handleUserUpdate = async (data: UserFormValues) => {
    if (!selectedUser) return;
    try {
      setUserServerError(null); // 에러 초기화
      await userManagement.updateUser(selectedUser.id, {
        username: data.username,
        email: data.email,
        role: data.role,
        status: data.status,
      });
      setIsUserEditModalOpen(false);
      setUserFormData({});
      setSelectedUser(null);
      setAlertMessage('사용자가 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      // 서버 에러 메시지에서 필드 추출
      const errorMessage = error?.message || userManagement.error || '작업에 실패했습니다';
      console.error('User update error:', error, errorMessage);

      const lowerMessage = errorMessage.toLowerCase();

      // 에러 메시지에 따라 필드 지정
      if (lowerMessage.includes('email') || lowerMessage.includes('이메일')) {
        setUserServerError({ field: 'email', message: errorMessage });
      } else if (lowerMessage.includes('username') || lowerMessage.includes('사용자명')) {
        setUserServerError({ field: 'username', message: errorMessage });
      } else {
        // 필드를 특정할 수 없는 경우 username 필드에 표시 (첫 번째 필드)
        setUserServerError({ field: 'username', message: errorMessage });
      }
    }
  };

  const handleUserDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await userManagement.deleteUser(id);
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setShowErrorAlert(true);
    }
  };

  // Post handlers
  const handlePostCreate = async (data: PostFormValues) => {
    try {
      setPostServerError(null);
      await postManagement.createPost({
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category,
        status: data.status,
      });
      setIsPostCreateModalOpen(false);
      setPostFormData({});
      setAlertMessage('게시글이 생성되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      const errorMessage = error?.message || postManagement.error || '작업에 실패했습니다';
      console.error('Post creation error:', error, errorMessage);

      const lowerMessage = errorMessage.toLowerCase();

      // 에러 메시지에 따라 필드 지정
      if (lowerMessage.includes('title') || lowerMessage.includes('제목')) {
        setPostServerError({ field: 'title', message: errorMessage });
      } else if (lowerMessage.includes('author') || lowerMessage.includes('작성자')) {
        setPostServerError({ field: 'author', message: errorMessage });
      } else if (lowerMessage.includes('category') || lowerMessage.includes('카테고리')) {
        setPostServerError({ field: 'category', message: errorMessage });
      } else if (lowerMessage.includes('content') || lowerMessage.includes('내용')) {
        setPostServerError({ field: 'content', message: errorMessage });
      } else {
        // 필드를 특정할 수 없는 경우 title 필드에 표시 (첫 번째 필드)
        setPostServerError({ field: 'title', message: errorMessage });
      }
    }
  };

  const handlePostEdit = (post: Post) => {
    setSelectedPost(post);
    setPostFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      status: post.status,
    });
    setIsPostEditModalOpen(true);
  };

  const handlePostUpdate = async (data: PostFormValues) => {
    if (!selectedPost) return;
    try {
      setPostServerError(null);
      await postManagement.updatePost(selectedPost.id, {
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category,
        status: data.status,
      });
      setIsPostEditModalOpen(false);
      setPostFormData({});
      setSelectedPost(null);
      setAlertMessage('게시글이 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      const errorMessage = error?.message || postManagement.error || '작업에 실패했습니다';
      console.error('Post update error:', error, errorMessage);

      const lowerMessage = errorMessage.toLowerCase();

      // 에러 메시지에 따라 필드 지정
      if (lowerMessage.includes('title') || lowerMessage.includes('제목')) {
        setPostServerError({ field: 'title', message: errorMessage });
      } else if (lowerMessage.includes('author') || lowerMessage.includes('작성자')) {
        setPostServerError({ field: 'author', message: errorMessage });
      } else if (lowerMessage.includes('category') || lowerMessage.includes('카테고리')) {
        setPostServerError({ field: 'category', message: errorMessage });
      } else if (lowerMessage.includes('content') || lowerMessage.includes('내용')) {
        setPostServerError({ field: 'content', message: errorMessage });
      } else {
        // 필드를 특정할 수 없는 경우 title 필드에 표시 (첫 번째 필드)
        setPostServerError({ field: 'title', message: errorMessage });
      }
    }
  };

  const handlePostDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await postManagement.deletePost(id);
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setShowErrorAlert(true);
    }
  };

  const handlePostPublish = async (id: number) => {
    try {
      await postManagement.publishPost(id);
      setAlertMessage('게시되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setShowErrorAlert(true);
    }
  };

  const handlePostArchive = async (id: number) => {
    try {
      await postManagement.archivePost(id);
      setAlertMessage('보관되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setShowErrorAlert(true);
    }
  };

  const handlePostRestore = async (id: number) => {
    try {
      await postManagement.restorePost(id);
      setAlertMessage('복원되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setShowErrorAlert(true);
    }
  };

  // 테이블 컬럼 정의
  const userColumns = useMemo(
    () =>
      createUserTableColumns({
        onEdit: handleUserEdit,
        onDelete: handleUserDelete,
      }),
    []
  );

  const postColumns = useMemo(
    () =>
      createPostTableColumns({
        onEdit: handlePostEdit,
        onDelete: handlePostDelete,
        onPublish: handlePostPublish,
        onArchive: handlePostArchive,
        onRestore: handlePostRestore,
      }),
    []
  );

  const userStats = userManagement.getStats();
  const postStats = postManagement.getStats();
  const currentError = entityType === 'user' ? userManagement.error : postManagement.error;

  return (
    <div className="min-h-screen transition-colors" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-heading)' }}>
            관리 시스템
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div className="p-2.5 transition-colors" style={{
          backgroundColor: 'var(--color-modal-bg)',
          border: '1px solid var(--color-border-secondary)'
        }}>
          <div className="mb-4 pb-1" style={{ borderBottom: '2px solid var(--color-border-tertiary)' }}>
            <button
              onClick={() => setEntityType('post')}
              className={`px-4 py-2 mr-1 text-sm rounded cursor-pointer transition-colors ${
                entityType === 'post'
                  ? 'font-bold bg-blue-600 text-white border border-blue-600'
                  : 'font-normal'
              }`}
              style={entityType !== 'post' ? {
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-body)',
                border: '1px solid var(--color-border-tertiary)'
              } : {}}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              className={`px-4 py-2 text-sm rounded cursor-pointer transition-colors ${
                entityType === 'user'
                  ? 'font-bold bg-blue-600 text-white border border-blue-600'
                  : 'font-normal'
              }`}
              style={entityType !== 'user' ? {
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-body)',
                border: '1px solid var(--color-border-tertiary)'
              } : {}}
            >
              사용자
            </button>
          </div>

          <div>
            <div className="mb-4 text-right">
              <Button
                variant="primary"
                size="md"
                onClick={() => entityType === 'user' ? setIsUserCreateModalOpen(true) : setIsPostCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className="mb-2.5">
                <Alert
                  variant="success"
                  title="성공"
                  onClose={() => setShowSuccessAlert(false)}
                >
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div className="mb-2.5">
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {currentError || '작업에 실패했습니다'}
                </Alert>
              </div>
            )}

            {entityType === 'user' ? (
              <UserStats {...userStats} />
            ) : (
              <PostStats {...postStats} />
            )}

            <div className="overflow-auto transition-colors" style={{
              border: '1px solid var(--color-table-border)',
              backgroundColor: 'var(--color-modal-bg)'
            }}>
              {entityType === 'user' ? (
                <Table
                  columns={userColumns}
                  data={userManagement.users as Array<User & Record<string, unknown>>}
                  striped
                  hover
                />
              ) : (
                <Table
                  columns={postColumns}
                  data={postManagement.posts as Array<Post & Record<string, unknown>>}
                  striped
                  hover
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Modals */}
      <Modal
        isOpen={isUserCreateModalOpen}
        onClose={() => {
          setIsUserCreateModalOpen(false);
          setUserFormData({});
          setUserServerError(null);
        }}
        title="새 사용자 만들기"
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" size="md" onClick={() => {
              setIsUserCreateModalOpen(false);
              setUserFormData({});
              setUserServerError(null);
            }}>
              취소
            </Button>
            <Button variant="primary" size="md" type="submit" form="user-create-form">
              생성
            </Button>
          </>
        }
      >
        <UserForm
          key="user-create"
          formData={userFormData}
          onChange={setUserFormData}
          onSubmit={handleUserCreate}
          serverError={userServerError}
        />
      </Modal>

      <Modal
        isOpen={isUserEditModalOpen}
        onClose={() => {
          setIsUserEditModalOpen(false);
          setUserFormData({});
          setSelectedUser(null);
          setUserServerError(null);
        }}
        title="사용자 수정"
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" size="md" onClick={() => {
              setIsUserEditModalOpen(false);
              setUserFormData({});
              setSelectedUser(null);
              setUserServerError(null);
            }}>
              취소
            </Button>
            <Button variant="primary" size="md" type="submit" form="user-create-form">
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedUser && (
            <Alert variant="info">
              ID: {selectedUser.id} | 생성일: {selectedUser.createdAt}
            </Alert>
          )}
          <UserForm
            key={selectedUser?.id || "user-edit"}
            formData={userFormData}
            onChange={setUserFormData}
            onSubmit={handleUserUpdate}
            serverError={userServerError}
          />
        </div>
      </Modal>

      {/* Post Modals */}
      <Modal
        isOpen={isPostCreateModalOpen}
        onClose={() => {
          setIsPostCreateModalOpen(false);
          setPostFormData({});
          setPostServerError(null);
        }}
        title="새 게시글 만들기"
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" size="md" onClick={() => {
              setIsPostCreateModalOpen(false);
              setPostFormData({});
              setPostServerError(null);
            }}>
              취소
            </Button>
            <Button variant="primary" size="md" type="submit" form="post-create-form">
              생성
            </Button>
          </>
        }
      >
        <PostForm
          key="post-create"
          formData={postFormData}
          onChange={setPostFormData}
          onSubmit={handlePostCreate}
          serverError={postServerError}
        />
      </Modal>

      <Modal
        isOpen={isPostEditModalOpen}
        onClose={() => {
          setIsPostEditModalOpen(false);
          setPostFormData({});
          setSelectedPost(null);
          setPostServerError(null);
        }}
        title="게시글 수정"
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" size="md" onClick={() => {
              setIsPostEditModalOpen(false);
              setPostFormData({});
              setSelectedPost(null);
              setPostServerError(null);
            }}>
              취소
            </Button>
            <Button variant="primary" size="md" type="submit" form="post-create-form">
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedPost && (
            <Alert variant="info">
              ID: {selectedPost.id} | 생성일: {selectedPost.createdAt} | 조회수: {selectedPost.views}
            </Alert>
          )}
          <PostForm
            key={selectedPost?.id || "post-edit"}
            formData={postFormData}
            onChange={setPostFormData}
            onSubmit={handlePostUpdate}
            serverError={postServerError}
          />
        </div>
      </Modal>
    </div>
  );
};
