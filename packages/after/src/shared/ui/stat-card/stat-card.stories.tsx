import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './stat-card';

/**
 * # StatCard 컴포넌트
 *
 * StatCard는 통계 데이터와 주요 지표(KPI)를 시각적으로 표시하는 복합 컴포넌트입니다.
 * 대시보드, 분석 페이지, 리포트 등에서 수치 데이터를 효과적으로 전달합니다.
 *
 * ## 사용법
 *
 * ```tsx
 * import { StatCard } from '@/shared/ui/stat-card';
 *
 * function MyComponent() {
 *   return (
 *     <StatCard variant="success">
 *       <StatCard.Label>Total Users</StatCard.Label>
 *       <StatCard.Value>1,234</StatCard.Value>
 *       <StatCard.Trend direction="up">+12% from last month</StatCard.Trend>
 *     </StatCard>
 *   );
 * }
 * ```
 *
 * ## 구성 요소
 *
 * - **StatCard**: 루트 컨테이너 컴포넌트 (variant 속성으로 색상 테마 설정)
 * - **StatCard.Label**: 통계 항목의 레이블/제목
 * - **StatCard.Value**: 주요 통계 수치 (대형 폰트로 강조 표시)
 * - **StatCard.Icon**: 아이콘 영역 (선택적, 레이블과 함께 표시)
 * - **StatCard.Trend**: 변화 추세 표시 (선택적, direction으로 색상 자동 적용)
 * - **StatCard.Description**: 추가 설명 텍스트 (선택적)
 *
 * ## 주요 특징
 *
 * - **6가지 색상 변형**: default, primary, success, warning, danger, info
 * - **복합 컴포넌트 패턴**: 유연한 조합으로 다양한 레이아웃 구성 가능
 * - **자동 색상 적용**: Trend 컴포넌트는 direction에 따라 자동으로 색상 변경
 * - **컨텍스트 기반**: StatCard의 variant가 하위 컴포넌트에 자동 전달
 */
const meta: Meta<typeof StatCard> = {
  title: 'UI/StatCard',
  component: StatCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'StatCard 컴포넌트는 통계 데이터와 KPI를 시각적으로 표시하는 카드 컴포넌트입니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'StatCard의 시각적 스타일과 색상 테마를 결정합니다',
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      table: {
        type: { summary: 'StatCardVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      description: 'StatCard 내부에 표시될 컨텐츠 (Label, Value, Trend 등)',
      control: false,
    },
    className: {
      description: '추가적인 CSS 클래스명',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

/**
 * 기본 StatCard 스타일입니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <StatCard.Label>Total Revenue</StatCard.Label>
        <StatCard.Value>$45,231</StatCard.Value>
      </>
    ),
  },
};

/**
 * Primary 변형 StatCard입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <StatCard.Label>Active Users</StatCard.Label>
        <StatCard.Value>2,345</StatCard.Value>
      </>
    ),
  },
};

/**
 * Success 변형 StatCard입니다.
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <StatCard.Label>Completed Tasks</StatCard.Label>
        <StatCard.Value>87%</StatCard.Value>
      </>
    ),
  },
};

/**
 * Warning 변형 StatCard입니다.
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <StatCard.Label>Pending Reviews</StatCard.Label>
        <StatCard.Value>23</StatCard.Value>
      </>
    ),
  },
};

/**
 * Danger 변형 StatCard입니다.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: (
      <>
        <StatCard.Label>Critical Issues</StatCard.Label>
        <StatCard.Value>5</StatCard.Value>
      </>
    ),
  },
};

/**
 * Info 변형 StatCard입니다.
 */
export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <StatCard.Label>System Messages</StatCard.Label>
        <StatCard.Value>142</StatCard.Value>
      </>
    ),
  },
};

/**
 * 상승 추세가 포함된 StatCard입니다.
 */
export const WithUpTrend: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <StatCard.Label>Monthly Sales</StatCard.Label>
        <StatCard.Value>$52,600</StatCard.Value>
        <StatCard.Trend direction="up">+12.5% from last month</StatCard.Trend>
      </>
    ),
  },
};

/**
 * 하락 추세가 포함된 StatCard입니다.
 */
