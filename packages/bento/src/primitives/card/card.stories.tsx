import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Project name" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Create</Button>
      </CardFooter>
    </Card>
  ),
};

export const Info: Story = {
  render: () => (
    <Card variant="info" className="w-[350px]">
      <CardHeader>
        <CardTitle>Information</CardTitle>
        <CardDescription>This is an informational card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Some helpful information goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const Success: Story = {
  render: () => (
    <Card variant="success" className="w-[350px]">
      <CardHeader>
        <CardTitle>Success!</CardTitle>
        <CardDescription>Your action was completed.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const Warning: Story = {
  render: () => (
    <Card variant="warning" className="w-[350px]">
      <CardHeader>
        <CardTitle>Warning</CardTitle>
        <CardDescription>Please review this before continuing.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const Error: Story = {
  render: () => (
    <Card variant="error" className="w-[350px]">
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>Something went wrong.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 w-[350px]">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
      </Card>
      <Card variant="info">
        <CardHeader>
          <CardTitle>Info</CardTitle>
        </CardHeader>
      </Card>
      <Card variant="success">
        <CardHeader>
          <CardTitle>Success</CardTitle>
        </CardHeader>
      </Card>
      <Card variant="warning">
        <CardHeader>
          <CardTitle>Warning</CardTitle>
        </CardHeader>
      </Card>
      <Card variant="error">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
      </Card>
    </div>
  ),
};
