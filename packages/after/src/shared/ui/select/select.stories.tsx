import type { Meta, StoryObj } from '@storybook/react-vite';
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from './native-select';
import { Label } from '../label/label';
import { useState } from 'react';

/**
 * # NativeSelect 컴포넌트
 *
 * NativeSelect는 네이티브 HTML select 요소를 래핑한 폼 컴포넌트입니다.
 * 다양한 크기 옵션을 제공하며, optgroup을 통한 옵션 그룹화를 지원합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { NativeSelect, NativeSelectOption } from '@/shared/ui/select';
 *
 * function MyComponent() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <NativeSelect
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     >
 *       <NativeSelectOption value="">선택하세요</NativeSelectOption>
 *       <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
 *       <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
 *     </NativeSelect>
 *   );
 * }
 * ```
 *
 * ## 특징
 *
 * - **크기 변형**: default(full), sm, md, lg
 * - **옵션 그룹화**: NativeSelectOptGroup을 통한 논리적 그룹화
 * - **포커스 상태**: 명확한 포커스 인디케이터
 * - **에러 상태**: aria-invalid 속성 지원
 * - **비활성화 상태**: disabled 속성 지원
 * - **네이티브 성능**: 브라우저 네이티브 select 사용으로 우수한 성능
 */
const meta: Meta<typeof NativeSelect> = {
  title: 'UI/Select',
  component: NativeSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'NativeSelect 컴포넌트는 옵션 선택을 위한 네이티브 HTML select 요소를 래핑한 폼 컴포넌트입니다.',
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
    variant: {
      description: 'Select의 너비 변형을 설정합니다',
      control: { type: 'select' },
      options: ['default', 'sm', 'md', 'lg'],
      table: {
        type: { summary: 'SelectVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      description: 'Select 비활성화 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      description: '필수 선택 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      description: '다중 선택 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      description: 'Select의 값',
      control: { type: 'text' },
    },
    defaultValue: {
      description: 'Select의 기본값 (비제어 컴포넌트)',
      control: { type: 'text' },
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

/**
 * 기본 Select입니다.
 */
export const Default: Story = {
  render: () => (
    <NativeSelect>
      <NativeSelectOption value="">선택하세요</NativeSelectOption>
      <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
      <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
      <NativeSelectOption value="option3">옵션 3</NativeSelectOption>
    </NativeSelect>
  ),
};

/**
 * 다양한 크기의 Select입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <div>
        <Label>Small (200px)</Label>
        <NativeSelect variant="sm">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <Label>Medium (300px)</Label>
        <NativeSelect variant="md">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <Label>Large (400px)</Label>
        <NativeSelect variant="lg">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <Label>Full width (100%)</Label>
        <NativeSelect variant="default">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
          <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  ),
};

/**
 * 옵션 그룹을 사용한 Select입니다.
 */
export const WithOptGroups: Story = {
  render: () => (
    <NativeSelect variant="md">
      <NativeSelectOption value="">선택하세요</NativeSelectOption>
      <NativeSelectOptGroup label="과일">
        <NativeSelectOption value="apple">사과</NativeSelectOption>
        <NativeSelectOption value="banana">바나나</NativeSelectOption>
        <NativeSelectOption value="orange">오렌지</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="채소">
        <NativeSelectOption value="carrot">당근</NativeSelectOption>
        <NativeSelectOption value="broccoli">브로콜리</NativeSelectOption>
        <NativeSelectOption value="spinach">시금치</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};

/**
 * 비활성화된 Select입니다.
 */
export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled variant="md">
      <NativeSelectOption value="">선택하세요</NativeSelectOption>
      <NativeSelectOption value="option1">옵션 1</NativeSelectOption>
      <NativeSelectOption value="option2">옵션 2</NativeSelectOption>
    </NativeSelect>
  ),
};

/**
 * 일부 옵션이 비활성화된 Select입니다.
 */
export const DisabledOptions: Story = {
  render: () => (
    <NativeSelect variant="md">
      <NativeSelectOption value="">선택하세요</NativeSelectOption>
      <NativeSelectOption value="option1">사용 가능한 옵션</NativeSelectOption>
      <NativeSelectOption value="option2" disabled>비활성화된 옵션</NativeSelectOption>
      <NativeSelectOption value="option3">사용 가능한 옵션</NativeSelectOption>
      <NativeSelectOption value="option4" disabled>비활성화된 옵션</NativeSelectOption>
    </NativeSelect>
  ),
};

/**
 * 레이블과 함께 사용하는 Select입니다.
 */
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <Label htmlFor="country">국가</Label>
        <NativeSelect id="country">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="kr">대한민국</NativeSelectOption>
          <NativeSelectOption value="us">미국</NativeSelectOption>
          <NativeSelectOption value="jp">일본</NativeSelectOption>
          <NativeSelectOption value="cn">중국</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <Label htmlFor="category">카테고리</Label>
        <NativeSelect id="category">
          <NativeSelectOption value="">선택하세요</NativeSelectOption>
          <NativeSelectOption value="tech">기술</NativeSelectOption>
          <NativeSelectOption value="design">디자인</NativeSelectOption>
          <NativeSelectOption value="business">비즈니스</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  ),
};

/**
 * 에러 상태의 Select입니다.
 */
export const ErrorState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '400px' }}>
      <Label htmlFor="error-select">국가 선택</Label>
      <NativeSelect id="error-select" aria-invalid={true} defaultValue="">
        <NativeSelectOption value="">선택하세요</NativeSelectOption>
        <NativeSelectOption value="kr">대한민국</NativeSelectOption>
        <NativeSelectOption value="us">미국</NativeSelectOption>
        <NativeSelectOption value="jp">일본</NativeSelectOption>
      </NativeSelect>
      <span style={{ color: '#dc3545', fontSize: '14px' }}>국가를 선택해주세요</span>
    </div>
  ),
};

