import type { Meta, StoryObj } from "@storybook/react";
import FormSelect from "@/components/composed/FormSelect";

const meta = {
  title: "Composed/FormSelect",
  component: FormSelect,
  tags: ["autodocs"],
  args: {
    name: "status",
    label: "Status",
    required: false,
    disabled: false,
    selectOptions: [
      { value: "", label: "Select status" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
  },
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
