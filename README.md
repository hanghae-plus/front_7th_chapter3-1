# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

## 배포 링크
- [프로젝트 경로](https://rlacodud.github.io/front_7th_chapter3-1)
- [스토리북 경로](https://rlacodud.github.io/front_7th_chapter3-1/storybook/?path=/docs/design-system-colors--docs)


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
#### (1) 접근성
**(1-1) ESC키 지원 부재**
ESC키로 팝업이 안 닫힌다. => 접근성 위배
<img width="3412" height="1892" alt="image" src="https://github.com/user-attachments/assets/3ef3d96f-4f65-4906-bdb6-825cb4bb67e9" />

**(1-2) 닫기 버튼 순서 오류**
모달의 닫기 버튼은 모달의 가장 마지막 요소로 마크업되어야 하나, 헤더 영역에 위치한다.
<img width="933" height="226" alt="image" src="https://github.com/user-attachments/assets/6754613f-5037-4c5d-b276-5a19dfaba9f8" />
[참고 문서](https://www.krds.go.kr/html/site/component/component_04_05.html)
```tsx
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
        {showFooter && footerContent && (
          <div className="modal-footer">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
```

**(1-3) ARIA 속성 부재**
**1️⃣ 모달 트리거 버튼**
모달을 트리거하는 버튼에는 data-target 속성으로 모달 id가 부여되어야 한다.
<img width="492" height="372" alt="image" src="https://github.com/user-attachments/assets/46a5515d-5c40-4da2-a359-32b149deb065" />

**2️⃣ 모달 영역**
모달 영역에는 트리거 버튼과 동일한 이름의 id와 aria-labelledby를 지정해야 하고 role="dialog"로 해당 영역의 role을 명시해야 한다.
```
<button type="button" class="krds-btn large open-modal" data-target="modal_sample_03">class 및 data-target 호출</button>
<!-- modal -->
<section id="modal_sample_03" class="krds-modal fade" role="dialog" aria-labelledby="tit_modal_sample_03">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- modal title -->
      <div class="modal-header">
        <h2 id="tit_modal_sample_03" class="modal-title">
          모달 제목
        </h2>
      </div>
      <!-- //modal title -->
      <!-- modal contents -->
      <div class="modal-conts">
        <div class="conts-area">
          시작 <br>
          대화 상자는 사용자에게 작업에 대해 알리고 중요한 정보를 포함하거나 결정이 필요하거나 여러 작업을 포함할 수 있습니다.
        </div>
      </div>
      <!-- //modal contents -->
      <!-- modal btn -->
      <div class="modal-btn btn-wrap">
        <button type="button" class="krds-btn medium tertiary close-modal">아니요</button>
        <button type="button" class="krds-btn medium primary close-modal">예</button>
      </div>
      <!-- //modal btn -->
      <!-- close button -->
      <button type="button" class="krds-btn medium icon btn-close close-modal">
        <span class="sr-only">닫기</span>
        <i class="svg-icon ico-popup-close"></i>
      </button>
      <!-- //close button -->
    </div>
  </div>
  <div class="modal-back"></div>
</section>
<!-- //modal -->
```

#### (2) 스타일
**(2-1) 토큰없이 중복 사용되는 색상값**
<img width="842" height="76" alt="image" src="https://github.com/user-attachments/assets/6d3b1e2c-8deb-4c24-9379-9cba27f9e1ab" />
<img width="842" height="72" alt="image" src="https://github.com/user-attachments/assets/2e3714b6-af68-4bb8-ab2c-4f84dc3eb352" />
<img width="840" height="80" alt="image" src="https://github.com/user-attachments/assets/31ee161b-9e2d-45fc-838c-22e60a2a7f63" />

**(2-2) 단위값 혼재**
<img width="1094" height="532" alt="image" src="https://github.com/user-attachments/assets/69537f44-ff27-4857-acf2-e704905324fe" />

**(2-3) 미흡한 반응형 처리**
<img width="638" height="130" alt="image" src="https://github.com/user-attachments/assets/a40742ea-aa24-427e-b730-fd9df6730631" />

**(2-4) 케이스 명세 미흡**
한번에 각 컴포넌트의 props에 따른 케이스를 확인하기 어렵다.

#### (3) 컴포넌트
**(3-1) 카테고리 미지정 시 대응 미흡**
카테고리 미지정 후 생성 시 해당 영역 분기 처리가 미흡하다.﻿
<img width="2278" height="140" alt="image" src="https://github.com/user-attachments/assets/aabe57ca-6717-4496-b75e-30065c1c2f74" />

**(3-2) 텍스트 분기 처리 미흡**
옳은 조사가 와야 하는데 해당 영역에 대한 분기 처리가 미흡하다.
<img width="2332" height="244" alt="image" src="https://github.com/user-attachments/assets/29d98999-422f-409b-b260-f0d785e344c2" />
<img width="2326" height="190" alt="image" src="https://github.com/user-attachments/assets/56fa4f3e-ce02-48c2-95da-c7b63528eb00" />

#### (4) 폴더 구조
**(4-1) 비효율적인 폴더 구조**
<img width="412" height="528" alt="image" src="https://github.com/user-attachments/assets/8c3fa5bb-05a8-46ab-b055-316588bba15b" />

**(4-2) 분리되어있지 않은 UI와 기능 로직**
<img width="1128" height="1328" alt="image" src="https://github.com/user-attachments/assets/fdccd119-feec-413d-8835-a65576994ebc" />

### 개편 과정에서 집중한 부분
단순히 UI를 예쁘게 만드는 것이 아니라 **재사용성**과 **확장성**을 고려한 UI 설계가 핵심이었습니다.
```
[핵심 개선 원칙]
관심사 분리: UI, 비즈니스 로직, 데이터 로직을 명확히 분리
재사용성: 컴포넌트와 hook을 독립적으로 사용 가능하도록 설계
타입 안전성: TypeScript와 CVA로 컴파일 타임에 오류 방지
접근성: Radix UI로 WCAG 가이드라인 준수
일관성: 디자인 토큰 시스템으로 일관된 디자인 유지
문서화: Storybook으로 컴포넌트 사용법 명확히
```

**(1) before 패키지 분석**
before 패키지를 빌드하고 분석하며 해당 내용을 블로그에 정리했습니다.

**(1-1) 분석 과정**
- before 패키지를 빌드하고 실행하여 실제 동작 확인
- 각 컴포넌트의 코드를 분석하여 문제점 도출
- 접근성, 스타일, 구조적 문제점을 카테고리별로 정리
- 블로그에 분석 결과 정리

**(1-2) 발견된 주요 문제점**
- 접근성: ESC키 미지원, ARIA 속성 부재, 닫기 버튼 위치 오류
- 스타일: 하드코딩된 색상, 단위 혼재, 반응형 미흡
- 구조: Atomic Design 폴더 구조의 복잡성, UI/로직 혼재

**(2) tailiwind 설정 + 디자인 토큰 생성**
문제점 파악 후 일관된 디자인 시스템 구축을 위해 하드코딩된 색상 값은 제거하고 **디자인 토큰**을 생성했습니다.

**(2-1) 원시 토큰 정의 (primitive.css)**
```css
/* packages/after/src/tokens/primitive.css */
:root {
  /* 중복 없는 고유 색상 값만 정의 */
  --blue-50: #e3f2fd;
  --blue-400: #1976d2;
  --blue-500: #1565c0;
  /* ... */
  
  /* 간격 값 정의 */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  /* ... */
}
```

**(2-2) 의미론적 토큰 매핑 (index.css)**
```css
/* packages/after/src/styles/index.css */
@theme inline {
  /* 색상 토큰 */
  --color-primary: var(--blue-400);
  --color-primary-hover: var(--blue-500);
  --color-success: var(--green-500);
  --color-danger: var(--red-500);
  
  /* 간격 토큰 */
  --spacing-1: var(--spacing-4);
  --spacing-2: var(--spacing-8);
  --spacing-4: var(--spacing-16);
}
```

**(3) shadCN으로 컴포넌트 생성 및 CVA 작업**
기본적인 디자인 토큰 설정이 완료됐으면 shadCN으로 **재사용 가능하고 타입 안전**한 UI 컴포넌트를 생성합니다.

**(4) Storybook 생성**
구현한 컴포넌트를 문서화하기 위해 스토리북을 생성합니다.
```tsx
// packages/after/src/stories/Button.stories.tsx
export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
  },
};
```
이 때 컴포넌트 외에도 **토큰값도 문서화**하여 협업 시 파악이 쉽도록 합니다.

**(5) PostManagement 마이그레이션**
before의 복잡한 컴포넌트를 after의 깔끔한 구조로 전환합니다.

**(5-1) 비즈니스 로직 분리.**
```tsx
// Before: 모든 로직이 컴포넌트 내부 (647줄)
export const ManagementPage = () => {
  const [entityType, setEntityType] = useState('post');
  const [data, setData] = useState([]);
  // ... 20개 이상의 상태
  // ... 모든 비즈니스 로직
  return <div>{/* 400줄 JSX */}</div>;
};
// After: 로직을 hook으로 분리
export const ManagementPage = () => {
  const {
    entityType,
    data,
    columns,
    statsCards,
    // ... 모든 로직
  } = useManagementPage();
  return (
    <div>
      <EntityStats cards={statsCards} />
      <EntityTable columns={columns} data={data} />
    </div>
  );
};
```

**(5-2) 커스텀 훅 분리**
```tsx
// packages/after/src/hooks/useManagementPage.ts
export const useManagementPage = () => {
  // 상태 관리
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  // 페이지네이션 로직 분리
  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
  } = useManagementPagination(data, { pageSize: 10 });
  // 통계 계산 로직 분리
  const statsCards = useManagementStats(entityType, data);
  // API 호출
  const loadData = useCallback(async () => {
    // ...
  }, [entityType]);
  return {
    entityType,
    setEntityType,
    data: paginatedData,
    columns,
    statsCards,
    // ...
  };
};
```

**(5-3) 도메인 로직 분리**
```tsx
// packages/after/src/hooks/management/form-utils.ts
export const getInitialFormData = (entityType: EntityType): ManagementFormData => {
  if (entityType === "user") {
    return {
      username: "",
      email: "",
      role: "user",
      status: "active",
    };
  }
  return {
    title: "",
    content: "",
    author: "",
    category: "development",
    status: "draft",
  };
};
// packages/after/src/constants/management.ts
export const USER_ROLES = {
  user: { value: "user", label: "사용자" },
  moderator: { value: "moderator", label: "운영자" },
  admin: { value: "admin", label: "관리자" },
};
```

**(5-4) 컴포넌트 분리**
```tsx
// packages/after/src/components/management/EntityTable.tsx
// 순수 UI 컴포넌트 - props로 데이터만 받음
export const EntityTable: React.FC<EntityTableProps> = ({
  columns,
  data,
  entityType,
  onEdit,
  onDelete,
}) => {
  // 렌더링만 담당
};
// packages/after/src/components/management/EntityStats.tsx
// 통계 카드 컴포넌트
export const EntityStats: React.FC<EntityStatsProps> = ({ cards }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <InfoCard key={card.label} {...card} />
      ))}
    </div>
  );
};
```
### ✅[추가 개선] 탭 레이아웃 구조 개선
Before 패키지의 Dashboard는 탭 버튼과 콘텐츠가 시각적으로 연결되지 않아 사용자가 현재 어떤 패널을 보고 있는지 인지하기 어려울 것 같다고 생각했습니다.

**[문제점]**
- 탭과 콘텐츠 영역이 분리되어 있어 시각적 연결성 부족
- 콘텐츠 패널의 컨테이너가 분리된 듯 보이며 탭 전환 경험이 떨어짐
- UI 요소 간 위계 구조가 명확하지 않음

![image](https://github.com/user-attachments/assets/78f22e40-9a9b-4051-8700-936b5e9f1545)
**[개선 방향]**
 - 탭과 콘텐츠를 하나의 Card로 묶는 UI 레이아웃 적용
 - 탭 선택 시 콘텐츠와 동일 컨테이너 내부에 표현하여 시각적 그룹화
 - 콘텐츠 영역에 배경 / border / spacing 토큰 적용해 구조적 위계 개선

---

### 사용한 기술 스택 경험
#### 1️⃣ TailwindCSS
TailwindCSS는 유지보수하던 프로젝트에 적용되어있어서 수정정도만 해본 경험이 전부였습니다.
그러나 퍼블리셔이다보니 직접 스타일을 짜는 게 더 편하기도 하고 가독성이 안좋아서 선호하지 않았습니다.

처음에는 디자인 토큰을 만드는데 왜 TailwindCSS를 사용하는지 이해가 안갔고 재윤님과 이에 관해 얘기를 나눴습니다.
그러다 TailwindCSS가 **유틸리티 클래스** 기반이라 **토큰 적용을 즉각적**으로 할 수 있다는 걸 알게 됐습니다.

일반적으로 TailwindCSS를 많이 사용하는 이유를 깨닫게 되면서 그게 장점이라면, 만약 토큰 적용만 필요한 프로젝트에서는 TailwindCSS가 오히려 용량을 차지할 수도 있겠다는 생각이 들어
토큰 적용을 즉각적으로 할 수 있는 또다른 라이브러리가 있는지 찾아보게 되면서 확장시키는 경험을 할 수 있었습니다.

#### 2️⃣ shadcn/ui
shadcn도 지나가며 아는 정도였는데 우선 CLI로 코드를 적용할 수 있다는 게 신기했습니다.
마치 마트에서 사온 초밥 포장을 뜯고 그릇에 옮겨 직접 만든 것처럼 보이는 형태가 떠올랐습니다.

접근성을 보장하고 compound component를 제공한다는 점에서 react 프로젝트에서 널리 쓰이는 이유를 이해할 수 있었고
무엇보다 구조 잡기 귀찮은 모달이나 테이블에 대해 딸깍 한번으로 생성된다는 것에서 편리함을 몸소 깨달을 수 있었습니다.

여기에 cva라는 개념을 접목해 유형별 스타일링을 타입 정의하듯이 보기 좋게 적용할 수 있다는 점도 인상 깊었습니다.

---

### 어려웠던 점과 해결 방법
생각보다 다크모드를 구현할 때 색상 적용에서 애를 먹었습니다.
TailwindCSS의 기본 클래스와 충돌이 나서 그런가 싶어서 유니크한 네이밍으로 변경했음에도 몇몇 토큰은 다크모드가 제대로 적용되지 않아 명시적인 클래스명으로 정의하여 적용했습니다.


### 리뷰받고 싶거나 질문하고 싶은 내용
- 위 이슈에 대한 명확한 이유가 궁금합니다.
어떤 부분에서 세팅이 잘못되어 다크모드일 때, 특정 토큰만 정상 적용되고 그 외에는 적용이 안된 이유가 궁금합니다.
- 과제 제출 이후 추가 리팩토링 진행하며 궁금해진 내용인데요,
shadCN의 탭 컴포넌트를 활용하도록 수정하다보니 role을 button으로 찾는 부분에서 테스트가 실패해서 tab으로 변경했습니다!
=> 이 부분을 수정하는 것까지 의도된 부분이 맞을까용?
태그는 button이 맞지만 접근성 상 role은 tab으로 제공하는 게 맞다보니 테스트를 수정하지 않고 통과하는 방법을 모르겠습니다!

---

❗️과제 제출 이후 조금 더 리팩토링을 진행하고 싶어서 추가 커밋을 남겼습니다❗️

자세한 구현 과정과 회고는 아래 블로그에 정리했습니다! 😊
[6주차_디자인 시스템 발전기](https://chaeng03.tistory.com/entry/%ED%95%AD%ED%95%B499-6%EC%A3%BC%EC%B0%A8%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%B0%9C%EC%A0%84%EA%B8%B0)
[WIL 6주차_Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템](https://chaeng03.tistory.com/entry/%ED%95%AD%ED%95%B499-WIL-6%EC%A3%BC%EC%B0%A8Chapter3-1-UI-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%AA%A8%EB%93%88%ED%99%94%EC%99%80-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C)
