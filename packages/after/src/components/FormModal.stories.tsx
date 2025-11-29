import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormModal } from './FormModal';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormTextarea } from './FormTextarea';
import { Button } from '@bento/ui/button';

const meta: Meta<typeof FormModal> = {
  title: 'Composed/FormModal',
  component: FormModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormModal>;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="기본 모달"
          description="모달 설명 텍스트입니다."
          onSubmit={() => {
            alert('제출됨!');
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        >
          <div className="py-4">
            <p>모달 본문 내용이 여기에 들어갑니다.</p>
          </div>
        </FormModal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: '', email: '' });

    return (
      <>
        <Button onClick={() => setOpen(true)}>사용자 추가</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="새 사용자 추가"
          description="사용자 정보를 입력하세요."
          submitText="추가"
          onSubmit={() => {
            alert(`추가: ${form.name} (${form.email})`);
            setOpen(false);
            setForm({ name: '', email: '' });
          }}
          onCancel={() => setOpen(false)}
        >
          <div className="py-4 space-y-4">
            <FormInput
              id="modal-name"
              label="이름"
              placeholder="이름을 입력하세요"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <FormInput
              id="modal-email"
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </FormModal>
      </>
    );
  },
};

export const LargeSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>큰 모달 열기</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="게시물 작성"
          size="lg"
          onSubmit={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          submitText="게시"
        >
          <div className="py-4 space-y-4">
            <FormInput id="post-title" label="제목" placeholder="제목을 입력하세요" required />
            <FormSelect
              id="post-category"
              label="카테고리"
              options={[
                { value: 'notice', label: '공지' },
                { value: 'general', label: '일반' },
                { value: 'qna', label: 'Q&A' },
              ]}
            />
            <FormTextarea
              id="post-content"
              label="내용"
              placeholder="내용을 입력하세요..."
              rows={6}
              required
            />
          </div>
        </FormModal>
      </>
    );
  },
};

export const Submitting: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setOpen(false);
        alert('저장 완료!');
      }, 2000);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>저장 시뮬레이션</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="저장 중 상태"
          description="제출 버튼을 클릭하면 2초간 로딩됩니다."
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        >
          <div className="py-4">
            <FormInput id="save-name" label="이름" placeholder="이름을 입력하세요" />
          </div>
        </FormModal>
      </>
    );
  },
};

export const CustomFooter: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>커스텀 푸터</Button>
        <FormModal
          open={open}
          onOpenChange={setOpen}
          title="커스텀 푸터 모달"
          footer={
            <div className="flex justify-between w-full">
              <Button variant="destructive" onClick={() => alert('삭제!')}>
                삭제
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setOpen(false)}>저장</Button>
              </div>
            </div>
          }
        >
          <div className="py-4">
            <p>커스텀 푸터를 사용하면 자유로운 버튼 배치가 가능합니다.</p>
          </div>
        </FormModal>
      </>
    );
  },
};
