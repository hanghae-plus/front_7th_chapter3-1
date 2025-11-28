import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { usePostManagement } from '../hooks/usePostManagement';
import { PostForm } from '../components/PostForm';
import { postService } from '../services/postService';

// 테스트용 래퍼 컴포넌트
function PostManagementTestWrapper() {
  const {
    posts,
    createPost,
    updatePost,
    deletePost,
    error,
  } = usePostManagement();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({});
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const handleOpenForm = (post?: any) => {
    if (post) {
      setFormData(post);
      setEditingId(post.id);
    } else {
      setFormData({});
      setEditingId(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setFormData({});
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updatePost(editingId, formData);
      } else {
        await createPost(formData);
      }
      handleCloseForm();
    } catch (err) {
      // 에러는 hook의 error state에 저장됨
    }
  };

  return (
    <div>
      <button onClick={() => handleOpenForm()}>새로 만들기</button>

      {error && <div>{error}</div>}

      {isFormOpen && (
        <div>
          <PostForm formData={formData} onChange={setFormData} />
          <button onClick={handleSubmit}>
            {editingId ? '수정 완료' : '생성'}
          </button>
        </div>
      )}

      <div data-testid="post-list">
        {posts.map((post) => (
          <div key={post.id} data-testid={`post-${post.id}`}>
            <span data-testid={`title-${post.id}`}>{post.title}</span>
            <span data-testid={`author-${post.id}`}>{post.author}</span>
            <span data-testid={`category-${post.id}`}>{post.category}</span>
            <span data-testid={`status-${post.id}`}>{post.status}</span>
            <span data-testid={`views-${post.id}`}>{post.views}</span>
            <button onClick={() => handleOpenForm(post)}>수정</button>
            <button onClick={() => deletePost(post.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

describe('Post Management Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('게시글 생성', () => {
    it('새 게시글을 생성하고 목록에 표시한다', async () => {
      const user = userEvent.setup();
      render(<PostManagementTestWrapper />);

      // 새로 만들기 버튼 클릭
      const createButton = screen.getByRole('button', { name: '새로 만들기' });
      await user.click(createButton);

      // 폼이 나타날 때까지 대기
      await waitFor(() => {
        expect(document.querySelector('input[name="title"]')).toBeInTheDocument();
      });

      // 폼 입력
      const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
      const contentTextarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
      const authorInput = document.querySelector('input[name="author"]') as HTMLInputElement;
      const categorySelect = document.querySelector('select[name="category"]') as HTMLSelectElement;

      await user.type(titleInput, 'New Test Post Title');
      await user.type(contentTextarea, 'This is test content for the new post');
      await user.type(authorInput, 'Test Author');
      await user.selectOptions(categorySelect, 'development');

      // 생성 버튼 클릭
      const submitButton = screen.getByRole('button', { name: '생성' });
      await user.click(submitButton);

      // 새 게시글이 목록에 나타나는지 확인
      await waitFor(() => {
        expect(screen.getByText('New Test Post Title')).toBeInTheDocument();
        expect(screen.getByText('Test Author')).toBeInTheDocument();
      });
    });

    it('제목이 5자 미만인 경우 생성이 실패한다', async () => {
      const user = userEvent.setup();
      render(<PostManagementTestWrapper />);

      await user.click(screen.getByRole('button', { name: '새로 만들기' }));

      await waitFor(() => {
        expect(document.querySelector('input[name="title"]')).toBeInTheDocument();
      });

      const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
      const contentTextarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
      const authorInput = document.querySelector('input[name="author"]') as HTMLInputElement;
      const categorySelect = document.querySelector('select[name="category"]') as HTMLSelectElement;

      await user.type(titleInput, 'Test'); // 4자 (너무 짧음)
      await user.type(contentTextarea, 'Content');
      await user.type(authorInput, 'Author');
      await user.selectOptions(categorySelect, 'development');

      const submitButton = screen.getByRole('button', { name: '생성' });
      await user.click(submitButton);

      // 에러 메시지 확인
      await waitFor(() => {
        expect(screen.getByText(/Title must be at least 5 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe('게시글 수정', () => {
    it('기존 게시글 정보를 수정한다', async () => {
      const user = userEvent.setup();
      render(<PostManagementTestWrapper />);

      // 첫 번째 게시글의 수정 버튼 찾기
      await waitFor(() => {
        expect(screen.getByTestId('post-1')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByRole('button', { name: '수정' });
      await user.click(editButtons[0]);

      // 폼이 나타나고 기존 값이 채워져 있는지 확인
      await waitFor(() => {
        const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
        expect(titleInput).toBeInTheDocument();
        expect(titleInput.value).toBe('디자인 시스템 구축 가이드');
      });

      // 제목 수정
      const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
      await user.clear(titleInput);
      await user.type(titleInput, 'Updated Design System Guide');

      // 수정 완료
      const updateButton = screen.getByRole('button', { name: '수정 완료' });
      await user.click(updateButton);

      // 수정된 정보 확인
      await waitFor(() => {
        expect(screen.getByText('Updated Design System Guide')).toBeInTheDocument();
        expect(screen.queryByText('디자인 시스템 구축 가이드')).not.toBeInTheDocument();
      });
    });
  });

  describe('게시글 삭제', () => {
    it('게시글을 삭제한다', async () => {
      const user = userEvent.setup();
      render(<PostManagementTestWrapper />);

      // 초기 게시글 수 확인
      await waitFor(() => {
        expect(screen.getByTestId('post-1')).toBeInTheDocument();
      });

      const initialPosts = screen.getAllByTestId(/^post-\d+$/);
      const initialCount = initialPosts.length;

      // 첫 번째 게시글 삭제
      const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
      await user.click(deleteButtons[0]);

      // 게시글이 삭제되었는지 확인
      await waitFor(() => {
        const currentPosts = screen.queryAllByTestId(/^post-\d+$/);
        expect(currentPosts.length).toBe(initialCount - 1);
      });
    });
  });

  describe('게시글 서비스 통합', () => {
    it('postService의 모든 CRUD 작업이 정상 동작한다', async () => {
      // Create
      const newPost = await postService.create({
        title: 'Test Post Title',
        content: 'Test content',
        author: 'Test Author',
        category: 'development',
        status: 'draft',
      });

      expect(newPost.id).toBeDefined();
      expect(newPost.title).toBe('Test Post Title');
      expect(newPost.views).toBe(0);
      expect(newPost.createdAt).toBeDefined();

      // Read
      const posts = await postService.getAll();
      expect(posts.some(p => p.id === newPost.id)).toBe(true);

      const foundPost = await postService.getById(newPost.id);
      expect(foundPost).toBeTruthy();
      expect(foundPost?.title).toBe('Test Post Title');

      // Update
      const updatedPost = await postService.update(newPost.id, {
        title: 'Updated Test Post',
        content: 'Updated content',
      });
      expect(updatedPost.title).toBe('Updated Test Post');
      expect(updatedPost.updatedAt).toBeDefined();

      // Delete
      await postService.delete(newPost.id);
      const deletedPost = await postService.getById(newPost.id);
      expect(deletedPost).toBeNull();
    });

    it('게시글 발행 기능이 동작한다', async () => {
      const newPost = await postService.create({
        title: 'Draft Post',
        content: 'Content',
        author: 'Author',
        category: 'development',
        status: 'draft',
      });

      expect(newPost.status).toBe('draft');

      const publishedPost = await postService.publish(newPost.id);
      expect(publishedPost.status).toBe('published');

      // 이미 발행된 게시글 다시 발행 시 에러
      await expect(
        postService.publish(newPost.id)
      ).rejects.toThrow('Post is already published');
    });

    it('게시글 보관 및 복원 기능이 동작한다', async () => {
      const newPost = await postService.create({
        title: 'Test Post',
        content: 'Content',
        author: 'Author',
        category: 'development',
        status: 'published',
      });

      // 보관
      const archivedPost = await postService.archive(newPost.id);
      expect(archivedPost.status).toBe('archived');

      // 복원
      const restoredPost = await postService.restore(newPost.id);
      expect(restoredPost.status).toBe('published');

      // 보관되지 않은 게시글 복원 시 에러
      await expect(
        postService.restore(newPost.id)
      ).rejects.toThrow('Only archived posts can be restored');
    });
  });

  describe('에러 처리', () => {
    it('존재하지 않는 게시글 수정 시 에러가 발생한다', async () => {
      await expect(
        postService.update(99999, { title: 'Test' })
      ).rejects.toThrow('Post not found');
    });

    it('존재하지 않는 게시글 삭제 시 에러가 발생한다', async () => {
      await expect(
        postService.delete(99999)
      ).rejects.toThrow('Post not found');
    });

    it('존재하지 않는 게시글 발행 시 에러가 발생한다', async () => {
      await expect(
        postService.publish(99999)
      ).rejects.toThrow('Post not found');
    });

    it('제목이 너무 짧은 경우 생성 시 에러가 발생한다', async () => {
      await expect(
        postService.create({
          title: 'AB',
          content: 'Content',
          author: 'Author',
          category: 'development',
          status: 'draft',
        })
      ).rejects.toThrow('Title must be at least 5 characters');
    });
  });
});
