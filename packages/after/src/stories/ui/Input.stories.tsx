import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@/components/ui/input';
import { FlexCol } from '@/stories/utils';

const meta = {
  title: 'UI/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const AllTypes = {
  render: () => (
    <FlexCol className="w-full max-w-sm">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </FlexCol>
  ),
};

export const WithValue: Story = {
  args: {
    value: 'Hello World',
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithLabel = {
  render: () => (
    <FlexCol className="w-full max-w-sm">
      <div>
        <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
          Name
        </label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div>
        <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
          Email
        </label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </FlexCol>
  ),
};

export const Sizes = {
  render: () => (
    <FlexCol className="w-full max-w-sm">
      <Input placeholder="Default size" />
      <Input placeholder="Small size" className="h-8 text-sm" />
      <Input placeholder="Large size" className="h-11 text-base" />
    </FlexCol>
  ),
};

