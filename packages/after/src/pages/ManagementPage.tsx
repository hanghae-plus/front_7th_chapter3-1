import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../components/ui/Button";
import Alert from "@/components/ui/Alert";
import type { User } from "@/services/userService";
import type { Post } from "@/services/postService";
import UserTable from "@/components/domain/user/UserTable";
import PostTable from "@/components/domain/post/PostTable";
import StatsCard from "@/components/composed/StatsCard";
import useUserTableData from "@/hooks/useUserTableData";
import usePostTableData from "@/hooks/usePostTableData";

type EntityType = "user" | "post";

interface ManagementPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ManagementPage: React.FC<ManagementPageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [entityType, setEntityType] = useState<EntityType>("post");

  const [alertState, setAlertState] = useState<{
    show: boolean;
    message: string;
    variant: "success" | "error";
  }>({
    show: false,
    message: "",
    variant: "success",
  });

  const { userData, getUserTableData, handleCreateUser, handleEditUser, handleDeleteUser } = useUserTableData({
    setAlertState,
  });

  const { postData, getPostTableData, handleCreatePost, handleEditPost, handleDeletePost, handleStatusAction } =
    usePostTableData({
      setAlertState,
    });

  useEffect(() => {
    loadData();
  }, [entityType]);

  const loadData = async () => {
    try {
      if (entityType === "user") {
        await getUserTableData();
      } else {
        await getPostTableData();
      }
    } catch (error: any) {
      setAlertState({ show: true, message: error.message || "데이터를 불러오는데 실패했습니다", variant: "error" });
    }
  };

  const userStats = useMemo(
    () => [
      { label: "활성", value: userData.filter((u) => u.status === "active").length, color: "green" },
      { label: "비활성", value: userData.filter((u) => u.status === "inactive").length, color: "orange" },
      { label: "정지", value: userData.filter((u) => u.status === "suspended").length, color: "red" },
      { label: "관리자", value: userData.filter((u) => u.role === "admin").length, color: "neutral" },
    ],
    [userData]
  );

  const postStats = useMemo(
    () => [
      { label: "게시됨", value: postData.filter((p) => p.status === "published").length, color: "green" },
      { label: "임시저장", value: postData.filter((p) => p.status === "draft").length, color: "orange" },
      { label: "보관됨", value: postData.filter((p) => p.status === "archived").length, color: "red" },
      { label: "총 조회수", value: postData.reduce((sum, p) => sum + (p.views || 0), 0), color: "neutral" },
    ],
    [postData]
  );

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

        <div className="flex flex-col gap-4">
          <div className="text-right">
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

          {/* USER TABLE BOX */}
          {entityType === "user" && (
            <>
              <div className="mb-2 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
                {entityType === "user" &&
                  userStats.map((stat) => (
                    <StatsCard
                      key={stat.label}
                      variant="bordered"
                      title={stat.label}
                      subtitle={stat.value.toString()}
                      color={stat.color as "green" | "orange" | "red" | "neutral" | "primary"}
                    />
                  ))}
              </div>
              <div className="overflow-auto rounded-md border border-border bg-card">
                {entityType === "user" && (
                  <UserTable data={userData as User[]} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                )}
              </div>
            </>
          )}

          {/* POST TABLE BOX */}
          {entityType === "post" && (
            <>
              <div className="mb-2 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
                {postStats.map((stat) => (
                  <StatsCard
                    key={stat.label}
                    variant="bordered"
                    title={stat.label}
                    subtitle={stat.value.toString()}
                    color={stat.color as "green" | "orange" | "red" | "neutral" | "primary"}
                  />
                ))}
              </div>

              <div className="overflow-auto rounded-md border border-border bg-card">
                <PostTable
                  data={postData as Post[]}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onArchive={(id) => handleStatusAction(id, "archive")}
                  onPublish={(id) => handleStatusAction(id, "publish")}
                  onRestore={(id) => handleStatusAction(id, "restore")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
