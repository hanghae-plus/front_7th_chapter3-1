import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';
import { Label } from '../label/label';
import { useState } from 'react';

/**
 * # Input 컴포넌트
 *
 * Input은 사용자로부터 텍스트 입력을 받는 기본 폼 컴포넌트입니다.
 * 다양한 타입과 크기 옵션을 제공하며, 유효성 검사 상태를 시각적으로 표현합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Input } from '@/shared/ui/input';
 *
 * function MyComponent() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <Input
 *       type="text"
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="Enter text..."
 *     />
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **다양한 입력 타입**: text, email, password, number, tel 등
 * - **크기 변형**: default(full), sm, md, lg
 * - **포커스 상태**: 명확한 포커스 인디케이터
 * - **에러 상태**: aria-invalid 속성 지원
 * - **비활성화 상태**: disabled 속성 지원
 */
const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input 컴포넌트는 사용자 텍스트 입력을 위한 기본 폼 요소입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-input-field-name', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Input의 타입을 지정합니다',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    variant: {
      description: 'Input의 너비 변형을 설정합니다',
      control: { type: 'select' },
      options: ['default', 'sm', 'md', 'lg'],
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      description: '입력 필드의 플레이스홀더 텍스트',
      control: { type: 'text' },
    },
    disabled: {
      description: '입력 필드 비활성화 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description: '필수 입력 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      description: '읽기 전용 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      description: 'Input의 값',
      control: { type: 'text' },
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * 기본 Input입니다.
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

/**
 * 다양한 크기의 Input입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <Input variant="sm" placeholder="Small (200px)" />
      <Input variant="md" placeholder="Medium (300px)" />
      <Input variant="lg" placeholder="Large (400px)" />
      <Input variant="default" placeholder="Full width (100%)" />
    </div>
  ),
};

/**
 * 다양한 타입의 Input입니다.
 */
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
      <Input type="date" />
      <Input type="time" />
    </div>
  ),
};

/**
 * 비활성화된 Input입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

/**
 * 읽기 전용 Input입니다.
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'Read-only input',
  },
};

/**
 * 레이블과 함께 사용하는 Input입니다.
 */
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter password" />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" placeholder="johndoe" />
      </div>
    </div>
  ),
};

/**
 * 에러 상태의 Input입니다.
 */
export const ErrorState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
      <Label htmlFor="error-input">Email Address</Label>
      <Input
        id="error-input"
        type="email"
        placeholder="john@example.com"
        aria-invalid={true}
        value="invalid-email"
      />
      <span style={{ color: '#dc3545', fontSize: '14px' }}>Please enter a valid email address</span>
    </div>
  ),
};

/**
 * 제어된 Input 예제입니다.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledInput = () => {
      const [value, setValue] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
          <div>
            <Label htmlFor="controlled">Controlled Input</Label>
            <Input
              id="controlled"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type something..."
            />
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Current value: "{value}" (Length: {value.length})
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setValue('')}>Clear</button>
            <button onClick={() => setValue('Hello World')}>Set to "Hello World"</button>
            <button onClick={() => setValue(value.toUpperCase())}>To Uppercase</button>
          </div>
        </div>
      );
    };

    return <ControlledInput />;
  },
};

/**
 * 실제 사용 사례: 로그인 폼
 */
export const LoginForm: Story = {
  render: () => {
    const LoginFormExample = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      return (
        <div style={{
          padding: '24px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          width: '400px'
        }}>
          <h3 style={{ margin: 0, marginBottom: '24px' }}>Sign In</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      );
    };

    return <LoginFormExample />;
  },
};

/**
 * 실제 사용 사례: 검색 바
 */
export const SearchBar: Story = {
  render: () => {
    const SearchExample = () => {
      const [search, setSearch] = useState('');
      const [results, setResults] = useState<string[]>([]);

      const handleSearch = () => {
        if (search) {
          setResults([
            `Result 1 for "${search}"`,
            `Result 2 for "${search}"`,
            `Result 3 for "${search}"`,
          ]);
        }
      };

      return (
        <div style={{ width: '500px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              variant="default"
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </div>
          {results.length > 0 && (
            <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
              <h4 style={{ margin: 0, marginBottom: '8px' }}>Search Results:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    };

    return <SearchExample />;
  },
};

/**
 * 실제 사용 사례: 유효성 검사가 있는 폼 필드
 */
export const ValidationExample: Story = {
  render: () => {
    const ValidationExample = () => {
      const [value, setValue] = useState('');
      const [touched, setTouched] = useState(false);
      const isValid = value.length >= 6;
      const showError = touched && !isValid;

      return (
        <div style={{ width: '400px' }}>
          <Label htmlFor="validated">Password (min 6 characters)</Label>
          <Input
            id="validated"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showError}
            placeholder="Enter password"
          />
          {showError && (
            <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              Password must be at least 6 characters long
            </span>
          )}
          {touched && isValid && (
            <span style={{ color: '#28a745', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              ✓ Password is valid
            </span>
          )}
        </div>
      );
    };

    return <ValidationExample />;
  },
};