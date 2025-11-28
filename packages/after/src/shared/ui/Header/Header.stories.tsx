import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta = {
  title: "UI/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  render: () => (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Page Content</h2>
        <p>This is the main content area below the header.</p>
      </div>
    </div>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Scroll to see sticky header</h2>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i} className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Paragraph {i + 1}.
          </p>
        ))}
      </div>
    </div>
  ),
};
