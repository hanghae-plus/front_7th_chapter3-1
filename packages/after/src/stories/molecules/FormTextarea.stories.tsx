import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormTextarea } from '@/components/molecules/FormTextarea';

type FormTextareaStoryArgs = Omit<
  ComponentProps<typeof FormTextarea>,
  'name' | 'value' | 'onChange'
> & {
  initialValue?: string;
};

const FormTextareaWrapper = (args: FormTextareaStoryArgs) => {
  const [value, setValue] = useState(args.initialValue ?? '');
  const { initialValue, ...rest } = args;

  return (
    <FormTextarea
      {...rest}
      name="test"
      value={value}
      onChange={setValue}
    />
  );
};

const meta = {
  title: 'Molecules/FormTextarea',
  component: FormTextareaWrapper,
} satisfies Meta<typeof FormTextareaWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Textarea',
    required: true,
    placeholder: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Content',
    error: 'Content is required',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Notes',
    helpText: 'Add any additional notes here',
    placeholder: 'Enter notes...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    disabled: true,
    initialValue: 'Cannot edit this text',
  },
};
