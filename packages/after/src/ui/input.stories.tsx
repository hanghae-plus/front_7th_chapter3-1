import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'select',
			options: ['small', 'medium', 'large', 'full'],
			description: 'Input width',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
		required: {
			control: 'boolean',
			description: 'Required field',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'default',
		placeholder: 'Enter text...',
	},
};

export const WithLabel: Story = {
	args: {
		name: 'with-label',
		label: 'Username',
		placeholder: 'Enter your username',
	},
};

export const Required: Story = {
	args: {
		name: 'required',
		label: 'Email',
		placeholder: 'Enter your email',
		required: true,
	},
};

export const WithError: Story = {
	args: {
		name: 'with-error',
		label: 'Password',
		placeholder: 'Enter your password',
		error: 'Password must be at least 8 characters',
	},
};

export const WithHelpText: Story = {
	args: {
		name: 'with-help',
		label: 'Full Name',
		placeholder: 'John Doe',
		helpText: 'Please enter your full legal name',
	},
};

export const Disabled: Story = {
	args: {
		name: 'disabled',
		label: 'Disabled Input',
		placeholder: 'Cannot edit',
		disabled: true,
		value: 'Disabled value',
	},
};

export const SmallWidth: Story = {
	args: {
		name: 'small',
		label: 'Small Width',
		placeholder: 'Small',
		width: 'small',
	},
};

export const MediumWidth: Story = {
	args: {
		name: 'medium',
		label: 'Medium Width',
		placeholder: 'Medium',
		width: 'medium',
	},
};

export const LargeWidth: Story = {
	args: {
		name: 'large',
		label: 'Large Width',
		placeholder: 'Large',
		width: 'large',
	},
};

export const FullWidth: Story = {
	args: {
		name: 'full',
		label: 'Full Width',
		placeholder: 'Full width input',
		width: 'full',
	},
};

export const AllStates: Story = {
	render: () => (
		<div className="flex flex-col gap-4 max-w-lg">
			<Input name="normal" label="Normal Input" placeholder="Enter text..." />
			<Input name="required" label="Required Input" placeholder="Required" required />
			<Input
				name="error"
				label="Input with Error"
				placeholder="Error state"
				error="This field has an error"
			/>
			<Input
				name="help"
				label="Input with Help Text"
				placeholder="With help"
				helpText="This is a helpful message"
			/>
			<Input
				name="disabled"
				label="Disabled Input"
				placeholder="Disabled"
				disabled
				value="Cannot edit"
			/>
		</div>
	),
};
