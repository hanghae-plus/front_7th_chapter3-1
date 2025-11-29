import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/organisms/Alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: '알림 타입',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message for the user.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your action has been completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please be careful with this action. It may have side effects.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred while processing your request. Please try again.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'Alert without a title, just the message content.',
  },
};

export const Closeable: Story = {
  args: {
    variant: 'warning',
    title: 'Dismissible Alert',
    children: 'You can close this alert by clicking the X button.',
    onClose: () => console.log('Alert closed'),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    children: 'This is a longer alert message that contains more detailed information. It demonstrates how the alert component handles multiple lines of text and maintains proper spacing and readability even with longer content.',
  },
};

export const MultiParagraph: Story = {
  args: {
    variant: 'success',
    title: 'Multiple Paragraphs',
    children: (
      <>
        <p>This alert contains multiple paragraphs of content.</p>
        <p>Each paragraph provides different information to the user.</p>
        <p>The spacing is maintained properly between paragraphs.</p>
      </>
    ),
  },
};
