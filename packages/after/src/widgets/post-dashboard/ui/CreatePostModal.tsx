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
  Textarea,
} from "@/shared/ui";
import { useState } from "react";

type PostFormData = {
  title: string;
  author: string;
  category: string;
  content: string;
};

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export function CreatePostModal({
  onSubmit,
}: {
  onSubmit: (formData: PostFormData) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
  });
  const isValidForm = formData.title && formData.author && formData.category;

  const resetFormData = () => {
    setFormData({ title: "", author: "", category: "", content: "" });
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
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시글 만들기</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
            제목
          </Label>
          <Input name="title" value={formData.title} onChange={handleChange} />
          <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
            작성자
          </Label>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
            카테고리
          </Label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="accessibility">Accessibility</SelectItem>
            </SelectContent>
          </Select>
          <Label>내용</Label>
          <Textarea
            placeholder="게시글 내용을 입력하세요"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
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
