import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';
import { Label } from '../label/label';
import { useState } from 'react';

/**
 * # Checkbox 컴포넌트
 *
 * Checkbox는 사용자가 하나 이상의 옵션을 선택할 수 있게 하는 입력 컴포넌트입니다.
 * Radix UI를 기반으로 구축되어 접근성과 키보드 탐색을 완벽하게 지원합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { Checkbox } from '@/shared/ui/checkbox';
 *
 * function MyComponent() {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <Checkbox
 *       checked={checked}
 *       onCheckedChange={setChecked}
 *       aria-label="Accept terms"
 *     />
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **Radix UI 기반**: 완벽한 접근성 지원
 * - **상태 관리**: checked, indeterminate 상태 지원
 * - **키보드 탐색**: Space 키로 토글 가능
 * - **스타일링**: 다크 모드 지원 및 커스터마이징 가능
 * - **유효성 검사**: aria-invalid 속성 지원
 */
const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox 컴포넌트는 선택 가능한 체크박스 입력 요소입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'checkbox-name', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: '체크박스의 체크 상태 (true | false | "indeterminate")',
      control: { type: 'select' },
      options: [true, false, 'indeterminate'],
      table: {
        type: { summary: 'boolean | "indeterminate"' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: '체크박스 비활성화 여부',
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
    name: {
      description: 'HTML name 속성',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'HTML value 속성',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'on' },
      },
    },
    onCheckedChange: {
      description: '체크 상태 변경 시 호출되는 콜백 함수',
      action: 'checked changed',
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * 기본 Checkbox입니다.
 */
export const Default: Story = {
  args: {
    'aria-label': 'Default checkbox',
  },
};

/**
 * 체크된 상태의 Checkbox입니다.
 */
export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Checked checkbox',
  },
};

/**
 * 비활성화된 Checkbox입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled checkbox',
  },
};

/**
 * 비활성화되고 체크된 Checkbox입니다.
 */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    'aria-label': 'Disabled and checked checkbox',
  },
};

/**
 * 불확정(indeterminate) 상태의 Checkbox입니다.
 * 일부만 선택된 상태를 표현할 때 사용합니다.
 */
export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
    'aria-label': 'Indeterminate checkbox',
  },
};

/**
 * 레이블과 함께 사용하는 Checkbox입니다.
 */
export const WithLabel: Story = {
  render: () => {
    const CheckboxWithLabel = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={(checked) => setChecked(!!checked)}
          />
          <Label htmlFor="terms" style={{ cursor: 'pointer' }}>
            Accept terms and conditions
          </Label>
        </div>
      );
    };

    return <CheckboxWithLabel />;
  },
};

/**
 * 상호작용 예제: 제어된 Checkbox입니다.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledCheckbox = () => {
      const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox id="controlled" checked={checked} onCheckedChange={setChecked} />
            <Label htmlFor="controlled" style={{ cursor: 'pointer' }}>
              Controlled checkbox
            </Label>
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Current state:{' '}
            {checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setChecked(false)}>Uncheck</button>
            <button onClick={() => setChecked(true)}>Check</button>
            <button onClick={() => setChecked('indeterminate')}>Indeterminate</button>
          </div>
        </div>
      );
    };

    return <ControlledCheckbox />;
  },
};

/**
 * 실제 사용 사례: 다중 선택 목록
 */
export const MultipleSelection: Story = {
  render: () => {
    const MultipleSelectionExample = () => {
      const [selections, setSelections] = useState({
        option1: false,
        option2: true,
        option3: false,
        option4: true,
      });

      const handleChange = (option: keyof typeof selections) => {
        setSelections((prev) => ({
          ...prev,
          [option]: !prev[option],
        }));
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, marginBottom: '8px' }}>Select your preferences:</h4>
          {Object.entries(selections).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={() => handleChange(key as keyof typeof selections)}
              />
              <Label htmlFor={key} style={{ cursor: 'pointer' }}>
                {key === 'option1' && 'Email notifications'}
                {key === 'option2' && 'SMS notifications'}
                {key === 'option3' && 'Push notifications'}
                {key === 'option4' && 'Marketing updates'}
              </Label>
            </div>
          ))}
        </div>
      );
    };

    return <MultipleSelectionExample />;
  },
};

