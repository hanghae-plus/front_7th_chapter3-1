import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'danger', 'success'],
			description: 'Button variant style',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Button size',
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state',
		},
		fullWidth: {
			control: 'boolean',
			description: 'Full width button',
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Primary Button',
		variant: 'primary',
		size: 'md',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary Button',
		variant: 'secondary',
		size: 'md',
	},
};

export const Danger: Story = {
	args: {
		children: 'Danger Button',
		variant: 'danger',
		size: 'md',
	},
};

export const Success: Story = {
	args: {
		children: 'Success Button',
		variant: 'success',
		size: 'md',
	},
};

export const Small: Story = {
	args: {
		children: 'Small Button',
		variant: 'primary',
		size: 'sm',
	},
};

export const Medium: Story = {
	args: {
		children: 'Medium Button',
		variant: 'primary',
		size: 'md',
	},
};

export const Large: Story = {
	args: {
		children: 'Large Button',
		variant: 'primary',
		size: 'lg',
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled Button',
		variant: 'primary',
		size: 'md',
		disabled: true,
	},
};

export const FullWidth: Story = {
	args: {
		children: 'Full Width Button',
		variant: 'primary',
		size: 'md',
		fullWidth: true,
	},
	parameters: {
		layout: 'padded',
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="danger">Danger</Button>
				<Button variant="success">Success</Button>
			</div>
			<div className="flex gap-2">
				<Button variant="primary" size="sm">
					Small
				</Button>
				<Button variant="primary" size="md">
					Medium
				</Button>
				<Button variant="primary" size="lg">
					Large
				</Button>
			</div>
			<div className="flex gap-2">
				<Button variant="primary" disabled>
					Disabled
				</Button>
				<Button variant="secondary" disabled>
					Disabled
				</Button>
			</div>
		</div>
	),
};
