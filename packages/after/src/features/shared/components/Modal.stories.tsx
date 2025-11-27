import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import Button from '@/ui/button';

const meta = {
	title: 'Shared/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Modal size',
		},
		isOpen: {
			control: 'boolean',
			description: 'Modal open state',
		},
		showFooter: {
			control: 'boolean',
			description: 'Show footer',
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
					<p>This is the modal content. Click outside or press the X button to close.</p>
				</Modal>
			</div>
		);
	},
};

export const Small: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Small Modal" size="small">
					<p>This is a small modal. Perfect for quick confirmations or brief messages.</p>
				</Modal>
			</div>
		);
	},
};

export const Medium: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Medium Modal" size="medium">
					<p>
						This is a medium-sized modal. It provides more space for content while remaining
						manageable.
					</p>
				</Modal>
			</div>
		);
	},
};

export const Large: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large Modal" size="large">
					<p>This is a large modal. Great for forms, detailed content, or complex layouts.</p>
				</Modal>
			</div>
		);
	},
};

export const WithFooter: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
				<Modal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title="Confirm Action"
					showFooter
					footerContent={
						<>
							<Button variant="secondary" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button variant="primary" onClick={() => setIsOpen(false)}>
								Confirm
							</Button>
						</>
					}
				>
					<p>Are you sure you want to perform this action?</p>
				</Modal>
			</div>
		);
	},
};

export const WithoutTitle: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Modal without Title</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<div className="text-center">
						<h2 className="text-xl font-bold mb-4">Custom Header</h2>
						<p>This modal doesn't use the standard title prop.</p>
					</div>
				</Modal>
			</div>
		);
	},
};

export const LongContent: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Modal with Long Content</Button>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Terms and Conditions">
					<div className="space-y-4">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</p>
						<p>
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
						<p>
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur.
						</p>
						<p>
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua.
						</p>
						<p>
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat.
						</p>
					</div>
				</Modal>
			</div>
		);
	},
};

export const FormModal: Story = {
	args: {},
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
				<Modal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title="Create New User"
					size="medium"
					showFooter
					footerContent={
						<>
							<Button variant="secondary" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button variant="primary" onClick={() => setIsOpen(false)}>
								Create User
							</Button>
						</>
					}
				>
					<form className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-sm font-medium mb-1">
								Name
							</label>
							<input
								type="text"
								id="name"
								className="w-full px-3 py-2 border border-gray-300 rounded"
								placeholder="Enter name"
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-sm font-medium mb-1">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full px-3 py-2 border border-gray-300 rounded"
								placeholder="Enter email"
							/>
						</div>
						<div>
							<label htmlFor="role" className="block text-sm font-medium mb-1">
								Role
							</label>
							<select id="role" className="w-full px-3 py-2 border border-gray-300 rounded">
								<option>User</option>
								<option>Admin</option>
								<option>Moderator</option>
							</select>
						</div>
					</form>
				</Modal>
			</div>
		);
	},
};
