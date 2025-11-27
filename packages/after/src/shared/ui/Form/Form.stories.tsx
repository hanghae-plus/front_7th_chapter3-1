import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "./Form";
import { Input } from "../Input";
import { Button } from "../Button";

const meta = {
  title: "Shared/Form",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="w-[400px] space-y-4"
        >
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input type="email" placeholder="email@example.com" />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </FormControl>
          </FormItem>
          <Button type="submit" className="w-full">
            제출
          </Button>
        </form>
      </Form>
    );
  },
};
