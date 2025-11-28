import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import UserTable from "@/components/domain/user/UserTable";
import PostTable from "@/components/domain/post/PostTable";
import { useDialog } from "@/hooks/useDialog";
import UserDialogContent from "@/components/domain/user/UserDialogContent";
import PostDialogContent from "@/components/domain/post/PostDialogContent";
import StatsCard from "@/components/composed/StatsCard";

type EntityType = "user" | "post";
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const { openDialog, closeDialog } = useDialog();

  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
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

  // USER
  const handleCreateUser = () => {
    openDialog({
      title: "새 사용자 만들기",
      content: <UserDialogContent type="create" onClose={() => closeDialog()} onCreate={(data) => createUser(data)} />,
    });
  };

  const createUser = async (data: Omit<User, "id" | "createdAt">) => {
    try {
      await userService.create(data);
      await loadData();
      setAlertMessage("사용자가 생성되었습니다");
      setShowSuccessAlert(true);
      closeDialog();
    } catch (error: any) {
      setErrorMessage(error.message || "사용자 생성에 실패했습니다");
      setShowErrorAlert(true);
      closeDialog();
    }
  };

  const handleEditUser = (item: User) => {
    openDialog({
      title: "사용자 수정",
      content: (
        <UserDialogContent
          type="edit"
          onClose={() => closeDialog()}
          onEdit={(data) => handleUpdateUser(data, item.id)}
          initialData={item}
        />
      ),
    });
  };

  const handleUpdateUser = async (
    { username, email, role, status }: Partial<Omit<User, "id" | "createdAt">>,
    userId: number
  ) => {
    try {
      await userService.update(userId, {
        username,
        email,
        role,
        status,
      });
      await loadData();

      setAlertMessage(`사용자가 수정되었습니다`);
      setShowSuccessAlert(true);
      closeDialog();
    } catch (error: any) {
      setErrorMessage(error.message || "사용자 수정에 실패했습니다");
      setShowErrorAlert(true);
      closeDialog();
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
    console.log(data);

    try {
      await postService.create({
        ...data,
        status: "draft",
      });
      await loadData();
      setAlertMessage("게시글이 생성되었습니다");
      setShowSuccessAlert(true);
      closeDialog();
    } catch (error: any) {
      setErrorMessage(error.message || "게시글 생성에 실패했습니다");
      setShowErrorAlert(true);
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

      setAlertMessage("게시글이 수정되었습니다");
      setShowSuccessAlert(true);
      closeDialog();
    } catch (error: any) {
      setErrorMessage(error.message || "게시글 수정에 실패했습니다");
      setShowErrorAlert(true);
      closeDialog();
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
    <div style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#333",
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: "#666", fontSize: "14px" }}>사용자와 게시글을 관리하세요</p>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <div
            style={{
              marginBottom: "15px",
              borderBottom: "2px solid #ccc",
              paddingBottom: "5px",
            }}
          >
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
            <div style={{ marginBottom: "15px", textAlign: "right" }}>
              <Button variant="primary" size="md" onClick={entityType === "user" ? handleCreateUser : handleCreatePost}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert variant="success" title="성공" onClose={() => setShowSuccessAlert(false)}>
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert variant="error" title="오류" onClose={() => setShowErrorAlert(false)}>
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
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

            <div
              style={{
                border: "1px solid #ddd",
                background: "white",
                overflow: "auto",
              }}
            >
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
    </div>
  );
};
