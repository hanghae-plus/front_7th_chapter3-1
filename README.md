# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

https://jumoooo.github.io/front_7th_chapter3-1/

## 기본과제: 레거시 디자인 시스템 분석 및 이해

이번 과제는 레거시 디자인 시스템의 문제점을 파악하고, 현대적인 디자인 시스템으로 마이그레이션하는 것입니다. 실무에서 자주 마주치는 일관성 없는 컴포넌트 API, 혼재된 스타일링 방식, 부족한 타입 안전성 등의 문제를 직접 경험하고 개선해봅니다.

## 1. 취지

- **잘못된 Atomic Design Pattern 이해하기**
  - Atomic Design의 올바른 개념과 잘못된 적용 사례 파악
  - Atoms, Molecules, Organisms의 적절한 분리 기준 이해
  - 컴포넌트 계층 구조의 중요성 체감

- **CSS로 컴포넌트 구성하면 불편한 점 이해하기**
  - 인라인 스타일, CSS Modules, CSS-in-JS의 혼재된 사용
  - 하드코딩된 스타일 값들의 유지보수 어려움
  - 디자인 토큰 부재로 인한 일관성 부족
  - 반응형 디자인 구현의 복잡성

- **현대적인 도구들의 필요성 체감**
  - TailwindCSS의 유틸리티 우선 접근법 이해
  - CVA(Class Variance Authority)를 통한 variants 패턴 학습
  - shadcn/ui의 컴포넌트 설계 철학 이해
  - Storybook을 통한 컴포넌트 문서화의 중요성

## 2. 프로젝트 구조

```
packages/
├── before/          # 레거시 시스템 (분석 대상)
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/      # Button, Badge
│   │   │   ├── molecules/  # FormInput, FormSelect
│   │   │   └── organisms/  # Header, Card, Modal, Table, Alert
│   │   ├── pages/
│   │   │   └── PostManagement.tsx
│   │   └── App.tsx
│   └── package.json
│
└── after/           # 현대적 디자인 시스템 (구현 목표)
    ├── src/
    │   ├── components/
    │   │   └── ui/         # shadcn/ui 컴포넌트
    │   ├── tokens/         # 디자인 토큰
    │   ├── hooks/          # Custom Hooks
    │   └── stories/        # Storybook stories
    ├── .storybook/
    └── package.json
```

## 3. 레거시 시스템 분석 (Before)

### 주요 문제점

#### (1) 일관성 없는 컴포넌트 API
```typescript
// 각 컴포넌트마다 다른 props 이름과 패턴
<FormInput width="full" helpText="도움말" />
<FormSelect size="md" help="다른 이름" />
<FormTextarea variant="bordered" description="또 다른 이름" />
```

#### (2) 혼재된 스타일링 방식
- 인라인 스타일: `style={{ padding: '10px', border: '1px solid #ccc' }}`
- CSS Modules: `className={styles.card}`
- 하드코딩된 색상 값: `#007bff`, `#d32f2f`

#### (3) 타입 안전성 부족
- 느슨한 타입 정의
- 수동 validation
- 에러 처리 불일치

#### (4) 접근성 이슈
- 불완전한 ARIA 라벨
- 키보드 네비게이션 미비
- 스크린 리더 지원 부족

## 4. 과제 목표 및 요구사항

### (1) Atomic Design Pattern - 이론과 현실의 괴리

**현재 구조 (before):**
```
components/
├── atoms/      # Button, Badge
├── molecules/  # FormInput, FormSelect
└── organisms/  # Header, Card, Modal, Table
```

**⚠️ 실무에서의 문제점:**
1. **분류 기준이 모호함**
   - Card는 atom인가 molecule인가? 내용에 따라 달라짐
   - FormInput은 molecule이지만, 단독으로도 충분히 사용 가능

2. **폴더 구조가 오히려 불편함**
   - 컴포넌트를 찾기 위해 3단계를 거쳐야 함
   - import 경로가 길어짐: `../../../components/atoms/Button`
   - 컴포넌트를 옮길 때마다 모든 import 수정 필요

3. **개발 속도 저하**
   - "이게 atom인가 molecule인가?" 고민하는 시간 낭비
   - 팀원마다 분류 기준이 다를 수 있음

**🎯 이번 과제의 목표:**
- Atomic Design의 **개념 자체**를 이해하기 (컴포넌트 조합과 재사용성)
- 하지만 **폴더 구조는 디자인 시스템과 개발구조가 다르다는 점** 이해하기
  - shadcn/ui도 `components/ui/` 단순 구조를 사용함을 주목

### (2) shadcn/ui 사용해보기

**학습 내용:**
- shadcn/ui의 설계 철학 이해
- CLI를 통한 컴포넌트 추가
- Radix UI 기반의 접근성 구현
- 컴포넌트 커스터마이징 방법

