import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect } from './FormSelect';

const meta = {
	title: 'Shared/FormSelect',
	component: FormSelect,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Select size',
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
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

const countryOptions = [
	{ value: 'us', label: 'United States' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'fr', label: 'France' },
	{ value: 'de', label: 'Germany' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'kr', label: 'South Korea' },
];

export const Default: Story = {
	args: {
		name: 'default-select',
		options: sampleOptions,
		placeholder: 'Select an option...',
	},
};

export const WithLabel: Story = {
	args: {
		name: 'labeled-select',
		label: 'Choose Option',
		options: sampleOptions,
		placeholder: 'Select an option...',
	},
};

export const Required: Story = {
	args: {
		name: 'required-select',
		label: 'Required Select',
		options: sampleOptions,
		placeholder: 'Please select...',
		required: true,
	},
};

export const WithError: Story = {
	args: {
		name: 'error-select',
		label: 'Select with Error',
		options: sampleOptions,
		placeholder: 'Select an option...',
		error: 'This field is required',
	},
};

export const WithHelpText: Story = {
	args: {
		name: 'help-select',
		label: 'Select with Help',
		options: sampleOptions,
		placeholder: 'Select an option...',
		helpText: 'Choose the option that best fits your needs',
	},
};

export const Disabled: Story = {
	args: {
		name: 'disabled-select',
		label: 'Disabled Select',
		options: sampleOptions,
		placeholder: 'Cannot select',
		disabled: true,
	},
};

export const SmallSize: Story = {
	args: {
		name: 'small-select',
		label: 'Small Select',
		options: sampleOptions,
		size: 'sm',
	},
};

export const MediumSize: Story = {
	args: {
		name: 'medium-select',
		label: 'Medium Select',
		options: sampleOptions,
		size: 'md',
	},
};

export const LargeSize: Story = {
	args: {
		name: 'large-select',
		label: 'Large Select',
		options: sampleOptions,
		size: 'lg',
	},
};

export const ManyOptions: Story = {
	args: {
		name: 'country-select',
		label: 'Select Country',
		options: countryOptions,
		placeholder: 'Choose a country...',
	},
};

export const AllStates: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col gap-4 max-w-lg">
			<FormSelect
				name="normal"
				label="Normal Select"
				options={sampleOptions}
				placeholder="Select..."
				helpText="This is a normal select field"
			/>
			<FormSelect
				name="required"
				label="Required Select"
				options={sampleOptions}
				placeholder="Required field"
				required
			/>
			<FormSelect
				name="error"
				label="Select with Error"
				options={sampleOptions}
				placeholder="Error state"
				error="This field is required and must be selected"
			/>
			<FormSelect
				name="disabled"
				label="Disabled Select"
				options={sampleOptions}
				placeholder="Disabled"
				disabled
			/>
		</div>
	),
};

export const FormExample: Story = {
	args: {},
	render: () => (
		<div className="max-w-2xl">
			<h2 className="text-2xl font-bold mb-6">User Registration Form</h2>
			<form className="space-y-4">
				<FormSelect
					name="country"
					label="Country"
					options={countryOptions}
					placeholder="Select your country..."
					required
					helpText="Select the country where you currently reside"
				/>
				<FormSelect
					name="role"
					label="Role"
					options={[
						{ value: 'developer', label: 'Developer' },
						{ value: 'designer', label: 'Designer' },
						{ value: 'manager', label: 'Manager' },
						{ value: 'other', label: 'Other' },
					]}
					placeholder="Select your role..."
					required
				/>
				<FormSelect
					name="experience"
					label="Years of Experience"
					options={[
						{ value: '0-1', label: '0-1 years' },
						{ value: '1-3', label: '1-3 years' },
						{ value: '3-5', label: '3-5 years' },
						{ value: '5+', label: '5+ years' },
					]}
					placeholder="Select..."
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Submit
				</button>
			</form>
		</div>
	),
};

export const AllSizes: Story = {
	args: {},
	render: () => (
		<div className="space-y-4 max-w-lg">
			<FormSelect
				name="small"
				label="Small Size"
				options={sampleOptions}
				size="sm"
				placeholder="Small select..."
			/>
			<FormSelect
				name="medium"
				label="Medium Size (Default)"
				options={sampleOptions}
				size="md"
				placeholder="Medium select..."
			/>
			<FormSelect
				name="large"
				label="Large Size"
				options={sampleOptions}
				size="lg"
				placeholder="Large select..."
			/>
		</div>
	),
};
