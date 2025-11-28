import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';
import { Input } from '../input/input';
import { Checkbox } from '../checkbox/checkbox';
import { NativeSelect } from '../select/native-select';
import { Textarea } from '../textarea/textarea';
import { useState } from 'react';

/**
 * # Label 컴포넌트
 *
 * Label은 폼 요소와 연결되는 접근 가능한 레이블 컴포넌트입니다.
 * Radix UI Label을 기반으로 구축되어 완벽한 접근성과 사용자 경험을 제공합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Label } from '@/shared/ui/label';
 * import { Input } from '@/shared/ui/input';
 *
 * function MyComponent() {
 *   return (
 *     <div>
 *       <Label htmlFor="email">Email Address</Label>
 *       <Input id="email" type="email" />
 *     </div>
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **Radix UI 기반**: 완벽한 접근성 지원
 * - **자동 연결**: htmlFor 속성으로 폼 요소와 자동 연결
 * - **클릭 가능**: 레이블 클릭 시 연결된 폼 요소로 포커스 이동
 * - **스크린 리더 지원**: 보조 기술과 완벽하게 호환
 * - **타이포그래피 스타일**: label-md 유틸리티 클래스 적용
 * - **유연한 스타일링**: className을 통한 커스터마이징 가능
 */
const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label 컴포넌트는 폼 요소를 설명하는 접근 가능한 레이블입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      description: '연결할 폼 요소의 id 속성값',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: '레이블 텍스트 또는 내용',
      control: { type: 'text' },
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * 기본 Label입니다.
 */
export const Default: Story = {
  args: {
    children: 'Label Text',
  },
};

/**
 * Input과 함께 사용하는 Label입니다.
 * htmlFor 속성으로 Input의 id와 연결됩니다.
 */
export const WithInput: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Label htmlFor="username">Username</Label>
      <Input id="username" type="text" placeholder="Enter your username" />
    </div>
  ),
};

/**
 * 다양한 Input 타입과 함께 사용하는 Label입니다.
 */
export const WithDifferentInputTypes: Story = {
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
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="010-1234-5678" />
      </div>
      <div>
        <Label htmlFor="birthdate">Birth Date</Label>
        <Input id="birthdate" type="date" />
      </div>
    </div>
  ),
};

/**
 * Textarea와 함께 사용하는 Label입니다.
 */
export const WithTextarea: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Enter your message here..." />
    </div>
  ),
};

/**
 * Select와 함께 사용하는 Label입니다.
 */
export const WithSelect: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Label htmlFor="country">Country</Label>
      <NativeSelect id="country">
        <option value="">Select a country</option>
        <option value="kr">South Korea</option>
        <option value="us">United States</option>
        <option value="jp">Japan</option>
        <option value="cn">China</option>
      </NativeSelect>
    </div>
  ),
};

/**
 * Checkbox와 함께 사용하는 Label입니다.
 * Checkbox는 레이블과 나란히 배치되는 경우가 많습니다.
 */
export const WithCheckbox: Story = {
  render: () => {
    const CheckboxExample = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox
              id="terms"
              checked={checked}
              onCheckedChange={(checked) => setChecked(!!checked)}
            />
            <Label htmlFor="terms" style={{ cursor: 'pointer', marginBottom: 0 }}>
              I agree to the terms and conditions
            </Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" style={{ cursor: 'pointer', marginBottom: 0 }}>
              Subscribe to newsletter
            </Label>
          </div>
        </div>
      );
    };

    return <CheckboxExample />;
  },
};

/**
 * 필수 입력 표시가 있는 Label입니다.
 * 빨간색 별표(*)로 필수 필드임을 나타냅니다.
 */
export const WithRequiredIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="required-email">
          Email Address <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input id="required-email" type="email" placeholder="john@example.com" required />
      </div>
      <div>
        <Label htmlFor="required-password">
          Password <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input id="required-password" type="password" placeholder="Enter password" required />
      </div>
      <div>
        <Label htmlFor="optional-phone">
          Phone Number <span style={{ color: '#666', fontSize: '14px' }}>(optional)</span>
        </Label>
        <Input id="optional-phone" type="tel" placeholder="010-1234-5678" />
      </div>
    </div>
  ),
};

