import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Primitive Token 컴포넌트
const PrimitiveColorToken = ({ name, varName }: { name: string; varName: string }) => (
  <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div
      style={{
        width: '80px',
        height: '40px',
        backgroundColor: `var(${varName})`,
        border: '1px solid var(--gray-400)',
        borderRadius: '4px',
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-body)' }}>{name}</div>
      <code
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--gray-100)',
          padding: '2px 6px',
          borderRadius: '3px',
        }}
      >
        {varName}
      </code>
    </div>
  </div>
)

// Semantic Token 컴포넌트
const SemanticToken = ({
  name,
  varName,
  description,
}: {
  name: string
  varName: string
  description: string
}) => (
  <div
    style={{
      marginBottom: '1rem',
      padding: '1rem',
      border: '1px solid var(--color-border-secondary)',
      borderRadius: '8px',
      backgroundColor: 'var(--color-bg-secondary)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
      <div
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: `var(${varName})`,
          border: '2px solid var(--gray-400)',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-text-heading)' }}>
          {name}
        </div>
        <code
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            backgroundColor: 'var(--gray-100)',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {varName}
        </code>
      </div>
    </div>
    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', marginTop: '0.5rem' }}>
      {description}
    </div>
  </div>
)

// Component Token 컴포넌트
const ComponentToken = ({
  componentName,
  tokens,
}: {
  componentName: string
  tokens: { name: string; varName: string; references: string }[]
}) => (
  <div
    style={{
      marginBottom: '1.5rem',
      padding: '1.25rem',
      border: '2px solid var(--color-border-primary)',
      borderRadius: '12px',
      backgroundColor: 'var(--color-bg-secondary)',
    }}
  >
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: 'var(--color-text-heading)',
        marginBottom: '1rem',
      }}
    >
      {componentName}
    </h3>
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      {tokens.map((token) => (
        <div
          key={token.varName}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--color-bg-tertiary)',
            borderRadius: '6px',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: `var(${token.varName})`,
              border: '1px solid var(--gray-400)',
              borderRadius: '6px',
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-text-body)' }}>
              {token.name}
            </div>
            <code
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                backgroundColor: 'var(--gray-200)',
                padding: '2px 6px',
                borderRadius: '3px',
                display: 'inline-block',
                marginTop: '2px',
              }}
            >
              {token.varName}
            </code>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              → {token.references}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Primitive Tokens Story
export const PrimitiveTokens: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--color-text-heading)',
            marginBottom: '0.5rem',
          }}
        >
          Primitive Tokens
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            marginBottom: '2rem',
          }}
        >
          원시 색상 팔레트 - 디자인 시스템의 기초가 되는 색상 값들입니다.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Blue Scale */}
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'var(--color-text-heading)',
                marginBottom: '1rem',
              }}
            >
              Blue Scale
            </h2>
            <PrimitiveColorToken name="Blue 50" varName="--blue-50" />
            <PrimitiveColorToken name="Blue 200" varName="--blue-200" />
            <PrimitiveColorToken name="Blue 300" varName="--blue-300" />
            <PrimitiveColorToken name="Blue 500" varName="--blue-500" />
            <PrimitiveColorToken name="Blue 900" varName="--blue-900" />
          </div>

          {/* Gray Scale */}
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'var(--color-text-heading)',
                marginBottom: '1rem',
              }}
            >
              Gray Scale
            </h2>
            <PrimitiveColorToken name="Gray 50" varName="--gray-50" />
            <PrimitiveColorToken name="Gray 100" varName="--gray-100" />
            <PrimitiveColorToken name="Gray 200" varName="--gray-200" />
            <PrimitiveColorToken name="Gray 300" varName="--gray-300" />
            <PrimitiveColorToken name="Gray 400" varName="--gray-400" />
            <PrimitiveColorToken name="Gray 500" varName="--gray-500" />
            <PrimitiveColorToken name="Gray 600" varName="--gray-600" />
            <PrimitiveColorToken name="Gray 700" varName="--gray-700" />
            <PrimitiveColorToken name="Gray 800" varName="--gray-800" />
            <PrimitiveColorToken name="Gray 900" varName="--gray-900" />
          </div>

          {/* Green Scale */}
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'var(--color-text-heading)',
                marginBottom: '1rem',
              }}
            >
              Green Scale
            </h2>
            <PrimitiveColorToken name="Green 50" varName="--green-50" />
            <PrimitiveColorToken name="Green 400" varName="--green-400" />
            <PrimitiveColorToken name="Green 600" varName="--green-600" />
            <PrimitiveColorToken name="Green 900" varName="--green-900" />
          </div>

          {/* Red Scale */}
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'var(--color-text-heading)',
                marginBottom: '1rem',
              }}
            >
              Red Scale
            </h2>
            <PrimitiveColorToken name="Red 50" varName="--red-50" />
            <PrimitiveColorToken name="Red 400" varName="--red-400" />
            <PrimitiveColorToken name="Red 600" varName="--red-600" />
            <PrimitiveColorToken name="Red 900" varName="--red-900" />
          </div>

          {/* Yellow/Orange Scale */}
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'var(--color-text-heading)',
                marginBottom: '1rem',
              }}
            >
              Yellow/Orange Scale
            </h2>
            <PrimitiveColorToken name="Yellow 500" varName="--yellow-500" />
            <PrimitiveColorToken name="Orange 50" varName="--orange-50" />
            <PrimitiveColorToken name="Orange 400" varName="--orange-400" />
            <PrimitiveColorToken name="Orange 900" varName="--orange-900" />
          </div>

          {/* Cyan Scale */}
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'var(--color-text-heading)',
                marginBottom: '1rem',
              }}
            >
              Cyan Scale
            </h2>
            <PrimitiveColorToken name="Cyan 600" varName="--cyan-600" />
          </div>
        </div>
      </div>
    </div>
  ),
}

