# Under-the-Stack 컨벤션 가이드

본 문서는 프로젝트의 코드 일관성과 품질 유지를 위한 강제적인 규칙을 정의합니다.

## 1. 코드 품질 도구
- **Biome**: 린팅 및 포맷팅을 위한 단일 도구로 사용합니다.
- **Lefthook**: Git pre-commit 훅을 통해 Biome 검사를 자동화합니다. 커밋 시 에러가 발생하면 수정 전까지 커밋되지 않습니다.

## 2. 아키텍처 규칙 (Feature-based)
프로젝트는 기능 단위로 응집된 구조를 가집니다.

- **src/shared**: UI 컴포넌트, 전역 훅, 범용 유틸리티 등 여러 기능에서 공통으로 쓰는 요소.
- **src/features/[feature-name]**: 특정 기능(예: `simulator`, `event-loop`)에 종속된 컴포넌트와 비즈니스 로직.
- 각 디렉토리는 `index.ts` (Barrel Export)를 통해 외부로 인터페이스를 노출합니다. 모듈 내부의 파일들을 직접 참조하는 것을 지양하고 `@/shared/lib`와 같은 별칭 경로를 사용합니다.

## 3. 네이밍 규칙 (Naming Conventions)
- **Components**: PascalCase (예: `StackVisualizer.tsx`)
- **Variables/Functions**: camelCase (예: `const currentStep = 0`)
- **Constants**: SCREAMING_SNAKE_CASE (예: `const MAX_STACK_SIZE = 10`)
- **Types/Interfaces**: PascalCase, 별도의 접두사 없이 명확한 명사형 (예: `interface SystemState`)

## 4. 커밋 메시지 정책 (Commit Message Policy)
모든 커밋 메시지는 **한글**로 작성하며, Conventional Commits 형식을 따릅니다.
- 형식: `<type>: <한글 요약>` (예: `feat: 스택 시뮬레이션 애니메이션 추가`)
- 타입: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`

## 5. 컴포넌트 문서화 (Component Documentation)
모든 컴포넌트 파일 상단에는 해당 컴포넌트의 역할과 책임을 설명하는 주석 블록을 반드시 포함합니다.
```tsx
/**
 * [컴포넌트 명칭]
 * [역할 설명: 이 컴포넌트가 무엇을 담당하는지, 어떤 데이터를 처리하는지 명시]
 */
```

## 6. TypeScript 규칙
- **Any 사용 금지**: `any` 타입을 절대 사용하지 않습니다. 타입을 알 수 없는 경우 `unknown`을 사용하고 적절한 타입 가드를 구현하십시오.
- **Strict Mode**: 타입스크립트의 strict 옵션을 준수합니다.

## 7. React 규칙 (Engineering Habits)
- **Early Return**: 중첩된 if문 대신 Guard Clause 패턴을 사용하여 코드 깊이를 줄입니다.
- **Single Responsibility**: 하나의 컴포넌트는 하나의 명확한 UI 논리만 담당하도록 작게 분리합니다.
- **함수형 컴포넌트**: 모든 컴포넌트는 함수형 컴포넌트로 작성합니다.
- **Tailwind CSS**: 스타일링에는 Tailwind CSS (v4)를 사용하며, 클래스 조합은 `cn()` 유틸리티를 활용합니다.
- **Base Typography**: 가독성을 위해 기본 폰트 크기는 **16px**(`1rem`)를 지향하며, 프리텐다드(Pretendard) 서체를 기본으로 사용합니다.
- **Theme Principle**: 메인 UI는 **Warm Sand** 테마(OpenAI/Ramp 스타일)를 따르며, 시각화 워크벤치 내부만 **Dark IDE** 스타일을 적용하여 정보 집중도를 높입니다.
