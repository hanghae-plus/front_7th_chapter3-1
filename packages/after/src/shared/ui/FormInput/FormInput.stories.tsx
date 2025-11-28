import type { Meta, StoryObj } from "@storybook/react";
import { FormInput } from "./FormInput";
import { useState } from "react";

const meta = {
  title: "UI/FormInput",
  component: FormInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "url"],
      description: "Input type",
    },
    width: {
      control: "select",
      options: ["small", "medium", "large", "full"],
      description: "Input width",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormInputWrapper = (args: React.ComponentProps<typeof FormInput>) => {
  const [value, setValue] = useState(args.value || "");
  return <FormInput {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "default",
    label: "Default Input",
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "with-value",
    label: "Input with Value",
    value: "Pre-filled value",
  },
};

export const Required: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "required",
    label: "Required Field",
    required: true,
    placeholder: "This field is required",
  },
};

export const WithError: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "error",
    label: "Input with Error",
    error: "This field is required",
    value: "",
  },
};

export const WithHelpText: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "help",
    label: "Input with Help Text",
    helpText: "Enter your full name as it appears on your ID",
  },
};

export const Disabled: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "disabled",
    label: "Disabled Input",
    value: "Cannot edit this",
    disabled: true,
  },
};

export const Email: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "user@example.com",
  },
};

export const Password: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

export const Number: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "number",
    type: "number",
    label: "Age",
    placeholder: "Enter your age",
  },
};

export const URL: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "url",
    type: "url",
    label: "Website",
    placeholder: "https://example.com",
  },
};

export const SmallWidth: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "small",
    label: "Small Width",
    width: "small",
    placeholder: "Small input",
  },
};

export const MediumWidth: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "medium",
    label: "Medium Width",
    width: "medium",
    placeholder: "Medium input",
  },
};

export const LargeWidth: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "large",
    label: "Large Width",
    width: "large",
    placeholder: "Large input",
  },
};

export const FullWidth: Story = {
  render: (args) => <FormInputWrapper {...args} />,
  args: {
    name: "full",
    label: "Full Width",
    width: "full",
    placeholder: "Full width input",
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      age: "",
      website: "",
    });

    const [errors, setErrors] = useState({
      name: "",
      email: "",
    });

    return (
      <div className="max-w-md">
        <FormInput
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={(value) => {
            setFormData({ ...formData, name: value });
            if (value) setErrors({ ...errors, name: "" });
          }}
          error={errors.name}
          required
          placeholder="John Doe"
        />
        <FormInput
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={(value) => {
            setFormData({ ...formData, email: value });
            if (value) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
          required
          placeholder="john@example.com"
        />
        <FormInput
          name="age"
          type="number"
          label="Age"
          value={formData.age}
          onChange={(value) => setFormData({ ...formData, age: value })}
          helpText="Must be 18 or older"
          placeholder="25"
        />
        <FormInput
          name="website"
          type="url"
          label="Personal Website"
          value={formData.website}
          onChange={(value) => setFormData({ ...formData, website: value })}
          helpText="Optional"
          placeholder="https://example.com"
        />
      </div>
    );
  },
};
