import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";

type EntityType = "user" | "post";
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      if (entityType === "user") {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || "user",
          status: formData.status || "active",
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || "",
          author: formData.author,
          category: formData.category,
          status: formData.status || "draft",
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === "user") {
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
      if (entityType === "user") {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === "user") {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: "활성",
          value: users.filter((u) => u.status === "active").length,
          variant: "success" as const,
        },
        stat2: {
          label: "비활성",
          value: users.filter((u) => u.status === "inactive").length,
          variant: "warning" as const,
        },
        stat3: {
          label: "정지",
          value: users.filter((u) => u.status === "suspended").length,
          variant: "destructive" as const,
        },
        stat4: {
          label: "관리자",
          value: users.filter((u) => u.role === "admin").length,
          variant: "info" as const,
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: "게시됨",
          value: posts.filter((p) => p.status === "published").length,
          variant: "success" as const,
        },
        stat2: {
          label: "임시저장",
          value: posts.filter((p) => p.status === "draft").length,
          variant: "warning" as const,
        },
        stat3: {
          label: "보관됨",
          value: posts.filter((p) => p.status === "archived").length,
          variant: "default" as const,
        },
        stat4: {
          label: "총 조회수",
          value: posts.reduce((sum, p) => sum + p.views, 0),
          variant: "info" as const,
        },
      };
    }
  };

  const renderTableColumns = () => {
    if (entityType === "user") {
      return [
        { key: "id", header: "ID", width: "var(--width-table-col-id)" },
        {
          key: "username",
          header: "사용자명",
          width: "var(--width-table-col-username)",
        },
        { key: "email", header: "이메일" },
        {
          key: "role",
          header: "역할",
          width: "var(--width-table-col-standard)",
        },
        {
          key: "status",
          header: "상태",
          width: "var(--width-table-col-standard)",
        },
        {
          key: "createdAt",
          header: "생성일",
          width: "var(--width-table-col-standard)",
        },
        {
          key: "lastLogin",
          header: "마지막 로그인",
          width: "var(--width-table-col-medium)",
        },
        {
          key: "actions",
          header: "관리",
          width: "var(--width-table-col-actions-user)",
        },
      ];
    } else {
      return [
        { key: "id", header: "ID", width: "var(--width-table-col-id)" },
        { key: "title", header: "제목" },
        {
          key: "author",
          header: "작성자",
          width: "var(--width-table-col-standard)",
        },
        {
          key: "category",
          header: "카테고리",
          width: "var(--width-table-col-medium)",
        },
        {
          key: "status",
          header: "상태",
          width: "var(--width-table-col-standard)",
        },
        {
          key: "views",
          header: "조회수",
          width: "var(--width-table-col-views)",
        },
        {
          key: "createdAt",
          header: "작성일",
          width: "var(--width-table-col-standard)",
        },
        {
          key: "actions",
          header: "관리",
          width: "var(--width-table-col-actions-post)",
        },
      ];
    }
  };

  const renderTableCell = (
    item: Entity,
    column: { key: string; header: string }
  ) => {
    if (column.key === "actions") {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
            수정
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(item.id)}
          >
            삭제
          </Button>
          {entityType === "post" && (item as Post).status === "draft" && (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusAction(item.id, "publish")}
            >
              게시
            </Button>
          )}
          {entityType === "post" && (item as Post).status === "published" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusAction(item.id, "archive")}
            >
              보관
            </Button>
          )}
          {entityType === "post" && (item as Post).status === "archived" && (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusAction(item.id, "restore")}
            >
              복원
            </Button>
          )}
        </div>
      );
    }

    const value = (item as any)[column.key];
    return value || "-";
  };

  const stats = getStats();
  const columns = renderTableColumns();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 text-foreground">
            관리 시스템
          </h1>
          <p className="text-muted-foreground text-sm">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <Card className="p-2.5">
          <div className="mb-4 border-b-2 border-border pb-1">
            <Tabs
              value={entityType}
              onValueChange={(value) => setEntityType(value as EntityType)}
            >
              <TabsList>
                <TabsTrigger value="post">게시글</TabsTrigger>
                <TabsTrigger value="user">사용자</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <div className="mb-4 text-right">
              <Button
                variant="default"
                size="default"
                onClick={() => setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className="mb-2.5 relative">
                <Alert variant="success">
                  <AlertTitle>성공</AlertTitle>
                  <AlertDescription>{alertMessage}</AlertDescription>
                  <button
                    onClick={() => setShowSuccessAlert(false)}
                    className="absolute right-2 top-2 text-foreground hover:opacity-70 text-xl leading-none"
                  >
                    ×
                  </button>
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div className="mb-2.5 relative">
                <Alert variant="destructive">
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                  <button
                    onClick={() => setShowErrorAlert(false)}
                    className="absolute right-2 top-2 text-foreground hover:opacity-70 text-xl leading-none"
                  >
                    ×
                  </button>
                </Alert>
              </div>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
              <Card
                variant="default"
                className="p-3 bg-[var(--color-alert-info-bg)] border-[var(--color-alert-info-border)]"
              >
                <CardHeader className="p-0 pb-1">
                  <CardTitle
                    size="sm"
                    className="text-xs text-muted-foreground mb-1"
                  >
                    전체
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[var(--color-alert-info-text)]">
                    {stats.total}
                  </div>
                </CardContent>
              </Card>

              <Card
                variant="default"
                className="p-3 bg-[var(--color-alert-success-bg)] border-[var(--color-alert-success-border)]"
              >
                <CardHeader className="p-0 pb-1">
                  <CardTitle
                    size="sm"
                    className="text-xs text-muted-foreground mb-1"
                  >
                    {stats.stat1.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[var(--color-alert-success-text)]">
                    {stats.stat1.value}
                  </div>
                </CardContent>
              </Card>

              <Card
                variant="default"
                className="p-3 bg-[var(--color-alert-warning-bg)] border-[var(--color-alert-warning-border)]"
              >
                <CardHeader className="p-0 pb-1">
                  <CardTitle
                    size="sm"
                    className="text-xs text-muted-foreground mb-1"
                  >
                    {stats.stat2.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[var(--color-alert-warning-text)]">
                    {stats.stat2.value}
                  </div>
                </CardContent>
              </Card>

              <Card
                variant="default"
                className="p-3 bg-[var(--color-alert-error-bg)] border-[var(--color-alert-error-border)]"
              >
                <CardHeader className="p-0 pb-1">
                  <CardTitle
                    size="sm"
                    className="text-xs text-muted-foreground mb-1"
                  >
                    {stats.stat3.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[var(--color-alert-error-text)]">
                    {stats.stat3.value}
                  </div>
                </CardContent>
              </Card>

              <Card
                variant="default"
                className="p-3 bg-[var(--color-alert-default-bg)] border-[var(--color-alert-default-border)]"
              >
                <CardHeader className="p-0 pb-1">
                  <CardTitle
                    size="sm"
                    className="text-xs text-muted-foreground mb-1"
                  >
                    {stats.stat4.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-[var(--color-alert-default-text)]">
                    {stats.stat4.value}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border border-border bg-card overflow-auto rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead
                        key={column.key}
                        style={{ width: column.width }}
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {renderTableCell(item, column)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>
              새 {entityType === "user" ? "사용자" : "게시글"} 만들기
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {entityType === "user" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">사용자명</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="사용자명을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">역할</Label>
                    <Select
                      value={formData.role || "user"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger id="role" aria-label="역할 선택">
                        <SelectValue placeholder="역할 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">사용자</SelectItem>
                        <SelectItem value="moderator">운영자</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                    <select
                      name="role"
                      value={formData.role || "user"}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      style={{ display: "none" }}
                      aria-hidden="true"
                    >
                      <option value="user">사용자</option>
                      <option value="moderator">운영자</option>
                      <option value="admin">관리자</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">상태</Label>
                    <Select
                      value={formData.status || "active"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger id="status" aria-label="상태 선택">
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
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="게시글 제목을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">작성자</Label>
                    <Input
                      id="author"
                      value={formData.author || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      placeholder="작성자명"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리</Label>
                    <Select
                      value={formData.category || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger id="category" aria-label="카테고리 선택">
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
                    value={formData.content || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
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
              variant="secondary"
              size="default"
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant="default" size="default" onClick={handleCreate}>
              생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>
              {entityType === "user" ? "사용자" : "게시글"} 수정
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem && (
              <Alert variant="default">
                <AlertDescription>
                  ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                  {entityType === "post" &&
                    ` | 조회수: ${(selectedItem as Post).views}`}
                </AlertDescription>
              </Alert>
            )}

            {entityType === "user" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-username">사용자명</Label>
                  <Input
                    id="edit-username"
                    name="username"
                    value={formData.username || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="사용자명을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">이메일</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">역할</Label>
                    <Select
                      value={formData.role || "user"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger id="edit-role" aria-label="역할 선택">
                        <SelectValue placeholder="역할 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">사용자</SelectItem>
                        <SelectItem value="moderator">운영자</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                    <select
                      name="role"
                      value={formData.role || "user"}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      style={{ display: "none" }}
                      aria-hidden="true"
                    >
                      <option value="user">사용자</option>
                      <option value="moderator">운영자</option>
                      <option value="admin">관리자</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">상태</Label>
                    <Select
                      value={formData.status || "active"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger id="edit-status" aria-label="상태 선택">
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
                  <Label htmlFor="edit-title">제목</Label>
                  <Input
                    id="edit-title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="게시글 제목을 입력하세요"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-author">작성자</Label>
                    <Input
                      id="edit-author"
                      value={formData.author || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      placeholder="작성자명"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">카테고리</Label>
                    <Select
                      value={formData.category || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger
                        id="edit-category"
                        aria-label="카테고리 선택"
                      >
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
                    value={formData.content || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
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
              variant="secondary"
              size="default"
              onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant="default" size="default" onClick={handleUpdate}>
              수정 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
