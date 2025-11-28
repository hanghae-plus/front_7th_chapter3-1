import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "@/components/composed/FormInput";

const meta = {
  title: "Composed/FormInput",
  component: FormInput,
  tags: ["autodocs"],
  args: {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: false,
    disabled: false,
    width: "full",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "url"],
    },
    width: {
      control: "select",
      options: ["small", "medium", "large", "full"],
    },
    messageData: {
      control: "object",
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const RequiredWithError: Story = {
  args: {
    required: true,
    messageData: {
      type: "error",
      message: "This field is required.",
    },
  },
};

export const SuccessMessage: Story = {
  args: {
    messageData: {
      type: "success",
      message: "Looks good!",
    },
  },
};
