import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPalette } from '@/stories/ColorPalette';
import {
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  DANGER_COLORS,
  SUCCESS_COLORS,
  WARNING_COLORS,
  INFO_COLORS,
  NEUTRAL_COLORS,
  ALPHA_COLORS,
  SEMANTIC_LIGHT,
  SEMANTIC_DARK,
} from '@/tokens/colors';

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '이 컬러 팔레트는 `src/app/styles/index.css`에 정의된 프로젝트 디자인 시스템에서 추출되었습니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryColors: Story = {
  render: () => (
    <ColorPalette
      title="Primary Color"
      subtitle="Blue scale - 버튼, 링크, 포커스 상태에 사용"
      colors={PRIMARY_COLORS}
    />
  ),
};

export const SecondaryColors: Story = {
  render: () => (
    <ColorPalette
      title="Secondary Color"
      subtitle="Gray scale - 배경, 테두리, 텍스트에 사용"
      colors={SECONDARY_COLORS}
    />
  ),
};

export const DangerColors: Story = {
  render: () => (
    <ColorPalette
      title="Danger Color"
      subtitle="Red scale - 에러, 삭제 액션, 알림에 사용"
      colors={DANGER_COLORS}
    />
  ),
};

export const SuccessColors: Story = {
  render: () => (
    <ColorPalette
      title="Success Color"
      subtitle="Green scale - 성공 메시지와 확인에 사용"
      colors={SUCCESS_COLORS}
    />
  ),
};

export const WarningColors: Story = {
  render: () => (
    <ColorPalette
      title="Warning Color"
      subtitle="Orange scale - 경고와 주의 상태에 사용"
      colors={WARNING_COLORS}
    />
  ),
};

export const InfoColors: Story = {
  render: () => (
    <ColorPalette
      title="Info Color"
      subtitle="Blue info scale - 정보 메시지에 사용"
      colors={INFO_COLORS}
    />
  ),
};

export const NeutralColors: Story = {
  render: () => (
    <ColorPalette
      title="Neutral Colors"
      subtitle="순수 흰색과 검정색"
      colors={NEUTRAL_COLORS}
    />
  ),
};

export const AlphaColors: Story = {
  render: () => (
    <ColorPalette
      title="Alpha Colors"
      subtitle="다양한 투명도의 검정색"
      colors={ALPHA_COLORS}
    />
  ),
};

export const SemanticLight: Story = {
  render: () => (
    <ColorPalette
      title="Semantic - Light Mode"
      subtitle="라이트 모드 색상 할당"
      colors={SEMANTIC_LIGHT}
    />
  ),
};

export const SemanticDark: Story = {
  render: () => (
    <ColorPalette
      title="Semantic - Dark Mode"
      subtitle="다크 모드 색상 할당"
      colors={SEMANTIC_DARK}
    />
  ),
};

export const AllColors: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
        Color Palette
      </h1>
      <p style={{ marginBottom: '48px', color: '#666', fontSize: '16px' }}>
        이 컬러 팔레트는 `src/app/styles/index.css`에 정의된 프로젝트 디자인 시스템에서
        추출되었습니다.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        Primitive Colors
      </h2>
      <p style={{ marginBottom: '32px', color: '#666' }}>
        애플리케이션 전체에서 사용되는 기본 색상 스케일입니다.
      </p>

      <ColorPalette
        title="Primary Color"
        subtitle="Blue scale - 버튼, 링크, 포커스 상태에 사용"
        colors={PRIMARY_COLORS}
      />
      <ColorPalette
        title="Secondary Color"
        subtitle="Gray scale - 배경, 테두리, 텍스트에 사용"
        colors={SECONDARY_COLORS}
      />
      <ColorPalette
        title="Danger Color"
        subtitle="Red scale - 에러, 삭제 액션, 알림에 사용"
        colors={DANGER_COLORS}
      />
      <ColorPalette
        title="Success Color"
        subtitle="Green scale - 성공 메시지와 확인에 사용"
        colors={SUCCESS_COLORS}
      />
      <ColorPalette
        title="Warning Color"
        subtitle="Orange scale - 경고와 주의 상태에 사용"
        colors={WARNING_COLORS}
      />
      <ColorPalette
        title="Info Color"
        subtitle="Blue info scale - 정보 메시지에 사용"
        colors={INFO_COLORS}
      />

      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '48px',
          marginBottom: '24px',
        }}
      >
        Neutral Colors
      </h2>
      <ColorPalette
        title="Neutral Colors"
        subtitle="순수 흰색과 검정색"
        colors={NEUTRAL_COLORS}
      />

      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '48px',
          marginBottom: '24px',
        }}
      >
        Alpha Colors
      </h2>
      <p style={{ marginBottom: '32px', color: '#666' }}>
        투명도가 있는 색상으로, 주로 오버레이와 미묘한 배경에 사용됩니다.
      </p>
      <ColorPalette
        title="Alpha Colors"
        subtitle="다양한 투명도의 검정색"
        colors={ALPHA_COLORS}
      />

      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '48px',
          marginBottom: '24px',
        }}
      >
        Semantic Colors
      </h2>

      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
        Light Mode
      </h3>
      <p style={{ marginBottom: '32px', color: '#666' }}>
        라이트 모드에서 특정 용도에 매핑된 시맨틱 토큰입니다.
      </p>
      <ColorPalette
        title="Semantic - Light Mode"
        subtitle="라이트 모드 색상 할당"
        colors={SEMANTIC_LIGHT}
      />

      <h3
        style={{
          fontSize: '20px',
          fontWeight: 600,
          marginTop: '32px',
          marginBottom: '16px',
        }}
      >
        Dark Mode
      </h3>
      <p style={{ marginBottom: '32px', color: '#666' }}>
        다크 모드 인터페이스에 맞게 조정된 시맨틱 토큰입니다.
      </p>
      <ColorPalette
        title="Semantic - Dark Mode"
        subtitle="다크 모드 색상 할당"
        colors={SEMANTIC_DARK}
      />

      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '48px',
          marginBottom: '24px',
        }}
      >
        사용법
      </h2>
      <p style={{ marginBottom: '16px', color: '#666', lineHeight: 1.6 }}>
        색상은 CSS 커스텀 속성(변수)으로 정의되어 있으며, 컴포넌트에서 다음과 같이 사용할 수
        있습니다:
      </p>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}
      >
        {`/* Primitive 토큰 사용 */
color: var(--color-blue-500);
background: var(--color-gray-100);

/* Semantic 토큰 사용 (권장) */
color: var(--color-primary);
background: var(--color-background);
border: 1px solid var(--color-border);`}
      </pre>

      <h3
        style={{
          fontSize: '20px',
          fontWeight: 600,
          marginTop: '32px',
          marginBottom: '16px',
        }}
      >
        Dark Mode
      </h3>
      <p style={{ marginBottom: '16px', color: '#666', lineHeight: 1.6 }}>
        애플리케이션은 루트 요소의 `.dark` 클래스를 통해 다크 모드를 지원합니다. 적용되면
        시맨틱 색상 토큰이 자동으로 다크 모드 값으로 조정됩니다.
      </p>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}
      >
        {`<!-- Light mode -->
<html>
  ...
</html>

<!-- Dark mode -->
<html class="dark">
  ...
</html>`}
      </pre>
    </div>
  ),
};