/**
 * 도움말 텍스트와 함께 사용하는 Label입니다.
 */
export const WithHelperText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="password-helper">Password</Label>
        <Input id="password-helper" type="password" placeholder="Enter password" />
        <p style={{ fontSize: '14px', color: '#666', marginTop: '4px', marginBottom: 0 }}>
          Must be at least 8 characters long
        </p>
      </div>
      <div>
        <Label htmlFor="username-helper">Username</Label>
        <Input id="username-helper" type="text" placeholder="johndoe" />
        <p style={{ fontSize: '14px', color: '#666', marginTop: '4px', marginBottom: 0 }}>
          Only lowercase letters, numbers, and underscores
        </p>
      </div>
    </div>
  ),
};

/**
 * 에러 메시지와 함께 사용하는 Label입니다.
 */
export const WithErrorMessage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="error-email">Email Address</Label>
        <Input
          id="error-email"
          type="email"
          placeholder="john@example.com"
          aria-invalid={true}
          value="invalid-email"
        />
        <p style={{ fontSize: '14px', color: '#dc3545', marginTop: '4px', marginBottom: 0 }}>
          Please enter a valid email address
        </p>
      </div>
      <div>
        <Label htmlFor="error-password">Password</Label>
        <Input
          id="error-password"
          type="password"
          placeholder="Enter password"
          aria-invalid={true}
          value="123"
        />
        <p style={{ fontSize: '14px', color: '#dc3545', marginTop: '4px', marginBottom: 0 }}>
          Password must be at least 8 characters
        </p>
      </div>
    </div>
  ),
};

/**
 * 비활성화된 폼 요소와 함께 사용하는 Label입니다.
 */
export const WithDisabledInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="disabled-input" style={{ opacity: 0.5 }}>
          Disabled Field
        </Label>
        <Input id="disabled-input" disabled value="This field is disabled" />
      </div>
      <div>
        <Label htmlFor="readonly-input">Read-only Field</Label>
        <Input id="readonly-input" readOnly value="This field is read-only" />
      </div>
    </div>
  ),
};

/**
 * 커스텀 스타일링이 적용된 Label입니다.
 */
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="bold" className="text-lg font-bold">
          Bold Label
        </Label>
        <Input id="bold" type="text" placeholder="With bold label" />
      </div>
      <div>
        <Label htmlFor="colored" style={{ color: '#007bff', fontWeight: 600 }}>
          Colored Label
        </Label>
        <Input id="colored" type="text" placeholder="With colored label" />
      </div>
      <div>
        <Label htmlFor="uppercase" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Uppercase Label
        </Label>
        <Input id="uppercase" type="text" placeholder="With uppercase label" />
      </div>
    </div>
  ),
};

/**
 * 실제 사용 사례: 회원가입 폼
 */
