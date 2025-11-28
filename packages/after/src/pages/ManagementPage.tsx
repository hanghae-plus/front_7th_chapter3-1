import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import Alert from "@/components/ui/Alert";
import { postService } from "@/services/postService";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import UserTable from "@/components/domain/user/UserTable";
import PostTable from "@/components/domain/post/PostTable";
import { useDialog } from "@/hooks/useDialog";
import PostDialogContent from "@/components/domain/post/PostDialogContent";
import StatsCard from "@/components/composed/StatsCard";
import useUserTableData from "@/hooks/useUserTableData";

type EntityType = "user" | "post";
type Entity = User | Post;

interface ManagementPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ManagementPage: React.FC<ManagementPageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const { openDialog, closeDialog } = useDialog();

  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);

  const [alertState, setAlertState] = useState<{
    show: boolean;
    message: string;
    variant: "success" | "error";
  }>({
    show: false,
    message: "",
    variant: "success",
  });

  const { userData, getUserTableData, deleteUserTableData, handleCreateUser, handleEditUser } = useUserTableData({
    setAlertState,
  });

  useEffect(() => {
    loadData();
  }, [entityType]);

  useEffect(() => {
    if (entityType === "user") {
      setData(userData);
    }
  }, [userData, entityType]);

  const loadData = async () => {
    try {
      if (entityType === "user") {
        await getUserTableData();
      } else {
        const result = await postService.getAll();
        setData(result);
      }
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "데이터를 불러오는데 실패했습니다", variant: "error" });
    }
  };

  // POST
  const handleCreatePost = () => {
    openDialog({
      title: "게시글 생성",
      content: <PostDialogContent type="create" onClose={() => closeDialog()} onCreate={createPost} />,
    });
  };

  const createPost = async (data: { title: string; content: string; author: string; category: string }) => {
    try {
      await postService.create({
        ...data,
        status: "draft",
      });
      await loadData();
      setAlertState({ show: true, message: "게시글이 생성되었습니다", variant: "success" });
      closeDialog();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "게시글 생성에 실패했습니다", variant: "error" });
      closeDialog();
    }
  };

  const handleEditPost = (item: Post) => {
    openDialog({
      title: "게시글 수정",
      content: (
        <PostDialogContent
          type="edit"
          onClose={() => closeDialog()}
          onEdit={(data) => handleUpdatePost(data, item.id)}
          initialData={item}
        />
      ),
    });
  };

  const handleUpdatePost = async (
    data: {
      title: string;
      content: string;
      author: string;
      category: string;
    },
    postId: number
  ) => {
    if (!postId) return;
    try {
      await postService.update(postId, data);
      await loadData();

      setAlertState({ show: true, message: "게시글이 수정되었습니다", variant: "success" });
      closeDialog();
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "게시글 수정에 실패했습니다", variant: "error" });
      closeDialog();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await deleteUserTableData(id);
      } else {
        await postService.delete(id);
        await loadData();
      }

      setAlertState({ show: true, message: "삭제되었습니다", variant: "success" });
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "삭제에 실패했습니다", variant: "error" });
    }
  };

  const handleStatusAction = async (id: number, action: "publish" | "archive" | "restore") => {
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
      const message = action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertState({ show: true, message: `${message}되었습니다`, variant: "success" });
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "작업에 실패했습니다", variant: "error" });
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
        },
        stat2: {
          label: "비활성",
          value: users.filter((u) => u.status === "inactive").length,
        },
        stat3: {
          label: "정지",
          value: users.filter((u) => u.status === "suspended").length,
        },
        stat4: {
          label: "관리자",
          value: users.filter((u) => u.role === "admin").length,
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: "게시됨",
          value: posts.filter((p) => p.status === "published").length,
        },
        stat2: {
          label: "임시저장",
          value: posts.filter((p) => p.status === "draft").length,
        },
        stat3: {
          label: "보관됨",
          value: posts.filter((p) => p.status === "archived").length,
        },
        stat4: {
          label: "총 조회수",
          value: posts.reduce((sum, p) => sum + p.views, 0),
        },
      };
    }
  };

  const stats = getStats();

  return (
    <div className="mx-auto max-w-5xl px-5 py-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="mb-1 text-2xl font-bold">관리 시스템</h1>
          <p className="text-sm text-foreground/70">사용자와 게시글을 관리하세요</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? "라이트 모드" : "다크 모드"}
        </Button>
      </div>

      <div className="rounded-md border border-border bg-card p-3">
        <div className="mb-4 border-b-2 border-border pb-2 flex gap-2">
          <Button
            onClick={() => setEntityType("post")}
            variant={entityType === "post" ? "primary" : "secondary"}
            size="lg"
          >
            게시글
          </Button>
          <Button
            onClick={() => setEntityType("user")}
            variant={entityType === "user" ? "primary" : "secondary"}
            size="lg"
          >
            사용자
          </Button>
        </div>

        <div>
          <div className="mb-4 text-right">
            <Button variant="primary" size="md" onClick={entityType === "user" ? handleCreateUser : handleCreatePost}>
              새로 만들기
            </Button>
          </div>

          {alertState.show && (
            <Alert
              variant={alertState.variant}
              title={alertState.variant === "success" ? "성공" : "오류"}
              onClose={() => setAlertState({ show: false, message: "", variant: "success" })}
            >
              {alertState.message}
            </Alert>
          )}

          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
            <StatsCard variant="bordered" title="전체" subtitle={stats.total.toString()} color="primary" />
            <StatsCard
              variant="bordered"
              title={stats.stat1.label}
              subtitle={stats.stat1.value.toString()}
              color="green"
            />
            <StatsCard
              variant="bordered"
              title={stats.stat2.label}
              subtitle={stats.stat2.value.toString()}
              color="orange"
            />
            <StatsCard
              variant="bordered"
              title={stats.stat3.label}
              subtitle={stats.stat3.value.toString()}
              color="red"
            />
            <StatsCard
              variant="bordered"
              title={stats.stat4.label}
              subtitle={stats.stat4.value.toString()}
              color="neutral"
            />
          </div>

          <div className="overflow-auto rounded-md border border-border bg-card">
            {entityType === "user" && (
              <UserTable data={data as User[]} onEdit={handleEditUser} onDelete={handleDelete} />
            )}
            {entityType === "post" && (
              <PostTable
                data={data as Post[]}
                onEdit={handleEditPost}
                onDelete={handleDelete}
                onArchive={(id) => handleStatusAction(id, "archive")}
                onPublish={(id) => handleStatusAction(id, "publish")}
                onRestore={(id) => handleStatusAction(id, "restore")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
