import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Alert,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Textarea,
} from "@/components/ui/index";
import type { Post } from "../services/postService";
import { ActionsBar, ManagementTable, StatsSummary } from "@/features/management/components/index";
import { userColumns, postColumns } from "@/features/management/constants/columns";
import {
  useEntityManagement,
  useAlerts,
  useEntityForm,
  useEntityStats,
  type EntityType,
  type Entity,
} from "@/hooks";

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");

  // 커스텀 훅 사용
  const alerts = useAlerts();
  const form = useEntityForm();
  const entity = useEntityManagement({
    entityType,
    onSuccess: alerts.showSuccess,
    onError: alerts.showError,
  });
  const stats = useEntityStats(entity.data, entityType);

  // 핸들러 함수들
  const handleCreate = async () => {
    try {
      await entity.handleCreate(form.formData);
      form.closeCreateModal();
    } catch (error) {
      // 에러는 useEntityManagement에서 처리됨
    }
  };

  const handleEdit = (item: Entity) => {
    form.openEditModal(item, entityType);
  };

  const handleUpdate = async () => {
    if (!form.selectedItem) return;

    try {
      await entity.handleUpdate(form.selectedItem.id, form.formData);
      form.closeEditModal();
    } catch (error) {
      // 에러는 useEntityManagement에서 처리됨
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-[var(--color-foreground)]">
            관리 시스템
          </h1>
          <p className="text-sm text-[var(--color-foreground-muted)]">
            사용자와 게시글을 효율적으로 관리하세요
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-[var(--color-border)] px-6 py-5">
            <div className="inline-flex gap-1 bg-[var(--color-background-subtle)] rounded-lg p-1">
              <Button
                variant={entityType === "post" ? "default" : "ghost"}
                size="sm"
                onClick={() => setEntityType("post")}
                className="min-w-[100px]"
              >
                게시글
              </Button>
              <Button
                variant={entityType === "user" ? "default" : "ghost"}
                size="sm"
                onClick={() => setEntityType("user")}
                className="min-w-[100px]"
              >
                사용자
              </Button>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: 'var(--space-6)' }}>
            <ActionsBar
              onCreateOpen={() => form.openCreateModal()}
              successMessage={alerts.showSuccessAlert ? alerts.alertMessage : undefined}
              errorMessage={alerts.showErrorAlert ? alerts.errorMessage : undefined}
              onCloseSuccess={() => alerts.hideSuccess()}
              onCloseError={() => alerts.hideError()}
            />

            <div style={{ marginTop: 'var(--space-6)' }}>
              <StatsSummary items={stats} />
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <ManagementTable
              columns={entityType === "user" ? userColumns : postColumns}
              data={entity.data}
              entityType={entityType}
              onEdit={handleEdit}
              onDelete={entity.handleDelete}
              onPublish={(id) => entity.handleStatusAction(id, "publish")}
              onArchive={(id) => entity.handleStatusAction(id, "archive")}
              onRestore={(id) => entity.handleStatusAction(id, "restore")}
            />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={form.isCreateModalOpen} onOpenChange={(open) => open ? form.openCreateModal() : form.closeCreateModal()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              새 {entityType === "user" ? "사용자" : "게시글"} 만들기
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
            {entityType === "user" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">
                    사용자명 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={form.formData.username || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, username: e.target.value })
                    }
                    placeholder="사용자명을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    이메일 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.formData.email || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, email: e.target.value })
                    }
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">역할</Label>
                    <Select
                      value={form.formData.role || "user"}
                      onValueChange={(value) =>
                        form.setFormData({ ...form.formData, role: value })
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="역할 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">사용자</SelectItem>
                        <SelectItem value="moderator">운영자</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">상태</Label>
                    <Select
                      value={form.formData.status || "active"}
                      onValueChange={(value) =>
                        form.setFormData({ ...form.formData, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">활성</SelectItem>
                        <SelectItem value="inactive">비활성</SelectItem>
                        <SelectItem value="suspended">정지</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">
                    제목 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.formData.title || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, title: e.target.value })
                    }
                    placeholder="게시글 제목을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">
                      작성자 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="author"
                      name="author"
                      value={form.formData.author || ""}
                      onChange={(e) =>
                        form.setFormData({ ...form.formData, author: e.target.value })
                      }
                      placeholder="작성자명"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리</Label>
                    <Select
                      value={form.formData.category || ""}
                      onValueChange={(value) =>
                        form.setFormData({ ...form.formData, category: value })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="accessibility">
                          Accessibility
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">내용</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={form.formData.content || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, content: e.target.value })
                    }
                    placeholder="게시글 내용을 입력하세요"
                    rows={6}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => form.closeCreateModal()}
            >
              취소
            </Button>
            <Button onClick={handleCreate}>생성</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={form.isEditModalOpen} onOpenChange={(open) => open ? undefined : form.closeEditModal()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {entityType === "user" ? "사용자" : "게시글"} 수정
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
            {form.selectedItem && (
              <Alert variant="info">
                ID: {form.selectedItem.id} | 생성일: {form.selectedItem.createdAt}
                {entityType === "post" &&
                  ` | 조회수: ${(form.selectedItem as Post).views}`}
              </Alert>
            )}
            {entityType === "user" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-username">
                    사용자명 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-username"
                    name="username"
                    value={form.formData.username || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, username: e.target.value })
                    }
                    placeholder="사용자명을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">
                    이메일 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={form.formData.email || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, email: e.target.value })
                    }
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">역할</Label>
                    <Select
                      value={form.formData.role || "user"}
                      onValueChange={(value) =>
                        form.setFormData({ ...form.formData, role: value })
                      }
                    >
                      <SelectTrigger id="edit-role">
                        <SelectValue placeholder="역할 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">사용자</SelectItem>
                        <SelectItem value="moderator">운영자</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">상태</Label>
                    <Select
                      value={form.formData.status || "active"}
                      onValueChange={(value) =>
                        form.setFormData({ ...form.formData, status: value })
                      }
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">활성</SelectItem>
                        <SelectItem value="inactive">비활성</SelectItem>
                        <SelectItem value="suspended">정지</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-title">
                    제목 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="edit-title"
                    name="title"
                    value={form.formData.title || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, title: e.target.value })
                    }
                    placeholder="게시글 제목을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-author">
                      작성자 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="edit-author"
                      name="author"
                      value={form.formData.author || ""}
                      onChange={(e) =>
                        form.setFormData({ ...form.formData, author: e.target.value })
                      }
                      placeholder="작성자명"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">카테고리</Label>
                    <Select
                      value={form.formData.category || ""}
                      onValueChange={(value) =>
                        form.setFormData({ ...form.formData, category: value })
                      }
                    >
                      <SelectTrigger id="edit-category">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="accessibility">
                          Accessibility
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-content">내용</Label>
                  <Textarea
                    id="edit-content"
                    name="content"
                    value={form.formData.content || ""}
                    onChange={(e) =>
                      form.setFormData({ ...form.formData, content: e.target.value })
                    }
                    placeholder="게시글 내용을 입력하세요"
                    rows={6}
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => form.closeEditModal()}
            >
              취소
            </Button>
            <Button onClick={handleUpdate}>수정 완료</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
