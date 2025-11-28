import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/atoms/Button';
import { FlexRow, FlexRowCenter, FlexCol } from '@/stories/utils';

const meta = {
  title: 'Atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const AllVariants = {
  render: () => (
    <FlexRow>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </FlexRow>
  ),
};

export const AllSizes = {
  render: () => (
    <FlexRowCenter>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </FlexRowCenter>
  ),
};

export const Disabled = {
  render: () => (
    <FlexRow>
      <Button disabled>Primary Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
      <Button variant="danger" disabled>Danger Disabled</Button>
    </FlexRow>
  ),
};

export const FullWidth = {
  render: () => (
    <FlexCol className="w-full max-w-md">
      <Button fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="danger" fullWidth>Full Width Danger</Button>
    </FlexCol>
  ),
};

export const WithIcon = {
  render: () => (
    <FlexRow>
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
        With Icon
      </Button>
      <Button variant="secondary">
        Save
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
      </Button>
    </FlexRow>
  ),
};

