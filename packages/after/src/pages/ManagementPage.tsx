import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, Table, Modal } from '../components/organisms';
import { FormInput, FormSelect, FormTextarea } from '../components/molecules';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import '../styles/components.css';

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

  useEffect(() => {
    loadData();
    setFormData({});
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
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
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
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
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

      await loadData();
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

      await loadData();
      const message =
        action === 'publish' ? '게시' :
        action === 'archive' ? '보관' :
        '복원';
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
        stat1: { label: '활성', value: users.filter(u => u.status === 'active').length, color: 'bg-[#e8f5e9] border-[#81c784] text-[#388e3c]' },
        stat2: { label: '비활성', value: users.filter(u => u.status === 'inactive').length, color: 'bg-[#fff3e0] border-[#ffb74d] text-[#f57c00]' },
        stat3: { label: '정지', value: users.filter(u => u.status === 'suspended').length, color: 'bg-[#ffebee] border-[#e57373] text-[#d32f2f]' },
        stat4: { label: '관리자', value: users.filter(u => u.role === 'admin').length, color: 'bg-[#f5f5f5] border-[#bdbdbd] text-[#424242]' },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: { label: '게시됨', value: posts.filter(p => p.status === 'published').length, color: 'bg-[#e8f5e9] border-[#81c784] text-[#388e3c]' },
        stat2: { label: '임시저장', value: posts.filter(p => p.status === 'draft').length, color: 'bg-[#fff3e0] border-[#ffb74d] text-[#f57c00]' },
        stat3: { label: '보관됨', value: posts.filter(p => p.status === 'archived').length, color: 'bg-[#f5f5f5] border-[#bdbdbd] text-[#424242]' },
        stat4: { label: '총 조회수', value: posts.reduce((sum, p) => sum + p.views, 0), color: 'bg-[#e3f2fd] border-[#90caf9] text-[#1976d2]' },
      };
    }
  };

  // 🚨 Table 컴포넌트에 로직을 위임하여 간소화
  const renderTableColumns = () => {
    if (entityType === 'user') {
      return [
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'username', header: '사용자명', width: '150px' },
        { key: 'email', header: '이메일' },
        { key: 'role', header: '역할', width: '120px' },
        { key: 'status', header: '상태', width: '120px' },
        { key: 'createdAt', header: '생성일', width: '120px' },
        { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
        { key: 'actions', header: '관리', width: '200px' },
      ];
    } else {
      return [
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'title', header: '제목' },
        { key: 'author', header: '작성자', width: '120px' },
        { key: 'category', header: '카테고리', width: '140px' },
        { key: 'status', header: '상태', width: '120px' },
        { key: 'views', header: '조회수', width: '100px' },
        { key: 'createdAt', header: '작성일', width: '120px' },
        { key: 'actions', header: '관리', width: '250px' },
      ];
    }
  };

  const stats = getStats();

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#333'
          }}>
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '1px solid #ddd',
          padding: '10px'
        }}>
          <div className="mb-4 border-b-2 border-gray-300 pb-1 flex">
            <button
              onClick={() => setEntityType('post')}
              className={`px-4 py-2 mr-1 text-sm rounded-t-sm border border-b-0 ${
                entityType === 'post' 
                  ? 'bg-[#1976d2] text-white font-bold border-[#1976d2]' 
                  : 'bg-[#f5f5f5] text-[#333] border-[#999]'
              }`}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              className={`px-4 py-2 text-sm rounded-t-sm border border-b-0 ${
                entityType === 'user' 
                  ? 'bg-[#1976d2] text-white font-bold border-[#1976d2]' 
                  : 'bg-[#f5f5f5] text-[#333] border-[#999]'
              }`}
            >
              사용자
            </button>
          </div>

          <div>
            <div className="mb-4 text-right">
              <Button variant="primary" size="md" onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className="mb-2">
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
              <div className="mb-2">
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
              <div className="p-3 bg-[#e3f2fd] border border-[#90caf9] rounded-sm">
                <div className="text-xs text-gray-500 mb-1">전체</div>
                <div className="text-2xl font-bold text-[#1976d2]">{stats.total}</div>
              </div>

              <div className={`p-3 border rounded-sm ${stats.stat1.color}`}>
                <div className="text-xs text-gray-500 mb-1">{stats.stat1.label}</div>
                <div className="text-2xl font-bold">{stats.stat1.value}</div>
              </div>

              <div className={`p-3 border rounded-sm ${stats.stat2.color}`}>
                <div className="text-xs text-gray-500 mb-1">{stats.stat2.label}</div>
                <div className="text-2xl font-bold">{stats.stat2.value}</div>
              </div>

              <div className={`p-3 border rounded-sm ${stats.stat3.color}`}>
                <div className="text-xs text-gray-500 mb-1">{stats.stat3.label}</div>
                <div className="text-2xl font-bold">{stats.stat3.value}</div>
              </div>

              <div className={`p-3 border rounded-sm ${stats.stat4.color}`}>
                <div className="text-xs text-gray-500 mb-1">{stats.stat4.label}</div>
                <div className="text-2xl font-bold">{stats.stat4.value}</div>
              </div>
            </div>

            <div className="border border-[#ddd] bg-white overflow-auto">
              <Table
                columns={renderTableColumns()}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, 'publish')}
                onArchive={(id) => handleStatusAction(id, 'archive')}
                onRestore={(id) => handleStatusAction(id, 'restore')}
              />
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
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}>
                취소
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                생성
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            {entityType === 'user' ? (
              <>
                <FormInput
                  name="username"
                  value={formData.username || ''}
                  onChange={(value) => setFormData({ ...formData, username: value })}
                  label="사용자명"
                  placeholder="사용자명을 입력하세요"
                  required
                />
                <FormInput
                  name="email"
                  value={formData.email || ''}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    name="role"
                    value={formData.role || 'user'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    options={[
                      { value: 'user', label: '사용자' },
                      { value: 'moderator', label: '운영자' },
                      { value: 'admin', label: '관리자' },
                    ]}
                    label="역할"
                  />
                  <FormSelect
                    name="status"
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    options={[
                      { value: 'active', label: '활성' },
                      { value: 'inactive', label: '비활성' },
                      { value: 'suspended', label: '정지' },
                    ]}
                    label="상태"
                  />
                </div>
              </>
            ) : (
              <>
                <FormInput
                  name="title"
                  value={formData.title || ''}
                  onChange={(value) => setFormData({ ...formData, title: value })}
                  label="제목"
                  placeholder="게시글 제목을 입력하세요"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="author"
                    value={formData.author || ''}
                    onChange={(value) => setFormData({ ...formData, author: value })}
                    label="작성자"
                    placeholder="작성자명"
                    required
                  />
                  <FormSelect
                    name="category"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    options={[
                      { value: 'development', label: 'Development' },
                      { value: 'design', label: 'Design' },
                      { value: 'accessibility', label: 'Accessibility' },
                    ]}
                    label="카테고리"
                    placeholder="카테고리 선택"
                  />
                </div>
                <FormTextarea
                  name="content"
                  value={formData.content || ''}
                  onChange={(value) => setFormData({ ...formData, content: value })}
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
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}>
                취소
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                수정 완료
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            {selectedItem && (
              <Alert variant="info">
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
              </Alert>
            )}

            {entityType === 'user' ? (
              <>
                <FormInput
                  name="username"
                  value={formData.username || ''}
                  onChange={(value) => setFormData({ ...formData, username: value })}
                  label="사용자명"
                  placeholder="사용자명을 입력하세요"
                  required
                />
                <FormInput
                  name="email"
                  value={formData.email || ''}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  type="email"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    name="role"
                    value={formData.role || 'user'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    options={[
                      { value: 'user', label: '사용자' },
                      { value: 'moderator', label: '운영자' },
                      { value: 'admin', label: '관리자' },
                    ]}
                    label="역할"
                  />
                  <FormSelect
                    name="status"
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    options={[
                      { value: 'active', label: '활성' },
                      { value: 'inactive', label: '비활성' },
                      { value: 'suspended', label: '정지' },
                    ]}
                    label="상태"
                  />
                </div>
              </>
            ) : (
              <>
                <FormInput
                  name="title"
                  value={formData.title || ''}
                  onChange={(value) => setFormData({ ...formData, title: value })}
                  label="제목"
                  placeholder="게시글 제목을 입력하세요"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    name="author"
                    value={formData.author || ''}
                    onChange={(value) => setFormData({ ...formData, author: value })}
                    label="작성자"
                    placeholder="작성자명"
                    required
                  />
                  <FormSelect
                    name="category"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    options={[
                      { value: 'development', label: 'Development' },
                      { value: 'design', label: 'Design' },
                      { value: 'accessibility', label: 'Accessibility' },
                    ]}
                    label="카테고리"
                    placeholder="카테고리 선택"
                  />
                </div>
                <FormTextarea
                  name="content"
                  value={formData.content || ''}
                  onChange={(value) => setFormData({ ...formData, content: value })}
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
