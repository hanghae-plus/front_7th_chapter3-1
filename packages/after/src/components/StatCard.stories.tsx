import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Composed/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: '총 사용자',
    value: 1234,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    label: '활성 세션',
    value: 89,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: '완료된 작업',
    value: 456,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: '대기 중',
    value: 23,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    label: '오류 발생',
    value: 5,
  },
};

export const StringValue: Story = {
  args: {
    label: '시스템 상태',
    value: '정상',
    variant: 'success',
  },
};

export const LargeNumber: Story = {
  args: {
    label: '총 조회수',
    value: 1234567,
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="총 사용자" value={12847} />
      <StatCard variant="success" label="활성 사용자" value={9432} />
      <StatCard variant="warning" label="대기 중" value={156} />
      <StatCard variant="error" label="차단됨" value={23} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 w-[200px]">
      <StatCard variant="default" label="Default" value={100} />
      <StatCard variant="info" label="Info" value={200} />
      <StatCard variant="success" label="Success" value={300} />
      <StatCard variant="warning" label="Warning" value={400} />
      <StatCard variant="error" label="Error" value={500} />
    </div>
  ),
};
