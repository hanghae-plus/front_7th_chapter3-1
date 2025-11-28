import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Modal size",
    },
    showFooter: {
      control: "boolean",
      description: "Show footer",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Default Modal">
          <p>This is the modal content. Click outside or press the close button to close.</p>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="small">
          <p>This is a small modal with less width.</p>
        </Modal>
      </>
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Medium Modal" size="medium">
          <p>This is a medium-sized modal (default size).</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="large">
          <p>This is a large modal with more width for extensive content.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal with Footer"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>This modal includes a footer with action buttons.</p>
        </Modal>
      </>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal without Title</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Custom Title Inside Content</h2>
          <p>This modal doesn't have a title prop, so you can add custom content instead.</p>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Long Content</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Long Content Modal">
          <div>
            <p className="mb-4">
              This modal contains a lot of content to demonstrate the scrolling behavior. The modal body will become
              scrollable when the content exceeds the maximum height.
            </p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Paragraph {i + 1}.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const FormInModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${JSON.stringify(formData)}`);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="User Information"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-2 py-2 border rounded"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-2 py-2 border rounded"
                placeholder="Enter your email"
              />
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      alert("Confirmed!");
      setIsOpen(false);
    };

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          size="small"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirm}>
                Delete
              </Button>
            </>
          }
        >
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};
