import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from './alert';

/**
 * # Alert 컴포넌트
 *
 * Alert는 사용자에게 중요한 정보나 알림을 전달하는 컴포넌트입니다.
 * 다양한 변형(variant)을 통해 상황에 맞는 시각적 피드백을 제공합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import Alert from '@/shared/ui/alert';
 *
 * function MyComponent() {
 *   return (
 *     <Alert variant="success">
 *       <Alert.Icon />
 *       <Alert.Content>
 *         <Alert.Title>Success!</Alert.Title>
 *         <Alert.Body>Your operation was successful.</Alert.Body>
 *       </Alert.Content>
 *       <Alert.Close onClick={handleClose} />
 *     </Alert>
 *   );
 * }
 * ```
 *
 * ## 구성 요소
 *
 * - **Alert**: 루트 컨테이너 컴포넌트
 * - **Alert.Icon**: 아이콘을 표시하는 컴포넌트 (variant에 따라 자동 선택)
 * - **Alert.Content**: 컨텐츠 래퍼 컴포넌트
 * - **Alert.Title**: 제목 텍스트를 표시하는 컴포넌트
 * - **Alert.Body**: 본문 텍스트를 표시하는 컴포넌트
 * - **Alert.Close**: 닫기 버튼 컴포넌트
 */
const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert 컴포넌트는 사용자에게 중요한 정보를 전달하는 데 사용됩니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Alert의 시각적 스타일을 결정합니다',
      control: { type: 'select' },
      options: ['default', 'info', 'success', 'warning', 'error'],
      table: {
        type: { summary: 'AlertVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      description: 'Alert 내부에 표시될 컨텐츠',
      control: false,
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/**
 * 기본 Alert 스타일입니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Default Alert</Alert.Title>
          <Alert.Body>This is a default alert message with standard styling.</Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 정보를 전달하는 Alert입니다.
 */
export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Information</Alert.Title>
          <Alert.Body>This is an informational message to notify users about updates.</Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 성공 상태를 나타내는 Alert입니다.
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Success!</Alert.Title>
          <Alert.Body>Your operation has been completed successfully.</Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 경고 메시지를 표시하는 Alert입니다.
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Body>Please be aware of potential issues with this action.</Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 오류 상태를 나타내는 Alert입니다.
 */
export const Error: Story = {
  args: {
    variant: 'error',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Body>An error occurred while processing your request.</Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 닫기 버튼이 있는 Alert입니다.
 */
export const WithCloseButton: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Dismissible Alert</Alert.Title>
          <Alert.Body>This alert can be closed by clicking the close button.</Alert.Body>
        </Alert.Content>
        <Alert.Close onClick={() => console.log('Alert closed')} />
      </>
    ),
  },
};

/**
 * 제목만 있는 간단한 Alert입니다.
 */
export const TitleOnly: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Operation completed successfully!</Alert.Title>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 본문만 있는 Alert입니다.
 */
export const BodyOnly: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Alert.Icon />
        <Alert.Content>
          <Alert.Body>
            This is a simple notification without a title. It contains only body text to convey the message.
          </Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 커스텀 아이콘을 사용하는 Alert입니다.
 */
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <Alert.Icon>🚀</Alert.Icon>
        <Alert.Content>
          <Alert.Title>New Feature!</Alert.Title>
          <Alert.Body>Check out our latest updates and improvements.</Alert.Body>
        </Alert.Content>
      </>
    ),
  },
};

/**
 * 여러 Alert를 함께 표시하는 예제입니다.
 */
export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Alert variant="info">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Information</Alert.Title>
          <Alert.Body>System update scheduled for tonight.</Alert.Body>
        </Alert.Content>
      </Alert>

      <Alert variant="success">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Success</Alert.Title>
          <Alert.Body>Your profile has been updated.</Alert.Body>
        </Alert.Content>
      </Alert>

      <Alert variant="warning">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Body>Your session will expire in 5 minutes.</Alert.Body>
        </Alert.Content>
      </Alert>

      <Alert variant="error">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Body>Failed to save changes.</Alert.Body>
        </Alert.Content>
      </Alert>
    </div>
  ),
};