# Scripts

이 디렉토리는 프로젝트의 자동화 스크립트를 포함합니다.

## transform-tokens.cjs

Figma Tokens Studio에서 생성한 `figmaToken.json`을 CSS 커스텀 속성으로 변환합니다.

### 사용법

```bash
node scripts/transform-tokens.cjs
```

### 입력
- `figmaToken.json` (루트 디렉토리)

### 출력
- `packages/after/src/styles/components.css` (업데이트된 `@theme` 블록)

### 주요 기능
- 기존 CSS 토큰 보존
- Figma 토큰과 기존 토큰 병합
- 카테고리별 토큰 정렬

자세한 내용은 [Figma Tokens Workflow 문서](../docs/FIGMA_TOKENS_WORKFLOW.md)를 참조하세요.
