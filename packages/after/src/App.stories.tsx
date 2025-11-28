import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./App";

const meta = {
  title: "Pages/App",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullApplication: Story = {
  render: () => <App />,
};
