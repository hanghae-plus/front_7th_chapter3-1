import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription, AlertIcon, AlertActions } from './alert';
import { Button } from '../button';
import { AlertCircle, CheckCircle, Info as InfoIcon, AlertTriangle, X } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
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
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>This is a default alert message.</AlertDescription>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info" className="w-[400px] flex gap-3">
      <AlertIcon>
        <InfoIcon />
      </AlertIcon>
      <div>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational alert message.</AlertDescription>
      </div>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-[400px] flex gap-3">
      <AlertIcon>
        <CheckCircle />
      </AlertIcon>
      <div>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your action was completed successfully.</AlertDescription>
      </div>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-[400px] flex gap-3">
      <AlertIcon>
        <AlertTriangle />
      </AlertIcon>
      <div>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please be aware of this important notice.</AlertDescription>
      </div>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert variant="error" className="w-[400px] flex gap-3">
      <AlertIcon>
        <AlertCircle />
      </AlertIcon>
      <div>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </div>
    </Alert>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert variant="warning" className="w-[400px] flex items-start gap-3">
      <AlertIcon className="mt-0.5">
        <AlertTriangle />
      </AlertIcon>
      <div className="flex-1">
        <AlertTitle>Confirm Action</AlertTitle>
        <AlertDescription>Are you sure you want to proceed?</AlertDescription>
      </div>
      <AlertActions>
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
        <Button size="sm">Confirm</Button>
      </AlertActions>
    </Alert>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4 w-[400px]">
      <Alert size="sm" variant="info">
        <AlertTitle>Small Alert</AlertTitle>
      </Alert>
      <Alert size="md" variant="info">
        <AlertTitle>Medium Alert</AlertTitle>
      </Alert>
      <Alert size="lg" variant="info">
        <AlertTitle>Large Alert</AlertTitle>
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 w-[400px]">
      <Alert variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default alert style</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Informational alert</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success alert</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning alert</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error alert</AlertDescription>
      </Alert>
    </div>
  ),
};
