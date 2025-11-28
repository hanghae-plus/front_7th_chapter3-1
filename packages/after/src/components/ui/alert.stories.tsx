import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'info', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>
        This is a default alert message. It provides important information to the user.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        This is a destructive alert. Use it to show error messages or critical information.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const Info: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an info alert. Use it to provide helpful information to users.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'info',
  },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        This is a success alert. Use it to confirm successful actions.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This is a warning alert. Use it to warn users about potential issues.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Alert variant="default">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is a destructive alert message.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>This is an info alert message.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>This is a success alert message.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is a warning alert message.</AlertDescription>
      </Alert>
    </div>
  ),
};

