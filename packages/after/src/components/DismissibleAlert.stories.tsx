import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DismissibleAlert } from './DismissibleAlert';

const meta: Meta<typeof DismissibleAlert> = {
  title: 'Composed/DismissibleAlert',
  component: DismissibleAlert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DismissibleAlert>;

export const Default: Story = {
  args: {
    title: '알림',
    children: '이것은 기본 알림 메시지입니다.',
    onClose: () => alert('닫기 클릭!'),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: '정보',
    children: '참고하실 정보입니다.',
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: '성공',
    children: '작업이 성공적으로 완료되었습니다.',
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '주의',
    children: '이 작업은 되돌릴 수 없습니다.',
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: '오류',
    children: '문제가 발생했습니다. 다시 시도해주세요.',
    onClose: () => {},
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: '제목 없이 내용만 표시할 수도 있습니다.',
    onClose: () => {},
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          알림 다시 표시
        </button>
      );
    }

    return (
      <DismissibleAlert variant="success" title="성공!" onClose={() => setVisible(false)}>
        알림을 닫으면 버튼이 표시됩니다.
      </DismissibleAlert>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <DismissibleAlert variant="default" title="Default" onClose={() => {}}>
        기본 스타일 알림
      </DismissibleAlert>
      <DismissibleAlert variant="info" title="Info" onClose={() => {}}>
        정보 알림
      </DismissibleAlert>
      <DismissibleAlert variant="success" title="Success" onClose={() => {}}>
        성공 알림
      </DismissibleAlert>
      <DismissibleAlert variant="warning" title="Warning" onClose={() => {}}>
        경고 알림
      </DismissibleAlert>
      <DismissibleAlert variant="error" title="Error" onClose={() => {}}>
        오류 알림
      </DismissibleAlert>
    </div>
  ),
};