**구현할 컴포넌트:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add form
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
```

### (3) TailwindCSS + CVA로 Variants 만들기

**Before (문제):**
```typescript
// 하드코딩된 스타일
const getButtonStyle = (variant: string) => {
  if (variant === 'primary') return { backgroundColor: '#007bff', color: 'white' };
  if (variant === 'secondary') return { backgroundColor: '#6c757d', color: 'white' };
  // ...
};
```

**After (목표):**
```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### (4) Storybook 사용해보기

**Storybook 설정:**
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

**학습 내용:**
- Storybook 설정 및 실행
- Stories 작성 방법
- Args와 Controls 활용
- Accessibility addon 사용
- 컴포넌트 문서 자동 생성

## 5. 과제 제출

## 필수 과제

### 1. 디자인 시스템 구축
- [x] TailwindCSS 설정 및 디자인 토큰 정의
- [x] shadcn/ui 컴포넌트 설치 (Button, Input, Select, Card, Table 등)
- [x] CVA를 활용한 variants 패턴 적용
- [x] 일관된 스타일 시스템 구축

### 2. Before 패키지 분석
- [x] Before 패키지 실행 및 전체 코드 탐색
- [x] 스타일링, 컴포넌트 설계, 폼 관리 측면에서 문제점 파악
- [x] 개선이 필요한 부분과 그 이유 정리

### 3. 컴포넌트 개편
- [x] UI와 비즈니스 로직 분리
- [x] 순수한 UI 컴포넌트로 재구성
- [x] 일관된 컴포넌트 API 설계
- [x] 적절한 컴포넌트 구조 설계

---

## 심화 과제

- [x] Dark Mode 완전 지원 (CSS Variables + Tailwind)
- [x] Design Token 시스템 고도화 (색상 팔레트, 타이포그래피 스케일)
- [x] 뷰와 비즈니스로직이 분리되도록 

---

**이 프로젝트를 통해 레거시 시스템의 문제점을 이해하고, 현대적인 디자인 시스템 구축 능력을 습득하세요!**

## 참고 자료