export const WithDownTrend: Story = {
  args: {
    variant: 'danger',
    children: (
      <>
        <StatCard.Label>Bounce Rate</StatCard.Label>
        <StatCard.Value>32.8%</StatCard.Value>
        <StatCard.Trend direction="down">-5.2% from last month</StatCard.Trend>
      </>
    ),
  },
};

/**
 * 중립 추세가 포함된 StatCard입니다.
 */
export const WithNeutralTrend: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <StatCard.Label>Average Session</StatCard.Label>
        <StatCard.Value>4m 32s</StatCard.Value>
        <StatCard.Trend direction="neutral">No change from last week</StatCard.Trend>
      </>
    ),
  },
};

/**
 * 아이콘이 포함된 StatCard입니다.
 */
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <StatCard.Icon>
          <span>👤</span>
        </StatCard.Icon>
        <StatCard.Label>New Subscribers</StatCard.Label>
        <StatCard.Value>1,234</StatCard.Value>
        <StatCard.Trend direction="up">+18% from last week</StatCard.Trend>
      </>
    ),
  },
};

/**
 * 설명이 포함된 StatCard입니다.
 */
export const WithDescription: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <StatCard.Label>Server Uptime</StatCard.Label>
        <StatCard.Value>99.9%</StatCard.Value>
        <StatCard.Description>Last 30 days average performance</StatCard.Description>
      </>
    ),
  },
};

/**
 * 모든 변형을 한눈에 볼 수 있는 예제입니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      <StatCard variant="default">
        <StatCard.Label>Default</StatCard.Label>
        <StatCard.Value>1,234</StatCard.Value>
      </StatCard>
      <StatCard variant="primary">
        <StatCard.Label>Primary</StatCard.Label>
        <StatCard.Value>5,678</StatCard.Value>
      </StatCard>
      <StatCard variant="success">
        <StatCard.Label>Success</StatCard.Label>
        <StatCard.Value>9,012</StatCard.Value>
      </StatCard>
      <StatCard variant="warning">
        <StatCard.Label>Warning</StatCard.Label>
        <StatCard.Value>345</StatCard.Value>
      </StatCard>
      <StatCard variant="danger">
        <StatCard.Label>Danger</StatCard.Label>
        <StatCard.Value>67</StatCard.Value>
      </StatCard>
      <StatCard variant="info">
        <StatCard.Label>Info</StatCard.Label>
        <StatCard.Value>890</StatCard.Value>
      </StatCard>
    </div>
  ),
};

/**
 * 다양한 추세 방향을 보여주는 예제입니다.
 */
export const TrendDirections: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <StatCard variant="success">
        <StatCard.Label>Positive Growth</StatCard.Label>
        <StatCard.Value>$45,231</StatCard.Value>
        <StatCard.Trend direction="up">+20.1% from last month</StatCard.Trend>
      </StatCard>
      <StatCard variant="danger">
        <StatCard.Label>Decline</StatCard.Label>
        <StatCard.Value>$32,145</StatCard.Value>
        <StatCard.Trend direction="down">-8.3% from last month</StatCard.Trend>
      </StatCard>
      <StatCard variant="default">
        <StatCard.Label>Stable</StatCard.Label>
        <StatCard.Value>$28,900</StatCard.Value>
        <StatCard.Trend direction="neutral">0% change</StatCard.Trend>
      </StatCard>
    </div>
  ),
};

/**
 * 실제 사용 사례: 전자상거래 대시보드
 */
export const EcommerceDashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
      }}
    >
      <StatCard variant="primary">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>💰</span>
        </StatCard.Icon>
        <StatCard.Label>Total Revenue</StatCard.Label>
        <StatCard.Value>$45,231.89</StatCard.Value>
        <StatCard.Trend direction="up">+20.1% from last month</StatCard.Trend>
      </StatCard>

      <StatCard variant="success">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>👥</span>
        </StatCard.Icon>
        <StatCard.Label>New Customers</StatCard.Label>
        <StatCard.Value>+2,350</StatCard.Value>
        <StatCard.Trend direction="up">+18.5% from last month</StatCard.Trend>
      </StatCard>

      <StatCard variant="info">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>📦</span>
        </StatCard.Icon>
        <StatCard.Label>Orders</StatCard.Label>
        <StatCard.Value>1,245</StatCard.Value>
        <StatCard.Trend direction="up">+7.2% from last week</StatCard.Trend>
      </StatCard>

      <StatCard variant="warning">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>⏱️</span>
        </StatCard.Icon>
        <StatCard.Label>Pending Orders</StatCard.Label>
        <StatCard.Value>73</StatCard.Value>
        <StatCard.Trend direction="neutral">No change</StatCard.Trend>
      </StatCard>
    </div>
  ),
};

