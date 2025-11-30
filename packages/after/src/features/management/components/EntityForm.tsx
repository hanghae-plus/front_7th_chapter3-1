import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  postCategoryOptions,
  postStatusOptions,
  userRoleOptions,
  userStatusOptions,
} from "../constants";
import type { DialogMode } from "../types";

const userSchema = z.object({
  username: z.string().min(3, "사용자명은 3자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 형식을 입력하세요."),
  role: z.enum(["admin", "moderator", "user"]),
  status: z.enum(["active", "inactive", "suspended"]),
});

const postSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  author: z.string().min(2, "작성자를 입력하세요."),
  category: z.enum(["development", "design", "accessibility"]),
  status: z.enum(["draft", "published", "archived"]),
  content: z.string().min(0),
});

export type UserFormValues = z.infer<typeof userSchema>;
export type PostFormValues = z.infer<typeof postSchema>;

type EntityFormProps =
  | {
      entityType: "user";
      defaultValues: UserFormValues;
      onSubmit: (values: UserFormValues) => Promise<void>;
      onCancel: () => void;
      mode: DialogMode;
    }
  | {
      entityType: "post";
      defaultValues: PostFormValues;
      onSubmit: (values: PostFormValues) => Promise<void>;
      onCancel: () => void;
      mode: DialogMode;
    };

export const EntityForm = (props: EntityFormProps) => {
  if (props.entityType === "user") {
    return <UserForm {...props} />;
  }
  return <PostForm {...props} />;
};

type HiddenNativeSelectProps = {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  disabled?: boolean;
};

const HiddenNativeSelect = ({
  name,
  value,
  onChange,
  options,
  disabled,
}: HiddenNativeSelectProps) => (
  <select
    name={name}
    value={value ?? ""}
    onChange={(event) => onChange(event.target.value)}
    disabled={disabled}
    aria-hidden="true"
    tabIndex={-1}
    style={{
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: 0,
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
    }}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
const UserForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  mode,
}: Extract<EntityFormProps, { entityType: "user" }>) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const submit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용자명</FormLabel>
              <FormControl>
                <Input placeholder="사용자명을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="example@company.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>역할</FormLabel>
                <HiddenNativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={userRoleOptions}
                />
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userRoleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상태</FormLabel>
                <HiddenNativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={userStatusOptions}
                />
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {mode === "create" ? "생성" : "수정 완료"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const PostForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  mode,
}: Extract<EntityFormProps, { entityType: "post" }>) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const submit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="게시글 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>작성자</FormLabel>
                <FormControl>
                  <Input placeholder="작성자명을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <HiddenNativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={postCategoryOptions}
                />
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {postCategoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상태</FormLabel>
                <HiddenNativeSelect
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={postStatusOptions}
                />
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {postStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="게시글 내용을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {mode === "create" ? "생성" : "수정 완료"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

