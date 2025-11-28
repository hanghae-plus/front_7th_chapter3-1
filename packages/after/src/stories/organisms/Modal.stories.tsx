import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Modal } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { FlexRow } from '@/stories/utils';

type ModalStoryArgs = Omit<
  ComponentProps<typeof Modal>,
  'isOpen' | 'onClose'
>;

const ModalWrapper = (args: ModalStoryArgs) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const meta = {
  title: 'Organisms/Modal',
  component: ModalWrapper,
} satisfies Meta<typeof ModalWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    children: 'This is the modal content.',
  },
};

export const WithoutTitle: Story = {
  args: {
    children: 'This modal has no title.',
  },
};

export const AllSizes = {
  render: () => {
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <FlexRow className="mb-4">
          <Button onClick={() => { setSize('small'); setIsOpen(true); }}>Small</Button>
          <Button onClick={() => { setSize('medium'); setIsOpen(true); }}>Medium</Button>
          <Button onClick={() => { setSize('large'); setIsOpen(true); }}>Large</Button>
        </FlexRow>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
          size={size}
        >
          This is a {size} modal.
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Modal with Footer',
    showFooter: true,
    footerContent: (
      <FlexRow className="justify-end">
        <Button variant="secondary" onClick={() => {}}>Cancel</Button>
        <Button variant="primary" onClick={() => {}}>Confirm</Button>
      </FlexRow>
    ),
    children: 'This modal has a footer with action buttons.',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This modal contains a lot of content to demonstrate scrolling.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        ))}
      </div>
    ),
  },
};
