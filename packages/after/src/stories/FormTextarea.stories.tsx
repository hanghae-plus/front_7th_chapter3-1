import type { Meta, StoryObj } from "@storybook/react";
import { FormTextarea } from "@/components/composed/FormTextarea";

const meta = {
  title: "Composed/FormTextarea",
  component: FormTextarea,
  tags: ["autodocs"],
  args: {
    name: "description",
    label: "Description",
    placeholder: "Enter a detailed description",
    required: false,
    disabled: false,
    rows: 4,
    width: "full",
  },
  argTypes: {
    width: {
      control: "select",
      options: ["small", "medium", "large", "full"],
    },
    messageData: {
      control: "object",
    },
  },
} satisfies Meta<typeof FormTextarea>;

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
      message: "Please fill out this field.",
    },
  },
};

export const SuccessMessage: Story = {
  args: {
    messageData: {
      type: "success",
      message: "Nice description!",
    },
  },
};