/**
 * 제어된 Select 예제입니다.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledSelect = () => {
      const [value, setValue] = useState('');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
          <div>
            <Label htmlFor="controlled">제어된 Select</Label>
            <NativeSelect
              id="controlled"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <NativeSelectOption value="">선택하세요</NativeSelectOption>
              <NativeSelectOption value="react">React</NativeSelectOption>
              <NativeSelectOption value="vue">Vue</NativeSelectOption>
              <NativeSelectOption value="angular">Angular</NativeSelectOption>
              <NativeSelectOption value="svelte">Svelte</NativeSelectOption>
            </NativeSelect>
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            선택된 값: {value || '(선택 안 됨)'}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setValue('')}>Clear</button>
            <button onClick={() => setValue('react')}>React</button>
            <button onClick={() => setValue('vue')}>Vue</button>
            <button onClick={() => setValue('angular')}>Angular</button>
          </div>
        </div>
      );
    };

    return <ControlledSelect />;
  },
};

/**
 * 다중 선택이 가능한 Select입니다.
 */
export const Multiple: Story = {
  render: () => {
    const MultipleSelect = () => {
      const [values, setValues] = useState<string[]>([]);

      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions).map(option => option.value);
        setValues(selected);
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
          <div>
            <Label htmlFor="multiple">좋아하는 과일 선택 (Ctrl/Cmd + Click)</Label>
            <NativeSelect
              id="multiple"
              multiple
              onChange={handleChange}
              style={{ height: '150px' }}
            >
              <NativeSelectOption value="apple">사과</NativeSelectOption>
              <NativeSelectOption value="banana">바나나</NativeSelectOption>
              <NativeSelectOption value="orange">오렌지</NativeSelectOption>
              <NativeSelectOption value="grape">포도</NativeSelectOption>
              <NativeSelectOption value="strawberry">딸기</NativeSelectOption>
              <NativeSelectOption value="watermelon">수박</NativeSelectOption>
            </NativeSelect>
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            선택된 과일: {values.length > 0 ? values.join(', ') : '(선택 안 됨)'}
          </div>
        </div>
      );
    };

    return <MultipleSelect />;
  },
};