// Semantic Tokens Story
export const SemanticTokens: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--color-text-heading)',
            marginBottom: '0.5rem',
          }}
        >
          Semantic Tokens
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            marginBottom: '2rem',
          }}
        >
          의미론적 토큰 - 용도와 의미를 나타내는 토큰들입니다.
        </p>

        <SemanticToken
          name="Primary"
          varName="--color-primary"
          description="주요 브랜드 색상. 중요한 액션과 강조에 사용됩니다. (참조: --blue-500)"
        />
        <SemanticToken
          name="Secondary"
          varName="--color-secondary"
          description="보조 색상. 덜 중요한 액션과 보조 요소에 사용됩니다. (참조: --gray-650)"
        />
        <SemanticToken
          name="Success"
          varName="--color-success"
          description="성공 상태 표시. 완료, 승인 등 긍정적인 결과에 사용됩니다. (참조: --green-600)"
        />
        <SemanticToken
          name="Danger"
          varName="--color-danger"
          description="위험/오류 상태 표시. 삭제, 경고 등 주의가 필요한 상황에 사용됩니다. (참조: --red-600)"
        />
        <SemanticToken
          name="Warning"
          varName="--color-warning"
          description="경고 상태 표시. 주의가 필요하지만 치명적이지 않은 상황에 사용됩니다. (참조: --yellow-500)"
        />
        <SemanticToken
          name="Info"
          varName="--color-info"
          description="정보 표시. 중립적인 정보 전달에 사용됩니다. (참조: --cyan-600)"
        />
      </div>
    </div>
  ),
}

