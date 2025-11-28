import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import { useState } from "react";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "Alert variant",
    },
    title: {
      control: "text",
      description: "Alert title",
    },
    showIcon: {
      control: "boolean",
      description: "Show icon",
    },
    children: {
      control: "text",
      description: "Alert content",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Default Alert",
    children: "This is a default alert message.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "This is an informational alert message.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your operation was completed successfully!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please proceed with caution.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "An error occurred while processing your request.",
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "info",
    children: "This alert has no title, only a message.",
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "This alert has no icon.",
    showIcon: false,
  },
};

export const WithCloseButton: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Show Alert
        </button>
      );
    }

    return (
      <Alert
        variant="info"
        title="Closeable Alert"
        onClose={() => setVisible(false)}
      >
        Click the close button to dismiss this alert.
      </Alert>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-0">
      <Alert variant="default" title="Default">
        This is a default alert message.
      </Alert>
      <Alert variant="info" title="Information">
        This is an informational alert message.
      </Alert>
      <Alert variant="success" title="Success">
        Your operation was completed successfully!
      </Alert>
      <Alert variant="warning" title="Warning">
        Please proceed with caution.
      </Alert>
      <Alert variant="error" title="Error">
        An error occurred while processing your request.
      </Alert>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: "info",
    title: "Detailed Information",
    children:
      "This is a longer alert message that contains multiple sentences. It demonstrates how the alert component handles more extensive content. The alert should expand to accommodate all the text while maintaining its visual design and readability.",
  },
};