/**
 * 실제 사용 사례: 사용자 등록 폼
 */
export const UserRegistrationForm: Story = {
  render: () => {
    const UserRegistrationExample = () => {
      const [formData, setFormData] = useState({
        role: '',
        status: '',
        country: '',
      });

      const handleChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
      };

      return (
        <div style={{
          padding: '24px',
          border: '1px solid #e5e5e5',
          borderRadius: '8px',
          width: '400px'
        }}>
          <h3 style={{ margin: 0, marginBottom: '24px' }}>사용자 등록</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Label htmlFor="role">역할</Label>
              <NativeSelect
                id="role"
                value={formData.role}
                onChange={handleChange('role')}
                required
              >
                <NativeSelectOption value="">역할을 선택하세요</NativeSelectOption>
                <NativeSelectOption value="admin">관리자</NativeSelectOption>
                <NativeSelectOption value="moderator">운영자</NativeSelectOption>
                <NativeSelectOption value="user">일반 사용자</NativeSelectOption>
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="status">상태</Label>
              <NativeSelect
                id="status"
                value={formData.status}
                onChange={handleChange('status')}
                required
              >
                <NativeSelectOption value="">상태를 선택하세요</NativeSelectOption>
                <NativeSelectOption value="active">활성</NativeSelectOption>
                <NativeSelectOption value="inactive">비활성</NativeSelectOption>
                <NativeSelectOption value="suspended">정지</NativeSelectOption>
              </NativeSelect>
            </div>
            <div>
              <Label htmlFor="country">국가</Label>
              <NativeSelect
                id="country"
                value={formData.country}
                onChange={handleChange('country')}
                required
              >
                <NativeSelectOption value="">국가를 선택하세요</NativeSelectOption>
                <NativeSelectOptGroup label="아시아">
                  <NativeSelectOption value="kr">대한민국</NativeSelectOption>
                  <NativeSelectOption value="jp">일본</NativeSelectOption>
                  <NativeSelectOption value="cn">중국</NativeSelectOption>
                </NativeSelectOptGroup>
                <NativeSelectOptGroup label="아메리카">
                  <NativeSelectOption value="us">미국</NativeSelectOption>
                  <NativeSelectOption value="ca">캐나다</NativeSelectOption>
                </NativeSelectOptGroup>
                <NativeSelectOptGroup label="유럽">
                  <NativeSelectOption value="uk">영국</NativeSelectOption>
                  <NativeSelectOption value="de">독일</NativeSelectOption>
                  <NativeSelectOption value="fr">프랑스</NativeSelectOption>
                </NativeSelectOptGroup>
              </NativeSelect>
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
              등록하기
            </button>
          </div>
        </div>
      );
    };

    return <UserRegistrationExample />;
  },
};

/**
 * 실제 사용 사례: 게시물 필터
 */
