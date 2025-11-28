import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Label text",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="input-example">Email Address</Label>
      <input
        id="input-example"
        type="email"
        className="w-full px-2 py-2 text-base border rounded-sm bg-white"
        placeholder="user@example.com"
      />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="required-input">
        Username <span className="text-red-500">*</span>
      </Label>
      <input
        id="required-input"
        type="text"
        className="w-full px-2 py-2 text-base border rounded-sm bg-white"
        placeholder="Enter username"
        required
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="group" data-disabled="true">
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <input
        id="disabled-input"
        type="text"
        className="w-full px-2 py-2 text-base border rounded-sm bg-white opacity-50"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="help-input">Password</Label>
      <input
        id="help-input"
        type="password"
        className="w-full px-2 py-2 text-base border rounded-sm bg-white"
        placeholder="Enter password"
      />
      <span className="text-sm text-gray-500">
        Must be at least 8 characters
      </span>
    </div>
  ),
};

export const MultipleFields: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="first-name">First Name</Label>
        <input
          id="first-name"
          type="text"
          className="w-full px-2 py-2 text-base border rounded-sm bg-white"
          placeholder="John"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="last-name">Last Name</Label>
        <input
          id="last-name"
          type="text"
          className="w-full px-2 py-2 text-base border rounded-sm bg-white"
          placeholder="Doe"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email-field">Email</Label>
        <input
          id="email-field"
          type="email"
          className="w-full px-2 py-2 text-base border rounded-sm bg-white"
          placeholder="john@example.com"
        />
      </div>
    </div>
  ),
};
