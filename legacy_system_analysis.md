# 레거시 시스템 분석 및 리팩토링 계획

## 1. 레거시 시스템 상세 분석 (`packages/before`)

`packages/before` 디렉토리의 레거시 디자인 시스템은 현대적인 웹 개발 환경에서 여러 비효율과 문제를 야기하는 요소들을 포함하고 있습니다. 각 문제점을 상세히 분석하면 다음과 같습니다.

### (1) 일관성 없는 컴포넌트 API

-   **문제점**: 컴포넌트마다 `props`의 이름과 데이터 타입, 사용 패턴이 모두 다릅니다. 예를 들어, 도움말 텍스트를 전달하는 `prop`이 어떤 컴포넌트에서는 `helpText`이고, 다른 곳에서는 `help` 또는 `description`으로 사용됩니다.
-   **영향**: 이는 개발자의 인지 부하를 가중시키고, 매번 해당 컴포넌트의 구현 코드를 열어 확인해야 하는 번거로움을 만듭니다. 이는 개발 생산성을 저해하는 주요 원인이 되며, 잘못된 `prop` 사용으로 인한 버그 발생 가능성을 높입니다.

    ```tsx
    // [Before] 컴포넌트마다 API가 파편화된 예시
    <FormInput
      label="이메일"
      width="full"
      helpText="로그인에 사용할 이메일 주소입니다."
    />
    <FormSelect
      label="역할"
      size="md"
      help="사용자의 권한을 선택해주세요."
    />
    <FormTextarea
      label="소개"
      variant="bordered"
      description="자신을 자유롭게 소개해주세요."
    />
    ```

### (2) 혼재되고 예측 불가능한 스타일링 방식

-   **문제점**: 하나의 프로젝트 안에 인라인 스타일, CSS Modules, 일반 CSS 파일에 하드코딩된 값 등 여러 스타일링 기법이 혼재되어 있습니다. 특정 색상(`#007bff`)이나 간격(`10px`) 같은 디자인 요소들이 중앙에서 관리되지 않고 여러 곳에 흩어져 있습니다.
-   **영향**: 스타일의 우선순위 충돌이 발생하기 쉽고, 디자인의 일관성을 유지하기가 매우 어렵습니다. 예를 들어, 브랜드 색상을 변경해야 할 경우, 프로젝트 전체에 흩어져 있는 하드코딩된 색상 값을 일일이 찾아 수정해야 하는 유지보수의 악몽이 펼쳐집니다. 다크 모드와 같은 전역 테마 적용은 거의 불가능에 가깝습니다.

    ```tsx
    // [Before] 여러 스타일링 방식이 혼재된 예시

    // 1. 인라인 스타일
    const InlineStyledButton = () => (
      <button style={{ backgroundColor: '#007bff', padding: '10px 15px', color: 'white' }}>
        Click me
      </button>
    );

    // 2. CSS Modules
    import styles from './Card.module.css';
    const Card = ({ children }) => (
      <div className={styles.card}>{children}</div>
    );

    // 3. 하드코딩된 CSS 클래스
    // in Button.css
    // .btn-danger { color: #fff; background-color: #d32f2f; }
    const DangerButton = () => (
      <button className="btn btn-danger">Delete</button>
    );
    ```

### (3) 부족한 타입 안전성

-   **문제점**: 컴포넌트 `props`에 대한 타입 정의가 `any`로 되어 있거나 지나치게 느슨하게 정의된 경우가 많습니다. 또한, 폼(Form) 입력값에 대한 유효성 검사 로직이 각 페이지나 컴포넌트 내부에서 수동으로, 그리고 제각각의 방식으로 처리되고 있습니다.
-   **영향**: 컴파일 시점이 아닌 런타임에서만 오류를 발견할 수 있게 되어 안정성이 크게 떨어집니다. 사용자는 일관성 없는 에러 메시지를 경험하게 되며, 개발자는 잠재적인 타입 관련 버그를 추적하는 데 많은 시간을 소비하게 됩니다.

    ```tsx
    // [Before] 느슨한 타입 정의와 수동 유효성 검사 예시

    // 1. any 타입을 사용하는 Props
    interface CardProps {
      title: string;
      children: any; // 무엇이든 올 수 있어 위험함
    }

    // 2. 컴포넌트 내 수동 유효성 검사
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleBlur = () => {
      if (!email.includes('@')) {
        setError('유효한 이메일 형식이 아닙니다.');
      } else {
        setError('');
      }
    };
    ```

