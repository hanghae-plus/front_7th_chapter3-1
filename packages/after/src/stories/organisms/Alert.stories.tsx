import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '@/components/organisms/Alert';
import { FlexCol } from '@/stories/utils';

const meta = {
  title: 'Organisms/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const AllVariants = {
  render: () => (
    <FlexCol className="w-[400px]">
      <Alert variant="info" title="Info">This is an info alert message.</Alert>
      <Alert variant="success" title="Success">This is a success alert message.</Alert>
      <Alert variant="warning" title="Warning">This is a warning alert message.</Alert>
      <Alert variant="error" title="Error">This is an error alert message.</Alert>
      <Alert variant="default" title="Default">This is a default alert message.</Alert>
    </FlexCol>
  ),
};

export const WithTitle: Story = {
  args: {
    title: 'Alert Title',
    children: 'This alert has a title and message body.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    showIcon: false,
    children: 'This alert does not show an icon.',
  },
};

export const Closable = {
  render: () => {
    const [show, setShow] = useState(true);
    if (!show) return <button onClick={() => setShow(true)}>Show Alert</button>;
    return (
      <Alert variant="info" onClose={() => setShow(false)}>
        This alert can be closed.
      </Alert>
    );
  },
};

