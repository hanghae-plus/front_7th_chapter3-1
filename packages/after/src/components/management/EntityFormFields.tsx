import type { EntityType, ManagementFormData } from "@/type/management";
import { InputField } from "../InputField";
import { SelectFieldRow } from "./SelectFieldRow";
import {
  CATEGORY_OPTIONS,
  POST_STATUSES,
  USER_ROLES,
  USER_STATUSES,
} from "@/constants/management";
import { Textarea } from "../ui/textarea";
import { LabelWithHelper } from "./LabelWithHelper";

interface EntityFormFieldProps {
  entityType: EntityType;
  formData: ManagementFormData;
  updateField: (name: keyof ManagementFormData, value: string) => void;
  fieldErrors?: Partial<Record<keyof ManagementFormData, string>>;
}

export const EntityFormFields = ({
  entityType,
  formData,
  updateField,
  fieldErrors = {},
}: EntityFormFieldProps) => {
  if (entityType === "user") {
    return (
      <div className="space-y-4">
        <InputField
          name="username"
          label="사용자명"
          placeholder="사용자명을 입력하세요"
          required
          value={formData.username ?? ""}
          onChange={(event) => updateField("username", event.target.value)}
          error={fieldErrors.username}
        />
        <InputField
          name="email"
          type="email"
          label="이메일"
          placeholder="user@example.com"
          required
          value={formData.email ?? ""}
          onChange={(event) => updateField("email", event.target.value)}
          error={fieldErrors.email}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectFieldRow
            id="user-role"
            name="role"
            label="역할"
            value={formData.role ?? USER_ROLES.user.value}
            onChange={(value) => updateField("role", value)}
            options={Object.values(USER_ROLES)}
          />
          <SelectFieldRow
            id="user-status"
            name="status"
            label="상태"
            value={formData.status ?? USER_STATUSES.active.value}
            onChange={(value) => updateField("status", value)}
            options={Object.values(USER_STATUSES)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <InputField
        name="title"
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
        value={formData.title ?? ""}
        onChange={(event) => updateField("title", event.target.value)}
        error={fieldErrors.title}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          name="author"
          label="작성자"
          placeholder="작성자명"
          required
          value={formData.author ?? ""}
          onChange={(event) => updateField("author", event.target.value)}
          error={fieldErrors.author}
        />
        <SelectFieldRow
          id="post-category"
          name="category"
          label="카테고리"
          placeholder="카테고리 선택"
          value={formData.category ?? ""}
          onChange={(value) => updateField("category", value)}
          options={CATEGORY_OPTIONS}
        />
      </div>
      <SelectFieldRow
        id="post-status"
        name="status"
        label="상태"
        value={formData.status ?? POST_STATUSES.draft.value}
        onChange={(value) => updateField("status", value)}
        options={Object.values(POST_STATUSES)}
      />
      <div className="space-y-1.5 text-left">
        <LabelWithHelper label="내용" helper="게시글 본문을 입력하세요." />
        <Textarea
          name="content"
          placeholder="게시글 내용을 입력하세요"
          value={formData.content ?? ""}
          onChange={(event) => updateField("content", event.target.value)}
          aria-invalid={Boolean(fieldErrors.content)}
          className={
            fieldErrors.content
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
              : ""
          }
        />
        {fieldErrors.content && (
          <p className="text-xs text-danger">{fieldErrors.content}</p>
        )}
      </div>
    </div>
  );
};
