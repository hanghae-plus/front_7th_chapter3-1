import { useState } from "react";
import { Button } from "../shared/ui";
import { PostDashboard } from "@/widgets/post-dashboard";
import { UserDashboard } from "@/widgets/user-dashboard";

type EntityType = "user" | "post";

export const ManagementPage = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");

  return (
    <div className="min-h-screen bg-gray-50 my-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">관리 시스템</h1>
          <p className="text-gray-500 text-sm">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-white border border-gray-300 p-4">
          <div className="border-b-1 border-gray-300 pb-4 flex gap-2">
            <Button
              variant={entityType === "post" ? "default" : "outline"}
              onClick={() => setEntityType("post")}
            >
              게시글
            </Button>
            <Button
              variant={entityType === "user" ? "default" : "outline"}
              onClick={() => setEntityType("user")}
            >
              사용자
            </Button>
          </div>

          <div className="flex gap-4 flex-col mt-4">
            {entityType === "post" ? <PostDashboard /> : <UserDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
};
