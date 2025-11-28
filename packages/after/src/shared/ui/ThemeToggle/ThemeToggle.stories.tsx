import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>
        Theme Toggle Example
      </h1>
      <p className="mb-4" style={{ color: 'var(--color-text-body)' }}>
        Click the floating button at the bottom right to toggle between light and dark themes.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 rounded border" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)' }}>
          <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-heading)' }}>Card 1</h3>
          <p style={{ color: 'var(--color-text-body)' }}>This is some content in a card.</p>
        </div>
        <div className="p-4 rounded border" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)' }}>
          <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-heading)' }}>Card 2</h3>
          <p style={{ color: 'var(--color-text-body)' }}>This is some content in another card.</p>
        </div>
      </div>
      <ThemeToggle />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <header className="shadow-sm p-4" style={{ backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border-secondary)' }}>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-heading)' }}>
          Sample Application
        </h1>
      </header>
      <main className="p-8">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Introduction
          </h2>
          <p className="mb-4" style={{ color: 'var(--color-text-body)' }}>
            This is a sample page demonstrating the theme toggle functionality. The button in the bottom right corner
            allows you to switch between light and dark modes.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Features
          </h2>
          <ul className="list-disc pl-6" style={{ color: 'var(--color-text-body)' }}>
            <li>Smooth theme transitions</li>
            <li>Persistent theme preference</li>
            <li>Accessible button with proper ARIA labels</li>
            <li>Floating action button design</li>
          </ul>
        </section>
      </main>
      <ThemeToggle />
    </div>
  ),
};