export const RegistrationForm: Story = {
  render: () => {
    const RegistrationFormExample = () => {
      const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });

      const [errors, setErrors] = useState<Record<string, string>>({});

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.username) {
          newErrors.username = 'Username is required';
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        }
        if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeTerms) {
          newErrors.agreeTerms = 'You must agree to the terms';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          alert('Form submitted successfully!');
        }
      };

      return (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            width: '400px',
          }}
        >
          <h3 style={{ margin: 0, marginBottom: '24px' }}>Create Account</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="reg-username">
                Username <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="reg-username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                aria-invalid={!!errors.username}
                required
              />
              {errors.username && (
                <p
                  style={{ fontSize: '14px', color: '#dc3545', marginTop: '4px', marginBottom: 0 }}
                >
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="reg-email">
                Email Address <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="reg-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <p
                  style={{ fontSize: '14px', color: '#dc3545', marginTop: '4px', marginBottom: 0 }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="reg-password">
                Password <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="reg-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                aria-invalid={!!errors.password}
                required
              />
              <p style={{ fontSize: '14px', color: '#666', marginTop: '4px', marginBottom: 0 }}>
                Must be at least 8 characters
              </p>
              {errors.password && (
                <p
                  style={{ fontSize: '14px', color: '#dc3545', marginTop: '4px', marginBottom: 0 }}
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="reg-confirm-password">
                Confirm Password <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="reg-confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                aria-invalid={!!errors.confirmPassword}
                required
              />
              {errors.confirmPassword && (
                <p
                  style={{ fontSize: '14px', color: '#dc3545', marginTop: '4px', marginBottom: 0 }}
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                id="reg-terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: !!checked })}
                required
              />
              <Label htmlFor="reg-terms" style={{ cursor: 'pointer', marginBottom: 0 }}>
                I agree to the Terms of Service <span style={{ color: 'red' }}>*</span>
              </Label>
            </div>
            {errors.agreeTerms && (
              <p style={{ fontSize: '14px', color: '#dc3545', marginTop: '-8px', marginBottom: 0 }}>
                {errors.agreeTerms}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px',
                fontWeight: 600,
              }}
            >
              Create Account
            </button>
          </div>
        </form>
      );
    };

    return <RegistrationFormExample />;
  },
};

/**
 * 실제 사용 사례: 연락처 폼
 */
export const ContactForm: Story = {
  render: () => {
    const ContactFormExample = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      return (
        <div
          style={{
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            width: '500px',
          }}
        >
          <h3 style={{ margin: 0, marginBottom: '24px' }}>Contact Us</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="contact-name">
                Name <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <Label htmlFor="contact-email">
                Email <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="contact-subject">
                Subject <span style={{ color: 'red' }}>*</span>
              </Label>
              <NativeSelect
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feedback">Feedback</option>
              </NativeSelect>
            </div>

            <div>
              <Label htmlFor="contact-message">
                Message <span style={{ color: 'red' }}>*</span>
              </Label>
              <Textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your inquiry in detail..."
                required
              />
              <p style={{ fontSize: '14px', color: '#666', marginTop: '4px', marginBottom: 0 }}>
                Characters: {formData.message.length}
              </p>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px',
                fontWeight: 600,
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      );
    };

    return <ContactFormExample />;
  },
};

/**
 * 접근성 모범 사례: 완벽하게 구조화된 폼
 */
export const AccessibilityBestPractices: Story = {
  render: () => (
    <div
      style={{
        padding: '24px',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        width: '400px',
      }}
    >
      <h3 style={{ margin: 0, marginBottom: '8px' }}>Accessible Form Example</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        This form demonstrates accessibility best practices
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Label htmlFor="a11y-name">
            Full Name{' '}
            <span style={{ color: 'red' }} aria-label="required">
              *
            </span>
          </Label>
          <Input
            id="a11y-name"
            type="text"
            placeholder="John Doe"
            aria-required="true"
            aria-describedby="name-help"
          />
          <p
            id="name-help"
            style={{ fontSize: '14px', color: '#666', marginTop: '4px', marginBottom: 0 }}
          >
            Enter your first and last name
          </p>
        </div>

        <div>
          <Label htmlFor="a11y-email">
            Email Address{' '}
            <span style={{ color: 'red' }} aria-label="required">
              *
            </span>
          </Label>
          <Input
            id="a11y-email"
            type="email"
            placeholder="john@example.com"
            aria-required="true"
            aria-describedby="email-help"
          />
          <p
            id="email-help"
            style={{ fontSize: '14px', color: '#666', marginTop: '4px', marginBottom: 0 }}
          >
            We'll never share your email
          </p>
        </div>

        <div role="group" aria-labelledby="preferences-label">
          <p id="preferences-label" style={{ fontWeight: 600, marginBottom: '8px' }}>
            Preferences
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="pref-newsletter" />
              <Label htmlFor="pref-newsletter" style={{ cursor: 'pointer', marginBottom: 0 }}>
                Email newsletter
              </Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="pref-updates" />
              <Label htmlFor="pref-updates" style={{ cursor: 'pointer', marginBottom: 0 }}>
                Product updates
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
