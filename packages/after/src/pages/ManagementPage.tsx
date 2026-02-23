import * as React from "react";
import { Button } from "@/components/ui/button";
import { EntityTabContent } from "@/components/management/EntityTabContent";
import { ManagementFormDialog } from "@/components/management/ManagementFormDialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useManagementPage } from "@/hooks/useManagementPage";

export const ManagementPage: React.FC = () => {
  const management = useManagementPage();

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-app-foreground">
                관리 시스템
              </h2>
              <p className="mt-2 text-sm font-medium text-app-muted-foreground">
                사용자와 게시글을 관리하세요
              </p>
            </div>
            <Button onClick={management.openCreateDialog}>새로 만들기</Button>
          </div>
        </div>

        <Tabs
          value={management.entityType}
          onValueChange={(value) =>
            management.setEntityType(value as "post" | "user")
          }
          className="mt-6"
        >
          <TabsList>
            <TabsTrigger value="post">게시글</TabsTrigger>
            <TabsTrigger value="user">사용자</TabsTrigger>
          </TabsList>

          <TabsContent value="post">
            <EntityTabContent
              entityType="post"
              title="게시글 목록"
              alert={management.alert}
              dismissAlert={management.dismissAlert}
              statsCards={management.statsCards}
              loading={management.loading}
              columns={management.columns}
              data={management.data}
              onEdit={management.openEditDialog}
              onDelete={management.deleteEntity}
              onStatusAction={management.handlePostStatus}
              currentPage={management.currentPage}
              totalPages={management.totalPages}
              goToPrevPage={management.goToPrevPage}
              goToNextPage={management.goToNextPage}
              hasPagination={management.hasPagination}
            />
          </TabsContent>

          <TabsContent value="user">
            <EntityTabContent
              entityType="user"
              title="사용자 목록"
              alert={management.alert}
              dismissAlert={management.dismissAlert}
              statsCards={management.statsCards}
              loading={management.loading}
              columns={management.columns}
              data={management.data}
              onEdit={management.openEditDialog}
              onDelete={management.deleteEntity}
              onStatusAction={management.handlePostStatus}
              currentPage={management.currentPage}
              totalPages={management.totalPages}
              goToPrevPage={management.goToPrevPage}
              goToNextPage={management.goToNextPage}
              hasPagination={management.hasPagination}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ManagementFormDialog
        mode="create"
        entityType={management.entityType}
        open={management.createOpen}
        onClose={management.closeCreateDialog}
        onSubmit={management.createEntity}
        formData={management.formData}
        updateField={management.updateField}
        fieldErrors={management.fieldErrors}
      />

      <ManagementFormDialog
        mode="edit"
        entityType={management.entityType}
        open={management.editOpen}
        onClose={management.closeEditDialog}
        onSubmit={management.updateEntity}
        formData={management.formData}
        updateField={management.updateField}
        selectedItem={management.selectedItem}
      />
    </div>
  );
};
