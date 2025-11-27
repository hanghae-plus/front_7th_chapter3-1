import type { Meta, StoryObj } from '@storybook/react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
} from './dropdown-menu';
import Button from '@/ui/button';
import { useState } from 'react';

const meta = {
	title: 'UI/DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Open Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithLabels: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Open Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithShortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Edit</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					Undo
					<DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Redo
					<DropdownMenuShortcut>⌘Y</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Cut
					<DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Copy
					<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Paste
					<DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithCheckboxes: Story = {
	render: () => {
		const [showStatusBar, setShowStatusBar] = useState(true);
		const [showActivityBar, setShowActivityBar] = useState(false);
		const [showPanel, setShowPanel] = useState(false);

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>View</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Appearance</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
						Status Bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
						Activity Bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
						Panel
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const WithRadioGroup: Story = {
	render: () => {
		const [position, setPosition] = useState('bottom');

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>Position</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const WithSubMenu: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>More Options</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>New File</DropdownMenuItem>
				<DropdownMenuItem>New Folder</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Email</DropdownMenuItem>
						<DropdownMenuItem>Message</DropdownMenuItem>
						<DropdownMenuItem>Copy Link</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithGroups: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>New Tab</DropdownMenuItem>
					<DropdownMenuItem>New Window</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Tools</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>Developer Tools</DropdownMenuItem>
					<DropdownMenuItem>Task Manager</DropdownMenuItem>
					<DropdownMenuItem>Extensions</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Exit</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const InsetItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Format</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem inset>Bold</DropdownMenuItem>
				<DropdownMenuItem inset>Italic</DropdownMenuItem>
				<DropdownMenuItem inset>Underline</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger inset>More Formatting</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Strikethrough</DropdownMenuItem>
						<DropdownMenuItem>Superscript</DropdownMenuItem>
						<DropdownMenuItem>Subscript</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const CompleteExample: Story = {
	render: () => {
		const [showBookmarks, setShowBookmarks] = useState(true);
		const [showDownloads, setShowDownloads] = useState(false);
		const [zoom, setZoom] = useState('100');

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>Browser Menu</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Browser</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							New Tab
							<DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							New Window
							<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem disabled>
							New Private Window
							<DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
						Show Bookmarks
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showDownloads} onCheckedChange={setShowDownloads}>
						Show Downloads
					</DropdownMenuCheckboxItem>
					<DropdownMenuSeparator />
					<DropdownMenuLabel>Zoom</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={zoom} onValueChange={setZoom}>
						<DropdownMenuRadioItem value="75">75%</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="100">100%</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="125">125%</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="150">150%</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
					<DropdownMenuSeparator />
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Developer Tools</DropdownMenuItem>
							<DropdownMenuItem>Task Manager</DropdownMenuItem>
							<DropdownMenuItem>Extensions</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
};

export const UserMenu: Story = {
	render: () => (
		<div className="flex items-center gap-3">
			<span className="text-sm text-gray-700">demo@example.com</span>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="w-10 h-10 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
						DU
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel>
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium">Demo User</p>
							<p className="text-xs text-gray-500">demo@example.com</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	),
};
