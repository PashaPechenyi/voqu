# Frontend Architecture Improvements

This document outlines architectural improvements for the Voqu frontend application based on best practices analysis.

---

## Table of Contents

1. [Current State Summary](#current-state-summary)
2. [Critical Issues](#critical-issues)
3. [Folder Structure Improvements](#folder-structure-improvements)
4. [File Naming Conventions](#file-naming-conventions)
5. [Component Organization](#component-organization)
6. [Routing Improvements](#routing-improvements)
7. [State Management Strategy](#state-management-strategy)
8. [API Layer Architecture](#api-layer-architecture)
9. [Theme & Styling Improvements](#theme--styling-improvements)
10. [Type Organization](#type-organization)
11. [Testing Strategy](#testing-strategy)
12. [Implementation Priority](#implementation-priority)

---

## Current State Summary

### What's Working Well

- Monorepo structure with clear separation (apps/web, apps/api, packages/shared)
- TypeScript strict mode enabled
- Material UI with custom theme
- Vite for fast development
- Path aliases configured (`@/`)
- Sections pattern for complex pages

### Areas Needing Improvement

- Inconsistent component organization
- Mock data embedded in components
- Missing barrel exports (index.ts files)
- Routing issues (duplicate `index` props, inconsistent paths)
- No API layer implemented
- No state management strategy
- Hardcoded color values instead of theme tokens
- Types scattered across codebase

---

## Critical Issues

### 1. Routing Bugs (High Priority)

**File:** `src/routes/index.tsx`

```tsx
// Current (buggy)
<Route path='landingPage' index element={<LandingPage />} />
<Route path='/about' index element={<AboutPage />} />
```

**Problems:**

- Multiple routes with `index` prop (only one allowed per parent)
- Inconsistent path format (`landingPage` vs `/about`)
- Landing page should be at root `/`, not `/landingPage`

**Recommended Fix:**

```tsx
<Route path="/" element={<PublicLayout />}>
  <Route index element={<LandingPage />} />
  <Route path="about" element={<AboutPage />} />
</Route>
```

### 2. Mock Data in Components (High Priority)

**Files:** `Accordion.tsx`, `VocabularyCard.tsx`, `QuizSlider.tsx`

Components contain hardcoded mock data:

```tsx
const levels: Level[] = [
  { level: 'A1-Beginner', description: '...', skills: [...] },
  ...
];
```

**Recommended:** Extract to separate mock data files or fetch from API.

### 3. Inconsistent Export Patterns

**Current Mix:**

- `export function LandingPage()` (named export)
- `export default function HeroSection()` (default export)
- `export default VocabularyCard` (default at bottom)

**Recommendation:** Use consistent named exports with barrel files.

---

## Folder Structure Improvements

### Current Structure

```
src/
├── components/
│   ├── auth/           # Empty
│   ├── common/         # Empty
│   ├── lessons/        # Empty
│   ├── publicLayout/   # 19 mixed components
│   └── user/           # Empty
├── pages/
│   ├── public/
│   ├── admin/          # Empty
│   ├── auth/           # Empty
│   ├── dashboard/      # Empty
│   └── lessons/        # Empty
├── hooks/
├── models/
├── services/           # Empty
├── store/              # Empty
├── utils/              # Empty
├── helpers/            # Empty
├── constants/          # Empty
├── img/
├── routes/
└── theme/
```

### Proposed Structure

```
src/
├── shared/                     # Reusable across the entire app
│   ├── components/             # Generic, reusable UI components
│   │   ├── Accordion/
│   │   │   ├── Accordion.tsx
│   │   │   ├── Accordion.types.ts
│   │   │   └── index.ts
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Pagination/
│   │   ├── Table/
│   │   ├── SectionDivider/
│   │   └── index.ts           # Barrel export
│   │
│   ├── hooks/                  # Generic hooks
│   │   ├── useResolveColor.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── format.ts
│   │   └── validation.ts
│   │
│   ├── constants/
│   │   └── routes.ts
│   │
│   └── types/                  # Shared types
│       ├── common.types.ts
│       └── api.types.ts
│
├── layouts/                    # Layout components (used by routing)
│   ├── PublicLayout/
│   │   ├── PublicLayout.tsx
│   │   ├── PublicHeader.tsx
│   │   ├── PublicFooter.tsx
│   │   └── index.ts
│   ├── AuthLayout/
│   ├── AdminLayout/
│   └── DashboardLayout/
│
├── features/                   # Feature modules (components + hooks + services + types)
│   ├── auth/
│   │   ├── components/         # Auth-specific components
│   │   │   ├── LoginForm.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   ├── lessons/
│   │   ├── components/         # Lesson-specific components
│   │   │   ├── LessonCard.tsx
│   │   │   ├── LessonStructureCard.tsx
│   │   │   ├── LessonStructurePhase.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── levels/
│   │   ├── components/
│   │   │   ├── LevelAccordion.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── vocabulary/
│   │   ├── components/
│   │   │   ├── VocabularyCard.tsx
│   │   │   ├── WordList.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── quiz/
│   │   ├── components/
│   │   │   ├── QuizCard.tsx
│   │   │   ├── QuizSlider.tsx
│   │   │   ├── QuizResult.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── progress/
│       ├── components/
│       ├── hooks/
│       └── services/
│
├── pages/
│   ├── public/
│   │   ├── Landing/
│   │   │   ├── Landing.page.tsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.section.tsx
│   │   │   │   ├── Features.section.tsx
│   │   │   │   └── LessonPreview.section.tsx
│   │   │   └── index.ts
│   │   └── About/
│   │       ├── About.page.tsx
│   │       ├── sections/
│   │       └── index.ts
│   ├── auth/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── ForgotPassword/
│   ├── dashboard/
│   │   └── Overview/
│   ├── lessons/
│   │   ├── LessonList/
│   │   └── LessonDetail/
│   └── admin/
│       ├── LevelManagement/
│       └── LessonManagement/
│
├── services/
│   ├── api/
│   │   ├── client.ts           # Axios/fetch instance
│   │   ├── endpoints.ts
│   │   └── index.ts
│   └── storage/
│       └── localStorage.ts
│
├── store/                      # Global state (if using Zustand/Redux)
│   ├── slices/
│   └── index.ts
│
├── routes/
│   ├── index.tsx
│   ├── public.routes.tsx
│   ├── auth.routes.tsx
│   ├── dashboard.routes.tsx
│   └── admin.routes.tsx
│
├── theme/
│   ├── index.ts
│   ├── palette.ts
│   ├── typography.ts
│   ├── components.ts
│   └── types.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── mocks/                      # Mock data for development
│   ├── levels.mock.ts
│   ├── vocabulary.mock.ts
│   └── questions.mock.ts
│
├── App.tsx
└── main.tsx
```

### Key Architecture Decisions

| Folder      | Purpose                     | Contains                                          |
| ----------- | --------------------------- | ------------------------------------------------- |
| `shared/`   | App-agnostic, reusable code | Generic components, hooks, utils, types           |
| `features/` | Domain-specific modules     | Components + hooks + services + types per feature |
| `layouts/`  | Page wrappers for routing   | Header, footer, sidebars per user type            |
| `pages/`    | Route entry points          | Compose layouts + features + shared               |
| `services/` | External integrations       | API client, localStorage, etc.                    |

**Why this structure?**

- `shared/components/` contains truly generic UI (Accordion, Button, Card) - no business logic
- `features/*/components/` contains domain-specific UI (VocabularyCard, QuizSlider) - knows about business types
- Clear ownership: if a component needs a `Word` or `Lesson` type, it belongs in the feature folder

---

## File Naming Conventions

### Recommended Conventions

| Type           | Convention                  | Example                    |
| -------------- | --------------------------- | -------------------------- |
| Components     | PascalCase                  | `VocabularyCard.tsx`       |
| Pages          | PascalCase with suffix      | `Landing.page.tsx`         |
| Sections       | PascalCase with suffix      | `Hero.section.tsx`         |
| Hooks          | camelCase with `use` prefix | `useAuth.ts`               |
| Services       | camelCase with suffix       | `auth.service.ts`          |
| Types          | camelCase with suffix       | `lesson.types.ts`          |
| Utils          | camelCase                   | `formatDate.ts`            |
| Constants      | camelCase or UPPER_CASE     | `routes.ts`, `API_URLS.ts` |
| Tests          | Same as file with `.test`   | `VocabularyCard.test.tsx`  |
| Barrel exports | `index.ts`                  | `index.ts`                 |

### Current Issues to Fix

| Current              | Proposed                            |
| -------------------- | ----------------------------------- |
| `SectionDevider.tsx` | `SectionDivider.tsx` (fix typo)     |
| `LandingPage.tsx`    | `Landing.page.tsx`                  |
| `HeroSection.tsx`    | `Hero.section.tsx`                  |
| `img/` folder        | `assets/images/`                    |
| `img1.jpg`           | `hero-background.jpg` (descriptive) |

---

## Component Organization

### Where Components Live

| Component Type                       | Location                 | Example                                    |
| ------------------------------------ | ------------------------ | ------------------------------------------ |
| Generic UI (no business logic)       | `shared/components/`     | Accordion, Button, Card, Table             |
| Feature-specific (uses domain types) | `features/*/components/` | VocabularyCard, QuizSlider, LevelAccordion |
| Layout wrappers                      | `layouts/`               | PublicLayout, DashboardLayout              |
| Page sections (one-off)              | `pages/*/sections/`      | HeroSection, FeaturesSection               |

### Single Component Structure

```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.types.ts     # TypeScript interfaces (if complex)
├── ComponentName.styles.ts    # Styled components (if needed)
├── ComponentName.test.tsx     # Tests
├── ComponentName.stories.tsx  # Storybook (optional)
└── index.ts                   # Barrel export
```

### Barrel Export Pattern

```tsx
// shared/components/index.ts - export all shared components
export * from './Accordion';
export * from './Button';
export * from './Card';

// features/vocabulary/components/index.ts - export feature components
export { VocabularyCard } from './VocabularyCard';
export type { VocabularyCardProps } from './VocabularyCard.types';
```

### Import Examples

```tsx
// Importing shared components
import { Accordion, Card, Pagination } from '@/shared/components';

// Importing feature components
import { VocabularyCard } from '@/features/vocabulary/components';
import { QuizSlider, QuizResult } from '@/features/quiz/components';

// Importing from a feature's public API
import { useVocabulary, VocabularyCard } from '@/features/vocabulary';
```

### Component Best Practices

**Props Interface Naming:**

```tsx
// Good
interface VocabularyCardProps {
  words: Word[];
  onWordChange?: (word: Word) => void;
}

// Current (implicit/missing)
function VocabularyCard() { ... }  // No props interface
```

**Extract Event Handlers:**

```tsx
// Current (inline)
onChange={(event: React.SyntheticEvent, newExpanded: boolean) =>
  handleChange(`panel${ind + 1}`, newExpanded)
}

// Better (extracted)
const handleAccordionChange = useCallback(
  (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  },
  []
);
```

---

## Routing Improvements

### Current Issues

```tsx
// Problems in current routes/index.tsx
<Route path='landingPage' index element={<LandingPage />} />  // Wrong path, duplicate index
<Route path='/about' index element={<AboutPage />} />         // Duplicate index
```

### Proposed Route Structure

**Create route constants:**

```tsx
// src/shared/constants/routes.ts
export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Dashboard
  DASHBOARD: '/dashboard',
  LESSONS: '/dashboard/lessons',
  LESSON_DETAIL: '/dashboard/lessons/:levelSlug/:lessonSlug',
  PROGRESS: '/dashboard/progress',
  WORD_LIST: '/dashboard/word-list',

  // Admin
  ADMIN: '/admin',
  ADMIN_LEVELS: '/admin/levels',
  ADMIN_LESSONS: '/admin/lessons',
} as const;
```

**Split routes by domain:**

```tsx
// src/routes/public.routes.tsx
export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route index element={<LandingPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="pricing" element={<PricingPage />} />
  </Route>
);

// src/routes/auth.routes.tsx
export const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
  </Route>
);

// src/routes/dashboard.routes.tsx
export const dashboardRoutes = (
  <Route
    path="dashboard"
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<DashboardOverview />} />
    <Route path="lessons" element={<LessonsPage />} />
    <Route path="lessons/:levelSlug/:lessonSlug" element={<LessonDetailPage />} />
    <Route path="progress" element={<ProgressPage />} />
    <Route path="word-list" element={<WordListPage />} />
  </Route>
);

// src/routes/index.tsx
export function AppRoutes() {
  return (
    <Routes>
      {publicRoutes}
      {authRoutes}
      {dashboardRoutes}
      {adminRoutes}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

---

## State Management Strategy

### Recommended: Zustand + React Query

For this application's needs (per PRODUCT_PLAN.md), I recommend:

1. **React Query (TanStack Query)** - Server state (lessons, levels, progress)
2. **Zustand** - Client state (UI state, user preferences)
3. **Auth0 Context** - Authentication (already in place)

### Why This Combination?

- React Query handles caching, loading states, and synchronization
- Zustand is lightweight and doesn't require boilerplate
- Separates server state from client state

### Example Implementation

**React Query for API data:**

```tsx
// src/features/lessons/hooks/useLessons.ts
import { useQuery } from '@tanstack/react-query';
import { lessonService } from '../services/lesson.service';

export function useLessons(levelId: string) {
  return useQuery({
    queryKey: ['lessons', levelId],
    queryFn: () => lessonService.getLessonsByLevel(levelId),
  });
}

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonService.getLesson(lessonId),
  });
}
```

**Zustand for UI state:**

```tsx
// src/store/ui.store.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentLessonId: string | null;
  setCurrentLesson: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  currentLessonId: null,
  setCurrentLesson: (id) => set({ currentLessonId: id }),
}));
```

---

## API Layer Architecture

### HTTP Client Setup

```tsx
// src/services/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  },
);
```

### Service Pattern

```tsx
// src/features/lessons/services/lesson.service.ts
import { apiClient } from '@/services/api/client';
import type { Lesson, Level } from '../types';

export const lessonService = {
  getLevels: async (): Promise<Level[]> => {
    const { data } = await apiClient.get('/levels');
    return data;
  },

  getLessonsByLevel: async (levelId: string): Promise<Lesson[]> => {
    const { data } = await apiClient.get(`/levels/${levelId}/lessons`);
    return data;
  },

  getLesson: async (lessonId: string): Promise<Lesson> => {
    const { data } = await apiClient.get(`/lessons/${lessonId}`);
    return data;
  },

  markComplete: async (lessonId: string): Promise<void> => {
    await apiClient.post(`/lessons/${lessonId}/complete`);
  },
};
```

---

## Theme & Styling Improvements

### Current Issues

- Hardcoded colors: `'#37123c'`, `'#71677D'`, `'#aa9f96'`
- Media queries in theme don't use MUI breakpoints
- Missing semantic color tokens

### Proposed Theme Structure

```tsx
// src/theme/palette.ts
export const palette = {
  primary: {
    main: '#71677D',
    light: '#8f879a',
    dark: '#4d4556',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#37123c',
    light: '#5c3d60',
    dark: '#200a23',
    contrastText: '#ffffff',
  },
  tertiary: {
    main: '#aa9f96',
    light: '#c4bdb6',
    dark: '#8a8178',
    contrastText: '#ffffff',
  },
  background: {
    default: '#ebebeb',
    paper: '#ffffff',
  },
  text: {
    primary: '#37123c',
    secondary: '#71677D',
  },
} as const;

// src/theme/typography.ts
export const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 700 },
  h2: { fontWeight: 700 },
  h3: { fontWeight: 600 },
  // Use theme.breakpoints instead of raw media queries
};

// src/theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

const baseTheme = createTheme({
  palette,
  typography,
  components,
});

export const theme = responsiveFontSizes(baseTheme);
```

### Replace Hardcoded Colors

```tsx
// Current (bad)
<Typography sx={{ color: '#37123c' }}>

// Proposed (good)
<Typography sx={{ color: 'secondary.main' }}>
// or
<Typography color="secondary">
```

### Create Reusable Style Patterns

```tsx
// src/theme/patterns.ts
export const cardPattern = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  p: 3,
} as const;

export const sectionPadding = {
  py: { xs: 4, md: 6, lg: 8 },
  px: { xs: 2, md: 4 },
} as const;
```

---

## Type Organization

### Current Issues

- Types in `src/models/types.ts` are basic and few
- No domain-specific type files
- Missing API response types

### Proposed Type Structure

```
src/
├── shared/
│   └── types/
│       ├── common.types.ts     # Generic types (Pagination, ApiResponse)
│       └── index.ts
│
├── features/
│   ├── lessons/
│   │   └── types/
│   │       ├── lesson.types.ts
│   │       ├── level.types.ts
│   │       └── index.ts
│   ├── vocabulary/
│   │   └── types/
│   │       ├── word.types.ts
│   │       └── index.ts
│   └── quiz/
│       └── types/
│           ├── question.types.ts
│           └── index.ts
```

### Type Definitions Example

```tsx
// src/features/lessons/types/level.types.ts
export interface Level {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  cefrMapping: CefrLevel | null;
  status: LevelStatus;
  lessonCount: number;
  completedLessonCount?: number;
}

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type LevelStatus = 'draft' | 'published';

// src/features/lessons/types/lesson.types.ts
export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  levelId: string;
  order: number;
  status: LessonStatus;
  templates: Template[];
  isCompleted?: boolean;
}

export type LessonStatus = 'draft' | 'published';
```

---

## Testing Strategy

### Recommended Structure

```
src/
├── components/
│   └── ui/
│       └── Accordion/
│           ├── Accordion.tsx
│           └── Accordion.test.tsx    # Co-located tests
├── features/
│   └── lessons/
│       └── hooks/
│           ├── useLessons.ts
│           └── useLessons.test.ts
└── __tests__/                        # Integration tests
    └── pages/
        └── Landing.integration.test.tsx
```

### Testing Tools Recommendation

- **Vitest** - Unit tests (already works with Vite)
- **React Testing Library** - Component tests
- **MSW** - API mocking
- **Playwright/Cypress** - E2E tests (future)

### Example Test

```tsx
// src/components/ui/Accordion/Accordion.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { LevelAccordion } from './LevelAccordion';
import { mockLevels } from '@/mocks/levels.mock';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('LevelAccordion', () => {
  it('renders level titles', () => {
    renderWithTheme(<LevelAccordion levels={mockLevels} />);
    expect(screen.getByText('A1-Beginner')).toBeInTheDocument();
  });

  it('expands when clicked', () => {
    renderWithTheme(<LevelAccordion levels={mockLevels} />);
    fireEvent.click(screen.getByText('A1-Beginner'));
    expect(screen.getByText(/Can understand and use/)).toBeVisible();
  });
});
```

---

## Implementation Priority

### Phase 1: Critical Fixes (Week 1)

1. [ ] Fix routing bugs in `routes/index.tsx`
2. [ ] Fix typo: `SectionDevider.tsx` → `SectionDivider.tsx`
3. [ ] Extract mock data from components to `src/mocks/`
4. [ ] Replace hardcoded colors with theme tokens

### Phase 2: Structure Reorganization (Week 2)

1. [ ] Create `src/shared/components/` for generic UI components
2. [ ] Create `src/layouts/` for layout components
3. [ ] Create `src/features/*/components/` for domain-specific components
4. [ ] Add barrel exports (index.ts) to all folders
5. [ ] Rename `img/` to `assets/images/`
6. [ ] Apply consistent naming conventions

### Phase 3: Architecture Enhancements (Week 3)

1. [ ] Set up API client in `src/services/api/`
2. [ ] Install and configure React Query
3. [ ] Install and configure Zustand
4. [ ] Create feature-based type files
5. [ ] Set up route constants

### Phase 4: Testing & Documentation (Week 4)

1. [ ] Set up Vitest configuration
2. [ ] Add React Testing Library
3. [ ] Write tests for critical components
4. [ ] Create component documentation

---

## Quick Wins (Can Do Now)

These improvements require minimal effort:

1. **Fix routing** - 5 minutes
2. **Fix typo in filename** - 1 minute
3. **Add route constants file** - 10 minutes
4. **Create mock data files** - 15 minutes
5. **Add index.ts barrel exports** - 20 minutes
6. **Replace hardcoded colors** - 30 minutes

---

_Document Version: 1.0_
_Created: March 2026_
_Based on: PRODUCT_PLAN.md v1.0_
