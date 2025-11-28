import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './index';
import { Button } from '../Button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'flat'],
      description: 'Card의 스타일 variant',
      table: {
        type: { summary: "'default' | 'bordered' | 'elevated' | 'flat'" },
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card Description</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Card Content goes here.</p>
      </Card.Content>
    </Card>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Card variant="bordered">
      <Card.Header>
        <Card.Title>Bordered Card</Card.Title>
        <Card.Description>강조된 테두리가 있는 카드</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>border-2 스타일이 적용되어 테두리가 더 두껍습니다.</p>
      </Card.Content>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Header>
        <Card.Title>Elevated Card</Card.Title>
        <Card.Description>강한 그림자가 있는 카드</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>shadow-lg 스타일로 카드가 떠있는 느낌을 줍니다.</p>
      </Card.Content>
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card variant="flat">
      <Card.Header>
        <Card.Title>Flat Card</Card.Title>
        <Card.Description>테두리와 그림자가 없는 카드</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>border와 shadow가 없어 평면적인 디자인입니다.</p>
      </Card.Content>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>카드 제목</Card.Title>
        <Card.Description>푸터가 있는 카드입니다</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>카드 본문 내용입니다.</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="sm">
          취소
        </Button>
        <Button size="sm" className="ml-2">
          확인
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithHeaderActions: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Card.Title>설정</Card.Title>
            <Card.Description>카드 설정을 관리합니다</Card.Description>
          </div>
          <Button variant="secondary" size="sm">
            편집
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <p>헤더에 액션 버튼이 있는 카드입니다.</p>
      </Card.Content>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <p>헤더 없이 콘텐츠만 있는 간단한 카드입니다.</p>
      </Card.Content>
    </Card>
  ),
};

export const CustomLayout: Story = {
  render: () => (
    <Card variant="bordered">
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">완전히 커스텀 레이아웃</h2>
        <p className="text-gray-600">
          Card의 하위 컴포넌트를 사용하지 않고 자유롭게 구성할 수 있습니다.
        </p>
        <div className="flex gap-2">
          <Button size="sm">버튼 1</Button>
          <Button variant="secondary" size="sm">
            버튼 2
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <Card.Header>
          <Card.Title>카드 1</Card.Title>
          <Card.Description>Default variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>첫 번째 카드입니다.</p>
        </Card.Content>
      </Card>

      <Card variant="bordered">
        <Card.Header>
          <Card.Title>카드 2</Card.Title>
          <Card.Description>Bordered variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>두 번째 카드입니다.</p>
        </Card.Content>
      </Card>

      <Card variant="elevated">
        <Card.Header>
          <Card.Title>카드 3</Card.Title>
          <Card.Description>Elevated variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>세 번째 카드입니다.</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>긴 내용이 있는 카드</Card.Title>
        <Card.Description>스크롤이 필요한 경우</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button variant="secondary" size="sm">
          더 보기
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>카드 제목</Card.Title>
        <Card.Description>카드 설명</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>카드 내용입니다. variant를 변경하여 다양한 스타일을 확인하세요.</p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">액션</Button>
      </Card.Footer>
    </Card>
  ),
};
