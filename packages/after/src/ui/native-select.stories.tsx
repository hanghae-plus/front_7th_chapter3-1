import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from './native-select';

const meta = {
	title: 'UI/NativeSelect',
	component: NativeSelect,
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
	},
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: () => (
		<NativeSelect defaultValue="">
			<NativeSelectOption value="" disabled>
				Select an option...
			</NativeSelectOption>
			<NativeSelectOption value="option1">Option 1</NativeSelectOption>
			<NativeSelectOption value="option2">Option 2</NativeSelectOption>
			<NativeSelectOption value="option3">Option 3</NativeSelectOption>
		</NativeSelect>
	),
};

export const SmallSize: Story = {
	args: {},
	render: () => (
		<NativeSelect size="sm" defaultValue="">
			<NativeSelectOption value="" disabled>
				Small select...
			</NativeSelectOption>
			<NativeSelectOption value="option1">Option 1</NativeSelectOption>
			<NativeSelectOption value="option2">Option 2</NativeSelectOption>
			<NativeSelectOption value="option3">Option 3</NativeSelectOption>
		</NativeSelect>
	),
};

export const MediumSize: Story = {
	args: {},
	render: () => (
		<NativeSelect size="md" defaultValue="">
			<NativeSelectOption value="" disabled>
				Medium select...
			</NativeSelectOption>
			<NativeSelectOption value="option1">Option 1</NativeSelectOption>
			<NativeSelectOption value="option2">Option 2</NativeSelectOption>
			<NativeSelectOption value="option3">Option 3</NativeSelectOption>
		</NativeSelect>
	),
};

export const LargeSize: Story = {
	args: {},
	render: () => (
		<NativeSelect size="lg" defaultValue="">
			<NativeSelectOption value="" disabled>
				Large select...
			</NativeSelectOption>
			<NativeSelectOption value="option1">Option 1</NativeSelectOption>
			<NativeSelectOption value="option2">Option 2</NativeSelectOption>
			<NativeSelectOption value="option3">Option 3</NativeSelectOption>
		</NativeSelect>
	),
};

export const Disabled: Story = {
	args: {},
	render: () => (
		<NativeSelect disabled defaultValue="option1">
			<NativeSelectOption value="option1">Cannot change</NativeSelectOption>
			<NativeSelectOption value="option2">Option 2</NativeSelectOption>
		</NativeSelect>
	),
};

export const WithOptGroups: Story = {
	args: {},
	render: () => (
		<div className="w-[300px]">
			<NativeSelect defaultValue="">
				<NativeSelectOption value="" disabled>
					Select a country
				</NativeSelectOption>
				<NativeSelectOptGroup label="North America">
					<NativeSelectOption value="us">United States</NativeSelectOption>
					<NativeSelectOption value="ca">Canada</NativeSelectOption>
					<NativeSelectOption value="mx">Mexico</NativeSelectOption>
				</NativeSelectOptGroup>
				<NativeSelectOptGroup label="Europe">
					<NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
					<NativeSelectOption value="fr">France</NativeSelectOption>
					<NativeSelectOption value="de">Germany</NativeSelectOption>
				</NativeSelectOptGroup>
				<NativeSelectOptGroup label="Asia">
					<NativeSelectOption value="jp">Japan</NativeSelectOption>
					<NativeSelectOption value="kr">South Korea</NativeSelectOption>
					<NativeSelectOption value="cn">China</NativeSelectOption>
				</NativeSelectOptGroup>
			</NativeSelect>
		</div>
	),
};

export const AllSizes: Story = {
	args: {},
	render: () => (
		<div className="space-y-4 w-[300px]">
			<div>
				<label className="block mb-2 text-sm font-medium">Small</label>
				<NativeSelect size="sm" defaultValue="option1">
					<NativeSelectOption value="option1">Small Option 1</NativeSelectOption>
					<NativeSelectOption value="option2">Small Option 2</NativeSelectOption>
				</NativeSelect>
			</div>
			<div>
				<label className="block mb-2 text-sm font-medium">Medium (Default)</label>
				<NativeSelect size="md" defaultValue="option1">
					<NativeSelectOption value="option1">Medium Option 1</NativeSelectOption>
					<NativeSelectOption value="option2">Medium Option 2</NativeSelectOption>
				</NativeSelect>
			</div>
			<div>
				<label className="block mb-2 text-sm font-medium">Large</label>
				<NativeSelect size="lg" defaultValue="option1">
					<NativeSelectOption value="option1">Large Option 1</NativeSelectOption>
					<NativeSelectOption value="option2">Large Option 2</NativeSelectOption>
				</NativeSelect>
			</div>
		</div>
	),
};
