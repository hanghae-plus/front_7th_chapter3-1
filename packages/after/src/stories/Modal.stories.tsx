import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/organisms/Modal';
import { Button } from '../components/ui/button';
import { FormInput } from '../components/molecules/FormInput';
import { useState } from 'react';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '모달 크기',
    },
    showFooter: {
      control: 'boolean',
      description: 'Footer 표시 여부',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Small Modal",
    size: "small",
    children: <p>This is a small modal with minimal content.</p>,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};

export const Medium: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Medium Modal",
    size: "medium",
    children: (
      <>
        <p>This is a medium-sized modal with some content.</p>
        <p>It can contain multiple paragraphs and elements.</p>
      </>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};

export const Large: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Large Modal",
    size: "large",
    children: (
      <>
        <p>This is a large modal suitable for forms or detailed content.</p>
        <FormInput
          name="example"
          label="Example Field"
          placeholder="Enter something"
          value=""
          onChange={() => {}}
        />
      </>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Modal with Footer",
    size: "medium",
    showFooter: true,
    footerContent: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="default">Confirm</Button>
      </>
    ),
    children: <p>This modal has a footer with action buttons.</p>,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};

export const WithDescription: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Create New User",
    description: "Fill in the information below to create a new user account",
    size: "medium",
    showFooter: true,
    footerContent: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="default">Create</Button>
      </>
    ),
    children: (
      <div className="space-y-4">
        <FormInput
          name="username"
          label="Username"
          placeholder="Enter username"
          required
          value=""
          onChange={() => {}}
        />
        <FormInput
          name="email"
          label="Email"
          placeholder="user@example.com"
          required
          value=""
          onChange={() => {}}
        />
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};

export const FormModal: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "User Information",
    size: "large",
    showFooter: true,
    footerContent: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="default">Save</Button>
      </>
    ),
    children: (
      <div className="space-y-4">
        <FormInput
          name="name"
          label="Full Name"
          placeholder="John Doe"
          required
          value=""
          onChange={() => {}}
        />
        <FormInput
          name="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          value=""
          onChange={() => {}}
        />
        <FormInput
          name="phone"
          label="Phone Number"
          placeholder="+82 10-1234-5678"
          value=""
          onChange={() => {}}
        />
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};

export const ConfirmationModal: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: "Confirm Deletion",
    size: "small",
    showFooter: true,
    footerContent: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </>
    ),
    children: (
      <>
        <p>Are you sure you want to delete this item?</p>
        <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
      </>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};
