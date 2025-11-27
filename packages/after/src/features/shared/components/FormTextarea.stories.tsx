import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormTextarea } from './FormTextarea';

const meta = {
	title: 'Shared/FormTextarea',
	component: FormTextarea,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
		required: {
			control: 'boolean',
			description: 'Required field',
		},
		rows: {
			control: 'number',
			description: 'Number of visible text rows',
		},
	},
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'default',
		placeholder: 'Enter your text here...',
	},
};

export const WithLabel: Story = {
	args: {
		name: 'with-label',
		label: 'Description',
		placeholder: 'Enter a description...',
	},
};

export const Required: Story = {
	args: {
		name: 'required',
		label: 'Message',
		placeholder: 'Enter your message',
		required: true,
	},
};

export const WithError: Story = {
	args: {
		name: 'with-error',
		label: 'Comments',
		placeholder: 'Enter your comments',
		error: 'This field must contain at least 10 characters',
	},
};

export const WithHelpText: Story = {
	args: {
		name: 'with-help',
		label: 'Bio',
		placeholder: 'Tell us about yourself',
		helpText: 'Please provide a brief description (max 500 characters)',
	},
};

export const Disabled: Story = {
	args: {
		name: 'disabled',
		label: 'Disabled Textarea',
		placeholder: 'Cannot edit',
		disabled: true,
		value: 'This content cannot be edited',
	},
};

export const CustomRows: Story = {
	args: {
		name: 'custom-rows',
		label: 'Large Text Area',
		placeholder: 'Enter a lot of text...',
		rows: 8,
	},
};

export const SmallRows: Story = {
	args: {
		name: 'small-rows',
		label: 'Small Text Area',
		placeholder: 'Brief comment',
		rows: 2,
	},
};

export const AllStates: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col gap-4 max-w-lg">
			<FormTextarea
				name="normal"
				label="Normal Textarea"
				placeholder="Enter text..."
				helpText="This is a normal textarea"
			/>
			<FormTextarea
				name="required"
				label="Required Textarea"
				placeholder="Required field"
				required
			/>
			<FormTextarea
				name="error"
				label="Textarea with Error"
				placeholder="Error state"
				error="This field is required and must be filled"
			/>
			<FormTextarea
				name="disabled"
				label="Disabled Textarea"
				placeholder="Disabled"
				disabled
				value="Cannot edit this content"
			/>
		</div>
	),
};

export const FormExample: Story = {
	args: {},
	render: () => (
		<div className="max-w-2xl">
			<h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
			<form className="space-y-4">
				<FormTextarea
					name="feedback"
					label="Your Feedback"
					placeholder="Tell us what you think..."
					required
					rows={6}
					helpText="Please provide detailed feedback to help us improve"
				/>
				<FormTextarea
					name="suggestions"
					label="Suggestions (Optional)"
					placeholder="Any suggestions for improvement?"
					rows={4}
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Submit Feedback
				</button>
			</form>
		</div>
	),
};

export const CharacterCount: Story = {
	args: {},
	render: () => {
		const [value, setValue] = useState('');
		const maxLength = 200;

		return (
			<div className="max-w-lg">
				<FormTextarea
					name="limited"
					label="Limited Text Area"
					placeholder="Type your message (max 200 characters)"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					maxLength={maxLength}
					helpText={`${value.length} / ${maxLength} characters`}
					rows={5}
				/>
			</div>
		);
	},
};
