import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';
import { Label } from '../label/label';
import { useState } from 'react';

/**
 * # Textarea 컴포넌트
 *
 * Textarea는 사용자로부터 여러 줄의 텍스트 입력을 받는 폼 컴포넌트입니다.
 * 댓글, 설명, 메시지 등 긴 텍스트 입력에 적합하며, 유연한 크기 조절이 가능합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Textarea } from '@/shared/ui/textarea';
 *
 * function MyComponent() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <Textarea
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       placeholder="Enter your message..."
 *     />
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **자동 리사이징**: resize-y를 통한 세로 방향 크기 조절
 * - **최소 높이**: 6em의 기본 최소 높이 제공
 * - **포커스 상태**: 명확한 포커스 인디케이터
 * - **에러 상태**: aria-invalid 속성 지원
 * - **비활성화 상태**: disabled 속성 지원
 * - **접근성**: 시맨틱 HTML과 ARIA 속성 지원
 */
const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Textarea 컴포넌트는 여러 줄의 텍스트 입력을 위한 폼 요소입니다.',
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
    placeholder: {
      description: '입력 필드의 플레이스홀더 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
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
    rows: {
      description: '표시할 텍스트 줄 수',
      control: { type: 'number', min: 1, max: 20 },
      table: {
        type: { summary: 'number' },
      },
    },
    maxLength: {
      description: '최대 입력 가능 문자 수',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    value: {
      description: 'Textarea의 값',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
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
type Story = StoryObj<typeof Textarea>;

/**
 * 기본 Textarea입니다.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

/**
 * 다양한 크기의 Textarea입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500 }}>Small (3 rows)</p>
        <Textarea rows={3} placeholder="Small textarea (3 rows)" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500 }}>Medium (5 rows)</p>
        <Textarea rows={5} placeholder="Medium textarea (5 rows)" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500 }}>Large (10 rows)</p>
        <Textarea rows={10} placeholder="Large textarea (10 rows)" />
      </div>
    </div>
  ),
};

/**
 * 비활성화된 Textarea입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This textarea is disabled and cannot be edited.',
  },
};

/**
 * 읽기 전용 Textarea입니다.
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'This textarea is read-only. You can select and copy the text, but cannot edit it.',
  },
};

/**
 * 레이블과 함께 사용하는 Textarea입니다.
 */
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '500px' }}>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Textarea id="comment" placeholder="Leave a comment..." rows={4} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe your project..." rows={5} />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." rows={6} />
      </div>
    </div>
  ),
};

/**
 * 에러 상태의 Textarea입니다.
 */
export const ErrorState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '500px' }}>
      <Label htmlFor="error-textarea">Message</Label>
      <Textarea
        id="error-textarea"
        placeholder="Enter your message..."
        aria-invalid={true}
        value="Too short"
        rows={4}
      />
      <span style={{ color: '#dc3545', fontSize: '14px' }}>
        Message must be at least 20 characters long
      </span>
    </div>
  ),
};

/**
 * 제어된 Textarea 예제입니다.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledTextarea = () => {
      const [value, setValue] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
          <div>
            <Label htmlFor="controlled">Controlled Textarea</Label>
            <Textarea
              id="controlled"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type something..."
              rows={5}
            />
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Current value: "{value}" (Length: {value.length} characters)
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setValue('')}
              style={{
                padding: '8px 16px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
            <button
              onClick={() => setValue('Hello World!\nThis is a sample text.')}
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Set Sample Text
            </button>
            <button
              onClick={() => setValue(value.toUpperCase())}
              style={{
                padding: '8px 16px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              To Uppercase
            </button>
          </div>
        </div>
      );
    };

    return <ControlledTextarea />;
  },
};

/**
 * 문자 수 카운터가 있는 Textarea입니다.
 */
export const WithCharacterCount: Story = {
  render: () => {
    const CharacterCountExample = () => {
      const [value, setValue] = useState('');
      const maxLength = 200;
      const remaining = maxLength - value.length;
      const isOverLimit = remaining < 0;
      const isNearLimit = remaining <= 20 && remaining >= 0;

      return (
        <div style={{ width: '500px' }}>
          <Label htmlFor="char-count">Message (max 200 characters)</Label>
          <Textarea
            id="char-count"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your message..."
            rows={5}
            aria-invalid={isOverLimit}
          />
          <div
            style={{
              fontSize: '14px',
              textAlign: 'right',
              marginTop: '4px',
              color: isOverLimit ? '#dc3545' : isNearLimit ? '#ffc107' : '#666',
            }}
          >
            {value.length} / {maxLength} characters
            {isOverLimit && (
              <span style={{ marginLeft: '8px', fontWeight: 500 }}>
                ({Math.abs(remaining)} over limit)
              </span>
            )}
          </div>
        </div>
      );
    };

    return <CharacterCountExample />;
  },
};

/**
 * 실제 사용 사례: 댓글 작성 폼
 */
