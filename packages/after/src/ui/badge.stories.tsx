import type { Meta, StoryObj } from '@storybook/react';
import Badge from './badge';

const meta = {
	title: 'UI/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
			description: 'Badge variant color',
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Badge size',
		},
		pill: {
			control: 'boolean',
			description: 'Pill shape (rounded)',
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Primary',
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Secondary',
		variant: 'secondary',
	},
};

export const Success: Story = {
	args: {
		children: 'Success',
		variant: 'success',
	},
};

export const Danger: Story = {
	args: {
		children: 'Danger',
		variant: 'danger',
	},
};

export const Warning: Story = {
	args: {
		children: 'Warning',
		variant: 'warning',
	},
};

export const Info: Story = {
	args: {
		children: 'Info',
		variant: 'info',
	},
};

export const Small: Story = {
	args: {
		children: 'Small',
		variant: 'primary',
		size: 'small',
	},
};

export const Medium: Story = {
	args: {
		children: 'Medium',
		variant: 'primary',
		size: 'medium',
	},
};

export const Large: Story = {
	args: {
		children: 'Large',
		variant: 'primary',
		size: 'large',
	},
};

export const Pill: Story = {
	args: {
		children: 'Pill Badge',
		variant: 'primary',
		pill: true,
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2 items-center">
				<Badge variant="primary">Primary</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="info">Info</Badge>
			</div>
			<div className="flex gap-2 items-center">
				<Badge variant="primary" size="small">
					Small
				</Badge>
				<Badge variant="primary" size="medium">
					Medium
				</Badge>
				<Badge variant="primary" size="large">
					Large
				</Badge>
			</div>
			<div className="flex gap-2 items-center">
				<Badge variant="primary" pill>
					Pill Primary
				</Badge>
				<Badge variant="success" pill>
					Pill Success
				</Badge>
				<Badge variant="danger" pill>
					Pill Danger
				</Badge>
			</div>
		</div>
	),
};
