# Design System - After & Storybook

## 🚀 배포 링크

- **After 프로젝트**: https://ongsim0629.github.io/design_system/
- **Storybook**: https://ongsim0629.github.io/design_system/storybook/

## 📦 로컬 실행

```bash
# 의존성 설치
pnpm install

# After 개발 서버 실행
pnpm dev:after

# Storybook 실행
pnpm storybook

# 빌드
pnpm build:after
pnpm build-storybook
```

## 🔧 배포 방법

GitHub Actions를 통해 자동 배포됩니다:
1. `main` 브랜치에 push
2. GitHub Actions가 자동으로 빌드 및 배포
3. GitHub Pages에서 확인 가능

## 📋 프로젝트 구조

```
packages/after/
├── dist/              # Vite 빌드 결과 (After 프로젝트)
└── storybook-static/  # Storybook 빌드 결과
```

배포 구조:
```
GitHub Pages:
├── /                  → After 프로젝트
└── /storybook/        → Storybook
```
