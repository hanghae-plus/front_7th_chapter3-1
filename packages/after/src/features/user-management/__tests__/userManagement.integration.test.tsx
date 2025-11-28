import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useUserManagement } from '../hooks/useUserManagement';
import { UserForm } from '../components/UserForm';
import { userService } from '../services/userService';

// 테스트용 래퍼 컴포넌트
function UserManagementTestWrapper() {
  const {
    users,
    createUser,
    updateUser,
    deleteUser,
    error,
  } = useUserManagement();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({});
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const handleOpenForm = (user?: any) => {
    if (user) {
      setFormData(user);
      setEditingId(user.id);
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
        await updateUser(editingId, formData);
      } else {
        await createUser(formData);
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
          <UserForm formData={formData} onChange={setFormData} />
          <button onClick={handleSubmit}>
            {editingId ? '수정 완료' : '생성'}
          </button>
        </div>
      )}

      <div data-testid="user-list">
        {users.map((user) => (
          <div key={user.id} data-testid={`user-${user.id}`}>
            <span data-testid={`username-${user.id}`}>{user.username}</span>
            <span data-testid={`email-${user.id}`}>{user.email}</span>
            <span data-testid={`role-${user.id}`}>{user.role}</span>
            <span data-testid={`status-${user.id}`}>{user.status}</span>
            <button onClick={() => handleOpenForm(user)}>수정</button>
            <button onClick={() => deleteUser(user.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

describe('User Management Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('사용자 생성', () => {
    it('새 사용자를 생성하고 목록에 표시한다', async () => {
      const user = userEvent.setup();
      render(<UserManagementTestWrapper />);

      // 새로 만들기 버튼 클릭
      const createButton = screen.getByRole('button', { name: '새로 만들기' });
      await user.click(createButton);

      // 폼이 나타날 때까지 대기
      await waitFor(() => {
        expect(document.querySelector('input[name="username"]')).toBeInTheDocument();
      });

      // 폼 입력
      const usernameInput = document.querySelector('input[name="username"]') as HTMLInputElement;
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      const roleSelect = document.querySelector('select[name="role"]') as HTMLSelectElement;

      await user.type(usernameInput, 'newuser');
      await user.type(emailInput, 'newuser@example.com');
      await user.selectOptions(roleSelect, 'user');

      // 생성 버튼 클릭
      const submitButton = screen.getByRole('button', { name: '생성' });
      await user.click(submitButton);

      // 새 사용자가 목록에 나타나는지 확인
      await waitFor(() => {
        expect(screen.getByText('newuser')).toBeInTheDocument();
        expect(screen.getByText('newuser@example.com')).toBeInTheDocument();
      });
    });

    it('중복된 username으로 생성 시 에러가 발생한다', async () => {
      const user = userEvent.setup();
      render(<UserManagementTestWrapper />);

      // 새로 만들기 버튼 클릭
      await user.click(screen.getByRole('button', { name: '새로 만들기' }));

      await waitFor(() => {
        expect(document.querySelector('input[name="username"]')).toBeInTheDocument();
      });

      // 기존 사용자와 동일한 username 입력
      const usernameInput = document.querySelector('input[name="username"]') as HTMLInputElement;
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      const roleSelect = document.querySelector('select[name="role"]') as HTMLSelectElement;

      await user.type(usernameInput, 'admin'); // 기존 사용자
      await user.type(emailInput, 'newemail@example.com');
      await user.selectOptions(roleSelect, 'user');

      // 생성 시도
      const submitButton = screen.getByRole('button', { name: '생성' });
      await user.click(submitButton);

      // 에러 메시지 확인 (Alert 컴포넌트가 표시되어야 함)
      await waitFor(() => {
        expect(screen.getByText(/유저 이름이 이미 존재합니다/i)).toBeInTheDocument();
      });
    });

    it('중복된 email로 생성 시 에러가 발생한다', async () => {
      const user = userEvent.setup();
      render(<UserManagementTestWrapper />);

      await user.click(screen.getByRole('button', { name: '새로 만들기' }));

      await waitFor(() => {
        expect(document.querySelector('input[name="username"]')).toBeInTheDocument();
      });

      const usernameInput = document.querySelector('input[name="username"]') as HTMLInputElement;
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      const roleSelect = document.querySelector('select[name="role"]') as HTMLSelectElement;

      await user.type(usernameInput, 'uniqueuser');
      await user.type(emailInput, 'admin@example.com'); // 기존 이메일
      await user.selectOptions(roleSelect, 'user');

      const submitButton = screen.getByRole('button', { name: '생성' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/이메일이 이미 존재합니다/i)).toBeInTheDocument();
      });
    });
  });

  describe('사용자 수정', () => {
    it('기존 사용자 정보를 수정한다', async () => {
      const user = userEvent.setup();
      render(<UserManagementTestWrapper />);

      // 첫 번째 사용자의 수정 버튼 찾기
      await waitFor(() => {
        expect(screen.getByTestId('user-1')).toBeInTheDocument();
      });

      const editButtons = screen.getAllByRole('button', { name: '수정' });
      await user.click(editButtons[0]);

      // 폼이 나타나고 기존 값이 채워져 있는지 확인
      await waitFor(() => {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
        expect(emailInput).toBeInTheDocument();
        expect(emailInput.value).toBe('admin@example.com');
      });

      // 이메일 수정
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
      await user.clear(emailInput);
      await user.type(emailInput, 'admin.updated@example.com');

      // 수정 완료
      const updateButton = screen.getByRole('button', { name: '수정 완료' });
      await user.click(updateButton);

      // 수정된 정보 확인
      await waitFor(() => {
        expect(screen.getByText('admin.updated@example.com')).toBeInTheDocument();
        expect(screen.queryByText('admin@example.com')).not.toBeInTheDocument();
      });
    });
  });

  describe('사용자 삭제', () => {
    it('사용자를 삭제한다', async () => {
      const user = userEvent.setup();
      render(<UserManagementTestWrapper />);

      // 초기 사용자 수 확인
      await waitFor(() => {
        expect(screen.getByTestId('user-1')).toBeInTheDocument();
      });

      const initialUsers = screen.getAllByTestId(/^user-\d+$/);
      const initialCount = initialUsers.length;

      // 첫 번째 사용자 삭제
      const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
      await user.click(deleteButtons[0]);

      // 사용자가 삭제되었는지 확인
      await waitFor(() => {
        const currentUsers = screen.queryAllByTestId(/^user-\d+$/);
        expect(currentUsers.length).toBe(initialCount - 1);
      });
    });
  });

  describe('사용자 서비스 통합', () => {
    it('userService의 모든 CRUD 작업이 정상 동작한다', async () => {
      // Create
      const newUser = await userService.create({
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        status: 'active',
      });

      expect(newUser.id).toBeDefined();
      expect(newUser.username).toBe('testuser');
      expect(newUser.createdAt).toBeDefined();

      // Read
      const users = await userService.getAll();
      expect(users.some(u => u.id === newUser.id)).toBe(true);

      const foundUser = await userService.getById(newUser.id);
      expect(foundUser).toBeTruthy();
      expect(foundUser?.username).toBe('testuser');

      // Update
      const updatedUser = await userService.update(newUser.id, {
        email: 'updated@example.com',
        status: 'suspended',
      });
      expect(updatedUser.email).toBe('updated@example.com');
      expect(updatedUser.status).toBe('suspended');

      // Delete
      await userService.delete(newUser.id);
      const deletedUser = await userService.getById(newUser.id);
      expect(deletedUser).toBeNull();
    });

    it('username과 email 중복 체크가 동작한다', async () => {
      const usernameAvailable = await userService.checkUsernameAvailable('admin');
      expect(usernameAvailable).toBe(false);

      const newUsername = await userService.checkUsernameAvailable('nonexistent');
      expect(newUsername).toBe(true);

      const emailAvailable = await userService.checkEmailAvailable('admin@example.com');
      expect(emailAvailable).toBe(false);

      const newEmail = await userService.checkEmailAvailable('new@example.com');
      expect(newEmail).toBe(true);
    });
  });

  describe('에러 처리', () => {
    it('존재하지 않는 사용자 수정 시 에러가 발생한다', async () => {
      await expect(
        userService.update(99999, { email: 'test@example.com' })
      ).rejects.toThrow('유저를 찾을 수 없습니다.');
    });

    it('존재하지 않는 사용자 삭제 시 에러가 발생한다', async () => {
      await expect(
        userService.delete(99999)
      ).rejects.toThrow('유저를 찾을 수 없습니다.');
    });
  });
});
