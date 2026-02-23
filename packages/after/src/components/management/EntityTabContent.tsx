import * as React from "react";
import { InfoAlert } from "@/components/InfoAlert";
import { EntityStats } from "@/components/management/EntityStats";
import { EntityTable } from "@/components/management/EntityTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { StatCard, TableColumn, ManagementAlert } from "@/type/management";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

type Entity = User | Post;
type PostAction = "publish" | "archive" | "restore";

export type EntityTabContentProps = {
  entityType: "post" | "user";
  title: string;
  alert: ManagementAlert | null;
  dismissAlert: () => void;
  statsCards: StatCard[];
  loading: boolean;
  columns: TableColumn[];
  data: Entity[];
  onEdit: (item: Entity) => void;
  onDelete: (id: number) => void;
  onStatusAction: (id: number, action: PostAction) => void;
  currentPage: number;
  totalPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  hasPagination: boolean;
};

export const EntityTabContent: React.FC<EntityTabContentProps> = ({
  entityType,
  title,
  alert,
  dismissAlert,
  statsCards,
  loading,
  columns,
  data,
  onEdit,
  onDelete,
  onStatusAction,
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
  hasPagination,
}) => {
  return (
    <section className="space-y-4 rounded-tl-none rounded-tr-none rounded-bl-xl rounded-br-xl border bg-app-background p-4 shadow-sm">
      {alert && (
        <InfoAlert
          variant={alert.type as "success" | "danger"}
          title={alert.type === "success" ? "작업 완료" : "문제가 발생했어요"}
          description={alert.message}
          onClose={dismissAlert}
        />
      )}

      <EntityStats cards={statsCards} />

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-app-foreground">{title}</h2>
        {loading && (
          <span className="text-sm text-app-muted-foreground">로딩 중...</span>
        )}
      </div>
      <EntityTable
        entityType={entityType}
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusAction={onStatusAction}
      />
      {hasPagination && (
        <Pagination className="pt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPrevPage();
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                onClick={(e) => e.preventDefault()}
                className="w-20 justify-center"
              >
                {currentPage} / {totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToNextPage();
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