### (4) 웹 접근성(A11y) 문제

-   **문제점**: `button`, `input` 등 상호작용이 가능한 요소들에 ARIA(Accessible Rich Internet Applications) 속성이 제대로 적용되지 않았고, 키보드만으로 앱의 모든 기능을 사용하는 것이 어렵습니다. 스크린 리더 사용자를 위한 대체 텍스트나 레이블 제공도 미흡합니다.
-   **영향**: 장애가 있는 사용자들이 애플리케이션을 정상적으로 사용하기 어렵게 만들어 정보 격차를 유발합니다. 이는 단순히 사용자 경험의 문제를 넘어, 법적 요구사항을 충족하지 못하는 원인이 될 수도 있습니다.

    ```tsx
    // [Before] 웹 접근성이 고려되지 않은 예시

    // 1. label과 input이 연결되지 않음
    <div>
      <span>이름</span>
      <input type="text" />
    </div>

    // 2. div로 버튼을 흉내 내어 키보드 조작이 불가능
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      저장
    </div>
    ```

### (5) 비효율적인 Atomic Design 폴더 구조

-   **문제점**: `atoms`, `molecules`, `organisms`라는 폴더 구조는 Atomic Design의 이론을 문자 그대로 따르고 있지만, 실제 개발에서는 여러 불편함을 초래합니다. `Card`와 같은 컴포넌트는 내용에 따라 `atom`이 될 수도, `molecule`이 될 수도 있어 분류 기준이 모호하고 팀원 간의 논쟁을 유발합니다.
-   **영향**: 개발자는 "이 컴포넌트는 어떤 폴더에 속해야 하는가?"와 같은 비본질적인 고민에 시간을 낭비하게 됩니다. 또한, `../../../components/atoms/Button`처럼 깊어지는 폴더 구조는 `import` 경로를 길고 복잡하게 만들어 코드 가독성을 해치고, 컴포넌트 위치 변경 시 수많은 경로 수정을 요구하여 리팩토링을 어렵게 만듭니다.

    ```tsx
    // [Before] 깊고 복잡한 import 경로
    import { Button } from '../../../components/atoms/Button';
    import { FormInput } from '../../../components/molecules/FormInput';
    import { Header } from '../../../components/organisms/Header';
    ```

---

## 2. 현대적 디자인 시스템으로의 리팩토링 계획 (`packages/after`)

위에서 분석한 문제점들을 해결하기 위해, `packages/after`에서는 다음과 같은 현대적인 도구와 접근 방식을 도입하여 디자인 시스템을 리팩토링합니다.

### (1) 일관된 컴포넌트 API 설계 → `shadcn/ui` 및 `CVA` 도입

-   **해결책**: 모든 컴포넌트의 `props`를 표준화하고 예측 가능하게 만듭니다. `shadcn/ui`는 `variant`, `size` 등과 같이 잘 정립된 `prop` 체계를 제공합니다. 여기에 `CVA(Class Variance Authority)`를 결합하여, 컴포넌트의 다양한 시각적 상태(예: `primary`, `destructive` 버튼)를 선언적이고 일관된 방식으로 관리할 것입니다.

    ```tsx
    // [After] shadcn/ui의 Form 컴포넌트를 사용한 일관된 API 예시
    <FormField name="email">
      <FormItem>
        <FormLabel>이메일</FormLabel>
        <FormControl>
          <Input placeholder="name@example.com" {...field} />
        </FormControl>
        <FormDescription>
          로그인에 사용할 이메일 주소입니다.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    ```

### (2) 유틸리티 우선 스타일링 시스템 구축 → `TailwindCSS` 도입