export const CommentForm: Story = {
  render: () => {
    const CommentFormExample = () => {
      const [comment, setComment] = useState('');
      const [submitted, setSubmitted] = useState(false);

      const handleSubmit = () => {
        if (comment.trim()) {
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setComment('');
          }, 2000);
        }
      };

      return (
        <div
          style={{
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            width: '600px',
          }}
        >
          <h3 style={{ margin: 0, marginBottom: '16px' }}>Add a Comment</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="comment-input">Your Comment</Label>
              <Textarea
                id="comment-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {comment.length} characters
              </span>
              <button
                onClick={handleSubmit}
                disabled={!comment.trim()}
                style={{
                  padding: '8px 24px',
                  background: comment.trim() ? '#007bff' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: comment.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Post Comment
              </button>
            </div>
            {submitted && (
              <div
                style={{
                  padding: '12px',
                  background: '#d4edda',
                  color: '#155724',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                Comment posted successfully!
              </div>
            )}
          </div>
        </div>
      );
    };

    return <CommentFormExample />;
  },
};

/**
 * 실제 사용 사례: 프로필 Bio 편집
 */
export const ProfileBio: Story = {
  render: () => {
    const ProfileBioExample = () => {
      const [bio, setBio] = useState(
        'Software developer with a passion for creating beautiful and functional web applications.'
      );
      const [isEditing, setIsEditing] = useState(false);
      const maxLength = 160;

      const handleSave = () => {
        setIsEditing(false);
      };

      return (
        <div
          style={{
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            width: '500px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0 }}>Profile Bio</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '6px 12px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Edit
              </button>
            )}
          </div>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, maxLength))}
                rows={4}
                placeholder="Tell us about yourself..."
              />
              <div style={{ fontSize: '14px', color: '#666', textAlign: 'right' }}>
                {bio.length} / {maxLength}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setBio('Software developer with a passion for creating beautiful and functional web applications.');
                  }}
                  style={{
                    padding: '6px 16px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '6px 16px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
              {bio}
            </div>
          )}
        </div>
      );
    };

    return <ProfileBioExample />;
  },
};

/**
 * 실제 사용 사례: 메시지 작성 폼
 */
export const MessageForm: Story = {
  render: () => {
    const MessageFormExample = () => {
      const [recipient, setRecipient] = useState('');
      const [subject, setSubject] = useState('');
      const [message, setMessage] = useState('');
      const [sent, setSent] = useState(false);

      const handleSend = () => {
        if (recipient && subject && message) {
          setSent(true);
          setTimeout(() => {
            setSent(false);
            setRecipient('');
            setSubject('');
            setMessage('');
          }, 3000);
        }
      };

      const isValid = recipient.trim() && subject.trim() && message.trim();

      return (
        <div
          style={{
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            width: '600px',
          }}
        >
          <h3 style={{ margin: 0, marginBottom: '24px' }}>Compose Message</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="recipient">To</Label>
              <input
                id="recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient name"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Message subject"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={8}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {message.length} characters
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    setRecipient('');
                    setSubject('');
                    setMessage('');
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Discard
                </button>
                <button
                  onClick={handleSend}
                  disabled={!isValid}
                  style={{
                    padding: '8px 24px',
                    background: isValid ? '#007bff' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isValid ? 'pointer' : 'not-allowed',
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
            {sent && (
              <div
                style={{
                  padding: '12px',
                  background: '#d4edda',
                  color: '#155724',
                  borderRadius: '4px',
                  fontSize: '14px',
                  textAlign: 'center',
                }}
              >
                Message sent successfully!
              </div>
            )}
          </div>
        </div>
      );
    };

    return <MessageFormExample />;
  },
};

/**
 * 실제 사용 사례: 유효성 검사가 있는 피드백 폼
 */
export const ValidationExample: Story = {
  render: () => {
    const ValidationExample = () => {
      const [feedback, setFeedback] = useState('');
      const [touched, setTouched] = useState(false);
      const minLength = 20;
      const maxLength = 500;
      const isValid = feedback.length >= minLength && feedback.length <= maxLength;
      const showError = touched && !isValid;

      return (
        <div style={{ width: '500px' }}>
          <Label htmlFor="validated">
            Feedback ({minLength}-{maxLength} characters)
          </Label>
          <Textarea
            id="validated"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showError}
            placeholder="Share your feedback..."
            rows={5}
          />
          <div style={{ marginTop: '8px', fontSize: '14px' }}>
            {showError && feedback.length < minLength && (
              <span style={{ color: '#dc3545', display: 'block' }}>
                Feedback must be at least {minLength} characters ({minLength - feedback.length} more needed)
              </span>
            )}
            {showError && feedback.length > maxLength && (
              <span style={{ color: '#dc3545', display: 'block' }}>
                Feedback must not exceed {maxLength} characters ({feedback.length - maxLength} over limit)
              </span>
            )}
            {touched && isValid && (
              <span style={{ color: '#28a745', display: 'block' }}>
                ✓ Feedback length is valid
              </span>
            )}
            <div
              style={{
                textAlign: 'right',
                color: '#666',
                marginTop: '4px',
              }}
            >
              {feedback.length} / {maxLength}
            </div>
          </div>
        </div>
      );
    };

    return <ValidationExample />;
  },
};
