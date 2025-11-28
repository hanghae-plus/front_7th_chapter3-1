import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './modal';
import { Button } from '../button/button';
import { Input } from '../input/input';

/**
 * # Modal 컴포넌트
 *
 * Modal은 사용자의 주의를 끌고 중요한 정보를 표시하거나 입력을 받기 위한 오버레이 다이얼로그 컴포넌트입니다.
 * Portal을 사용하여 DOM 트리의 루트에 렌더링되며, 접근성과 사용성을 고려한 다양한 기능을 제공합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import Modal from '@/shared/ui/modal';
 *
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 *       <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
 *         <Modal.Header>Modal Title</Modal.Header>
 *         <Modal.Content>
 *           <p>Modal content goes here</p>
 *         </Modal.Content>
 *         <Modal.Footer>
 *           <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *           <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *         </Modal.Footer>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * ## 구성 요소
 *
 * - **Modal**: 루트 컨테이너 컴포넌트
 * - **Modal.Header**: 제목과 닫기 버튼을 포함하는 헤더 영역
 * - **Modal.Content**: 주요 컨텐츠를 표시하는 본문 영역 (스크롤 가능)
 * - **Modal.Footer**: 액션 버튼들을 포함하는 푸터 영역
 *
 * ## 주요 기능
 *
 * - **Portal 렌더링**: React Portal을 사용하여 #modalRoot에 렌더링
 * - **키보드 접근성**: ESC 키로 모달 닫기
 * - **오버레이 클릭**: 배경 클릭 시 모달 닫기
 * - **바디 스크롤 방지**: 모달 열림 시 페이지 스크롤 비활성화
 * - **크기 옵션**: sm, md, lg 세 가지 크기 제공
 * - **자동 포커스 트랩**: 모달 내부에서만 포커스 이동
 */
const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal 컴포넌트는 사용자 인터랙션을 요구하는 오버레이 다이얼로그를 제공합니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'aria-dialog-name', enabled: true },
          { id: 'focus-trap', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      description: '모달의 열림/닫힘 상태를 제어합니다',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      description: '모달을 닫을 때 호출되는 콜백 함수 (ESC 키, 오버레이 클릭, 닫기 버튼)',
      action: 'closed',
      table: {
        type: { summary: '() => void' },
      },
    },
    size: {
      description: '모달의 너비 크기를 설정합니다',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      description: 'Modal 내부에 표시될 컨텐츠 (Header, Content, Footer 조합)',
      control: false,
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * 기본 Modal 스타일입니다.
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>Default Modal</Modal.Header>
          <Modal.Content>
            <p>This is a basic modal with default medium size.</p>
            <p>You can close it by clicking the X button, pressing ESC, or clicking outside.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 작은 크기의 Modal입니다. 간단한 확인 메시지나 알림에 적합합니다.
 */
export const SmallSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Header>Small Modal</Modal.Header>
          <Modal.Content>
            <p>This is a small modal (max-width: 400px).</p>
            <p>Perfect for simple confirmations or alerts.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 중간 크기의 Modal입니다. 가장 일반적으로 사용되는 기본 크기입니다.
 */
export const MediumSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <Modal.Header>Medium Modal</Modal.Header>
          <Modal.Content>
            <p>This is a medium modal (max-width: 600px).</p>
            <p>
              This is the default size and works well for most use cases including forms and content
              display.
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 큰 크기의 Modal입니다. 많은 컨텐츠나 복잡한 폼에 적합합니다.
 */
export const LargeSize: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <Modal.Header>Large Modal</Modal.Header>
          <Modal.Content>
            <p>This is a large modal (max-width: 900px).</p>
            <p>
              Use this size when you need to display extensive content, complex forms, or detailed
              information. The larger width provides more space for layouts with multiple columns or
              detailed data visualization.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 모든 크기를 비교하는 예제입니다.
 */
export const AllSizes: Story = {
  render: () => {
    const [smOpen, setSmOpen] = useState(false);
    const [mdOpen, setMdOpen] = useState(false);
    const [lgOpen, setLgOpen] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" onClick={() => setSmOpen(true)}>
          Small
        </Button>
        <Button size="sm" onClick={() => setMdOpen(true)}>
          Medium
        </Button>
        <Button size="sm" onClick={() => setLgOpen(true)}>
          Large
        </Button>

        <Modal open={smOpen} onClose={() => setSmOpen(false)} size="sm">
          <Modal.Header>Small Modal</Modal.Header>
          <Modal.Content>
            <p>Small size modal content (400px)</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setSmOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal open={mdOpen} onClose={() => setMdOpen(false)} size="md">
          <Modal.Header>Medium Modal</Modal.Header>
          <Modal.Content>
            <p>Medium size modal content (600px)</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setMdOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal open={lgOpen} onClose={() => setLgOpen(false)} size="lg">
          <Modal.Header>Large Modal</Modal.Header>
          <Modal.Content>
            <p>Large size modal content (900px)</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setLgOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

/**
 * 헤더만 있는 간단한 Modal입니다.
 */
export const HeaderOnly: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>Header Only Modal</Modal.Header>
          <Modal.Content>
            <p>This modal has only a header with the close button.</p>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

/**
 * 푸터 없이 컨텐츠만 있는 Modal입니다.
 */
export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>Information</Modal.Header>
          <Modal.Content>
            <p>This modal doesn't have a footer.</p>
            <p>You can close it using the X button, ESC key, or by clicking outside.</p>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};

/**
 * 스크롤이 가능한 긴 컨텐츠를 가진 Modal입니다.
 */
export const ScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <Modal.Header>Scrollable Content</Modal.Header>
          <Modal.Content>
            <h3>Long Content Example</h3>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 실제 사용 사례: 확인 다이얼로그
 */
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      console.log('Confirmed!');
      setIsOpen(false);
    };

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this item?</p>
            <p>This action cannot be undone.</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 실제 사용 사례: 사용자 등록 폼
 */
export const UserRegistrationForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      setIsOpen(false);
      setFormData({ username: '', email: '', password: '' });
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Register New User</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <Modal.Header>Create New Account</Modal.Header>
          <Modal.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  htmlFor="username"
                  style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Create Account
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 실제 사용 사례: 상세 정보 표시
 */
export const DetailView: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Details</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <Modal.Header>User Details</Modal.Header>
          <Modal.Content>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <h4 style={{ marginTop: 0 }}>Personal Information</h4>
                <p>
                  <strong>Name:</strong> John Doe
                </p>
                <p>
                  <strong>Email:</strong> john.doe@example.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 234 567 8900
                </p>
                <p>
                  <strong>Role:</strong> Administrator
                </p>
              </div>
              <div>
                <h4 style={{ marginTop: 0 }}>Account Information</h4>
                <p>
                  <strong>Status:</strong> Active
                </p>
                <p>
                  <strong>Created:</strong> 2024-01-15
                </p>
                <p>
                  <strong>Last Login:</strong> 2024-03-20
                </p>
                <p>
                  <strong>Access Level:</strong> Full Access
                </p>
              </div>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => console.log('Edit user')}>
              Edit User
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 실제 사용 사례: 성공 메시지
 */
