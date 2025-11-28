import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '@/components/ui/alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => (
    <Alert variant="success" showIcon onClose={() => {}} className="w-[400px]">
      <div>
        <div className="font-medium mb-1">성공</div>
        <div>사용자가 생성되었습니다.</div>
      </div>
    </Alert>
  ),
};

export const Error: Story = {
  render: () => (
    <Alert variant="error" showIcon onClose={() => {}} className="w-[400px]">
      <div>
        <div className="font-medium mb-1">오류</div>
        <div>사용자 생성에 실패했습니다.</div>
      </div>
    </Alert>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info" showIcon className="w-[400px]">
      <div>ID: 1 | 생성일: 2024-01-01 | 조회수: 100</div>
    </Alert>
  ),
};