/**
 * 실제 사용 사례: 계층적 선택 (부모-자식)
 */
export const HierarchicalSelection: Story = {
  render: () => {
    const HierarchicalExample = () => {
      const [parentChecked, setParentChecked] = useState<boolean | 'indeterminate'>(
        'indeterminate'
      );
      const [childChecked, setChildChecked] = useState({
        child1: true,
        child2: false,
        child3: true,
      });

      const updateParentState = (children: typeof childChecked) => {
        const values = Object.values(children);
        if (values.every((v) => v === true)) {
          setParentChecked(true);
        } else if (values.every((v) => v === false)) {
          setParentChecked(false);
        } else {
          setParentChecked('indeterminate');
        }
      };

      const handleParentChange = (checked: boolean | 'indeterminate') => {
        if (checked === 'indeterminate') return;

        const newChildState = {
          child1: checked,
          child2: checked,
          child3: checked,
        };
        setChildChecked(newChildState);
        setParentChecked(checked);
      };

      const handleChildChange = (child: keyof typeof childChecked) => {
        const newState = {
          ...childChecked,
          [child]: !childChecked[child],
        };
        setChildChecked(newState);
        updateParentState(newState);
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox id="parent" checked={parentChecked} onCheckedChange={handleParentChange} />
            <Label htmlFor="parent" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Select All
            </Label>
          </div>
          <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                id="child1"
                checked={childChecked.child1}
                onCheckedChange={() => handleChildChange('child1')}
              />
              <Label htmlFor="child1" style={{ cursor: 'pointer' }}>
                Option 1
              </Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                id="child2"
                checked={childChecked.child2}
                onCheckedChange={() => handleChildChange('child2')}
              />
              <Label htmlFor="child2" style={{ cursor: 'pointer' }}>
                Option 2
              </Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                id="child3"
                checked={childChecked.child3}
                onCheckedChange={() => handleChildChange('child3')}
              />
              <Label htmlFor="child3" style={{ cursor: 'pointer' }}>
                Option 3
              </Label>
            </div>
          </div>
        </div>
      );
    };

    return <HierarchicalExample />;
  },
};

/**
 * 실제 사용 사례: 약관 동의
 */
export const TermsAgreement: Story = {
  render: () => {
    const TermsExample = () => {
      const [agreements, setAgreements] = useState({
        terms: false,
        privacy: false,
        marketing: false,
      });

      const canProceed = agreements.terms && agreements.privacy;

      return (
        <div
          style={{
            padding: '24px',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            maxWidth: '400px',
          }}
        >
          <h4 style={{ margin: 0, marginBottom: '16px' }}>Terms and Agreements</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Checkbox
                id="terms"
                checked={agreements.terms}
                onCheckedChange={(checked) =>
                  setAgreements((prev) => ({ ...prev, terms: !!checked }))
                }
                required
              />
              <Label htmlFor="terms" style={{ cursor: 'pointer' }}>
                <span>I agree to the Terms of Service</span>
                <span style={{ color: 'red' }}> *</span>
              </Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Checkbox
                id="privacy"
                checked={agreements.privacy}
                onCheckedChange={(checked) =>
                  setAgreements((prev) => ({ ...prev, privacy: !!checked }))
                }
                required
              />
              <Label htmlFor="privacy" style={{ cursor: 'pointer' }}>
                <span>I agree to the Privacy Policy</span>
                <span style={{ color: 'red' }}> *</span>
              </Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Checkbox
                id="marketing"
                checked={agreements.marketing}
                onCheckedChange={(checked) =>
                  setAgreements((prev) => ({ ...prev, marketing: !!checked }))
                }
              />
              <Label htmlFor="marketing" style={{ cursor: 'pointer' }}>
                I want to receive marketing emails (optional)
              </Label>
            </div>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
            <button
              disabled={!canProceed}
              style={{
                width: '100%',
                padding: '8px 16px',
                background: canProceed ? '#007bff' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: canProceed ? 'pointer' : 'not-allowed',
              }}
            >
              {canProceed ? 'Continue' : 'Please agree to required terms'}
            </button>
          </div>
        </div>
      );
    };

    return <TermsExample />;
  },
};
