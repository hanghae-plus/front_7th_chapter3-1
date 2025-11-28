import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './index';
import {
  X,
  Plus,
  Minus,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Search,
  Settings,
  Heart,
  Star,
  Download,
  Upload,
  Copy,
  Share2,
} from 'lucide-react';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'ghost'],
      description: 'IconButton의 색상 variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'IconButton의 크기',
    },
    outline: {
      control: 'boolean',
      description: 'Outline 스타일 적용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    outline: false,
    disabled: false,
    'aria-label': 'Icon button',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 모든 Variant 한눈에 보기
export const AllVariants: Story = {
  args: {
    icon: <Plus className="h-4 w-4" />,
    'aria-label': '추가',
  },
  render: () => (
    <div className="flex flex-col gap-6" style={{ minWidth: '600px' }}>
      <div className="space-y-2">
        <h3 className="font-bold text-sm">Filled Icon Buttons</h3>
        <div className="flex gap-2">
          <IconButton
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            aria-label="추가"
          />
          <IconButton
            variant="secondary"
            icon={<Edit className="h-4 w-4" />}
            aria-label="수정"
          />
          <IconButton
            variant="danger"
            icon={<Trash2 className="h-4 w-4" />}
            aria-label="삭제"
          />
          <IconButton
            variant="success"
            icon={<Check className="h-4 w-4" />}
            aria-label="확인"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Outline Icon Buttons</h3>
        <div className="flex gap-2">
          <IconButton
            variant="primary"
            outline
            icon={<Plus className="h-4 w-4" />}
            aria-label="추가"
          />
          <IconButton
            variant="secondary"
            outline
            icon={<Edit className="h-4 w-4" />}
            aria-label="수정"
          />
          <IconButton
            variant="danger"
            outline
            icon={<Trash2 className="h-4 w-4" />}
            aria-label="삭제"
          />
          <IconButton
            variant="success"
            outline
            icon={<Check className="h-4 w-4" />}
            aria-label="확인"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Ghost Icon Buttons</h3>
        <div className="flex gap-2">
          <IconButton
            variant="ghost"
            icon={<Settings className="h-4 w-4" />}
            aria-label="설정"
          />
          <IconButton
            variant="ghost"
            icon={<X className="h-4 w-4" />}
            aria-label="닫기"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Sizes</h3>
        <div className="flex gap-2 items-center">
          <IconButton
            size="sm"
            icon={<Search className="h-3 w-3" />}
            aria-label="검색"
          />
          <IconButton
            size="md"
            icon={<Search className="h-4 w-4" />}
            aria-label="검색"
          />
          <IconButton
            size="lg"
            icon={<Search className="h-5 w-5" />}
            aria-label="검색"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Disabled State</h3>
        <div className="flex gap-2">
          <IconButton
            disabled
            icon={<Plus className="h-4 w-4" />}
            aria-label="추가"
          />
          <IconButton
            disabled
            outline
            icon={<Edit className="h-4 w-4" />}
            aria-label="수정"
          />
        </div>
      </div>
    </div>
  ),
};

// 다양한 아이콘 예시
export const IconVariations: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    icon: <Search className="h-4 w-4" />,
    'aria-label': '검색',
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ minWidth: '600px' }}>
      <div className="space-y-2">
        <h3 className="font-bold text-sm">Navigation</h3>
        <div className="flex gap-2">
          <IconButton
            variant="secondary"
            icon={<ChevronLeft className="h-4 w-4" />}
            aria-label="이전"
          />
          <IconButton
            variant="secondary"
            icon={<ChevronRight className="h-4 w-4" />}
            aria-label="다음"
          />
          <IconButton
            variant="secondary"
            icon={<X className="h-4 w-4" />}
            aria-label="닫기"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Actions</h3>
        <div className="flex gap-2">
          <IconButton
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            aria-label="추가"
          />
          <IconButton
            variant="primary"
            icon={<Minus className="h-4 w-4" />}
            aria-label="빼기"
          />
          <IconButton
            variant="secondary"
            icon={<Edit className="h-4 w-4" />}
            aria-label="수정"
          />
          <IconButton
            variant="danger"
            icon={<Trash2 className="h-4 w-4" />}
            aria-label="삭제"
          />
          <IconButton
            variant="success"
            icon={<Check className="h-4 w-4" />}
            aria-label="확인"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Utilities</h3>
        <div className="flex gap-2">
          <IconButton
            variant="secondary"
            icon={<Search className="h-4 w-4" />}
            aria-label="검색"
          />
          <IconButton
            variant="secondary"
            icon={<Settings className="h-4 w-4" />}
            aria-label="설정"
          />
          <IconButton
            variant="secondary"
            icon={<Download className="h-4 w-4" />}
            aria-label="다운로드"
          />
          <IconButton
            variant="secondary"
            icon={<Upload className="h-4 w-4" />}
            aria-label="업로드"
          />
          <IconButton
            variant="secondary"
            icon={<Copy className="h-4 w-4" />}
            aria-label="복사"
          />
          <IconButton
            variant="secondary"
            icon={<Share2 className="h-4 w-4" />}
            aria-label="공유"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Favorites</h3>
        <div className="flex gap-2">
          <IconButton
            variant="secondary"
            outline
            icon={<Heart className="h-4 w-4" />}
            aria-label="좋아요"
          />
          <IconButton
            variant="secondary"
            outline
            icon={<Star className="h-4 w-4" />}
            aria-label="별점"
          />
        </div>
      </div>
    </div>
  ),
};

// 실제 사용 예시
export const RealWorldExample: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    icon: <X className="h-4 w-4" />,
    'aria-label': '모달 닫기',
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ minWidth: '600px' }}>
      <div className="space-y-2">
        <h3 className="font-bold text-sm">Modal Header</h3>
        <div className="flex items-center justify-between p-4 border rounded">
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <IconButton
            variant="secondary"
            size="sm"
            icon={<X className="h-4 w-4" />}
            aria-label="모달 닫기"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Card Actions</h3>
        <div className="border rounded p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">Card Title</h3>
              <p className="text-sm text-gray-600">Card description</p>
            </div>
            <div className="flex gap-1">
              <IconButton
                variant="secondary"
                size="sm"
                icon={<Edit className="h-3 w-3" />}
                aria-label="수정"
              />
              <IconButton
                variant="danger"
                size="sm"
                outline
                icon={<Trash2 className="h-3 w-3" />}
                aria-label="삭제"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-sm">Pagination</h3>
        <div className="flex items-center justify-center gap-2">
          <IconButton
            variant="secondary"
            outline
            size="sm"
            icon={<ChevronLeft className="h-4 w-4" />}
            aria-label="이전 페이지"
          />
          <span className="text-sm">1 / 10</span>
          <IconButton
            variant="secondary"
            outline
            size="sm"
            icon={<ChevronRight className="h-4 w-4" />}
            aria-label="다음 페이지"
          />
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    icon: <Plus className="h-4 w-4" />,
    'aria-label': '추가',
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => <IconButton {...args} />,
};
