import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsCard } from '@/components/ui/stats-card';

const meta = {
  title: 'UI/StatsCard',
  component: StatsCard,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserStats: Story = {
  args: {
    label: '전체',
    value: 100,
    variant: 'primary',
  },
  render: (args) => (
    <div className="grid grid-cols-5 gap-3">
      <StatsCard {...args} />
      <StatsCard variant="success" label="활성" value={75} />
      <StatsCard variant="warning" label="비활성" value={20} />
      <StatsCard variant="destructive" label="정지" value={5} />
      <StatsCard variant="muted" label="관리자" value={3} />
    </div>
  ),
};

export const PostStats: Story = {
  args: {
    label: '전체',
    value: 245,
    variant: 'primary',
  },
  render: (args) => (
    <div className="grid grid-cols-5 gap-3">
      <StatsCard {...args} />
      <StatsCard variant="success" label="게시됨" value={180} />
      <StatsCard variant="warning" label="임시저장" value={45} />
      <StatsCard variant="destructive" label="보관됨" value={20} />
      <StatsCard variant="muted" label="총 조회수" value={45678} />
    </div>
  ),
};

