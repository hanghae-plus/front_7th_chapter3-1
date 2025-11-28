import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/composed/FormInput";
import { FormTextarea } from "@/components/composed/FormTextarea";
import { Button } from "@/components/ui/Button";
import { DialogClose, DialogFooter } from "@/components/ui/Dialog";
import FormSelect from "@/components/composed/FormSelect";

const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: "제목은 5자 이상이어야 합니다" })
    .max(100, { message: "제목은 100자 이하여야 합니다" }),
  content: z.string().min(10, { message: "내용은 10자 이상이어야 합니다" }),
  author: z.string().min(1, { message: "작성자를 입력해주세요" }),
  category: z.string().min(1, { message: "카테고리를 선택해주세요" }),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditDialogContentProps {
  type: "edit";
  onClose: () => void;
  onEdit: (data: PostFormData) => void;
  initialData?: Partial<PostFormData>;
}

interface PostCreateDialogContentProps {
  type: "create";
  onClose: () => void;
  onCreate: (data: PostFormData) => void;
}

const PostDialogContent = (props: PostEditDialogContentProps | PostCreateDialogContentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      author: "",
      category: "development",
    },
  });

  useEffect(() => {
    if (props.type === "edit") {
      const editProps = props as PostEditDialogContentProps;
      if (editProps.initialData) {
        reset({
          title: editProps.initialData.title ?? "",
          content: editProps.initialData.content ?? "",
          author: editProps.initialData.author ?? "",
          category: editProps.initialData.category ?? "development",
        });
      }
    } else {
      reset({
        title: "",
        content: "",
        author: "",
        category: "development",
      });
    }
  }, [props.type, props.type === "edit" ? (props as PostEditDialogContentProps).initialData : null, reset]);

  const onSubmit = (data: PostFormData) => {
    if (props.type === "edit") {
      props.onEdit(data);
    } else {
      props.onCreate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="제목"
              placeholder="게시글 제목을 입력하세요"
              required
              width="full"
              messageData={errors.title ? { type: "error", message: errors.title.message || "" } : undefined}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="작성자"
                placeholder="작성자명"
                required
                width="full"
                messageData={errors.author ? { type: "error", message: errors.author.message || "" } : undefined}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormSelect
                {...field}
                label="카테고리"
                selectOptions={[
                  { value: "development", label: "Development" },
                  { value: "design", label: "Design" },
                  { value: "accessibility", label: "Accessibility" },
                ]}
              />
            )}
          />
        </div>

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <FormTextarea
              {...field}
              label="내용"
              placeholder="게시글 내용을 입력하세요"
              required
              rows={6}
              width="full"
              messageData={errors.content ? { type: "error", message: errors.content.message || "" } : undefined}
            />
          )}
        />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary" size="md" onClick={props.onClose}>
            취소
          </Button>
        </DialogClose>

        {props.type === "edit" ? (
          <Button
            disabled={!!errors.title || !!errors.author || !!errors.content || !!errors.category}
            type="submit"
            variant="primary"
            size="md"
          >
            수정 완료
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="md">
            생성
          </Button>
        )}
      </DialogFooter>
    </form>
  );
};

export default PostDialogContent;
