import React, { useState, useEffect } from 'react';
import { Button } from '../components/atoms';
import { Badge } from '../components/atoms/Badge';
import { Alert, Modal } from '../components/organisms';
import { DataTable } from '../components/organisms/DataTable';
import type { Column } from '../components/organisms/DataTable/types';
import { FormInput, FormSelect, FormTextarea } from '../components/molecules';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import { validateField } from '../utils/fieldValidators';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<any>({});

  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    email?: string;
    title?: string;
  }>({});

  useEffect(() => {
    loadData();
    setFormData({});
    setValidationErrors({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: formData.status || 'active',
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: formData.status || 'draft',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(
        `${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`
      );
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

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  // Validation handlers
  const handleUsernameChange = (value: string) => {
    setFormData({ ...formData, username: value });
    const error = validateField(value, {
      fieldType: 'username',
      checkBusinessRules: true,
    });
    setValidationErrors({ ...validationErrors, username: error });
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    const error = validateField(value, {
      fieldType: 'email',
      entityType: 'user',
      checkBusinessRules: true,
    });
    setValidationErrors({ ...validationErrors, email: error });
  };

  const handleTitleChange = (value: string) => {
    setFormData({ ...formData, title: value });
    const error = validateField(value, {
      fieldType: 'postTitle',
      entityType: 'post',
      checkBusinessRules: true,
    });
    setValidationErrors({ ...validationErrors, title: error });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: 'publish' | 'archive' | 'restore'
  ) => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter((u) => u.status === 'active').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '비활성',
          value: users.filter((u) => u.status === 'inactive').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '정지',
          value: users.filter((u) => u.status === 'suspended').length,
          color: '#d32f2f',
        },
        stat4: {
          label: '관리자',
          value: users.filter((u) => u.role === 'admin').length,
          color: '#1976d2',
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter((p) => p.status === 'published').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '임시저장',
          value: posts.filter((p) => p.status === 'draft').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '보관됨',
          value: posts.filter((p) => p.status === 'archived').length,
          color: 'rgba(0, 0, 0, 0.6)',
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
          color: '#1976d2',
        },
      };
    }
  };

  const getUserColumns = (): Column<User>[] => [
    { key: 'id', header: 'ID', width: '60px', sortable: true },
    { key: 'username', header: '사용자명', width: '150px', sortable: true },
    { key: 'email', header: '이메일', sortable: true },
    {
      key: 'role',
      header: '역할',
      width: '120px',
      render: (value) => <Badge userRole={value as User['role']} showIcon />,
    },
    {
      key: 'status',
      header: '상태',
      width: '120px',
      render: (value) => {
        const badgeStatus =
          value === 'active'
            ? 'published'
            : value === 'inactive'
              ? 'draft'
              : 'rejected';
        return <Badge status={badgeStatus} showIcon />;
      },
    },
    { key: 'createdAt', header: '생성일', width: '120px', sortable: true },
    {
      key: 'lastLogin',
      header: '마지막 로그인',
      width: '140px',
      render: (value) => (value ? String(value) : '-'),
    },
    {
      key: 'actions',
      header: '관리',
      width: '200px',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={() => handleEdit(row)}>
            수정
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row.id)}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  const getPostColumns = (): Column<Post>[] => [
    { key: 'id', header: 'ID', width: '60px', sortable: true },
    { key: 'title', header: '제목', sortable: true },
    { key: 'author', header: '작성자', width: '120px', sortable: true },
    {
      key: 'category',
      header: '카테고리',
      width: '140px',
      render: (value) => {
        const type =
          value === 'development'
            ? 'primary'
            : value === 'design'
              ? 'info'
              : 'danger';
        return (
          <Badge type={type} pill>
            {String(value)}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      header: '상태',
      width: '120px',
      render: (value) => <Badge status={value as Post['status']} showIcon />,
    },
    {
      key: 'views',
      header: '조회수',
      width: '100px',
      sortable: true,
      render: (value) =>
        typeof value === 'number' ? value.toLocaleString() : '',
    },
    { key: 'createdAt', header: '작성일', width: '120px', sortable: true },
    {
      key: 'actions',
      header: '관리',
      width: '250px',
      render: (_, row) => (
        <div className="flex gap-2 flex-wrap">
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
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row.id)}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  const stats = getStats();

  return (
    <div
      style={{ minHeight: '100vh', background: 'var(--color-bg-secondary)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: 'var(--color-text-primary)',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div
          style={{
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border-base)',
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              borderBottom: '1px solid var(--color-border-base)',
              paddingBottom: '5px',
            }}
          >
            <Button
              size="sm"
              variant={entityType === 'post' ? 'primary' : 'secondary'}
              onClick={() => setEntityType('post')}
              className="mr-[5px]"
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
            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: '10px' }}>
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
              <div style={{ marginBottom: '10px' }}>
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '15px',
              }}
            >
              <div
                style={{
                  padding: '12px 15px',
                  background: '#e3f2fd',
                  border: '1px solid #90caf9',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  전체
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1976d2',
                  }}
                >
                  {stats.total}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#e8f5e9',
                  border: '1px solid #81c784',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat1.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#388e3c',
                  }}
                >
                  {stats.stat1.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#fff3e0',
                  border: '1px solid #ffb74d',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat2.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#f57c00',
                  }}
                >
                  {stats.stat2.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#ffebee',
                  border: '1px solid #e57373',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat3.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#d32f2f',
                  }}
                >
                  {stats.stat3.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#f5f5f5',
                  border: '1px solid #bdbdbd',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat4.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#424242',
                  }}
                >
                  {stats.stat4.value}
                </div>
              </div>
            </div>

            <div
              style={{
                border: '1px solid #ddd',
                background: 'white',
              }}
            >
              {entityType === 'user' ? (
                <DataTable<User>
                  columns={getUserColumns()}
                  data={data as User[]}
                  striped
                  hover
                  sortable
                  pageSize={10}
                />
              ) : (
                <DataTable<Post>
                  columns={getPostColumns()}
                  data={data as Post[]}
                  striped
                  hover
                  sortable
                  pageSize={10}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({});
        }}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div>
          {entityType === 'user' ? (
            <>
              <FormInput
                name="username"
                value={formData.username || ''}
                onChange={handleUsernameChange}
                error={validationErrors.username}
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
              />
              <FormInput
                name="email"
                value={formData.email || ''}
                onChange={handleEmailChange}
                error={validationErrors.email}
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormSelect
                  name="role"
                  value={formData.role || 'user'}
                  onChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  size="md"
                />
                <FormSelect
                  name="status"
                  value={formData.status || 'active'}
                  onChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  size="md"
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="title"
                value={formData.title || ''}
                onChange={handleTitleChange}
                error={validationErrors.title}
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormInput
                  name="author"
                  value={formData.author || ''}
                  onChange={(value) =>
                    setFormData({ ...formData, author: value })
                  }
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                />
                <FormSelect
                  name="category"
                  value={formData.category || ''}
                  onChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label="카테고리"
                  placeholder="카테고리 선택"
                  size="md"
                />
              </div>
              <FormTextarea
                name="content"
                value={formData.content || ''}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedItem && (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' &&
                ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === 'user' ? (
            <>
              <FormInput
                name="username"
                value={formData.username || ''}
                onChange={handleUsernameChange}
                error={validationErrors.username}
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
              />
              <FormInput
                name="email"
                value={formData.email || ''}
                onChange={handleEmailChange}
                error={validationErrors.email}
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormSelect
                  name="role"
                  value={formData.role || 'user'}
                  onChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  size="md"
                />
                <FormSelect
                  name="status"
                  value={formData.status || 'active'}
                  onChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  size="md"
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="title"
                value={formData.title || ''}
                onChange={handleTitleChange}
                error={validationErrors.title}
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormInput
                  name="author"
                  value={formData.author || ''}
                  onChange={(value) =>
                    setFormData({ ...formData, author: value })
                  }
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                />
                <FormSelect
                  name="category"
                  value={formData.category || ''}
                  onChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label="카테고리"
                  placeholder="카테고리 선택"
                  size="md"
                />
              </div>
              <FormTextarea
                name="content"
                value={formData.content || ''}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
