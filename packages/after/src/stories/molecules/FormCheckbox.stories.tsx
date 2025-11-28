import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormCheckbox } from '@/components/molecules/FormCheckbox';

type FormCheckboxStoryArgs = Omit<
  ComponentProps<typeof FormCheckbox>,
  'name' | 'checked' | 'onChange'
> & {
  initialChecked?: boolean;
};

const FormCheckboxWrapper = (args: FormCheckboxStoryArgs) => {
  const [checked, setChecked] = useState(args.initialChecked ?? false);
  const { initialChecked, ...rest } = args;

  return (
    <FormCheckbox
      {...rest}
      name="test"
      checked={checked}
      onChange={setChecked}
    />
  );
};

const meta = {
  title: 'Molecules/FormCheckbox',
  component: FormCheckboxWrapper,
} satisfies Meta<typeof FormCheckboxWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    initialChecked: true,
  },
};

export const WithHint: Story = {
  args: {
    label: 'Enable notifications',
    hint: 'You will receive email notifications',
  },
};

export const WithError: Story = {
  args: {
    label: 'Required checkbox',
    error: 'You must accept this to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
    initialChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    initialChecked: true,
  },
};
