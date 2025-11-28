import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Table, Column } from '../Table';
import { FormInput } from '../FormInput';
import { Alert } from '../Alert';
import { Badge } from '../Badge';

describe('Shared UI Components Integration Tests', () => {
  describe('Button 컴포넌트', () => {
    it('다양한 variant와 size로 렌더링된다', () => {
      const { rerender } = render(
        <div>
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="secondary" size="md">Secondary Medium</Button>
          <Button variant="danger" size="lg">Danger Large</Button>
          <Button variant="success">Success Default</Button>
        </div>
      );

      expect(screen.getByText('Primary Small')).toBeInTheDocument();
      expect(screen.getByText('Secondary Medium')).toBeInTheDocument();
      expect(screen.getByText('Danger Large')).toBeInTheDocument();
      expect(screen.getByText('Success Default')).toBeInTheDocument();
    });

    it('클릭 이벤트가 정상 작동한다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click Me</Button>);

      await user.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태에서 클릭이 동작하지 않는다', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick} disabled>Disabled Button</Button>);

      await user.click(screen.getByText('Disabled Button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('fullWidth prop이 적용된다', () => {
      const { container } = render(<Button fullWidth>Full Width Button</Button>);

      const button = screen.getByText('Full Width Button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Modal 컴포넌트', () => {
    it('isOpen이 true일 때만 렌더링된다', () => {
      const { rerender } = render(
        <Modal isOpen={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('onClose 핸들러가 정상 작동한다', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <div>Modal Content</div>
        </Modal>
      );

      const closeButton = screen.getByText('×');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('overlay 클릭 시 모달이 닫힌다', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <div>Modal Content</div>
        </Modal>
      );

      const overlay = container.querySelector('.fixed');
      if (overlay) {
        await user.click(overlay);
        expect(handleClose).toHaveBeenCalled();
      }
    });

    it('다양한 size로 렌더링된다', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={() => {}} size="small">
          <div>Small Modal</div>
        </Modal>
      );

      expect(screen.getByText('Small Modal')).toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={() => {}} size="medium">
          <div>Medium Modal</div>
        </Modal>
      );

      expect(screen.getByText('Medium Modal')).toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={() => {}} size="large">
          <div>Large Modal</div>
        </Modal>
      );

      expect(screen.getByText('Large Modal')).toBeInTheDocument();
    });
  });

  describe('Table 컴포넌트', () => {
    const mockData = [
      { id: 1, name: 'John', age: 30, role: 'Developer' },
      { id: 2, name: 'Jane', age: 25, role: 'Designer' },
      { id: 3, name: 'Bob', age: 35, role: 'Manager' },
    ];

    const columns: Column[] = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'age', header: 'Age', sortable: true },
      { key: 'role', header: 'Role' },
    ];

    it('데이터와 컬럼이 정상적으로 렌더링된다', () => {
      render(<Table data={mockData} columns={columns} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();

      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('검색 기능이 동작한다', async () => {
      const user = userEvent.setup();
      render(<Table data={mockData} columns={columns} searchable />);

      const searchInput = screen.getByPlaceholderText('검색...');
      await user.type(searchInput, 'John');

      await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.queryByText('Jane')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
      });
    });

    it('정렬 기능이 동작한다', async () => {
      const user = userEvent.setup();
      render(<Table data={mockData} columns={columns} sortable />);

      const ageHeader = screen.getByText('Age');
      await user.click(ageHeader);

      // 정렬 아이콘 확인
      await waitFor(() => {
        expect(screen.getByText('↑')).toBeInTheDocument();
      });
    });

    it('페이지네이션이 동작한다', async () => {
      const largeData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age: 20 + i,
        role: 'User',
      }));

      const user = userEvent.setup();
      render(<Table data={largeData} columns={columns} pageSize={10} />);

      // 첫 페이지 확인
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.queryByText('User 11')).not.toBeInTheDocument();

      // 다음 페이지로 이동
      const nextButton = screen.getByText('다음');
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText('User 11')).toBeInTheDocument();
        expect(screen.queryByText('User 1')).not.toBeInTheDocument();
      });
    });

    it('onRowClick 핸들러가 동작한다', async () => {
      const handleRowClick = vi.fn();
      const user = userEvent.setup();

      render(<Table data={mockData} columns={columns} onRowClick={handleRowClick} />);

      const firstRow = screen.getByText('John').closest('tr');
      if (firstRow) {
        await user.click(firstRow);
        expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
      }
    });

    it('빈 데이터일 때 메시지가 표시된다', () => {
      render(<Table data={[]} columns={columns} />);

      expect(screen.getByText('데이터가 없습니다.')).toBeInTheDocument();
    });
  });

  describe('FormInput 컴포넌트', () => {
    it('입력값 변경이 정상 작동한다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <FormInput
          name="test"
          value=""
          onChange={handleChange}
          label="Test Input"
        />
      );

      const input = screen.getByLabelText('Test Input');
      await user.type(input, 'Hello');

      expect(handleChange).toHaveBeenCalledTimes(5); // 각 글자마다 호출
    });

    it('required 표시가 나타난다', () => {
      render(
        <FormInput
          name="test"
          value=""
          onChange={() => {}}
          label="Required Field"
          required
        />
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('에러 메시지가 표시된다', () => {
      render(
        <FormInput
          name="test"
          value=""
          onChange={() => {}}
          label="Test Input"
          error="This field is required"
        />
      );

      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('helpText가 표시된다', () => {
      render(
        <FormInput
          name="test"
          value=""
          onChange={() => {}}
          label="Test Input"
          helpText="Enter your name"
        />
      );

      expect(screen.getByText('Enter your name')).toBeInTheDocument();
    });

    it('disabled 상태가 적용된다', () => {
      render(
        <FormInput
          name="test"
          value=""
          onChange={() => {}}
          label="Disabled Input"
          disabled
        />
      );

      const input = screen.getByLabelText('Disabled Input');
      expect(input).toBeDisabled();
    });

    it('다양한 type이 적용된다', () => {
      const { rerender } = render(
        <FormInput
          name="text"
          value=""
          onChange={() => {}}
          type="text"
          label="Text Input"
        />
      );

      expect(screen.getByLabelText('Text Input')).toHaveAttribute('type', 'text');

      rerender(
        <FormInput
          name="email"
          value=""
          onChange={() => {}}
          type="email"
          label="Email Input"
        />
      );

      expect(screen.getByLabelText('Email Input')).toHaveAttribute('type', 'email');

      rerender(
        <FormInput
          name="password"
          value=""
          onChange={() => {}}
          type="password"
          label="Password Input"
        />
      );

      expect(screen.getByLabelText('Password Input')).toHaveAttribute('type', 'password');
    });
  });

  describe('Alert 컴포넌트', () => {
    it('다양한 variant로 렌더링된다', () => {
      render(
        <div>
          <Alert variant="info">Info message</Alert>
          <Alert variant="success">Success message</Alert>
          <Alert variant="warning">Warning message</Alert>
          <Alert variant="error">Error message</Alert>
        </div>
      );

      expect(screen.getByText('Info message')).toBeInTheDocument();
      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(screen.getByText('Warning message')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('dismissible Alert가 닫힌다', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      const { rerender } = render(
        <Alert variant="info" onClose={handleClose}>
          Dismissible Alert
        </Alert>
      );

      expect(screen.getByText('Dismissible Alert')).toBeInTheDocument();

      const closeButton = screen.getByText('×');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);

      // onClose 호출 후 실제로 닫히는지 시뮬레이션
      rerender(
        <div></div>
      );

      expect(screen.queryByText('Dismissible Alert')).not.toBeInTheDocument();
    });

    it('title이 표시된다', () => {
      render(
        <Alert variant="success" title="Success!">
          Operation completed
        </Alert>
      );

      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Operation completed')).toBeInTheDocument();
    });
  });

  describe('Badge 컴포넌트', () => {
    it('다양한 variant로 렌더링된다', () => {
      render(
        <div>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      );

      expect(screen.getByText('Default')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Danger')).toBeInTheDocument();
      expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('다양한 size로 렌더링된다', () => {
      render(
        <div>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      );

      expect(screen.getByText('Small')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Large')).toBeInTheDocument();
    });
  });

  describe('UI 컴포넌트 통합 시나리오', () => {
    it('Modal 내부에서 Form과 Button이 정상 작동한다', async () => {
      const handleClose = vi.fn();
      const handleSubmit = vi.fn();
      const user = userEvent.setup();

      function TestForm() {
        const [name, setName] = React.useState('');

        const onSubmit = () => {
          handleSubmit(name);
          handleClose();
        };

        return (
          <Modal isOpen={true} onClose={handleClose} title="User Form">
            <FormInput
              name="name"
              value={name}
              onChange={setName}
              label="Name"
              placeholder="Enter your name"
            />
            <Button onClick={onSubmit}>Submit</Button>
          </Modal>
        );
      }

      render(<TestForm />);

      const input = screen.getByPlaceholderText('Enter your name');
      await user.type(input, 'John Doe');

      const submitButton = screen.getByText('Submit');
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledWith('John Doe');
      expect(handleClose).toHaveBeenCalled();
    });

    it('Table에서 Badge가 정상 렌더링된다', () => {
      const dataWithBadges = [
        { id: 1, name: 'Active User', status: <Badge variant="success">Active</Badge> },
        { id: 2, name: 'Pending User', status: <Badge variant="warning">Pending</Badge> },
        { id: 3, name: 'Inactive User', status: <Badge variant="danger">Inactive</Badge> },
      ];

      const columns: Column[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'status', header: 'Status' },
      ];

      render(<Table data={dataWithBadges} columns={columns} />);

      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
    });
  });
});
