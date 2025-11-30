import { useEffect, useMemo, useState } from "react";

import {
  EntityDialog,
  EntityForm,
  EntityStats,
  EntityTable,
  InlineAlert,
  buildPostStats,
  buildStats,
  entityCopy,
  postDefaultValues,
  type DialogMode,
  type Entity,
  type EntityType,
  type PostFormValues,
  type StatusAction,
  type UserFormValues,
  userDefaultValues,
} from "@/features/management";
import { postService } from "@/services/postService";
import type { Post } from "@/services/postService";
import { userService } from "@/services/userService";
import type { User } from "@/services/userService";
import type { AlertVariant } from "@/features/management/types";

export const ManagementPage = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("create");
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [alert, setAlert] = useState<{ variant: AlertVariant; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEntities = async () => {
    setLoading(true);
    try {
      const result =
        entityType === "user"
          ? await userService.getAll()
          : await postService.getAll();
      setEntities(result);
    } catch (error) {
      console.error(error);
      setAlert({ variant: "error", message: "데이터를 불러오는데 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAlert(null);
    setDialogOpen(false);
    setSelectedEntity(null);
    void fetchEntities();
  }, [entityType]);

  const stats = useMemo(() => {
    if (entityType === "user") {
      return buildStats("user", entities as User[]);
    }
    return buildPostStats(entities as Post[]);
  }, [entityType, entities]);

  const openCreateDialog = () => {
    setDialogMode("create");
    setSelectedEntity(null);
    setDialogOpen(true);
  };

  const openEditDialog = (entity: Entity) => {
    setDialogMode("edit");
    setSelectedEntity(entity);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedEntity(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }
      await fetchEntities();
      setAlert({ variant: "success", message: "삭제되었습니다." });
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "삭제에 실패했습니다." });
    }
  };

  const handleStatusAction = async (id: number, action: StatusAction) => {
    if (entityType !== "post") return;
    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else {
        await postService.restore(id);
      }
      await fetchEntities();
      const actionLabel =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlert({ variant: "success", message: `${actionLabel}되었습니다.` });
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "작업에 실패했습니다." });
    }
  };

  const handleUserSubmit = async (values: UserFormValues) => {
    try {
      if (dialogMode === "create") {
        await userService.create(values);
        setAlert({ variant: "success", message: "사용자가 생성되었습니다." });
      } else if (selectedEntity) {
        await userService.update(selectedEntity.id, values);
        setAlert({ variant: "success", message: "사용자가 수정되었습니다." });
      }
      await fetchEntities();
      closeDialog();
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "저장에 실패했습니다." });
    }
  };

  const handlePostSubmit = async (values: PostFormValues) => {
    try {
      if (dialogMode === "create") {
        await postService.create(values);
        setAlert({ variant: "success", message: "게시글이 생성되었습니다." });
      } else if (selectedEntity) {
        await postService.update(selectedEntity.id, values);
        setAlert({ variant: "success", message: "게시글이 수정되었습니다." });
      }
      await fetchEntities();
      closeDialog();
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "저장에 실패했습니다." });
    }
  };

  const formDefaults = useMemo<UserFormValues | PostFormValues>(() => {
    if (entityType === "user") {
      if (selectedEntity && "username" in selectedEntity) {
        return {
          username: selectedEntity.username,
          email: selectedEntity.email,
          role: selectedEntity.role,
          status: selectedEntity.status,
        };
      }
      return { ...userDefaultValues } as UserFormValues;
    }

    if (selectedEntity && "title" in selectedEntity) {
      return {
        title: selectedEntity.title,
        author: selectedEntity.author,
        category: selectedEntity.category as PostFormValues["category"],
        status: selectedEntity.status as PostFormValues["status"],
        content: selectedEntity.content,
      };
    }
    return { ...postDefaultValues } as PostFormValues;
  }, [entityType, selectedEntity]);

  const entityLabel = entityCopy[entityType].label;

  return (
    <section className="min-h-screen bg-[color:var(--ds-color-neutral-100)] py-6">
      <div className="mx-auto w-full max-w-[1200px] space-y-5 px-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[color:var(--ds-color-text-primary)]">관리 시스템</h1>
          <p className="text-sm text-[color:var(--ds-color-text-muted)]">사용자와 게시글을 관리하세요</p>
        </div>

        {alert && (
          <InlineAlert variant={alert.variant} onClose={() => setAlert(null)}>
            {alert.message}
          </InlineAlert>
        )}

        <div className="rounded-lg border border-[color:var(--ds-color-neutral-200)] bg-[color:var(--ds-color-surface-base)] p-5 shadow-sm">
          <EntityStats
            className="border-b border-[color:var(--ds-color-neutral-200)] pb-4"
            title={`${entityLabel} 현황`}
            description={entityCopy[entityType].description}
            metrics={stats}
            entityType={entityType}
            onEntityChange={setEntityType}
          />

          <div className="mt-4">
            {loading ? (
              <div className="grid place-items-center rounded border border-dashed border-[color:var(--ds-color-neutral-200)] py-16 text-sm text-[color:var(--ds-color-text-muted)]">
                데이터를 불러오는 중입니다...
              </div>
            ) : (
              <EntityTable
                entityType={entityType}
                data={entities}
                onEdit={openEditDialog}
                onDelete={handleDelete}
                onStatusAction={handleStatusAction}
                onOpenCreateDialog={openCreateDialog}
              />
            )}
          </div>
        </div>
      </div>

      <EntityDialog
        open={dialogOpen}
        onClose={closeDialog}
        entityType={entityType}
        mode={dialogMode}
      >
        {entityType === "user" ? (
          <EntityForm
            entityType="user"
            mode={dialogMode}
            defaultValues={formDefaults as UserFormValues}
            onSubmit={handleUserSubmit}
            onCancel={closeDialog}
          />
        ) : (
          <EntityForm
            entityType="post"
            mode={dialogMode}
            defaultValues={formDefaults as PostFormValues}
            onSubmit={handlePostSubmit}
            onCancel={closeDialog}
          />
        )}
      </EntityDialog>
    </section>
  );
};