export const PostFilter: Story = {
  render: () => {
    const PostFilterExample = () => {
      const [filters, setFilters] = useState({
        category: '',
        status: '',
        sortBy: 'latest',
      });

      const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [field]: e.target.value }));
      };

      const posts = [
        { id: 1, title: 'React 19 소개', category: 'tech', status: 'published' },
        { id: 2, title: '디자인 시스템 구축', category: 'design', status: 'published' },
        { id: 3, title: '스타트업 전략', category: 'business', status: 'draft' },
      ];

      return (
        <div style={{ width: '600px' }}>
          <div style={{
            padding: '16px',
            background: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: 0, marginBottom: '16px' }}>게시물 필터</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <Label htmlFor="category">카테고리</Label>
                <NativeSelect
                  id="category"
                  value={filters.category}
                  onChange={handleFilterChange('category')}
                  variant="sm"
                >
                  <NativeSelectOption value="">전체</NativeSelectOption>
                  <NativeSelectOption value="tech">기술</NativeSelectOption>
                  <NativeSelectOption value="design">디자인</NativeSelectOption>
                  <NativeSelectOption value="business">비즈니스</NativeSelectOption>
                </NativeSelect>
              </div>
              <div>
                <Label htmlFor="status">상태</Label>
                <NativeSelect
                  id="status"
                  value={filters.status}
                  onChange={handleFilterChange('status')}
                  variant="sm"
                >
                  <NativeSelectOption value="">전체</NativeSelectOption>
                  <NativeSelectOption value="published">게시됨</NativeSelectOption>
                  <NativeSelectOption value="draft">초안</NativeSelectOption>
                  <NativeSelectOption value="archived">보관됨</NativeSelectOption>
                </NativeSelect>
              </div>
              <div>
                <Label htmlFor="sortBy">정렬</Label>
                <NativeSelect
                  id="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange('sortBy')}
                  variant="sm"
                >
                  <NativeSelectOption value="latest">최신순</NativeSelectOption>
                  <NativeSelectOption value="oldest">오래된순</NativeSelectOption>
                  <NativeSelectOption value="views">조회수순</NativeSelectOption>
                </NativeSelect>
              </div>
            </div>
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
            <h4 style={{ margin: 0, marginBottom: '12px' }}>게시물 목록</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {posts.map(post => (
                <div
                  key={post.id}
                  style={{
                    padding: '12px',
                    background: '#f9f9f9',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{post.title}</span>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {post.category} | {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return <PostFilterExample />;
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
      const isValid = value !== '';
      const showError = touched && !isValid;

      return (
        <div style={{ width: '400px' }}>
          <Label htmlFor="validated">카테고리 선택 (필수)</Label>
          <NativeSelect
            id="validated"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showError}
            required
          >
            <NativeSelectOption value="">카테고리를 선택하세요</NativeSelectOption>
            <NativeSelectOption value="tech">기술</NativeSelectOption>
            <NativeSelectOption value="design">디자인</NativeSelectOption>
            <NativeSelectOption value="business">비즈니스</NativeSelectOption>
            <NativeSelectOption value="marketing">마케팅</NativeSelectOption>
          </NativeSelect>
          {showError && (
            <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              카테고리를 선택해주세요
            </span>
          )}
          {touched && isValid && (
            <span style={{ color: '#28a745', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              올바른 선택입니다
            </span>
          )}
        </div>
      );
    };

    return <ValidationExample />;
  },
};

/**
 * 실제 사용 사례: 동적 옵션 로딩
 */
export const DynamicOptions: Story = {
  render: () => {
    const DynamicOptionsExample = () => {
      const [country, setCountry] = useState('');
      const [city, setCity] = useState('');

      const cities: Record<string, string[]> = {
        kr: ['서울', '부산', '대구', '인천', '광주'],
        us: ['뉴욕', '로스앤젤레스', '시카고', '휴스턴', '피닉스'],
        jp: ['도쿄', '오사카', '교토', '나고야', '후쿠오카'],
      };

      const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
        setCity(''); // 국가 변경 시 도시 초기화
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
          <div>
            <Label htmlFor="dynamic-country">국가</Label>
            <NativeSelect
              id="dynamic-country"
              value={country}
              onChange={handleCountryChange}
            >
              <NativeSelectOption value="">국가를 선택하세요</NativeSelectOption>
              <NativeSelectOption value="kr">대한민국</NativeSelectOption>
              <NativeSelectOption value="us">미국</NativeSelectOption>
              <NativeSelectOption value="jp">일본</NativeSelectOption>
            </NativeSelect>
          </div>
          <div>
            <Label htmlFor="dynamic-city">도시</Label>
            <NativeSelect
              id="dynamic-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!country}
            >
              <NativeSelectOption value="">
                {country ? '도시를 선택하세요' : '먼저 국가를 선택하세요'}
              </NativeSelectOption>
              {country && cities[country]?.map(cityName => (
                <NativeSelectOption key={cityName} value={cityName}>
                  {cityName}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          {country && city && (
            <div style={{
              padding: '12px',
              background: '#e7f3ff',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              선택된 위치: {country === 'kr' ? '대한민국' : country === 'us' ? '미국' : '일본'} - {city}
            </div>
          )}
        </div>
      );
    };

    return <DynamicOptionsExample />;
  },
};
