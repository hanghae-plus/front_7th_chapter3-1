import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import type { EntityType, ManagementFormData } from "@/type/management";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";
import { EntityFormFields } from "./EntityFormFields";

type Entity = User | Post;

interface ManagementFormDialogProps {
  mode: "create" | "edit";
  entityType: EntityType;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: ManagementFormData;
  updateField: (name: keyof ManagementFormData, value: string) => void;
  selectedItem?: Entity | null;
  fieldErrors?: Partial<Record<keyof ManagementFormData, string>>;
}

export const ManagementFormDialog: React.FC<ManagementFormDialogProps> = ({
  mode,
  entityType,
  open,
  onClose,
  onSubmit,
  formData,
  updateField,
  selectedItem,
  fieldErrors = {},
}) => {
  const isUserView = entityType === "user";
  const title =
    mode === "create"
      ? `새 ${isUserView ? "사용자" : "게시글"} 만들기`
      : `${isUserView ? "사용자" : "게시글"} 수정`;
  const description =
    mode === "create"
      ? isUserView
        ? "새로운 사용자를 등록합니다."
        : "새로운 게시글을 작성합니다."
      : "선택한 항목의 정보를 변경합니다.";

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {mode === "edit" && selectedItem && (
          <Alert variant="info" className="mb-4 text-sm">
            ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
            {entityType === "post" &&
              ` | 조회수: ${(selectedItem as Post).views}`}
          </Alert>
        )}

        <div className="space-y-4">
          <EntityFormFields
            entityType={entityType}
            formData={formData}
            updateField={updateField}
            fieldErrors={fieldErrors}
          />
        </div>

        <DialogFooter className="pt-2">
          <Button variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button onClick={onSubmit}>
            {mode === "create" ? "생성" : "수정 완료"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
