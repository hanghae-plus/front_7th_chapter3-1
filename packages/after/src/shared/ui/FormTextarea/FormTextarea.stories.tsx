import type { Meta, StoryObj } from "@storybook/react";
import { FormTextarea } from "./FormTextarea";
import { useState } from "react";

const meta = {
  title: "UI/FormTextarea",
  component: FormTextarea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Textarea size",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    rows: {
      control: "number",
      description: "Number of rows",
    },
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormTextareaWrapper = (args: React.ComponentProps<typeof FormTextarea>) => {
  const [value, setValue] = useState(args.value || "");
  return <FormTextarea {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    placeholder: "Enter your description...",
  },
};

export const WithValue: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    value: "This is a pre-filled description text that shows how the textarea looks with content.",
  },
};

export const Required: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    required: true,
    placeholder: "This field is required",
  },
};

export const WithError: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    error: "Description is required",
    value: "",
  },
};

export const WithHelpText: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    helpText: "Provide a detailed description (maximum 500 characters)",
  },
};

export const Disabled: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Description",
    value: "This textarea is disabled and cannot be edited.",
    disabled: true,
  },
};

export const SmallSize: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Small Textarea",
    size: "sm",
    placeholder: "Small size textarea",
  },
};

export const MediumSize: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Medium Textarea",
    size: "md",
    placeholder: "Medium size textarea",
  },
};

export const LargeSize: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Large Textarea",
    size: "lg",
    placeholder: "Large size textarea",
  },
};

export const CustomRows: Story = {
  render: (args) => <FormTextareaWrapper {...args} />,
  args: {
    name: "description",
    label: "Custom Rows",
    rows: 8,
    placeholder: "This textarea has 8 rows",
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      summary: "",
      description: "",
      notes: "",
    });

    const [errors, setErrors] = useState({
      summary: "",
      description: "",
    });

    return (
      <div className="max-w-2xl">
        <FormTextarea
          name="summary"
          label="Summary"
          value={formData.summary}
          onChange={(value) => {
            setFormData({ ...formData, summary: value });
            if (value) setErrors({ ...errors, summary: "" });
          }}
          error={errors.summary}
          required
          rows={2}
          placeholder="Brief summary (1-2 sentences)"
        />
        <FormTextarea
          name="description"
          label="Detailed Description"
          value={formData.description}
          onChange={(value) => {
            setFormData({ ...formData, description: value });
            if (value) setErrors({ ...errors, description: "" });
          }}
          error={errors.description}
          required
          rows={6}
          placeholder="Provide a detailed description..."
          helpText="Be as detailed as possible"
        />
        <FormTextarea
          name="notes"
          label="Additional Notes"
          value={formData.notes}
          onChange={(value) => setFormData({ ...formData, notes: value })}
          rows={4}
          placeholder="Any additional notes (optional)"
          helpText="Optional field"
        />
      </div>
    );
  },
};

export const CharacterCounter: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxLength = 200;

    return (
      <div className="max-w-2xl">
        <FormTextarea
          name="bio"
          label="Bio"
          value={value}
          onChange={setValue}
          placeholder="Tell us about yourself..."
          helpText={`${value.length}/${maxLength} characters`}
          rows={5}
        />
      </div>
    );
  },
};
