import type { Meta, StoryObj } from '@storybook/react';
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from './native-select';
import { Label } from '../label';

const meta: Meta<typeof NativeSelect> = {
  title: 'Primitives/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <NativeSelect aria-label="Select option">
        <NativeSelectOption value="">Select an option</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
        <NativeSelectOption value="2">Option 2</NativeSelectOption>
        <NativeSelectOption value="3">Option 3</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-2 w-[200px]">
      <Label htmlFor="country">Country</Label>
      <NativeSelect id="country" aria-label="Select country">
        <NativeSelectOption value="">Select a country</NativeSelectOption>
        <NativeSelectOption value="kr">Korea</NativeSelectOption>
        <NativeSelectOption value="us">United States</NativeSelectOption>
        <NativeSelectOption value="jp">Japan</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const WithOptGroup: Story = {
  render: () => (
    <div className="w-[200px]">
      <NativeSelect aria-label="Select fruit">
        <NativeSelectOption value="">Select a fruit</NativeSelectOption>
        <NativeSelectOptGroup label="Citrus">
          <NativeSelectOption value="orange">Orange</NativeSelectOption>
          <NativeSelectOption value="lemon">Lemon</NativeSelectOption>
          <NativeSelectOption value="lime">Lime</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Berries">
          <NativeSelectOption value="strawberry">Strawberry</NativeSelectOption>
          <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="w-[200px]">
      <NativeSelect size="sm" aria-label="Select size">
        <NativeSelectOption value="">Small select</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
        <NativeSelectOption value="2">Option 2</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-[200px]">
      <NativeSelect variant="error" aria-label="Select with error">
        <NativeSelectOption value="">Select required</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
        <NativeSelectOption value="2">Option 2</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[200px]">
      <NativeSelect disabled aria-label="Disabled select">
        <NativeSelectOption value="">Disabled</NativeSelectOption>
        <NativeSelectOption value="1">Option 1</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 w-[200px]">
      <div className="grid gap-2">
        <Label>Default</Label>
        <NativeSelect aria-label="Default select">
          <NativeSelectOption value="">Select</NativeSelectOption>
          <NativeSelectOption value="1">Option 1</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="grid gap-2">
        <Label>Small</Label>
        <NativeSelect size="sm" aria-label="Small select">
          <NativeSelectOption value="">Select</NativeSelectOption>
          <NativeSelectOption value="1">Option 1</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="grid gap-2">
        <Label>Error</Label>
        <NativeSelect variant="error" aria-label="Error select">
          <NativeSelectOption value="">Select</NativeSelectOption>
          <NativeSelectOption value="1">Option 1</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="grid gap-2">
        <Label>Disabled</Label>
        <NativeSelect disabled aria-label="Disabled select">
          <NativeSelectOption value="">Select</NativeSelectOption>
          <NativeSelectOption value="1">Option 1</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  ),
};
