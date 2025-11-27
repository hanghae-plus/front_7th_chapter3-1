import { OverviewCards } from "@/shared/ui";
import { useMemo } from "react";
import type { User } from "@/shared/api/userService";
import { getUserCountStats } from "../libs";
import { UserTable } from "@/features/user";

export function UserDashboard({ data }: { data: User[] }) {
  const overviewData = useMemo(() => {
    const stats = getUserCountStats(data);
    return [
      { label: "전체", value: stats.total, color: "blue" },
      { label: "활성", value: stats.active, color: "green" },
      { label: "비활성", value: stats.inactive, color: "yellow" },
      { label: "정지", value: stats.suspended, color: "red" },
      { label: "관리자", value: stats.roleAdmin, color: "gray" },
    ];
  }, [data]);

  return (
    <>
      <OverviewCards overviewData={overviewData} />
      <UserTable userList={data} onEdit={() => {}} onDelete={() => {}} />
    </>
  );
}
