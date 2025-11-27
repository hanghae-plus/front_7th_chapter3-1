import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { useState } from "react";

type UserFormData = {
  username: string;
  email: string;
  role: string;
  status: string;
};

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export function CreateUserModal({
  onSubmit,
}: {
  onSubmit: (formData: UserFormData) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    role: "",
    status: "",
  });
  const isValidForm = formData.username && formData.email;

  const resetFormData = () => {
    setFormData({ username: "", email: "", role: "", status: "" });
  };

  const handleChange = (e: ChangeEvent) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      resetFormData();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 사용자 만들기</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, role: value }))
            }
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
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button type="submit" disabled={!isValidForm} onClick={handleSubmit}>
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