// Component Tokens Story
export const ComponentTokens: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--color-text-heading)',
            marginBottom: '0.5rem',
          }}
        >
          Component Tokens
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            marginBottom: '2rem',
          }}
        >
          컴포넌트 토큰 - 각 컴포넌트에서 사용하는 전용 토큰들입니다.
        </p>

        <ComponentToken
          componentName="Button"
          tokens={[
            {
              name: 'Primary',
              varName: '--color-btn-primary',
              references: 'var(--color-primary) → var(--blue-500)',
            },
            {
              name: 'Secondary',
              varName: '--color-btn-secondary',
              references: 'var(--color-secondary) → var(--gray-650)',
            },
            {
              name: 'Success',
              varName: '--color-btn-success',
              references: 'var(--color-success) → var(--green-600)',
            },
            {
              name: 'Danger',
              varName: '--color-btn-danger',
              references: 'var(--color-danger) → var(--red-600)',
            },
          ]}
        />

        <ComponentToken
          componentName="Badge"
          tokens={[
            {
              name: 'Primary',
              varName: '--color-badge-primary',
              references: 'var(--color-primary) → var(--blue-500)',
            },
            {
              name: 'Secondary',
              varName: '--color-badge-secondary',
              references: 'var(--color-secondary) → var(--gray-650)',
            },
            {
              name: 'Success',
              varName: '--color-badge-success',
              references: 'var(--color-success) → var(--green-600)',
            },
            {
              name: 'Danger',
              varName: '--color-badge-danger',
              references: 'var(--color-danger) → var(--red-600)',
            },
            {
              name: 'Warning',
              varName: '--color-badge-warning',
              references: 'var(--color-warning) → var(--yellow-500)',
            },
            {
              name: 'Info',
              varName: '--color-badge-info',
              references: 'var(--color-info) → var(--cyan-600)',
            },
          ]}
        />

        <ComponentToken
          componentName="Alert"
          tokens={[
            {
              name: 'Info Background',
              varName: '--color-alert-info-bg',
              references: 'var(--blue-50)',
            },
            {
              name: 'Info Border',
              varName: '--color-alert-info-border',
              references: 'var(--blue-200)',
            },
            {
              name: 'Info Text',
              varName: '--color-alert-info-text',
              references: 'var(--blue-900)',
            },
            {
              name: 'Success Background',
              varName: '--color-alert-success-bg',
              references: 'var(--green-50)',
            },
            {
              name: 'Warning Background',
              varName: '--color-alert-warning-bg',
              references: 'var(--orange-50)',
            },
            {
              name: 'Error Background',
              varName: '--color-alert-error-bg',
              references: 'var(--red-50)',
            },
          ]}
        />

        <ComponentToken
          componentName="Form"
          tokens={[
            {
              name: 'Border',
              varName: '--color-form-border',
              references: 'var(--gray-500)',
            },
            {
              name: 'Border Focus',
              varName: '--color-form-border-focus',
              references: 'var(--blue-300)',
            },
            {
              name: 'Border Error',
              varName: '--color-form-border-error',
              references: 'var(--color-danger) → var(--red-600)',
            },
            {
              name: 'Background',
              varName: '--color-form-bg',
              references: 'var(--white)',
            },
            {
              name: 'Text',
              varName: '--color-form-text',
              references: 'var(--gray-750)',
            },
          ]}
        />

        <ComponentToken
          componentName="Table"
          tokens={[
            {
              name: 'Border',
              varName: '--color-table-border',
              references: 'var(--gray-400)',
            },
            {
              name: 'Header Background',
              varName: '--color-table-header-bg',
              references: 'var(--gray-100)',
            },
            {
              name: 'Row Hover',
              varName: '--color-table-row-hover',
              references: 'var(--gray-200)',
            },
            {
              name: 'Striped',
              varName: '--color-table-striped',
              references: 'var(--gray-200)',
            },
          ]}
        />

        <ComponentToken
          componentName="Modal"
          tokens={[
            {
              name: 'Overlay',
              varName: '--color-modal-overlay',
              references: 'var(--black-alpha-50)',
            },
            {
              name: 'Background',
              varName: '--color-modal-bg',
              references: 'var(--white)',
            },
            {
              name: 'Header Border',
              varName: '--color-modal-header-border',
              references: 'var(--gray-400)',
            },
            {
              name: 'Footer Border',
              varName: '--color-modal-footer-border',
              references: 'var(--gray-400)',
            },
          ]}
        />
      </div>
    </div>
  ),
}

// Token Hierarchy Overview
export const TokenHierarchy: Story = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--color-text-heading)',
            marginBottom: '0.5rem',
          }}
        >
          Design Token Hierarchy
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            marginBottom: '3rem',
          }}
        >
          디자인 토큰의 3단계 계층 구조
        </p>

        {/* Hierarchy Diagram */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '2rem',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '12px',
            border: '2px solid var(--color-border-secondary)',
          }}
        >
          {/* Level 1: Primitive */}
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--blue-500)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              1. Primitive Tokens
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-tertiary)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--blue-500)',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                원시 색상 팔레트
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                디자인 시스템의 기초가 되는 하드코딩된 색상 값들
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --blue-500: #007bff
                </code>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --gray-650: #6c757d
                </code>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --green-600: #28a745
                </code>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
            ↓
          </div>

          {/* Level 2: Semantic */}
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--green-600)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              2. Semantic Tokens
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-tertiary)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--green-600)',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                의미론적 토큰
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                용도와 의미를 나타내는 토큰 (Primitive Tokens 참조)
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --color-primary: var(--blue-500)
                </code>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --color-secondary: var(--gray-650)
                </code>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --color-success: var(--green-600)
                </code>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
            ↓
          </div>

          {/* Level 3: Component */}
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--orange-900)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              3. Component Tokens
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-tertiary)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--orange-900)',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                컴포넌트 토큰
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                각 컴포넌트에서 사용하는 전용 토큰 (Semantic Tokens 참조)
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --color-btn-primary: var(--color-primary)
                </code>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --color-badge-success: var(--color-success)
                </code>
                <code
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--gray-200)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  --color-alert-info-bg: var(--blue-50)
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div style={{ marginTop: '3rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--color-text-heading)',
              marginBottom: '1rem',
            }}
          >
            계층 구조의 이점
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border-secondary)',
              }}
            >
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🔧 유지보수성</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Primary 색상 변경 시 --blue-500 하나만 수정하면 모든 컴포넌트에 자동 반영
              </p>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border-secondary)',
              }}
            >
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🎯 일관성</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                같은 용도는 같은 semantic 토큰을 사용하여 디자인 일관성 유지
              </p>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border-secondary)',
              }}
            >
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📈 확장성</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                새로운 컴포넌트 추가 시 기존 semantic 토큰을 재사용하여 빠른 개발
              </p>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--color-border-secondary)',
              }}
            >
              <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📖 가독성</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                토큰 이름만 봐도 역할과 계층을 쉽게 파악 가능
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
