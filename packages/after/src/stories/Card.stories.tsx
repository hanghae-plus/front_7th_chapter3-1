import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'flat'],
      description: '카드의 스타일 variant',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content area.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <>
        <CardHeader>
          <CardTitle>Bordered Card</CardTitle>
          <CardDescription>This card has a border variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with bordered style.</p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>This card has elevation/shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with elevated shadow effect.</p>
        </CardContent>
      </>
    ),
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: (
      <>
        <CardHeader>
          <CardTitle>Flat Card</CardTitle>
          <CardDescription>Minimal flat design</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Simple flat card without borders or shadows.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
          <CardDescription>Card without footer</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Just header and content, no footer.</p>
        </CardContent>
      </>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    variant: 'default',
    children: (
      <CardContent>
        <p>This card only has content, no header or footer.</p>
      </CardContent>
    ),
  },
};
