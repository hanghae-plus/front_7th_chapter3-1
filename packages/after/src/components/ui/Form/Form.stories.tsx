import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './index';
import { useState } from 'react';

const meta = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Form Field 예제
export const BasicField: Story = {
  render: () => (
    <Form className="space-y-4 max-w-md">
      <Form.Field name="username" size="md">
        <Form.Label>사용자명</Form.Label>
        <Form.Input
          placeholder="사용자명을 입력하세요"
          value=""
          onChange={() => {}}
        />
      </Form.Field>
    </Form>
  ),
};

// 에러가 있는 Field
export const FieldWithError: Story = {
  render: () => (
    <Form className="space-y-4 max-w-md">
      <Form.Field
        name="email"
        size="md"
        error="유효한 이메일 주소를 입력하세요"
      >
        <Form.Label>이메일</Form.Label>
        <Form.Input
          type="email"
          placeholder="email@example.com"
          value="invalid-email"
          onChange={() => {}}
        />
      </Form.Field>
    </Form>
  ),
};

// Description이 있는 Field
export const FieldWithDescription: Story = {
  render: () => (
    <Form className="space-y-4 max-w-md">
      <Form.Field name="password" size="md">
        <Form.Label>비밀번호</Form.Label>
        <Form.Input
          type="password"
          placeholder="••••••••"
          value=""
          onChange={() => {}}
        />
        <Form.Description>
          최소 8자 이상, 대문자와 숫자를 포함해야 합니다
        </Form.Description>
      </Form.Field>
    </Form>
  ),
};

// 다양한 크기의 Fields
export const DifferentSizes: Story = {
  render: () => (
    <Form className="space-y-6 max-w-md">
      <Form.Field name="small" size="sm">
        <Form.Label>Small Size</Form.Label>
        <Form.Input placeholder="Small input" value="" onChange={() => {}} />
      </Form.Field>

      <Form.Field name="medium" size="md">
        <Form.Label>Medium Size</Form.Label>
        <Form.Input placeholder="Medium input" value="" onChange={() => {}} />
      </Form.Field>

      <Form.Field name="large" size="lg">
        <Form.Label>Large Size</Form.Label>
        <Form.Input placeholder="Large input" value="" onChange={() => {}} />
      </Form.Field>
    </Form>
  ),
};

// Required Field
export const RequiredField: Story = {
  render: () => (
    <Form className="space-y-4 max-w-md">
      <Form.Field name="name" size="md" required>
        <Form.Label>이름</Form.Label>
        <Form.Input
          placeholder="이름을 입력하세요"
          value=""
          onChange={() => {}}
        />
      </Form.Field>
    </Form>
  ),
};

// Select Field
export const SelectField: Story = {
  render: () => (
    <Form className="space-y-4 max-w-md">
      <Form.Field name="role" size="md">
        <Form.Label>역할</Form.Label>
        <Form.Select
          placeholder="역할을 선택하세요"
          options={[
            { value: 'user', label: '사용자' },
            { value: 'admin', label: '관리자' },
            { value: 'moderator', label: '운영자' },
          ]}
          value=""
          onValueChange={() => {}}
        />
      </Form.Field>
    </Form>
  ),
};

// Textarea Field
export const TextareaField: Story = {
  render: () => (
    <Form className="space-y-4 max-w-md">
      <Form.Field name="bio" size="md">
        <Form.Label>자기소개</Form.Label>
        <Form.Textarea
          placeholder="자신을 소개해주세요..."
          rows={5}
          value=""
          onChange={() => {}}
        />
        <Form.Description>최대 500자까지 입력 가능합니다</Form.Description>
      </Form.Field>
    </Form>
  ),
};

// 완전한 Form 예제
const CompleteFormExample = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    bio: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = '사용자명을 입력하세요';
    }
    if (!formData.email) {
      newErrors.email = '이메일을 입력하세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력하세요';
    }
    if (!formData.role) {
      newErrors.role = '역할을 선택하세요';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('폼이 성공적으로 제출되었습니다!');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <Form.Field name="username" size="md" required error={errors.username}>
        <Form.Label>사용자명</Form.Label>
        <Form.Input
          placeholder="사용자명을 입력하세요"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </Form.Field>

      <Form.Field name="email" size="md" required error={errors.email}>
        <Form.Label>이메일</Form.Label>
        <Form.Input
          type="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Field>

      <Form.Field name="role" size="md" required error={errors.role}>
        <Form.Label>역할</Form.Label>
        <Form.Select
          placeholder="역할을 선택하세요"
          options={[
            { value: 'user', label: '사용자' },
            { value: 'admin', label: '관리자' },
            { value: 'moderator', label: '운영자' },
          ]}
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
        />
      </Form.Field>

      <Form.Field name="bio" size="md">
        <Form.Label>자기소개</Form.Label>
        <Form.Textarea
          placeholder="자신을 소개해주세요..."
          rows={5}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <Form.Description>
          선택 사항입니다. 최대 500자까지 입력 가능합니다.
        </Form.Description>
      </Form.Field>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          제출
        </button>
        <button
          type="button"
          onClick={() => {
            setFormData({ username: '', email: '', role: '', bio: '' });
            setErrors({});
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          초기화
        </button>
      </div>
    </Form>
  );
};

export const CompleteForm: Story = {
  render: () => <CompleteFormExample />,
};

// 모든 Field 타입 한눈에 보기
export const AllFieldTypes: Story = {
  render: () => (
    <Form className="space-y-6 max-w-md">
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Input Field</h3>
        <Form.Field name="text" size="md">
          <Form.Label>텍스트 입력</Form.Label>
          <Form.Input
            placeholder="텍스트를 입력하세요"
            value=""
            onChange={() => {}}
          />
        </Form.Field>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Select Field</h3>
        <Form.Field name="select" size="md">
          <Form.Label>선택</Form.Label>
          <Form.Select
            placeholder="옵션을 선택하세요"
            options={[
              { value: '1', label: '옵션 1' },
              { value: '2', label: '옵션 2' },
              { value: '3', label: '옵션 3' },
            ]}
            value=""
            onValueChange={() => {}}
          />
        </Form.Field>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Textarea Field</h3>
        <Form.Field name="textarea" size="md">
          <Form.Label>긴 텍스트 입력</Form.Label>
          <Form.Textarea
            placeholder="여러 줄의 텍스트를 입력하세요..."
            rows={4}
            value=""
            onChange={() => {}}
          />
        </Form.Field>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">With Description</h3>
        <Form.Field name="with-desc" size="md">
          <Form.Label>설명이 있는 필드</Form.Label>
          <Form.Input placeholder="입력하세요" value="" onChange={() => {}} />
          <Form.Description>이것은 필드에 대한 설명입니다</Form.Description>
        </Form.Field>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">With Error</h3>
        <Form.Field name="with-error" size="md" error="에러 메시지">
          <Form.Label>에러가 있는 필드</Form.Label>
          <Form.Input
            placeholder="잘못된 값"
            value="invalid"
            onChange={() => {}}
          />
        </Form.Field>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Required Field</h3>
        <Form.Field name="required" size="md" required>
          <Form.Label>필수 필드</Form.Label>
          <Form.Input placeholder="필수 입력" value="" onChange={() => {}} />
        </Form.Field>
      </div>
    </Form>
  ),
};
