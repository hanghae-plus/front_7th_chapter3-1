# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Mandatory Rules

**IMPORTANT: You MUST check and follow ALL rules defined in `.claude/rules/` directory before making ANY code changes.**

This project has specific coding guidelines that must be followed:
- **`.claude/rules/frontend-rules.md`** - Frontend design principles including readability, predictability, cohesion, and coupling patterns
- **`.claude/rules/fsd-rules.md`** - Feature-Sliced Design architecture rules for layer organization and component structure

### Key Rules Summary:
1. **Entity Layer**: Must contain only pure functions, no side effects, no state management
2. **Features Layer**: One feature = one primary user action, business logic in hooks, accept only domain data as props
3. **Naming Conventions**: Use descriptive file suffixes (`.model.ts`, `.service.api.ts`, `.lib.ts`, `.config.ts`, `.hook.tsx`, `.ui.tsx`)
4. **Component Props**: Avoid event handlers and configuration props except in `shared/ui` components
5. **Code Organization**: Follow Feature-Sliced Design with strict separation between entities, features, widgets, and pages

**Before writing any code, review the complete rules in `.claude/rules/` to ensure compliance.**

## Project Overview

This is a React 19 + TypeScript frontend application implementing a data management system for Posts and Users with full CRUD operations. It follows a feature-based modular architecture with clear separation between business logic, UI components, and application configuration.

## Commands

### Development
- `npm run dev` - Start development server with Vite (http://localhost:5173)
- `npm run build` - Type-check with TypeScript and build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all files

### Testing
- `npm run test` - Run tests in watch mode with Vitest
- `npm run test:ui` - Run tests with visual UI interface
- `npm run test:run` - Run all tests once (CI mode)
- Test setup file: `src/app/config/test-setup.ts` (mocks window.confirm)
- Note: Vite config references `./src/test/setup.ts` but actual file is at `src/app/config/test-setup.ts`

## Architecture

### Layer-Based Organization

The codebase follows a strict layered architecture with specific naming conventions:

1. **entities/** - Domain models and business logic
   - `*.model.ts` - TypeScript type definitions
   - `*.service.api.ts` - Business logic and CRUD operations
   - `*.lib.ts` - Pure utility functions
   - `*.config.ts` - Constants and configuration
   - `*.hook.tsx` - Custom React hooks (useQuery pattern)
   - Each entity exports its public API through `index.ts`

2. **features/** - Feature implementations organized by entity
   - Each feature (create/update/delete) contains:
     - `use-*.hook.ts` - Feature-specific business logic hooks
     - `*-form.ui.tsx` - Form components
     - `*-modal.ui.tsx` - Modal wrappers
   - Features compose entities and shared components

3. **shared/** - Reusable utilities
   - `components/ui/` - Radix UI wrapped base components
   - `components/atoms/` - Basic UI elements
   - `components/molecules/` - Form components (FormInput, FormSelect, etc.)
   - `components/organisms/` - Complex components (Table, Modal, Alert)
   - `hooks/` - Custom hooks (useQuery, useMutation)
   - `lib/storage/` - LocalStorage abstraction layer

4. **pages/** - Page-level components that compose features
5. **app/** - Global configuration and styles

### Data Flow

1. **Services** (`entities/*/service.api.ts`) handle all data operations using localStorage
2. **Custom hooks** (`use*.hook.tsx`) manage async state with useQuery/useMutation patterns
3. **Features** compose hooks and UI components for specific operations
4. **Pages** orchestrate multiple features into complete views

### State Management

- No external state management library
- React hooks for local state (useState, useEffect, useCallback)
- Custom useQuery/useMutation hooks for async operations
- Form state managed by React Hook Form with Zod validation

## Key Technologies

- **React 19.1.1** with TypeScript 5.9.3 (strict mode)
- **Vite 7.1.7** for build and dev server
- **Tailwind CSS 4.1.17** for styling
- **React Hook Form 7.66.1** + **Zod 4.1.12** for forms
- **Radix UI** for accessible base components
- **Vitest** + **React Testing Library** for testing
- Path alias: `@/*` maps to `./src/*`

## Domain Models

### User
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}
```

### Post
```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  views: number;
}
```

## Service Layer APIs

### UserService (`entities/user/user-service.api.ts`)
- `getAll()` - Retrieve all users
- `getById(id)` - Get specific user
- `create(userData)` - Create new user with validation
- `update(id, userData)` - Update existing user
- `delete(id)` - Remove user
- `checkUsername(username)` - Check username availability
- `checkEmail(email)` - Check email availability

### PostService (`entities/post/post-service.api.ts`)
- `getAll()` - Retrieve all posts
- `getById(id)` - Get specific post
- `create(postData)` - Create new post
- `update(id, postData)` - Update existing post
- `delete(id)` - Remove post
- `publish(id)` - Change status to published
- `archive(id)` - Change status to archived
- `restore(id)` - Change status to draft

## Testing Patterns

Tests use Vitest with React Testing Library. Example pattern from `ManagementPage.test.tsx`:
- Clear localStorage before each test
- Use `userEvent` for user interactions
- Query elements by role or direct DOM selectors for form inputs
- Use `waitFor` for async operations
- Test complete CRUD workflows in integration tests

## Common Development Tasks

### Adding a New Entity
1. Create entity folder in `src/entities/[entity-name]/`
2. Define types in `[entity]-type.model.ts`
3. Implement service in `[entity]-service.api.ts`
4. Add utilities in `[entity]-utils.lib.ts`
5. Create constants in `[entity]-constants.config.ts`
6. Build custom hook in `use-[entities].hook.tsx`
7. Export public API in `index.ts`

### Adding a New Feature
1. Create feature folder in `src/features/[entity]/[action]-[entity]/`
2. Implement business logic hook `use-[action]-[entity].hook.ts`
3. Create form component `[action]-[entity]-form.ui.tsx`
4. Add modal wrapper `[action]-[entity]-modal.ui.tsx`
5. Export through `index.ts`

### Creating Reusable Components
- Atoms go in `shared/components/atoms/`
- Molecules (form components) in `shared/components/molecules/`
- Complex organisms in `shared/components/organisms/`
- Always export through the folder's `index.ts`