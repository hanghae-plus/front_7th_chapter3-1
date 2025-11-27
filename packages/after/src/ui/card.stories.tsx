import type { Meta, StoryObj } from '@storybook/react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardAction,
} from './card';
import Button from './button';

const meta = {
	title: 'UI/Card',
	component: Card,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className="w-[400px]">
			<CardContent>
				<p>This is a basic card with just content.</p>
			</CardContent>
		</Card>
	),
};

export const WithHeader: Story = {
	render: () => (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>This is a card description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content goes here. This is the main body of the card.</p>
			</CardContent>
		</Card>
	),
};

export const WithFooter: Story = {
	render: () => (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Card with Footer</CardTitle>
				<CardDescription>This card has a footer with actions</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content goes here.</p>
			</CardContent>
			<CardFooter className="gap-2">
				<Button variant="secondary">Cancel</Button>
				<Button variant="primary">Save</Button>
			</CardFooter>
		</Card>
	),
};

export const WithAction: Story = {
	render: () => (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Card with Action</CardTitle>
				<CardDescription>This card has an action button in the header</CardDescription>
				<CardAction>
					<Button size="sm" variant="secondary">
						Edit
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p>The action button appears in the top-right corner of the card header.</p>
			</CardContent>
		</Card>
	),
};

export const Complete: Story = {
	render: () => (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Complete Card</CardTitle>
				<CardDescription>All card components together</CardDescription>
				<CardAction>
					<Button size="sm" variant="secondary">
						Options
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<p>This card demonstrates all available components:</p>
					<ul className="list-disc list-inside space-y-1 text-sm">
						<li>Card Header with Title and Description</li>
						<li>Card Action in the header</li>
						<li>Card Content with rich content</li>
						<li>Card Footer with action buttons</li>
					</ul>
				</div>
			</CardContent>
			<CardFooter className="gap-2">
				<Button variant="secondary">Cancel</Button>
				<Button variant="primary">Confirm</Button>
			</CardFooter>
		</Card>
	),
};

export const MultipleCards: Story = {
	render: () => (
		<div className="grid grid-cols-2 gap-4 max-w-[900px]">
			<Card>
				<CardHeader>
					<CardTitle>First Card</CardTitle>
					<CardDescription>Description for first card</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Content for the first card</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Second Card</CardTitle>
					<CardDescription>Description for second card</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Content for the second card</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Third Card</CardTitle>
					<CardDescription>Description for third card</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Content for the third card</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Fourth Card</CardTitle>
					<CardDescription>Description for fourth card</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Content for the fourth card</p>
				</CardContent>
			</Card>
		</div>
	),
};
