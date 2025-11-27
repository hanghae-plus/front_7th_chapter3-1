import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared/ui";
import type { PostFormData } from "@/features/post/types";

type PostFormProps = {
  formData: PostFormData;
  onChange: (key: keyof PostFormData, value: string) => void;
  onSubmit: (formData: PostFormData) => void;
};

export function PostForm({ formData, onChange, onSubmit }: PostFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.name as keyof PostFormData, e.target.value);
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
        제목
      </Label>
      <Input name="title" value={formData.title} onChange={handleChange} />
      <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
        작성자
      </Label>
      <Input name="author" value={formData.author} onChange={handleChange} />
      <Label className="after:content-['*'] after:block after:text-red-500 after:-ml-1">
        카테고리
      </Label>
      <Select
        name="category"
        value={formData.category}
        onValueChange={(value) => onChange("category", value)}
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
  );
}