/**
 * 실제 사용 사례: 웹사이트 분석 대시보드
 */
export const WebAnalyticsDashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}
    >
      <StatCard variant="primary">
        <StatCard.Label>Page Views</StatCard.Label>
        <StatCard.Value>45.2K</StatCard.Value>
        <StatCard.Trend direction="up">+15.3% from last week</StatCard.Trend>
        <StatCard.Description>Unique page visits</StatCard.Description>
      </StatCard>

      <StatCard variant="success">
        <StatCard.Label>Conversion Rate</StatCard.Label>
        <StatCard.Value>3.24%</StatCard.Value>
        <StatCard.Trend direction="up">+0.8% improvement</StatCard.Trend>
        <StatCard.Description>Based on 1,234 conversions</StatCard.Description>
      </StatCard>

      <StatCard variant="info">
        <StatCard.Label>Avg. Session Duration</StatCard.Label>
        <StatCard.Value>4m 32s</StatCard.Value>
        <StatCard.Trend direction="up">+23s from last week</StatCard.Trend>
        <StatCard.Description>Time spent per visit</StatCard.Description>
      </StatCard>

      <StatCard variant="danger">
        <StatCard.Label>Bounce Rate</StatCard.Label>
        <StatCard.Value>42.3%</StatCard.Value>
        <StatCard.Trend direction="down">-5.2% improvement</StatCard.Trend>
        <StatCard.Description>Single page visits</StatCard.Description>
      </StatCard>
    </div>
  ),
};

/**
 * 실제 사용 사례: 시스템 모니터링 대시보드
 */
export const SystemMonitoringDashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      <StatCard variant="success">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>🖥️</span>
        </StatCard.Icon>
        <StatCard.Label>Server Uptime</StatCard.Label>
        <StatCard.Value>99.98%</StatCard.Value>
        <StatCard.Description>Last 30 days</StatCard.Description>
      </StatCard>

      <StatCard variant="primary">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>⚡</span>
        </StatCard.Icon>
        <StatCard.Label>Response Time</StatCard.Label>
        <StatCard.Value>145ms</StatCard.Value>
        <StatCard.Trend direction="down">-12ms improvement</StatCard.Trend>
      </StatCard>

      <StatCard variant="warning">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>💾</span>
        </StatCard.Icon>
        <StatCard.Label>Disk Usage</StatCard.Label>
        <StatCard.Value>67%</StatCard.Value>
        <StatCard.Trend direction="up">+5% from last week</StatCard.Trend>
      </StatCard>

      <StatCard variant="danger">
        <StatCard.Icon>
          <span style={{ fontSize: '24px' }}>🚨</span>
        </StatCard.Icon>
        <StatCard.Label>Active Alerts</StatCard.Label>
        <StatCard.Value>3</StatCard.Value>
        <StatCard.Description>Require immediate attention</StatCard.Description>
      </StatCard>
    </div>
  ),
};

/**
 * 실제 사용 사례: SaaS 제품 KPI 대시보드
 */
export const SaaSKPIDashboard: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
      }}
    >
      <StatCard variant="primary">
        <StatCard.Icon>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: '24px' }}>💼</span>
          </div>
        </StatCard.Icon>
        <StatCard.Label>Monthly Recurring Revenue</StatCard.Label>
        <StatCard.Value>$128,450</StatCard.Value>
        <StatCard.Trend direction="up">+12.5% from last month</StatCard.Trend>
        <StatCard.Description>Target: $150,000</StatCard.Description>
      </StatCard>

      <StatCard variant="success">
        <StatCard.Icon>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: '24px' }}>👨‍💼</span>
          </div>
        </StatCard.Icon>
        <StatCard.Label>Active Subscriptions</StatCard.Label>
        <StatCard.Value>2,847</StatCard.Value>
        <StatCard.Trend direction="up">+234 this month</StatCard.Trend>
        <StatCard.Description>Across all plans</StatCard.Description>
      </StatCard>

      <StatCard variant="warning">
        <StatCard.Icon>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
          </div>
        </StatCard.Icon>
        <StatCard.Label>Churn Rate</StatCard.Label>
        <StatCard.Value>3.2%</StatCard.Value>
        <StatCard.Trend direction="up">+0.5% from last month</StatCard.Trend>
        <StatCard.Description>89 churned users</StatCard.Description>
      </StatCard>

      <StatCard variant="info">
        <StatCard.Icon>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: '24px' }}>📊</span>
          </div>
        </StatCard.Icon>
        <StatCard.Label>Customer Lifetime Value</StatCard.Label>
        <StatCard.Value>$4,523</StatCard.Value>
        <StatCard.Trend direction="up">+$342 from last quarter</StatCard.Trend>
        <StatCard.Description>Average per customer</StatCard.Description>
      </StatCard>
    </div>
  ),
};

