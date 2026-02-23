import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  EntityType,
  ManagementFormData,
  ManagementAlert,
} from "@/type/management";
import type { Post } from "@/services/postService";
import { postService } from "@/services/postService";
import type { User } from "@/services/userService";
import { userService } from "@/services/userService";
import {
  ensurePostStatus,
  ensureUserRole,
  ensureUserStatus,
  getInitialFormData,
} from "@/hooks/management/form-utils";
import { useManagementPagination } from "@/hooks/management/useManagementPagination";
import { useManagementStats } from "@/hooks/management/useManagementStats";

type Entity = User | Post;
type PostAction = "publish" | "archive" | "restore";
type AlertState = ManagementAlert | null;

export const useManagementPage = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [formData, setFormData] = useState<ManagementFormData>(
    getInitialFormData("post")
  );
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [alert, setAlert] = useState<AlertState>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ManagementFormData, string>>
  >({});

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result =
        entityType === "user"
          ? await userService.getAll()
          : await postService.getAll();
      setData(result);
    } catch {
      setAlert({ type: "danger", message: "데이터를 불러오지 못했습니다." });
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    loadData();
    setFormData(getInitialFormData(entityType));
    setCreateOpen(false);
    setEditOpen(false);
    setSelectedItem(null);
    setAlert(null);
  }, [entityType, loadData]);
  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    pageSize,
    hasPagination,
  } = useManagementPagination(data, { pageSize: 10, resetKey: entityType });

  const statsCards = useManagementStats(entityType, data);

  const columns = useMemo(() => {
    if (entityType === "user") {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명" },
        { key: "email", header: "이메일" },
        { key: "role", header: "역할", width: "120px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "createdAt", header: "생성일", width: "140px" },
        { key: "lastLogin", header: "마지막 로그인", width: "160px" },
        { key: "actions", header: "관리", width: "280px" },
      ];
    }
    return [
      { key: "id", header: "ID", width: "60px" },
      { key: "title", header: "제목" },
      { key: "author", header: "작성자", width: "140px" },
      { key: "category", header: "카테고리", width: "140px" },
      { key: "status", header: "상태", width: "120px" },
      { key: "views", header: "조회수", width: "120px" },
      { key: "createdAt", header: "작성일", width: "140px" },
      { key: "actions", header: "관리", width: "360px" },
    ];
  }, [entityType]);

  const updateField = (name: keyof ManagementFormData, value: string) => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        }) as ManagementFormData
    );
    // 필드 값이 변경되면 해당 필드의 에러 제거
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const openCreateDialog = () => {
    setFormData(getInitialFormData(entityType));
    setFieldErrors({});
    setCreateOpen(true);
  };

  const openEditDialog = (item: Entity) => {
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
        author: post.author,
        category: post.category,
        status: post.status,
        content: post.content,
      });
    }
    setEditOpen(true);
  };

  const closeCreateDialog = () => {
    setCreateOpen(false);
    setFormData(getInitialFormData(entityType));
    setFieldErrors({});
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setSelectedItem(null);
    setFormData(getInitialFormData(entityType));
  };

  const createEntity = async () => {
    setFieldErrors({});

    // 클라이언트 사이드 필수 필드 검증
    const newFieldErrors: Partial<Record<keyof ManagementFormData, string>> =
      {};

    if (entityType === "user") {
      if (!formData.username || formData.username.trim() === "") {
        newFieldErrors.username = "사용자명을 입력해주세요.";
      }
      if (!formData.email || formData.email.trim() === "") {
        newFieldErrors.email = "이메일을 입력해주세요.";
      }
    } else {
      if (!formData.title || formData.title.trim() === "") {
        newFieldErrors.title = "제목을 입력해주세요.";
      }
      if (!formData.author || formData.author.trim() === "") {
        newFieldErrors.author = "작성자를 입력해주세요.";
      }
      if (!formData.content || formData.content.trim() === "") {
        newFieldErrors.content = "내용을 입력해주세요.";
      }
    }

    // 필수 필드 검증 실패 시 에러 표시하고 생성 중단
    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    try {
      if (entityType === "user") {
        await userService.create({
          username: formData.username ?? "",
          email: formData.email ?? "",
          role: ensureUserRole(formData.role),
          status: ensureUserStatus(formData.status),
        });
      } else {
        await postService.create({
          title: formData.title ?? "",
          content: formData.content ?? "",
          author: formData.author ?? "",
          category: formData.category ?? "",
          status: ensurePostStatus(formData.status),
        });
      }
      await loadData();
      closeCreateDialog();
      setAlert({
        type: "success",
        message: `${
          entityType === "user" ? "사용자가" : "게시글이"
        } 생성되었습니다.`,
      });
    } catch (error: any) {
      const errorMessage = error?.message ?? "생성에 실패했습니다.";
      const serverFieldErrors: Partial<
        Record<keyof ManagementFormData, string>
      > = {};

      // 사용자 생성 시 필드별 에러 처리
      if (entityType === "user") {
        if (errorMessage.includes("Username")) {
          serverFieldErrors.username = "이미 사용 중인 사용자명입니다.";
        }
        if (errorMessage.includes("Email")) {
          serverFieldErrors.email = "이미 사용 중인 이메일입니다.";
        }
      } else {
        // 게시글 생성 시 필드별 에러 처리
        if (errorMessage.includes("Title")) {
          serverFieldErrors.title = "제목은 최소 5자 이상이어야 합니다.";
        }
        if (errorMessage.includes("Content")) {
          serverFieldErrors.content = "내용을 입력해주세요.";
        }
        if (errorMessage.includes("Author")) {
          serverFieldErrors.author = "작성자를 입력해주세요.";
        }
        if (errorMessage.includes("Category")) {
          serverFieldErrors.category = "카테고리를 선택해주세요.";
        }
      }

      if (Object.keys(serverFieldErrors).length > 0) {
        setFieldErrors(serverFieldErrors);
        return; // 필드 에러가 있으면 alert를 표시하지 않음
      }

      // 필드별 에러가 아닌 경우에만 alert 표시
      setAlert({
        type: "danger",
        message: errorMessage,
      });
    }
  };

  const updateEntity = async () => {
    if (!selectedItem) return;
    try {
      if (entityType === "user") {
        await userService.update(selectedItem.id, {
          username: formData.username ?? "",
          email: formData.email ?? "",
          role: ensureUserRole(formData.role),
          status: ensureUserStatus(formData.status),
        });
      } else {
        await postService.update(selectedItem.id, {
          title: formData.title ?? "",
          content: formData.content ?? "",
          author: formData.author ?? "",
          category: formData.category ?? "",
          status: ensurePostStatus(formData.status),
        });
      }
      await loadData();
      closeEditDialog();
      setAlert({
        type: "success",
        message: `${
          entityType === "user" ? "사용자가" : "게시글이"
        } 수정되었습니다.`,
      });
    } catch (error: any) {
      setAlert({
        type: "danger",
        message: error?.message ?? "수정에 실패했습니다.",
      });
    }
  };

  const deleteEntity = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }
      await loadData();
      setAlert({ type: "success", message: "삭제되었습니다." });
    } catch (error: any) {
      setAlert({
        type: "danger",
        message: error?.message ?? "삭제에 실패했습니다.",
      });
    }
  };

  const handlePostStatus = async (id: number, action: PostAction) => {
    if (entityType !== "post") return;
    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else {
        await postService.restore(id);
      }
      await loadData();
      const verb =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlert({ type: "success", message: `${verb}되었습니다.` });
    } catch (error: any) {
      setAlert({
        type: "danger",
        message: error?.message ?? "작업에 실패했습니다.",
      });
    }
  };

  return {
    entityType,
    setEntityType,
    data: paginatedData,
    columns,
    statsCards,
    formData,
    updateField,
    selectedItem,
    alert,
    dismissAlert: () => setAlert(null),
    createOpen,
    editOpen,
    openCreateDialog,
    openEditDialog,
    closeCreateDialog,
    closeEditDialog,
    createEntity,
    updateEntity,
    deleteEntity,
    handlePostStatus,
    loading,
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    pageSize,
    hasPagination,
    fieldErrors,
  };
};
