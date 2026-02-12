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

## 3. TypeScript 규칙
- **Any 사용 금지**: `any` 타입을 절대 사용하지 않습니다. 타입을 알 수 없는 경우 `unknown`을 사용하고 적절한 타입 가드를 구현하십시오.
- **Strict Mode**: 타입스크립트의 strict 옵션을 준수합니다.

## 4. React 규칙
- **함수형 컴포넌트**: 모든 컴포넌트는 함수형 컴포넌트로 작성합니다.
- **파일 분리**: 한 파일의 길이가 200줄을 넘어가기 시작하면 컴포넌트를 분리하거나 로직을 Custom Hook으로 추출합니다.
- **Tailwind CSS**: 스타일링에는 Tailwind CSS (v4)를 사용하며, 클래스 조합은 `cn()` 유틸리티를 활용합니다.

## 5. 커밋 메시지 규칙
Conventional Commits를 따릅니다.
- `feat:` 새로운 기능
- `fix:` 버그 수정
- `chore:` 설정 변경, 패키지 설치 등
- `refactor:` 코드 리팩토링
