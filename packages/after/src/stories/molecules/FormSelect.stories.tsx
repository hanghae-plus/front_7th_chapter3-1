import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormSelect } from '@/components/molecules/FormSelect';

const SELECT_OPTIONS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

type FormSelectStoryArgs = Omit<
  ComponentProps<typeof FormSelect>,
  'name' | 'value' | 'onChange' | 'options'
> & {
  initialValue?: string;
};

const FormSelectWrapper = (args: FormSelectStoryArgs) => {
  const [value, setValue] = useState(args.initialValue ?? '');
  const { initialValue, ...rest } = args;

  return (
    <FormSelect
      {...rest}
      name="test"
      value={value}
      onChange={setValue}
      options={SELECT_OPTIONS}
    />
  );
};

const meta = {
  title: 'Molecules/FormSelect',
  component: FormSelectWrapper,
} satisfies Meta<typeof FormSelectWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option...',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Select',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Select',
    error: 'Please select an option',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Category',
    helpText: 'Select a category for your item',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    initialValue: 'option1',
  },
};
