import type { Meta, StoryObj } from "@storybook/react";
import { FormSelect } from "./FormSelect";
import { useState } from "react";

const meta = {
  title: "UI/FormSelect",
  component: FormSelect,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Select size",
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
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
];

const FormSelectWrapper = (args: React.ComponentProps<typeof FormSelect>) => {
  const [value, setValue] = useState(args.value || "");
  return <FormSelect {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Select Country",
    options: countries,
    placeholder: "Choose a country...",
  },
};

export const WithValue: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    value: "us",
  },
};

export const Required: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    required: true,
    placeholder: "This field is required",
  },
};

export const WithError: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    error: "Please select a country",
    value: "",
  },
};

export const WithHelpText: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    helpText: "Select your country of residence",
  },
};

export const Disabled: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    value: "us",
    disabled: true,
  },
};

export const SmallSize: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    size: "sm",
  },
};

export const MediumSize: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    size: "md",
  },
};

export const LargeSize: Story = {
  render: (args) => <FormSelectWrapper {...args} />,
  args: {
    name: "country",
    label: "Country",
    options: countries,
    size: "lg",
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: "",
      state: "",
      city: "",
    });

    const [errors, setErrors] = useState({
      country: "",
      state: "",
    });

    const states = [
      { value: "ny", label: "New York" },
      { value: "ca", label: "California" },
      { value: "tx", label: "Texas" },
      { value: "fl", label: "Florida" },
    ];

    const cities = [
      { value: "nyc", label: "New York City" },
      { value: "la", label: "Los Angeles" },
      { value: "chi", label: "Chicago" },
      { value: "hou", label: "Houston" },
    ];

    return (
      <div className="max-w-md">
        <FormSelect
          name="country"
          label="Country"
          options={countries}
          value={formData.country}
          onChange={(value) => {
            setFormData({ ...formData, country: value });
            if (value) setErrors({ ...errors, country: "" });
          }}
          error={errors.country}
          required
          placeholder="Select your country"
        />
        <FormSelect
          name="state"
          label="State/Province"
          options={states}
          value={formData.state}
          onChange={(value) => {
            setFormData({ ...formData, state: value });
            if (value) setErrors({ ...errors, state: "" });
          }}
          error={errors.state}
          required
          placeholder="Select your state"
        />
        <FormSelect
          name="city"
          label="City"
          options={cities}
          value={formData.city}
          onChange={(value) => setFormData({ ...formData, city: value })}
          helpText="Optional"
          placeholder="Select your city"
        />
      </div>
    );
  },
};
