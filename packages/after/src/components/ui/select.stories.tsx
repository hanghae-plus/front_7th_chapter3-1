import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { Label } from './label';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Select defaultValue="option1">
        <SelectTrigger aria-label="Select an option">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="role">Role</Label>
      <Select defaultValue="user">
        <SelectTrigger id="role" aria-label="Select a role">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">사용자</SelectItem>
          <SelectItem value="moderator">운영자</SelectItem>
          <SelectItem value="admin">관리자</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="w-80">
      <Select defaultValue="option1">
        <SelectTrigger selectSize="sm" aria-label="Select an option">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="w-80">
      <Select defaultValue="option1">
        <SelectTrigger selectSize="lg" aria-label="Select an option">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const LongList: Story = {
  render: () => (
    <div className="w-80">
      <Select defaultValue="item1">
        <SelectTrigger aria-label="Select an item">
          <SelectValue placeholder="Select an item" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 20 }, (_, i) => (
            <SelectItem key={i} value={`item${i + 1}`}>
              Item {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Select defaultValue="option1">
        <SelectTrigger selectSize="sm" aria-label="Small select">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="option1">
        <SelectTrigger selectSize="default" aria-label="Default select">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="option1">
        <SelectTrigger selectSize="lg" aria-label="Large select">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

