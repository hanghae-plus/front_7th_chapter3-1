import type { Meta, StoryObj } from "@storybook/react";
import { ManagementPage } from "./ManagementPage";
import { ThemeProvider } from "../shared/contexts/ThemeContext";

const meta = {
  title: "Pages/ManagementPage",
  component: ManagementPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ManagementPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ManagementPage />,
};

export const WithHeader: Story = {
  render: () => {
    const { Header, ThemeToggle } = require("../shared/ui");
    return (
      <>
        <Header />
        <ManagementPage />
        <ThemeToggle />
      </>
    );
  },
};
