import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormInput } from '@/components/molecules/FormInput';
import { FlexColGap4 } from '@/stories/utils';

type FormInputStoryArgs = Omit<
  ComponentProps<typeof FormInput>,
  'name' | 'value' | 'onChange'
> & {
  initialValue?: string;
};

const FormInputWrapper = (args: FormInputStoryArgs) => {
  const [value, setValue] = useState(args.initialValue ?? '');
  const { initialValue, ...rest } = args;

  return (
    <FormInput
      {...rest}
      name="test"
      value={value}
      onChange={setValue}
    />
  );
};

const meta = {
  title: 'Molecules/FormInput',
  component: FormInputWrapper,
} satisfies Meta<typeof FormInputWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'example@email.com',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: 'Please enter a valid email address',
    initialValue: 'invalid-email',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helpText: 'Must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    initialValue: 'Cannot edit',
  },
};

export const AllWidths = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    
    return (
      <FlexColGap4 className="w-full max-w-[600px]">
        <FormInput name="small" value={value1} onChange={setValue1} label="Small" width="small" />
        <FormInput name="medium" value={value2} onChange={setValue2} label="Medium" width="medium" />
        <FormInput name="large" value={value3} onChange={setValue3} label="Large" width="large" />
        <FormInput name="full" value={value4} onChange={setValue4} label="Full Width" width="full" />
      </FlexColGap4>
    );
  },
};