### TailwindCSS
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [TailwindCSS v4.0 새로운 기능](https://tailwindcss.com/blog/tailwindcss-v4-alpha)

### CVA (Class Variance Authority)
- [CVA 공식 문서](https://cva.style/docs)
- [CVA 예제 모음](https://cva.style/docs/examples)

### shadcn/ui
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

### Storybook
- [Storybook 공식 문서](https://storybook.js.org/docs/react/get-started/introduction)
- [Storybook Args와 Controls](https://storybook.js.org/docs/react/writing-stories/args)
- [Accessibility addon](https://storybook.js.org/addons/@storybook/addon-a11y)

### React Hook Form + Zod
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [React Hook Form + Zod 통합](https://github.com/react-hook-form/resolvers#zod)

### Atomic Design
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Atomic Design과 React](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/)


## 과제 회고

> 과제를 진행하면서 느낀 점, 배운 점을 자유롭게 작성해주세요.

### Before 패키지에서 발견한 문제점
1. 컴포넌트 통합 문제
atoms 단위 컴포넌트에 비즈니스 로직이 많이 포함되어 있었습니다. 예를 들어, Button 컴포넌트에 entityType, action, entity 같은 도메인 타입이 들어가 UI 컴포넌트가 도메인 로직까지 책임지고 있었습니다. 이로 인해 재사용성이 떨어지고 역할이 명확하지 않았습니다.

2. 컴포넌트 폴더 구조 문제
atoms/molecules/organisms 구조는 실제 개발 과정에서 컴포넌트를 찾기 어려웠습니다. 어떤 컴포넌트가 어느 레벨인지 고민하는 시간이 필요했고, 분류 기준 자체가 모호했습니다.

3. 타입 관리 문제
타입이 컴포넌트 내부에 정의되어 있어 재사용이 필요한 타입이 여러 곳에서 중복될 가능성이 있었습니다. 예를 들어, ManagementPage.tsx 내부에 EntityType, Entity 같은 타입이 선언되어 있었습니다.

4. 스타일링 문제
인라인 스타일이 많아 유지보수가 어려웠습니다. 전체적으로 하드코딩된 값이 많았고, 스타일이 일관되지 않았습니다.

5. 접근성 문제
키보드 접근성이 제대로 구성되어 있지 않았고, 시맨틱 HTML 요소가 부족했습니다. 추가로 index.html의 title도 명확하지 않아 접근성 측면에서 개선이 필요했습니다.

6. 사용하지 않는 컴포넌트
Badge 컴포넌트처럼 선언되어 있지만 실제로 사용되지 않는 코드가 남아 있었습니다.

### 개편 과정에서 집중한 부분

1. UI와 비즈니스 로직 분리
가장 중점을 둔 부분은 UI 컴포넌트와 비즈니스 로직을 명확히 분리하는 것이었습니다. 약 800줄이 넘는 ManagementPage.tsx에서 모든 비즈니스 로직을 useEntityManagement 훅으로 분리하고, 페이지 단에서는 UI만 렌더링하도록 개편했습니다. 이를 통해 책임이 명확해지고 테스트와 재사용이 훨씬 쉬워졌습니다.

2. 디자인 시스템 구축
TailwindCSS 4.x와 KRDS 디자인 토큰을 기반으로 일관된 디자인 시스템을 구성했습니다. Primitive Token과 Semantic Token을 구분하여 CSS Variables로 관리했으며, 다크 모드도 지원할 수 있도록 설계했습니다.

3. CVA를 활용한 variants 패턴 적용
Class Variance Authority(CVA)를 사용해 조건문 기반으로 작성된 Button 스타일 로직을 선언형으로 정리했습니다. variant와 size 등을 옵션으로 관리하도록 만들어 타입 안정성과 확장성을 높였습니다.

4. 역할 기반 폴더 구조 도입
기존의 atomic 구조를 버리고 역할 기반 구조로 전환했습니다. components/ui/는 순수 UI 컴포넌트, components/domain/management/는 도메인 컴포넌트로 배치해 구조를 더 명확하게 했습니다.

5. 타입 안전성 개선
공통 타입을 src/types/domain.ts로 분리해 중앙에서 관리하도록 했습니다. 이를 통해 타입 재사용성과 안정성이 모두 향상되었습니다.

6. 접근성 개선
시맨틱 HTML 요소를 적극적으로 적용하고, ARIA 속성도 추가했습니다. 탭 구조의 키보드 네비게이션도 수정해 접근성을 높였습니다. 또한 index.html의 title을 명확하게 수정했습니다.

### 사용한 기술 스택 경험
TailwindCSS 4.x
디자인 토큰을 CSS 변수 기반으로 관리한다는 점이 특히 편리했습니다. 기존의 하드코딩된 색상을 토큰으로 전환하면서 전체적인 스타일 일관성을 확보할 수 있었습니다.

CVA(Class Variance Authority)
스타일 조건문을 대폭 줄이고, 선언적 방식으로 variants를 관리할 수 있었습니다. 타입스크립트와도 잘 맞아 안전하게 작성할 수 있었습니다.

shadcn/ui
처음 사용해봤는데, 복사해 사용하는 방식 덕분에 완전히 통제 가능한 컴포넌트를 사용할 수 있어 좋았습니다. Radix UI 기반이라 접근성이 기본적으로 좋아 개발이 편했습니다.

Storybook
컴포넌트를 독립적으로 테스트하고 문서화할 수 있어 개발 효율이 높아졌습니다. 특히 접근성 애드온을 통해 문제점을 빠르게 확인할 수 있었습니다.

KRDS 디자인 토큰
공공기관의 디자인 기준을 경험해 볼 수 있었고, Primitive/Semantic 토큰 구조가 체계적이라 적용하는 과정이 명확했습니다.

### 어려웠던 점과 해결 방법
1. 다크 모드 구현의 어려움
일부 컴포넌트에서 배경색이 제대로 변경되지 않는 문제가 있었습니다. 원인은 Before 패키지에 하드코딩된 색상 값 때문이었습니다. 이를 해결하기 위해 Semantic Tokens로 전환하고 .dark 기반의 토큰을 구성했습니다. 하지만 Before 디자인을 그대로 따라야 한다는 제약이 있어 인라인 스타일 일부가 남아 있고, 현재는 다크 모드 토글 기능은 구현되어 있지만, 일부 컴포넌트에서 배경색이 완전히 변경되지 않는 상태입니다.

2. 타입 변환 문제
Entity 타입(User | Post)을 Record<string, unknown>로 변환할 때 타입 오류가 발생했습니다. 구조적 호환성 문제였고, 이중 캐스팅을 사용해 해결했습니다.

3. 컴포넌트 분리 과정의 복잡성
거대한 파일을 분리하는 과정에서 로직의 책임을 어디에 둘지 판단하기가 어려웠습니다. 순서를 정해 우선 훅을 만들고, 이후 UI 컴포넌트를 분리하는 방식으로 해결했습니다.

4. 파일명 대소문자 이슈(Linux 환경)
Windows에서는 문제가 없었지만 GitHub Actions에서는 대소문자 불일치로 오류가 발생했습니다. forceConsistentCasingInFileNames: true 옵션을 적용해 예방했습니다.

5. Before 디자인 유지와 개선 사이의 균형
Before 디자인을 그대로 유지하면서 인라인 스타일 제거와 디자인 토큰 도입을 함께 진행해야 하는 점이 어려웠습니다. shadcn/ui는 그대로 유지하고, 일부 레거시 컴포넌트만 사용하여 균형을 맞추는 방법을 택했습니다.
