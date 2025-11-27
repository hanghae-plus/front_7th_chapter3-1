# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo project demonstrating the migration from a legacy design system to a modern one. It contains two main packages:
- `packages/before/`: Legacy codebase with problematic patterns (analysis target)
- `packages/after/`: Modern design system implementation using TailwindCSS, shadcn/ui, and CVA

The goal is to understand legacy design system problems and build a modern, maintainable component library.

## Development Commands

### Running the Applications
```bash
# Run legacy (before) package
pnpm dev:before

# Run modern (after) package
pnpm dev:after

# Default dev (runs before package)
pnpm dev
```

### Storybook
```bash
# Run Storybook for the after package
pnpm storybook

# Build Storybook
pnpm build-storybook
```

### Testing
```bash
# Run tests in watch mode for all packages
pnpm test

# Run tests for specific package
pnpm test:before
pnpm test:after

# Run tests once (CI mode)
pnpm test:run
pnpm test:run:before
pnpm test:run:after

# Run tests with UI
pnpm --filter @front_lite_chapter3-1/after test:ui
```

### Building
```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:before
pnpm build:after
```

### Linting
```bash
# Lint all packages
pnpm lint
```

## Architecture & Design Patterns

### Component Architecture (After Package)

The after package uses a **flattened component structure** rather than strict Atomic Design folders:

```
src/
├── components/
│   ├── ui/              # Base UI components (shadcn/ui based)
│   │   ├── button.tsx   # Using CVA for variants
│   │   └── badge.tsx    # Unified Badge with type discrimination
│   ├── Badge/           # Domain-specific badge wrappers
│   │   ├── CategoryBadge.tsx
│   │   ├── UserRoleBadge.tsx
│   │   └── StatusBadge.tsx
│   ├── molecules/       # Form components
│   └── organisms/       # Complex components (Table, Modal, Alert)
├── pages/               # Page components
├── services/            # Business logic (userService, postService)
├── types/               # TypeScript type definitions
└── styles/              # Global styles (components.css)
```

**Key Architecture Principles:**
- **UI/Logic Separation**: UI components in `components/` are pure presentation. Business logic lives in `services/`
- **Component API Consistency**: All form components follow consistent prop naming (name, value, onChange, label, etc.)
- **Type Discrimination**: Badge component uses discriminated union types to provide different interfaces based on `type` prop

### Styling System

**TailwindCSS 4.x** is used with:
- `@tailwindcss/vite` plugin for build-time optimization
- Custom CSS variables in `components.css` for legacy compatibility
- CVA (Class Variance Authority) for type-safe variant patterns

**CVA Pattern Example:**
```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { primary: "...", secondary: "..." },
      size: { sm: "...", md: "...", lg: "..." }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);
```

### Badge Component Pattern

The Badge component demonstrates **unified component with type discrimination**:
- `type='general'`: Generic badge with custom variant and children
- `type='category'`: Maps Category type to specific variants/labels
- `type='status'`: Maps Status type to specific variants/labels
- `type='userRole'`: Maps UserRole type to specific variants/labels

This pattern centralizes badge logic while maintaining type safety through discriminated unions.

### Path Aliases

The project uses `@/` alias for `src/` directory:
```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

## Important Files

### Configuration Files
- `vite.config.ts`: Vite configuration with Tailwind plugin, path aliases, and Vitest setup
- `packages/after/.storybook/`: Storybook configuration for component documentation
- `packages/after/src/styles/components.css`: Legacy CSS classes (being migrated to Tailwind)

### Key Components to Study
- `packages/after/src/components/ui/button.tsx`: Demonstrates CVA usage and Tailwind conversion
- `packages/after/src/components/ui/badge.tsx`: Shows type discrimination pattern
- `packages/after/src/components/organisms/Table.tsx`: Complex component with domain logic (needs refactoring)
- `packages/after/src/pages/ManagementPage.tsx`: Main page showing component integration

### Type Definitions
- `packages/after/src/types/index.ts`: Central type definitions for Category, Status, UserRole

## Legacy Issues Being Addressed

The "before" package demonstrates common problems:
1. **Inconsistent component APIs**: Different props for similar functionality
2. **Mixed styling approaches**: Inline styles, CSS classes, and hardcoded values
3. **Tight coupling**: UI components contain business logic
4. **Poor type safety**: Loose typing and manual validation
5. **Accessibility issues**: Incomplete ARIA labels and keyboard support

The "after" package addresses these with:
- Consistent shadcn/ui based component API
- TailwindCSS with design tokens
- Separation of UI and business logic
- Strong TypeScript typing with discriminated unions
- Radix UI primitives for accessibility

## Working with This Codebase

### When Modifying Components
1. Read existing component first to understand current structure
2. Maintain CVA variant patterns for styling
3. Keep UI logic separate from business logic
4. Use TypeScript discriminated unions for complex prop types
5. Preserve existing CSS class names when converting to Tailwind (for compatibility)

### When Converting CSS to Tailwind
- Reference `components.css` for exact pixel values and colors
- Use arbitrary values `[#hex]` for custom colors
- Maintain disabled states and hover effects
- Test visual consistency after conversion

### Storybook Usage
Stories should be created in `.stories.tsx` files alongside components to document:
- All variant combinations
- Interactive controls
- Accessibility features
- Edge cases