export const SuccessMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Complete Action</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Header>Success!</Modal.Header>
          <Modal.Content>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>
                Operation completed successfully!
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>Your changes have been saved.</p>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="success" onClick={() => setIsOpen(false)} fullWidth>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 실제 사용 사례: 경고 메시지
 */
export const WarningMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Show Warning
        </Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Modal.Header>Warning</Modal.Header>
          <Modal.Content>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>Unsaved Changes</p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                You have unsaved changes. Are you sure you want to leave without saving?
              </p>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Stay
            </Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>
              Leave Without Saving
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 실제 사용 사례: 다중 액션 버튼
 */
export const MultipleActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Actions Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <Modal.Header>Document Actions</Modal.Header>
          <Modal.Content>
            <p>Choose an action for the selected document:</p>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log('Download');
                setIsOpen(false);
              }}
            >
              Download
            </Button>
            <Button
              variant="success"
              onClick={() => {
                console.log('Share');
                setIsOpen(false);
              }}
            >
              Share
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                console.log('Delete');
                setIsOpen(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

/**
 * 리치 컨텐츠가 포함된 Modal입니다.
 */
export const RichContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Article</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <Modal.Header>Article Preview</Modal.Header>
          <Modal.Content>
            <article>
              <h2 style={{ marginTop: 0 }}>Understanding React Modal Components</h2>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                Published on March 20, 2024 by John Doe
              </p>
              <img
                src="https://via.placeholder.com/800x400"
                alt="Placeholder"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
              />
              <p>
                Modal components are essential UI elements that help focus user attention on
                specific tasks or information. They create an overlay that temporarily blocks
                interaction with the main page content.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li>Portal rendering for proper z-index stacking</li>
                <li>Keyboard accessibility with ESC key support</li>
                <li>Click outside to close functionality</li>
                <li>Body scroll prevention when open</li>
                <li>Flexible sizing options</li>
              </ul>
              <h3>Best Practices</h3>
              <ol>
                <li>Always provide a clear way to close the modal</li>
                <li>Use appropriate sizes for your content</li>
                <li>Keep important actions visible in the footer</li>
                <li>Ensure proper focus management</li>
                <li>Test keyboard navigation thoroughly</li>
              </ol>
            </article>
          </Modal.Content>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => console.log('Read more')}>
              Read More
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
