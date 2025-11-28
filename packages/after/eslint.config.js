// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // Storybook 파일에 대한 특별 규칙
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      // Storybook의 render 함수 내부에서 hooks를 사용하는 것은 일반적인 패턴이므로 허용
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  // Storybook 설정 파일과 UI 컴포넌트에 대한 규칙
  {
    files: ['.storybook/**/*.{ts,tsx}', 'src/shared/ui/**/*.{ts,tsx}'],
    rules: {
      // Storybook decorator와 UI 컴포넌트는 variant 등을 함께 export하는 것이 일반적
      'react-refresh/only-export-components': 'off',
    },
  },
  // Storybook 플러그인 설정
  ...storybook.configs['flat/recommended'],
])
