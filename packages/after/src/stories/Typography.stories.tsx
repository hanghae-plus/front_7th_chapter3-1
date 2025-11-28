import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypographyDisplay } from '@/stories/TypographyDisplay';
import { typography, typographyUtilities, SampleText } from '@/tokens/typography';

const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '이 타이포그래피 시스템은 `src/app/styles/utilities/typography.css`에 정의된 프로젝트 디자인 시스템에서 추출되었습니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <TypographyDisplay
      title="Heading Styles (h1-h6)"
      styles={typographyUtilities.headings}
      sampleText={SampleText}
    />
  ),
};

export const BodyText: Story = {
  render: () => (
    <TypographyDisplay
      title="Body Text Styles"
      styles={typographyUtilities.body}
      sampleText={SampleText}
    />
  ),
};

export const Labels: Story = {
  render: () => (
    <TypographyDisplay
      title="Label Styles"
      styles={typographyUtilities.labels}
      sampleText="Form Label / Button Text"
    />
  ),
};

export const Captions: Story = {
  render: () => (
    <TypographyDisplay
      title="Caption Styles"
      styles={typographyUtilities.captions}
      sampleText="작은 설명 텍스트나 메타데이터에 사용됩니다."
    />
  ),
};

export const AllTypography: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
        Typography
      </h1>
      <p style={{ marginBottom: '48px', color: '#666', fontSize: '16px' }}>
        이 타이포그래피 시스템은 `src/app/styles/utilities/typography.css`에 정의된 프로젝트
        디자인 시스템에서 추출되었습니다.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Font Families
      </h2>
      <ul style={{ marginBottom: '32px', color: '#666', lineHeight: 1.8 }}>
        <li>
          <strong>Sans-serif (기본):</strong> {typography.type.sans}
        </li>
        <li>
          <strong>Roboto (제목):</strong> {typography.type.roboto}
        </li>
      </ul>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Font Weights
      </h2>
      <ul style={{ marginBottom: '48px', color: '#666', lineHeight: 1.8 }}>
        <li>
          <strong>Normal:</strong> 400
        </li>
        <li>
          <strong>Medium:</strong> 500
        </li>
        <li>
          <strong>Bold:</strong> 700
        </li>
      </ul>

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0' }} />

      <TypographyDisplay
        title="Heading Styles (h1-h6)"
        styles={typographyUtilities.headings}
        sampleText={SampleText}
      />

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0' }} />

      <TypographyDisplay
        title="Body Text Styles"
        styles={typographyUtilities.body}
        sampleText={SampleText}
      />

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0' }} />

      <TypographyDisplay
        title="Label Styles"
        styles={typographyUtilities.labels}
        sampleText="Form Label / Button Text"
      />

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0' }} />

      <TypographyDisplay
        title="Caption Styles"
        styles={typographyUtilities.captions}
        sampleText="작은 설명 텍스트나 메타데이터에 사용됩니다."
      />

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '48px 0' }} />

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>사용법</h2>
      <p style={{ marginBottom: '16px', color: '#666', lineHeight: 1.6 }}>
        타이포그래피 유틸리티는 `src/app/styles/utilities/typography.css`에 정의되어 있으며
        CSS 클래스로 적용할 수 있습니다:
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>
        Headings
      </h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          marginBottom: '32px',
        }}
      >
        {`<h1 class="h1">Heading 1 - 48px Bold</h1>
<h2 class="h2">Heading 2 - 40px Bold</h2>
<h3 class="h3">Heading 3 - 32px Bold</h3>
<h4 class="h4">Heading 4 - 28px Bold</h4>
<h5 class="h5">Heading 5 - 24px Medium</h5>
<h6 class="h6">Heading 6 - 20px Medium</h6>`}
      </pre>

      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Body Text</h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          marginBottom: '32px',
        }}
      >
        {`<p class="body-lg">Large body text - 16px</p>
<p class="body-md">Medium body text - 15px</p>
<p class="body-base">Base body text - 14px</p>
<p class="body-sm">Small body text - 13px</p>`}
      </pre>

      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
        Labels & Captions
      </h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          marginBottom: '32px',
        }}
      >
        {`<label class="label-lg">Large label - 14px Bold</label>
<label class="label-md">Medium label - 13px Bold</label>
<label class="label-sm">Small label - 12px Bold</label>
<span class="caption">Caption - 12px Normal</span>
<span class="caption-sm">Small caption - 10px Normal</span>`}
      </pre>

      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
        Text Color Modifiers
      </h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          marginBottom: '32px',
        }}
      >
        {`<p class="body-base text-emphasis">Emphasis text (87% opacity)</p>
<p class="body-base text-medium">Medium text (60% opacity)</p>
<p class="body-base text-subtle">Subtle text (54% opacity)</p>`}
      </pre>

      <h2
        style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '48px', marginBottom: '16px' }}
      >
        Line Heights
      </h2>
      <ul style={{ color: '#666', lineHeight: 1.8 }}>
        <li>
          <strong>None:</strong> 1 (100%)
        </li>
        <li>
          <strong>Tight:</strong> 1.1876 (118.76%) - h1-h3, labels, captions에 사용
        </li>
        <li>
          <strong>Snug:</strong> 1.4 (140%) - h4-h6에 사용
        </li>
        <li>
          <strong>Normal:</strong> 1.43 (143%) - body-base, body-sm에 사용
        </li>
        <li>
          <strong>Relaxed:</strong> 1.5 (150%) - body-lg, body-md에 사용
        </li>
        <li>
          <strong>Loose:</strong> 1.6 (160%)
        </li>
      </ul>
    </div>
  ),
};
