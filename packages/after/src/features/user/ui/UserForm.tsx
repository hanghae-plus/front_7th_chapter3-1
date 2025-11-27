import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import type { UserFormData } from "@/features/user/types";

type UserFormProps = {
  formData: UserFormData;
  onChange: (key: keyof UserFormData, value: string) => void;
  onSubmit: (formData: UserFormData) => void;
};

export function UserForm({ formData, onChange, onSubmit }: UserFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name as keyof UserFormData, e.target.value);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
        사용자명
      </Label>
      <Input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
        이메일
      </Label>
      <Input name="email" value={formData.email} onChange={handleChange} />
      <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
        역할
      </Label>
      <Select
        name="role"
        value={formData.role}
        onValueChange={(value) => onChange("role", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="역할" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">사용자</SelectItem>
          <SelectItem value="moderator">운영자</SelectItem>
          <SelectItem value="admin">관리자</SelectItem>
        </SelectContent>
      </Select>
      <Label>상태</Label>
      <Select
        name="status"
        value={formData.status}
        onValueChange={(value) => onChange("status", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="상태" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">활성</SelectItem>
          <SelectItem value="inactive">비활성</SelectItem>
          <SelectItem value="suspended">정지</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
}
