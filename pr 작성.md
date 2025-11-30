# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

## 과제 목표

**레거시 코드베이스를 현대적인 디자인 시스템으로 개편하는 실무 경험**

1. 정리되지 않은 레거시 코드의 문제점 식별 및 분석
2. TailwindCSS, shadcn/ui, CVA 등의 현대 도구 활용
3. 일관된 디자인 토큰과 컴포넌트 API 구축
4. UI와 비즈니스 로직이 적절한 분리된 리팩토링

---

## Before 패키지 분석 후 After 패키지 개편

### 개편 목표

**디자인 시스템**
- TailwindCSS 기반 일관된 디자인 토큰 정의
- 하드코딩 제거, 재사용 가능한 스타일 시스템 구축
- dark mode, 반응형 등 확장 가능한 구조

**컴포넌트 아키텍처**
- UI 컴포넌트는 순수하게 UI만 담당
- 도메인 로직은 적절히 분리
- 일관된 컴포넌트 API 설계

### 사용할 도구

**TailwindCSS 4.x**
- 디자인 토큰 기반 스타일링
- 유틸리티 클래스 활용
- dark mode, 반응형 내장 지원

**shadcn/ui**
- Radix UI 기반, 접근성 내장
- 복사 가능한 컴포넌트 (라이브러리가 아닌 소스코드)
- 자유로운 커스터마이징

**CVA (Class Variance Authority)**
- 선언적 variants 패턴
- 타입 안전한 스타일 조합
- 조건부 스타일링 처리

**React Hook Form + Zod**
- 선언적 폼 검증
- 타입 안전한 스키마
- 최소 리렌더링 최적화

---

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

## 과제 회고

> 과제를 진행하면서 느낀 점, 배운 점을 자유롭게 작성해주세요.

### Before 패키지에서 발견한 문제점

1. **Atomic Design Pattern의 모호함**: Card나 FormInput 같은 컴포넌트가 Atom인지 Molecule인지 분류 기준이 모호하여 개발 시 혼란을 초래했습니다.
2. **복잡한 폴더 구조**: `components/atoms/Button`과 같이 깊은 폴더 구조로 인해 import 경로가 길어지고 컴포넌트 탐색이 불편했습니다.
3. **일관성 없는 스타일링**: 인라인 스타일, CSS Modules, 하드코딩된 색상 값이 혼재되어 유지보수가 어려웠습니다.

### 개편 과정에서 집중한 부분

1. **shadcn/ui 도입 및 구조 단순화**: 복잡한 Atomic Design 폴더 구조 대신 `components/ui`의 플랫한 구조를 채택하여 접근성을 높였습니다.
2. **Tailwind CSS v4 & CVA**: 최신 Tailwind v4를 도입하고 CVA를 활용해 타입 안전하고 일관된 스타일 variants를 구축했습니다.
3. **UI와 로직 분리**: `ManagementPage`에서 `EntityForm`, `EntityTable` 등으로 컴포넌트를 분리하고, 비즈니스 로직과 UI 렌더링을 명확히 구분했습니다.
4. **디자인 토큰 및 다크 모드**: CSS 변수를 활용한 디자인 토큰 시스템을 구축하고, 이를 기반으로 다크 모드를 완벽하게 지원하도록 구현했습니다.

### 사용한 기술 스택 경험

- **Tailwind CSS v4**: 최신 버전의 Tailwind를 적용하며 설정 방식(CSS 기반 설정)의 변화를 경험했습니다.
- **shadcn/ui (Canary)**: Tailwind v4와 호환되는 Canary 버전을 사용하여 모던한 컴포넌트 시스템을 구축했습니다.
- **GitHub Actions**: Monorepo 구조에서 Before/After 패키지를 각각 빌드하고 배포하는 워크플로우를 직접 구성했습니다.
- **React Hook Form + Zod**: 복잡한 폼 유효성 검사를 선언적으로 처리하고 타입 안전성을 확보했습니다.
- **Storybook A11y**: 컴포넌트 단위로 접근성 테스트를 자동화하여 품질을 검증했습니다.

### 어려웠던 점과 해결 방법

1. **Tailwind v4 + shadcn/ui 호환성 문제**:
   - **문제**: Tailwind v4에서 기존 shadcn 설치 방식이 작동하지 않음.
   - **해결**: `shadcn@canary` 버전을 사용하고, `vite.config.ts`와 `globals.css`를 v4 방식에 맞게 수동으로 설정하여 해결했습니다.

2. **GitHub Pages 멀티 배포**:
   - **문제**: 하나의 리포지토리에서 Before와 After 버전을 동시에 배포해야 함.
   - **해결**: GitHub Actions에서 빌드 후 `dist/before`, `dist/after`로 디렉토리를 구조화하고, `base` 경로를 각각 설정하여 해결했습니다.

### 리뷰받고 싶거나 질문하고 싶은 내용

1. **Tailwind v4 + shadcn/ui 설정**: 현재 Tailwind v4와 shadcn/ui를 함께 사용하기 위해 Canary 버전을 사용하고 `vite.config.ts`를 수동으로 설정했습니다. 이 방식이 최선인지, 혹은 더 안정적인 설정 방법이 있는지 궁금합니다.
2. **테스트 코드와 Shadcn Select**: 기존 테스트 코드를 통과시키기 위해 `HiddenNativeSelect`를 구현하여 숨겨진 select 요소로 테스트를 우회했습니다. Radix UI 기반 컴포넌트의 테스트를 위한 더 나은 접근 방식(예: userEvent 활용 등)이 있을까요?
3. **디자인 토큰 네이밍**: 색상 토큰을 `error`, `success` 등 의미(semantic) 위주로 정의했는데, 컴포넌트 레벨의 토큰(예: `button-bg`)까지 세분화하는 것이 유지보수에 더 유리할지 조언을 구하고 싶습니다.
4. **GitHub Actions 배포 전략**: `before`와 `after` 패키지를 `dist` 폴더 내에 각각 빌드하여 배포하는 방식을 택했습니다. 이 CI/CD 파이프라인에서 개선할 점이 있다면 피드백 부탁드립니다.
5. **Storybook 설정**: Tailwind v4 환경에서 Storybook을 구성하고 주요 컴포넌트의 Story를 작성했습니다. 설정이 올바른지 리뷰 부탁드립니다.
