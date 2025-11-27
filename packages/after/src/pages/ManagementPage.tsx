import React, { useState, useEffect } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Alert } from '../components/ui/alert';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { NativeSelect } from '../components/ui/native-select';
import { cn } from '../lib/utils';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

const getUserDefaultValues = () => ({
  username: '',
  email: '',
  role: 'user',
  status: 'active',
});

const getPostDefaultValues = () => ({
  title: '',
  author: '',
  category: 'development',
  status: 'draft',
  content: '',
});

const getDefaultValues = (type: EntityType) =>
  type === 'user' ? getUserDefaultValues() : getPostDefaultValues();

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
  const createForm = useForm<any>({
    defaultValues: getPostDefaultValues(),
  });
  const editForm = useForm<any>({
    defaultValues: getPostDefaultValues(),
  });

  useEffect(() => {
    loadData();
    const defaults = getDefaultValues(entityType);
    createForm.reset(defaults);
    editForm.reset(defaults);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, createForm, editForm]);

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

  const onCreateSubmit = async (values: any) => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: values.username,
          email: values.email,
          role: values.role || 'user',
          status: values.status || 'active',
        });
      } else {
        await postService.create({
          title: values.title,
          content: values.content || '',
          author: values.author,
          category: values.category,
          status: values.status || 'draft',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      createForm.reset(getDefaultValues(entityType));
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
      editForm.reset({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      editForm.reset({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const onEditSubmit = async (values: any) => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await userService.update(selectedItem.id, {
          username: values.username,
          email: values.email,
          role: values.role,
          status: values.status,
        });
      } else {
        await postService.update(selectedItem.id, {
          title: values.title,
          content: values.content,
          author: values.author,
          category: values.category,
          status: values.status,
        });
      }

      await loadData();
      setIsEditModalOpen(false);
      editForm.reset(getDefaultValues(entityType));
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

  const renderRequiredLabel = (text: string) => (
    <span className="inline-flex items-center gap-(--spacing-1)">
      {text}
      <span className="text-(--color-danger)">*</span>
    </span>
  );

  const renderUserFormFields = (form: UseFormReturn<any>) => (
    <div className="space-y-(--spacing-8)">
      <FormField
        control={form.control}
        name="username"
        rules={{ required: '사용자명을 입력하세요' }}
        render={({ field }) => (
          <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
            <FormLabel>{renderRequiredLabel('사용자명')}</FormLabel>
            <FormControl>
              <Input placeholder="사용자명을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        rules={{ required: '이메일을 입력하세요' }}
        render={({ field }) => (
          <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
            <FormLabel>{renderRequiredLabel('이메일')}</FormLabel>
            <FormControl>
              <Input type="email" placeholder="이메일을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-(--spacing-8)">
        <FormField
          control={form.control}
          name="role"
          rules={{ required: '역할을 선택하세요' }}
          render={({ field }) => (
            <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
              <FormLabel>{renderRequiredLabel('역할')}</FormLabel>
              <FormControl>
                <NativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <option value="user">사용자</option>
                  <option value="moderator">운영자</option>
                  <option value="admin">관리자</option>
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          rules={{ required: '상태를 선택하세요' }}
          render={({ field }) => (
            <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
              <FormLabel>{renderRequiredLabel('상태')}</FormLabel>
              <FormControl>
                <NativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="suspended">정지</option>
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderPostFormFields = (form: UseFormReturn<any>) => (
    <div className="space-y-(--spacing-8)">
      <FormField
        control={form.control}
        name="title"
        rules={{ required: '제목을 입력하세요' }}
        render={({ field }) => (
          <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
            <FormLabel>{renderRequiredLabel('제목')}</FormLabel>
            <FormControl>
              <Input placeholder="게시글 제목을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-(--spacing-8)">
        <FormField
          control={form.control}
          name="author"
          rules={{ required: '작성자를 입력하세요' }}
          render={({ field }) => (
            <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
              <FormLabel>{renderRequiredLabel('작성자')}</FormLabel>
              <FormControl>
                <Input placeholder="작성자명" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          rules={{ required: '카테고리를 선택하세요' }}
          render={({ field }) => (
            <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
              <FormLabel>{renderRequiredLabel('카테고리')}</FormLabel>
              <FormControl>
                <NativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="accessibility">Accessibility</option>
                </NativeSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem className="font-(--font-family-alt) space-y-(--space-form-label-margin-bottom)">
            <FormLabel>내용</FormLabel>
            <FormControl>
              <Textarea placeholder="게시글 내용을 입력하세요" rows={6} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => <input type="hidden" {...field} />}
      />
    </div>
  );

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
    createForm.reset(getDefaultValues(entityType));
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
    editForm.reset(getDefaultValues(entityType));
  };

  const handleOpenCreateModal = () => {
    createForm.reset(getDefaultValues(entityType));
    setIsCreateModalOpen(true);
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data as User[];
      return {
        total: users.length,
        stat1: { label: '활성', value: users.filter(u => u.status === 'active').length, color: '#2e7d32' },
        stat2: { label: '비활성', value: users.filter(u => u.status === 'inactive').length, color: '#ed6c02' },
        stat3: { label: '정지', value: users.filter(u => u.status === 'suspended').length, color: '#d32f2f' },
        stat4: { label: '관리자', value: users.filter(u => u.role === 'admin').length, color: '#1976d2' },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: { label: '게시됨', value: posts.filter(p => p.status === 'published').length, color: '#2e7d32' },
        stat2: { label: '임시저장', value: posts.filter(p => p.status === 'draft').length, color: '#ed6c02' },
        stat3: { label: '보관됨', value: posts.filter(p => p.status === 'archived').length, color: 'rgba(0, 0, 0, 0.6)' },
        stat4: { label: '총 조회수', value: posts.reduce((sum, p) => sum + p.views, 0), color: '#1976d2' },
      };
    }
  };

  // 테이블 컬럼 정의
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

  // 셀 렌더링 로직
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === 'user') {
      if (columnKey === 'role') {
        return <Badge userRole={value} showIcon />;
      }
      if (columnKey === 'status') {
        // User status를 Badge status로 변환
        const badgeStatus =
          value === 'active' ? 'published' :
          value === 'inactive' ? 'draft' : 'rejected';
        return <Badge status={badgeStatus} showIcon />;
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex gap-(--space-button-padding-sm)">
            <Button size="sm" variant="primary" onClick={() => handleEdit(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const type =
          value === 'development' ? 'primary' :
          value === 'design' ? 'info' :
          value === 'accessibility' ? 'danger' :
          'secondary';
        return <Badge type={type} pill>{value}</Badge>;
      }
      if (columnKey === 'status') {
        return <Badge status={value} showIcon />;
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex flex-wrap gap-(--space-button-padding-sm)">
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
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  const stats = getStats();

  const statCardConfigs = entityType === 'user'
    ? [
        { label: '전체', value: stats.total, containerClass: 'bg-(--color-alert-info-bg) border-(--color-alert-info-border) text-(--color-alert-info-text)', valueClass: 'text-(--color-primary)' },
        { label: stats.stat1.label, value: stats.stat1.value, containerClass: 'bg-(--color-alert-success-bg) border-(--color-alert-success-border) text-(--color-alert-success-text)', valueClass: 'text-(--color-success)' },
        { label: stats.stat2.label, value: stats.stat2.value, containerClass: 'bg-(--color-alert-warning-bg) border-(--color-alert-warning-border) text-(--color-alert-warning-text)', valueClass: 'text-(--color-warning)' },
        { label: stats.stat3.label, value: stats.stat3.value, containerClass: 'bg-(--color-alert-error-bg) border-(--color-alert-error-border) text-(--color-alert-error-text)', valueClass: 'text-(--color-danger)' },
        { label: stats.stat4.label, value: stats.stat4.value, containerClass: 'bg-(--color-neutral-100) border-(--color-border-card) text-(--color-text-default)', valueClass: 'text-(--color-primary)' },
      ]
    : [
        { label: '전체', value: stats.total, containerClass: 'bg-(--color-alert-info-bg) border-(--color-alert-info-border) text-(--color-alert-info-text)', valueClass: 'text-(--color-primary)' },
        { label: stats.stat1.label, value: stats.stat1.value, containerClass: 'bg-(--color-alert-success-bg) border-(--color-alert-success-border) text-(--color-alert-success-text)', valueClass: 'text-(--color-success)' },
        { label: stats.stat2.label, value: stats.stat2.value, containerClass: 'bg-(--color-alert-warning-bg) border-(--color-alert-warning-border) text-(--color-alert-warning-text)', valueClass: 'text-(--color-warning)' },
        { label: stats.stat3.label, value: stats.stat3.value, containerClass: 'bg-(--color-alert-error-bg) border-(--color-alert-error-border) text-(--color-alert-error-text)', valueClass: 'text-(--color-danger)' },
        { label: stats.stat4.label, value: stats.stat4.value, containerClass: 'bg-(--color-neutral-100) border-(--color-border-card) text-(--color-text-default)', valueClass: 'text-(--color-primary)' },
      ];

  const getTabButtonClass = (target: EntityType) =>
    cn(
      "px-(--spacing-4) py-(--spacing-2) text-(length:--font-size-14) rounded-(--radius-3) mr-(--spacing-2)",
      "font-[var(--font-family-base)] border transition-colors",
      target === entityType
        ? "font-bold border-(--color-primary-dark) bg-(--color-primary) text-(--color-text-inverse)"
        : "font-medium border-(--color-border-button-secondary) bg-(--color-neutral-100) text-(--color-neutral-800)"
    );

  return (
    <div className="min-h-screen bg-(--color-neutral-100) font-(--font-family-base)">
      <div className="max-w-[1200px] mx-auto p-(--spacing-8)">
        <div className="mb-(--space-form-group-gap)">
          <h1 className="text-(length:--font-size-2xl) font-bold text-(--color-text-card-title) mb-(--spacing-2)">
            관리 시스템
          </h1>
          <p className="text-(length:--font-size-label) text-(--color-text-muted)">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div className="bg-(--color-bg-card) border border-(--color-border-card) rounded-(--radius-4) p-(--spacing-5) shadow-(--shadow-card-default)">
          <div className="flex flex-wrap items-center border-b border-(--color-border-card-header) pb-(--spacing-2) mb-(--spacing-4)">
            <button className={getTabButtonClass('post')} onClick={() => setEntityType('post')}>
              게시글
            </button>
            <button className={getTabButtonClass('user')} onClick={() => setEntityType('user')}>
              사용자
            </button>
          </div>

          <div>
            <div className="mb-(--spacing-4) text-right">
              <Button variant="primary" size="md" onClick={handleOpenCreateModal}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className="mb-(--spacing-3)">
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
              <div className="mb-(--spacing-3)">
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-(--space-card-gap) mb-(--space-form-group-gap)">
              {statCardConfigs.map((card) => (
                <div
                  key={card.label}
                  className={cn(
                    "rounded-(--radius-3) border px-(--spacing-5) py-(--spacing-4) font-(--font-family-base)",
                    card.containerClass
                  )}
                >
                  <div className="text-(length:--font-size-label) text-(--color-text-muted) mb-(--space-card-subtitle-margin-top)">
                    {card.label}
              </div>
                  <div
                    className={cn(
                      "text-[24px] font-bold",
                      card.valueClass
                    )}
                  >
                    {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
              </div>
              </div>
              ))}
            </div>

            <div className="border border-(--color-border-card) bg-(--color-bg-card) overflow-auto rounded-(--radius-3)">
              <Table striped hover>
                <TableHeader>
                  <TableRow>
                    {renderTableColumns().map((column) => (
                      <TableHead
                        key={column.key}
                        style={column.width ? { width: column.width } : undefined}
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody striped hover>
                  {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {renderTableColumns().map((column) => (
                        <TableCell key={column.key}>
                          {renderCell(row, column.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

      </div>
        <Dialog open={isCreateModalOpen} onOpenChange={(open) => !open && handleCreateModalClose()}>
          <DialogContent size="large">
            <DialogHeader>
              <DialogTitle>
                새 {entityType === 'user' ? '사용자' : '게시글'} 만들기
              </DialogTitle>
              <DialogCloseButton onClick={handleCreateModalClose} />
            </DialogHeader>
            <DialogBody>
              <Form {...createForm}>
                <form
                  id="create-form"
                  onSubmit={createForm.handleSubmit(onCreateSubmit)}
                  className="space-y-(--spacing-8)"
                >
                  {entityType === 'user'
                    ? renderUserFormFields(createForm)
                    : renderPostFormFields(createForm)}
                </form>
              </Form>
            </DialogBody>
            <DialogFooter>
              <Button variant="secondary" size="md" onClick={handleCreateModalClose}>
                취소
              </Button>
              <Button variant="primary" size="md" type="submit" form="create-form">
                생성
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={(open) => !open && handleEditModalClose()}>
          <DialogContent size="large">
            <DialogHeader>
              <DialogTitle>
                {entityType === 'user' ? '사용자' : '게시글'} 수정
              </DialogTitle>
              <DialogCloseButton onClick={handleEditModalClose} />
            </DialogHeader>
            <DialogBody>
              <Form {...editForm}>
                <form
                  id="edit-form"
                  onSubmit={editForm.handleSubmit(onEditSubmit)}
                  className="space-y-(--spacing-8)"
                >
                  {selectedItem && (
                    <Alert variant="info" className="mb-(--spacing-6)">
                      ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                      {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
                    </Alert>
            )}

                  {entityType === 'user'
                    ? renderUserFormFields(editForm)
                    : renderPostFormFields(editForm)}
                </form>
              </Form>
            </DialogBody>
            <DialogFooter>
              <Button variant="secondary" size="md" onClick={handleEditModalClose}>
                취소
              </Button>
              <Button variant="primary" size="md" type="submit" form="edit-form">
                수정 완료
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
};