-   **해결책**: 모든 스타일을 `TailwindCSS` 유틸리티 클래스로 통합합니다. `tailwind.config.js` 파일에 색상, 폰트, 간격 등을 **디자인 토큰**으로 정의하여, 프로젝트 전역에서 재사용하고 중앙에서 관리합니다. 이를 통해 하드코딩된 값을 완전히 제거하고, 애플리케이션 전체의 디자인 일관성을 확보하며, 향후 테마 변경(예: 다크 모드)에 유연하게 대응할 수 있는 기반을 마련합니다.

    ```tsx
    // [After] TailwindCSS와 CVA를 사용한 버튼 컴포넌트 예시

    // 1. CVA로 variants 정의 (components/ui/button.tsx)
    const buttonVariants = cva(
      "inline-flex items-center justify-center ...",
      {
        variants: {
          variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          },
        },
      }
    );

    // 2. tailwind.config.js에 디자인 토큰 정의
    module.exports = {
      theme: {
        extend: {
          colors: {
            primary: 'hsl(var(--primary))', // CSS 변수 참조
            destructive: 'hsl(var(--destructive))',
          },
        },
      },
    };

    // 3. 컴포넌트 사용
    <Button variant="destructive">Delete</Button>
    ```

### (3) 타입 안정성 강화 → `TypeScript`, `React Hook Form`, `Zod` 활용

-   **해결책**: `shadcn/ui`가 기본으로 제공하는 엄격한 `TypeScript` 타입을 적극 활용하여 컴파일 시점에서부터 안정성을 확보합니다. 복잡한 폼 관리는 `React Hook Form` 라이브러리를 사용하고, 입력 데이터의 유효성 검사는 스키마 기반 라이브러리인 `Zod`를 연동하여, 선언적이고 재사용 가능한 방식으로 처리하고 에러 핸들링을 표준화합니다.

    ```tsx
    // [After] Zod 스키마를 사용한 선언적 유효성 검사 예시

    import { z } from "zod";

    // 1. 유효성 검사 스키마 정의
    const formSchema = z.object({
      email: z.string().email({ message: "유효한 이메일 형식이 아닙니다." }),
      password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
    });

    // 2. React Hook Form과 연동
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: { email: "", password: "" },
    });

    // 3. 폼 상태와 에러 메시지가 자동으로 관리됨
    ```

### (4) 접근성 보장 → `Radix UI` 기반 컴포넌트 활용

-   **해결책**: `shadcn/ui`는 내부적으로 웹 접근성을 매우 높은 수준으로 구현한 `Radix UI`를 기반으로 합니다. 따라서 별도의 복잡한 ARIA 속성 설정 없이도 키보드 네비게이션, 스크린 리더 호환성 등이 기본적으로 보장되는 컴포넌트를 사용하게 됩니다. 이를 통해 모든 사용자가 동등한 경험을 누릴 수 있도록 합니다.

    ```tsx
    // [After] shadcn/ui(Radix)를 사용하여 기본적으로 접근성이 보장된 예시

    // 1. Label과 Input이 자동으로 연결됨
    <Label htmlFor="username">이름</Label>
    <Input id="username" />

    // 2. 기본 <button> 태그를 사용하며 키보드 포커스, 스페이스/엔터키 동작 등이 모두 지원됨
    <Button onClick={handleClick}>저장</Button>
    ```

### (5) 실용적인 컴포넌트 구조로 개편 → `components/ui` 단일 구조

-   **해결책**: Atomic Design의 '조합'과 '재사용'이라는 핵심 철학은 유지하되, 불필요한 폴더 계층은 제거합니다. `shadcn/ui`가 제안하는 방식처럼, 모든 공용 UI 컴포넌트를 `components/ui`라는 단일 디렉토리에 위치시켜 구조를 단순화합니다. 이를 통해 컴포넌트 탐색이 쉬워지고, `import` 경로가 짧아지며, 개발자가 분류에 대한 고민 없이 핵심 로직 개발에 집중할 수 있도록 돕습니다.

    ```tsx
    // [After] 단순하고 예측 가능한 import 경로 (경로 별칭 '@' 사용)
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardContent } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    ```
