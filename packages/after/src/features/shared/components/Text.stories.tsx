import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta = {
	title: 'Shared/Text',
	component: Text,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		textType: {
			control: 'select',
			options: [
				'heading1',
				'heading2',
				'heading3',
				'heading4',
				'heading5',
				'heading6',
				'subHeading1',
				'subHeading2',
				'subHeading3',
				'title1',
				'title2',
				'body1',
				'body2',
				'caption1',
				'caption2',
				'button1',
				'button2',
			],
			description: 'Text typography type',
		},
	},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
	args: {
		textType: 'heading1',
		children: 'Heading 1 - Large Title',
	},
};

export const Heading2: Story = {
	args: {
		textType: 'heading2',
		children: 'Heading 2 - Section Title',
	},
};

export const Heading3: Story = {
	args: {
		textType: 'heading3',
		children: 'Heading 3 - Subsection Title',
	},
};

export const SubHeading1: Story = {
	args: {
		textType: 'subHeading1',
		children: 'SubHeading 1 - Large Subtitle',
	},
};

export const Title1: Story = {
	args: {
		textType: 'title1',
		children: 'Title 1 - Component Title',
	},
};

export const Body1: Story = {
	args: {
		textType: 'body1',
		children: 'Body 1 - Regular paragraph text for main content',
	},
};

export const Body2: Story = {
	args: {
		textType: 'body2',
		children: 'Body 2 - Smaller paragraph text for secondary content',
	},
};

export const Caption1: Story = {
	args: {
		textType: 'caption1',
		children: 'Caption 1 - Small helper text',
	},
};

export const Caption2: Story = {
	args: {
		textType: 'caption2',
		children: 'Caption 2 - Smallest helper text',
	},
};

export const Button1: Story = {
	args: {
		textType: 'button1',
		children: 'Button 1 - Large Button Text',
	},
};

export const Button2: Story = {
	args: {
		textType: 'button2',
		children: 'Button 2 - Small Button Text',
	},
};

export const AllHeadings: Story = {
	args: {},
	render: () => (
		<div className="space-y-4">
			<Text textType="heading1">Heading 1 - 24px Bold</Text>
			<Text textType="heading2">Heading 2 - 20px Bold</Text>
			<Text textType="heading3">Heading 3 - 18px Bold</Text>
			<Text textType="heading4">Heading 4 - 16px Bold</Text>
			<Text textType="heading5">Heading 5 - 16px Bold</Text>
			<Text textType="heading6">Heading 6 - 16px Bold</Text>
		</div>
	),
};

export const AllSubHeadings: Story = {
	args: {},
	render: () => (
		<div className="space-y-4">
			<Text textType="subHeading1">SubHeading 1 - 28px Medium</Text>
			<Text textType="subHeading2">SubHeading 2 - 20px Medium</Text>
			<Text textType="subHeading3">SubHeading 3 - 18px Medium</Text>
		</div>
	),
};

export const AllBodyText: Story = {
	args: {},
	render: () => (
		<div className="space-y-4">
			<Text textType="title1">Title 1 - 16px Bold</Text>
			<Text textType="title2">Title 2 - 14px Bold</Text>
			<Text textType="body1">Body 1 - 16px Regular - Lorem ipsum dolor sit amet</Text>
			<Text textType="body2">Body 2 - 14px Regular - Lorem ipsum dolor sit amet</Text>
			<Text textType="caption1">Caption 1 - 12px Regular - Small helper text</Text>
			<Text textType="caption2">Caption 2 - 10px Regular - Smallest helper text</Text>
		</div>
	),
};

export const TypographyScale: Story = {
	args: {},
	render: () => (
		<div className="space-y-6">
			<div className="border-b pb-4">
				<Text textType="heading1" className="mb-2">
					Typography Scale
				</Text>
				<Text textType="body2" className="text-gray-600">
					All available text types in the design system
				</Text>
			</div>

			<div className="space-y-4">
				<div>
					<Text textType="caption1" className="text-gray-500 mb-1">
						HEADINGS
					</Text>
					<div className="space-y-2">
						<Text textType="heading1">Heading 1</Text>
						<Text textType="heading2">Heading 2</Text>
						<Text textType="heading3">Heading 3</Text>
						<Text textType="heading4">Heading 4</Text>
					</div>
				</div>

				<div>
					<Text textType="caption1" className="text-gray-500 mb-1">
						SUBHEADINGS
					</Text>
					<div className="space-y-2">
						<Text textType="subHeading1">SubHeading 1</Text>
						<Text textType="subHeading2">SubHeading 2</Text>
						<Text textType="subHeading3">SubHeading 3</Text>
					</div>
				</div>

				<div>
					<Text textType="caption1" className="text-gray-500 mb-1">
						TITLES
					</Text>
					<div className="space-y-2">
						<Text textType="title1">Title 1</Text>
						<Text textType="title2">Title 2</Text>
					</div>
				</div>

				<div>
					<Text textType="caption1" className="text-gray-500 mb-1">
						BODY & CAPTIONS
					</Text>
					<div className="space-y-2">
						<Text textType="body1">Body 1 - Regular paragraph text</Text>
						<Text textType="body2">Body 2 - Secondary text</Text>
						<Text textType="caption1">Caption 1 - Helper text</Text>
						<Text textType="caption2">Caption 2 - Smallest text</Text>
					</div>
				</div>

				<div>
					<Text textType="caption1" className="text-gray-500 mb-1">
						BUTTON TEXT
					</Text>
					<div className="space-y-2">
						<Text textType="button1">Button 1 - Large</Text>
						<Text textType="button2">Button 2 - Small</Text>
					</div>
				</div>
			</div>
		</div>
	),
};