/**
 * 실제 사용 사례: 소셜 미디어 통계
 */
export const SocialMediaStats: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      <StatCard variant="primary">
        <StatCard.Icon>
          <span style={{ fontSize: '20px' }}>👍</span>
        </StatCard.Icon>
        <StatCard.Label>Followers</StatCard.Label>
        <StatCard.Value>12.5K</StatCard.Value>
        <StatCard.Trend direction="up">+1,234 this week</StatCard.Trend>
      </StatCard>

      <StatCard variant="success">
        <StatCard.Icon>
          <span style={{ fontSize: '20px' }}>❤️</span>
        </StatCard.Icon>
        <StatCard.Label>Engagement</StatCard.Label>
        <StatCard.Value>8.4%</StatCard.Value>
        <StatCard.Trend direction="up">+2.1% this month</StatCard.Trend>
      </StatCard>

      <StatCard variant="info">
        <StatCard.Icon>
          <span style={{ fontSize: '20px' }}>👁️</span>
        </StatCard.Icon>
        <StatCard.Label>Impressions</StatCard.Label>
        <StatCard.Value>342K</StatCard.Value>
        <StatCard.Trend direction="up">+45K this week</StatCard.Trend>
      </StatCard>

      <StatCard variant="warning">
        <StatCard.Icon>
          <span style={{ fontSize: '20px' }}>💬</span>
        </StatCard.Icon>
        <StatCard.Label>Comments</StatCard.Label>
        <StatCard.Value>1,456</StatCard.Value>
        <StatCard.Trend direction="neutral">Same as last week</StatCard.Trend>
      </StatCard>
    </div>
  ),
};

/**
 * 복잡한 레이아웃 예제입니다.
 */
export const ComplexLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatCard variant="primary">
          <StatCard.Label>Total</StatCard.Label>
          <StatCard.Value>$45.2K</StatCard.Value>
        </StatCard>
        <StatCard variant="success">
          <StatCard.Label>Paid</StatCard.Label>
          <StatCard.Value>$38.5K</StatCard.Value>
        </StatCard>
        <StatCard variant="warning">
          <StatCard.Label>Pending</StatCard.Label>
          <StatCard.Value>$5.2K</StatCard.Value>
        </StatCard>
        <StatCard variant="danger">
          <StatCard.Label>Overdue</StatCard.Label>
          <StatCard.Value>$1.5K</StatCard.Value>
        </StatCard>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <StatCard variant="info">
          <StatCard.Icon>
            <span style={{ fontSize: '24px' }}>📈</span>
          </StatCard.Icon>
          <StatCard.Label>Quarter Performance</StatCard.Label>
          <StatCard.Value>+28.4%</StatCard.Value>
          <StatCard.Trend direction="up">Best quarter this year</StatCard.Trend>
          <StatCard.Description>Exceeded target by 8.4%</StatCard.Description>
        </StatCard>
        <StatCard variant="default">
          <StatCard.Icon>
            <span style={{ fontSize: '24px' }}>🎯</span>
          </StatCard.Icon>
          <StatCard.Label>Goal Completion</StatCard.Label>
          <StatCard.Value>87%</StatCard.Value>
          <StatCard.Trend direction="up">+15% from last quarter</StatCard.Trend>
          <StatCard.Description>13 out of 15 goals achieved</StatCard.Description>
        </StatCard>
      </div>
    </div>
  ),
};
