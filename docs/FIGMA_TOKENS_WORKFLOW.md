# Figma Tokens Automation Workflow

이 문서는 Figma Tokens Studio에서 디자인 토큰을 자동으로 CSS로 변환하고 PR을 생성하는 워크플로우에 대해 설명합니다.

## 📋 개요

### 워크플로우 흐름

```
Figma Design
    ↓ (Tokens Studio for Figma)
figmaToken.json
    ↓ (Push to figma-token branch)
GitHub Actions Trigger
    ↓ (scripts/transform-tokens.cjs)
packages/after/src/styles/components.css
    ↓ (Create PR)
main branch
```

## 🚀 사용 방법

### 1. Figma에서 디자인 토큰 업데이트

1. Figma에서 Tokens Studio 플러그인 열기
2. 디자인 토큰 수정 (색상, 간격, 타이포그래피 등)
3. GitHub 연동 설정:
   - Repository: `your-username/front_7th_chapter3-1`
   - Branch: `figma-token`
   - File path: `figmaToken.json`
4. **Push to GitHub** 버튼 클릭

### 2. 자동화 프로세스 실행

`figma-token` 브랜치에 `figmaToken.json`이 push되면:

1. **GitHub Actions 자동 트리거** (`.github/workflows/sync-figma-tokens.yml`)
2. **토큰 변환 스크립트 실행** (`scripts/transform-tokens.cjs`)
   - 기존 CSS의 `@theme` 블록 파싱
   - Figma 토큰과 기존 토큰 병합
   - 새로운 `@theme` 블록 생성
3. **변경사항 커밋 및 푸시**
   - 새 브랜치 생성: `figma-tokens/sync-YYYYMMDD-HHMMSS`
   - CSS 파일 업데이트 커밋
4. **Pull Request 자동 생성**
   - Base: `main`
   - Labels: `design-tokens`, `automated-pr`

### 3. PR 리뷰 및 머지

생성된 PR에서:

1. 변경된 토큰 값 확인
2. Storybook에서 시각적 검증:
   ```bash
   pnpm storybook
   ```
3. 컴포넌트가 올바르게 렌더링되는지 확인
4. PR 승인 및 머지

## 🔧 구성 파일

### 1. GitHub Actions 워크플로우

**파일**: `.github/workflows/sync-figma-tokens.yml`

**트리거 조건**:
- `figma-token` 브랜치에 push
- `figmaToken.json` 파일 변경 시

**주요 단계**:
```yaml
- figma-token 브랜치 체크아웃
- 새 브랜치 생성 (main 기반)
- figmaToken.json 복사
- 토큰 변환 스크립트 실행
- 변경사항 커밋 & 푸시
- PR 생성
```

### 2. 토큰 변환 스크립트

**파일**: `scripts/transform-tokens.cjs`

**주요 기능**:

1. **기존 토큰 보존**
   ```javascript
   parseExistingTheme() // CSS에서 기존 @theme 블록 파싱
   ```

2. **토큰 병합**
   ```javascript
   mergeTokens(existingTokens, newTokens)
   // Figma 토큰이 우선순위를 가지며, 기존 토큰 유지
   ```

3. **CSS 생성**
   ```javascript
   generateThemeCSS(mergedTokens)
   // 카테고리별로 정렬된 @theme 블록 생성
   ```

**토큰 카테고리**:
- Colors (Primary, Secondary, Success, Danger, Warning)
- Spacing
- Typography (Font Sizes, Font Weights, Line Heights)

## 📝 figmaToken.json 구조

```json
{
  "global": {
    "--color-primary-500": {
      "value": "#1976d2",
      "type": "color"
    },
    "--spacing-4": {
      "value": "16px",
      "type": "spacing"
    },
    "--font-size-base": {
      "value": "0.875rem",
      "type": "fontSize"
    }
  },
  "$themes": [],
  "$metadata": {
    "tokenSetOrder": ["global"]
  }
}
```

## 🎯 토큰 네이밍 컨벤션

### 색상 토큰
```
--color-{semantic}-{shade}
```
- 예: `--color-primary-500`, `--color-danger-700`
- Semantic: primary, secondary, success, danger, warning
- Shade: 100 (light), 500 (base), 700 (dark)

### 간격 토큰
```
--spacing-{scale}
```
- 예: `--spacing-4`, `--spacing-8`
- Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16

### 타이포그래피 토큰
```
--font-size-{size}
--font-weight-{weight}
--line-height-{name}
```
- 예: `--font-size-base`, `--font-weight-bold`, `--line-height-normal`

## 🔍 로컬 테스트

수동으로 토큰 변환을 테스트하려면:

```bash
# 1. figma-token 브랜치에서 토큰 파일 가져오기
git show origin/figma-token:figmaToken.json > figmaToken.json

# 2. 변환 스크립트 실행
node scripts/transform-tokens.cjs

# 3. 변경사항 확인
git diff packages/after/src/styles/components.css

# 4. 테스트 파일 정리
rm figmaToken.json
git restore packages/after/src/styles/components.css
```

## 🐛 트러블슈팅

### 워크플로우가 실행되지 않는 경우

1. **브랜치 확인**
   ```bash
   git branch -a
   # figma-token 브랜치 존재 확인
   ```

2. **파일 경로 확인**
   - `figmaToken.json`이 **루트 디렉토리**에 있어야 함
   - 경로가 다르면 워크플로우의 `paths` 수정 필요

3. **권한 확인**
   - Repository Settings → Actions → General
   - "Workflow permissions" → "Read and write permissions" 활성화

### 변환 스크립트 오류

1. **Node.js 버전 확인**
   ```bash
   node --version  # v20 이상 권장
   ```

2. **파일 경로 확인**
   ```bash
   ls -la figmaToken.json
   ls -la packages/after/src/styles/components.css
   ```

3. **로그 확인**
   - GitHub Actions → 워크플로우 실행 로그 확인
   - 스크립트 실행 시 자세한 에러 메시지 출력됨

### PR이 생성되지 않는 경우

1. **변경사항 확인**
   - 토큰 값이 실제로 변경되었는지 확인
   - 변경사항이 없으면 PR이 생성되지 않음

2. **GitHub Token 권한 확인**
   - `GITHUB_TOKEN`이 `pull-requests: write` 권한 보유 확인

## 📚 참고 자료

- [Tokens Studio for Figma](https://tokens.studio/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [TailwindCSS @theme Documentation](https://tailwindcss.com/docs/theme)

## 🔄 향후 개선 사항

- [ ] 시각적 회귀 테스트 자동화 (Chromatic/Percy)
- [ ] 토큰 변경 시 영향받는 컴포넌트 자동 감지
- [ ] 다크 모드 토큰 지원
- [ ] 토큰 변경 히스토리 시각화
- [ ] Slack/Discord 알림 통합
