import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '@/components/atoms/Badge';
import { FlexRow, FlexRowCenter, FlexCol } from '@/stories/utils';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const AllVariants = {
  render: () => (
    <FlexRow>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </FlexRow>
  ),
};

export const AllSizes = {
  render: () => (
    <FlexRowCenter>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </FlexRowCenter>
  ),
};

export const Pill = {
  render: () => (
    <FlexRow>
      <Badge pill>Pill Badge</Badge>
      <Badge variant="success" pill>Success Pill</Badge>
      <Badge variant="danger" pill>Danger Pill</Badge>
    </FlexRow>
  ),
};

export const StatusExamples = {
  render: () => (
    <FlexCol>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>문서 상태</h3>
        <FlexRow>
          <Badge variant="success">게시됨</Badge>
          <Badge variant="warning">임시저장</Badge>
          <Badge variant="secondary">보관됨</Badge>
          <Badge variant="info">대기중</Badge>
          <Badge variant="danger">거부됨</Badge>
        </FlexRow>
      </div>
      
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>사용자 역할</h3>
        <FlexRow>
          <Badge variant="danger" pill>관리자</Badge>
          <Badge variant="warning" pill>운영자</Badge>
          <Badge variant="primary" pill>사용자</Badge>
          <Badge variant="secondary" pill>게스트</Badge>
        </FlexRow>
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>우선순위</h3>
        <FlexRow>
          <Badge variant="danger" size="small">높음</Badge>
          <Badge variant="warning" size="small">보통</Badge>
          <Badge variant="info" size="small">낮음</Badge>
        </FlexRow>
      </div>
    </FlexCol>
  ),
};

