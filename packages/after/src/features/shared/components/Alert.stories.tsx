import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
	title: 'Shared/Alert',
	component: Alert,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'info', 'success', 'warning', 'error'],
			description: 'Alert variant type',
		},
		showIcon: {
			control: 'boolean',
			description: 'Show icon',
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'This is a default alert message.',
		variant: 'default',
	},
};

export const Info: Story = {
	args: {
		children: 'This is an informational message.',
		variant: 'info',
	},
};

export const Success: Story = {
	args: {
		children: 'Operation completed successfully!',
		variant: 'success',
	},
};

export const Warning: Story = {
	args: {
		children: 'Please review this warning before proceeding.',
		variant: 'warning',
	},
};

export const Error: Story = {
	args: {
		children: 'An error occurred. Please try again.',
		variant: 'error',
	},
};

export const WithTitle: Story = {
	args: {
		title: 'Important Notice',
		children: 'This alert has a title for better organization.',
		variant: 'info',
	},
};

export const WithoutIcon: Story = {
	args: {
		children: 'This alert does not show an icon.',
		variant: 'info',
		showIcon: false,
	},
};

export const WithCloseButton: Story = {
	args: {
		children: 'This alert can be dismissed.',
		variant: 'info',
		onClose: () => alert('Alert closed!'),
	},
};

export const LongContent: Story = {
	args: {
		title: 'Terms and Conditions',
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		variant: 'default',
	},
};

export const AllVariants: Story = {
	args: {},
	render: () => (
		<div className="space-y-4">
			<Alert variant="default">This is a default alert message.</Alert>
			<Alert variant="info">This is an informational message.</Alert>
			<Alert variant="success">Operation completed successfully!</Alert>
			<Alert variant="warning">Please review this warning before proceeding.</Alert>
			<Alert variant="error">An error occurred. Please try again.</Alert>
		</div>
	),
};

export const AllWithTitles: Story = {
	args: {},
	render: () => (
		<div className="space-y-4">
			<Alert variant="default" title="Default">
				This is a default alert with a title.
			</Alert>
			<Alert variant="info" title="Information">
				This is an informational message with a title.
			</Alert>
			<Alert variant="success" title="Success">
				Operation completed successfully with a title.
			</Alert>
			<Alert variant="warning" title="Warning">
				Please review this warning with a title.
			</Alert>
			<Alert variant="error" title="Error">
				An error occurred with a title.
			</Alert>
		</div>
	),
};

export const Dismissible: Story = {
	args: {},
	render: () => {
		const handleClose = () => console.log('Alert dismissed');
		return (
			<div className="space-y-4">
				<Alert variant="info" title="Dismissible Info" onClose={handleClose}>
					Click the X to dismiss this alert.
				</Alert>
				<Alert variant="success" title="Dismissible Success" onClose={handleClose}>
					This success alert can be dismissed.
				</Alert>
				<Alert variant="warning" title="Dismissible Warning" onClose={handleClose}>
					This warning can be closed.
				</Alert>
				<Alert variant="error" title="Dismissible Error" onClose={handleClose}>
					This error message can be dismissed.
				</Alert>
			</div>
		);
	},
};

export const ComplexContent: Story = {
	args: {},
	render: () => (
		<div className="space-y-4">
			<Alert variant="info" title="System Update Available">
				<div className="space-y-2">
					<p>A new version of the system is available.</p>
					<ul className="list-disc list-inside ml-2">
						<li>Improved performance</li>
						<li>Bug fixes</li>
						<li>New features</li>
					</ul>
					<p className="text-sm mt-2">Update now to get the latest improvements.</p>
				</div>
			</Alert>
			<Alert variant="warning" title="Scheduled Maintenance" onClose={() => {}}>
				<div>
					<p>System maintenance is scheduled for:</p>
					<p className="font-bold mt-1">Saturday, January 15, 2024 at 2:00 AM UTC</p>
					<p className="text-sm mt-2">Expected downtime: 2-3 hours</p>
				</div>
			</Alert>
		</div>
	),
};
