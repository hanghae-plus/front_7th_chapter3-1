import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/organisms/Card';
import { Button } from '@/components/atoms/Button';
import { FlexColGap4, FlexRow } from '@/stories/utils';

const meta = {
  title: 'Organisms/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Card content goes here.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title.',
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    children: 'This card has both title and subtitle.',
  },
};

export const AllVariants = {
  render: () => (
    <FlexColGap4 className="w-[400px]">
      <Card variant="default" title="Default Card">
        This is a default card with shadow.
      </Card>
      <Card variant="bordered" title="Bordered Card">
        This is a bordered card.
      </Card>
      <Card variant="elevated" title="Elevated Card">
        This is an elevated card with more shadow.
      </Card>
      <Card variant="flat" title="Flat Card">
        This is a flat card with background color.
      </Card>
    </FlexColGap4>
  ),
};

export const WithHeaderActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'Actions in header',
    headerActions: (
      <FlexRow>
        <Button size="sm" variant="secondary">Edit</Button>
        <Button size="sm" variant="danger">Delete</Button>
      </FlexRow>
    ),
    children: 'This card has action buttons in the header.',
  },
};

export const FullExample: Story = {
  args: {
    title: 'Complete Card Example',
    subtitle: 'With all features',
    variant: 'elevated',
    headerActions: <Button size="sm">Action</Button>,
    children: (
      <div>
        <p>This is a complete card example with:</p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Title and subtitle</li>
          <li>Header actions</li>
          <li>Body content</li>
        </ul>
      </div>
    ),
  },
};

