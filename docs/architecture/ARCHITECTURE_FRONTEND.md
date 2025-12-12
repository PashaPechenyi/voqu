# Frontend Architecture

> **Purpose:** Architecture guidelines, folder structure, and coding conventions for the React + Vite + MUI frontend application.
>
> **Related documents:**
> - [Shared Packages Architecture](./ARCHITECTURE_SHARED.md) - Types, constants, and utilities shared with backend
> - [Backend Architecture](./ARCHITECTURE_BACKEND.md)
> - [Implementation Rules](./phases/IMPLEMENTATION_RULES.md) - Detailed implementation plan rules

---

## Table of Contents

- [1. Tech Stack Overview](#1-tech-stack-overview)
- [2. Folder Structure](#2-folder-structure)
- [3. File Naming Conventions](#3-file-naming-conventions)
- [4. Import Path Aliases](#4-import-path-aliases)
- [5. Component Architecture](#5-component-architecture)
- [6. Page Structure Pattern](#6-page-structure-pattern)
- [7. Routing](#7-routing)
- [8. State Management](#8-state-management)
- [9. API Integration](#9-api-integration)
- [10. Styling with MUI](#10-styling-with-mui)
- [11. Theme Configuration](#11-theme-configuration)
- [12. Forms & Validation](#12-forms--validation)
- [13. Error Handling](#13-error-handling)
- [14. SEO & Meta Tags](#14-seo--meta-tags)
- [15. Testing](#15-testing)
- [16. Performance Guidelines](#16-performance-guidelines)
- [17. Code Quality Checklist](#17-code-quality-checklist)

---

## 1. Tech Stack Overview

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI library |
| Vite | 5.x | Build tool & dev server |
| TypeScript | 5.x | Type safety |
| React Router | 6.x | Client-side routing |
| Material UI (MUI) | 5.x | Component library |
| TanStack Query | 5.x | Server state management |
| Zustand | 4.x | Client state management |
| Auth0 | - | Authentication |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Schema validation |

### Why This Stack?

- **Vite** - Fast HMR, optimized builds, native ESM support
- **MUI** - Comprehensive component library with excellent TypeScript support
- **TanStack Query** - Automatic caching, refetching, and server state sync
- **Zustand** - Minimal boilerplate, excellent TypeScript inference
- **React Hook Form + Zod** - Performant forms with type-safe validation

---

## 2. Folder Structure

```
apps/web/
├── public/                         # Static assets (favicon, robots.txt)
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root component with providers
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/                 # Generic components (Button, Modal, etc.)
│   │   │   ├── Button/
│   │   │   │   ├── index.ts
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.types.ts
│   │   │   └── index.ts            # Barrel export
│   │   ├── layout/                 # Layout components
│   │   │   ├── PublicLayout/
│   │   │   ├── DashboardLayout/
│   │   │   ├── AdminLayout/
│   │   │   └── index.ts
│   │   ├── forms/                  # Form-specific components
│   │   │   ├── FormField/
│   │   │   ├── FormSelect/
│   │   │   └── index.ts
│   │   └── features/               # Feature-specific components
│   │       ├── levels/             # Level-related components
│   │       ├── lessons/            # Lesson-related components
│   │       └── progress/           # Progress-related components
│   │
│   ├── pages/                      # Page components (route targets)
│   │   ├── public/                 # Public pages
│   │   │   ├── LandingPage/
│   │   │   │   ├── index.ts
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   └── sections/
│   │   │   │       ├── HeroSection.tsx
│   │   │   │       └── FeaturesSection.tsx
│   │   │   ├── AboutPage/
│   │   │   └── PricingPage/
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── LoginPage/
│   │   │   ├── SignupPage/
│   │   │   └── CallbackPage/
│   │   ├── dashboard/              # User dashboard pages
│   │   │   ├── DashboardPage/
│   │   │   ├── ProgressPage/
│   │   │   └── SettingsPage/
│   │   ├── lessons/                # Learning pages
│   │   │   ├── LevelsPage/
│   │   │   ├── LevelDetailPage/
│   │   │   └── LessonPage/
│   │   ├── admin/                  # Admin panel pages
│   │   │   ├── AdminDashboard/
│   │   │   ├── AdminLevels/
│   │   │   ├── AdminLessons/
│   │   │   └── AdminTemplates/
│   │   └── errors/                 # Error pages
│   │       ├── NotFoundPage/
│   │       └── ErrorPage/
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── index.ts
│   │   ├── useAuth.ts              # Authentication hook
│   │   ├── useLevels.ts            # Levels data hook
│   │   ├── useLessons.ts           # Lessons data hook
│   │   └── useMediaQuery.ts        # Responsive breakpoint hook
│   │
│   ├── services/                   # API client services
│   │   ├── index.ts
│   │   ├── api-client.ts           # Axios/fetch instance
│   │   ├── auth.service.ts         # Auth API calls
│   │   ├── levels.service.ts       # Levels API calls
│   │   ├── lessons.service.ts      # Lessons API calls
│   │   └── progress.service.ts     # Progress API calls
│   │
│   ├── store/                      # Zustand stores
│   │   ├── index.ts
│   │   ├── auth.store.ts           # Auth state
│   │   └── ui.store.ts             # UI state (sidebar, modals)
│   │
│   ├── routes/                     # Route definitions
│   │   ├── index.tsx               # Main router configuration
│   │   ├── public.routes.tsx       # Public routes
│   │   ├── auth.routes.tsx         # Auth routes
│   │   ├── dashboard.routes.tsx    # Dashboard routes
│   │   └── admin.routes.tsx        # Admin routes
│   │
│   ├── theme/                      # MUI theme configuration
│   │   ├── index.ts                # Theme export
│   │   ├── palette.ts              # Color palette
│   │   ├── typography.ts           # Typography settings
│   │   └── components.ts           # Component overrides
│   │
│   ├── utils/                      # Frontend-specific utilities
│   │   ├── index.ts
│   │   ├── storage.utils.ts        # localStorage helpers
│   │   └── format.utils.ts         # Formatting helpers
│   │
│   ├── config/                     # App configuration
│   │   ├── index.ts
│   │   ├── env.ts                  # Environment variables
│   │   └── queryClient.ts          # TanStack Query config
│   │
│   └── types/                      # Frontend-specific types
│       ├── index.ts
│       └── router.types.ts         # Route-related types
│
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
└── package.json
```

---

## 3. File Naming Conventions

### Components

| Type | Folder | File | Example |
|------|--------|------|---------|
| Page component | PascalCase | PascalCase.tsx | `LandingPage/LandingPage.tsx` |
| Regular component | PascalCase | PascalCase.tsx | `Button/Button.tsx` |
| Page section | PascalCase | PascalCase.tsx | `sections/HeroSection.tsx` |
| Component types | PascalCase | PascalCase.types.ts | `Button/Button.types.ts` |
| Barrel export | - | index.ts | `Button/index.ts` |

### Non-Component Files

| Type | Convention | Example |
|------|------------|---------|
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `useLevels.ts` |
| Services | kebab-case with `.service.ts` | `auth.service.ts` |
| Stores | kebab-case with `.store.ts` | `auth.store.ts` |
| Utilities | kebab-case with `.utils.ts` | `storage.utils.ts` |
| Types | kebab-case with `.types.ts` | `router.types.ts` |
| Constants | kebab-case with `.constants.ts` | `routes.constants.ts` |
| Config | kebab-case | `env.ts`, `queryClient.ts` |

### Naming Rules Summary

- **Components** - PascalCase: `UserProfile.tsx`
- **Hooks** - camelCase with `use`: `useUserProfile.ts`
- **Everything else** - kebab-case: `user-profile.service.ts`
- **Folders** - Match primary file: `UserProfile/` for component, `user-profile/` for others
- **Index files** - Always `index.ts` (barrel exports)

---

## 4. Import Path Aliases

### Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@voqu/shared": ["../../packages/shared/src"],
      "@voqu/shared/*": ["../../packages/shared/src/*"]
    }
  }
}
```

### Import Order

Follow this import order in all files:

```typescript
// 1. React and external libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// 2. Shared package imports
import { User, UserRole, ROUTES } from '@voqu/shared';

// 3. Internal absolute imports (@/)
import { useAuth } from '@/hooks';
import { authService } from '@/services';
import { Button } from '@/components/common';

// 4. Relative imports (same feature/folder)
import { HeroSection } from './sections/HeroSection';
import type { LandingPageProps } from './LandingPage.types';
```

### Import Examples

```typescript
// Components
import { Button, Modal, Card } from '@/components/common';
import { PublicLayout } from '@/components/layout';
import { LevelCard } from '@/components/features/levels';

// Hooks
import { useAuth, useLevels, useMediaQuery } from '@/hooks';

// Services
import { authService, levelsService } from '@/services';

// Store
import { useAuthStore, useUIStore } from '@/store';

// Config
import { env } from '@/config';

// Shared package
import type { Level, Lesson } from '@voqu/shared';
import { LevelStatus, ROUTES } from '@voqu/shared';
```

---

## 5. Component Architecture

### Component File Structure

```
ComponentName/
├── index.ts              # Re-export (barrel)
├── ComponentName.tsx     # Main component
├── ComponentName.types.ts # Types/interfaces (if complex)
├── ComponentName.styles.ts # Styled components (if needed)
└── ComponentName.test.tsx # Tests (if needed)
```

### Basic Component Template

```typescript
// Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

```typescript
// Button/Button.types.ts
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}
```

```typescript
// Button/Button.tsx
import { Button as MuiButton, CircularProgress } from '@mui/material';
import type { ButtonProps } from './Button.types';

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const muiVariant = variant === 'outline' ? 'outlined' : 'contained';

  return (
    <MuiButton
      variant={muiVariant}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <CircularProgress size={20} /> : children}
    </MuiButton>
  );
}
```

### Component Categories

| Category | Location | Purpose |
|----------|----------|---------|
| Common | `components/common/` | Generic, reusable UI components |
| Layout | `components/layout/` | Page layouts, navigation |
| Forms | `components/forms/` | Form inputs, validation display |
| Features | `components/features/{domain}/` | Domain-specific components |

### When to Extract a Component

Extract into a separate component when:

1. **Reused** - Used in 2+ places
2. **Complex** - Has significant internal logic
3. **Testable** - Needs isolated testing
4. **Semantic** - Represents a distinct UI concept

Do NOT extract when:

1. Used only once and simple
2. Would create prop drilling
3. Tightly coupled to parent

---

## 6. Page Structure Pattern

### Standard Page Structure

```
pages/{section}/PageName/
├── index.ts                  # Re-export
├── PageName.tsx              # Main page component
└── sections/                 # Page sections (for multi-section pages)
    ├── SectionOne.tsx
    └── SectionTwo.tsx
```

### Page Component Template

```typescript
// pages/public/LandingPage/LandingPage.tsx
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { CTASection } from './sections/CTASection';

export function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Voqu - Вивчай англійську ефективно</title>
        <meta
          name="description"
          content="Платформа для вивчення англійської мови. Рівні від A1 до C2, інтерактивні уроки, відстеження прогресу."
        />
      </Helmet>

      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
```

### Section Component Template

```typescript
// pages/public/LandingPage/sections/HeroSection.tsx
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@voqu/shared';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2rem', md: '3.5rem' } }}
        >
          Вивчай англійську ефективно
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
          Структуровані уроки для всіх рівнів
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
        >
          Почати безкоштовно
        </Button>
      </Container>
    </Box>
  );
}
```

### Page Categories

| Category | Location | Layout | Auth Required |
|----------|----------|--------|---------------|
| Public | `pages/public/` | PublicLayout | No |
| Auth | `pages/auth/` | MinimalLayout | No |
| Dashboard | `pages/dashboard/` | DashboardLayout | Yes |
| Admin | `pages/admin/` | AdminLayout | Yes (Admin) |
| Errors | `pages/errors/` | PublicLayout | No |

---

## 7. Routing

### Router Configuration

```typescript
// routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './public.routes';
import { authRoutes } from './auth.routes';
import { dashboardRoutes } from './dashboard.routes';
import { adminRoutes } from './admin.routes';

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...adminRoutes,
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
```

### Route Definition Pattern

```typescript
// routes/public.routes.tsx
import { RouteObject } from 'react-router-dom';
import { PublicLayout } from '@/components/layout';
import { LandingPage } from '@/pages/public/LandingPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ROUTES } from '@voqu/shared';

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <LandingPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
    ],
  },
];
```

### Protected Route Pattern

```typescript
// routes/dashboard.routes.tsx
import { RouteObject, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { ROUTES } from '@voqu/shared';

export const dashboardRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.DASHBOARD.ROOT, element: <DashboardPage /> },
      { path: ROUTES.DASHBOARD.PROGRESS, element: <ProgressPage /> },
    ],
  },
];
```

### Route Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Public | `/lowercase` | `/about`, `/pricing` |
| Auth | `/auth/action` | `/auth/login`, `/auth/signup` |
| Dashboard | `/dashboard/section` | `/dashboard/progress` |
| Admin | `/admin/resource` | `/admin/levels` |
| Detail | `/resource/:id` | `/levels/:id` |
| Nested | `/parent/:parentId/child/:childId` | `/levels/:levelId/lessons/:lessonId` |

---

## 8. State Management

### State Categories

| State Type | Solution | Example |
|------------|----------|---------|
| Server state | TanStack Query | Levels list, user profile |
| Form state | React Hook Form | Login form, create level form |
| UI state | Zustand | Sidebar open, modal state |
| Auth state | Auth0 + Zustand | Current user, tokens |
| Component state | useState | Dropdown open, input value |
| URL state | React Router | Current page, query params |

### TanStack Query Pattern

```typescript
// hooks/useLevels.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { levelsService } from '@/services';
import type { LevelQueryRequest, CreateLevelRequest } from '@voqu/shared';

export const levelKeys = {
  all: ['levels'] as const,
  lists: () => [...levelKeys.all, 'list'] as const,
  list: (params: LevelQueryRequest) => [...levelKeys.lists(), params] as const,
  details: () => [...levelKeys.all, 'detail'] as const,
  detail: (id: string) => [...levelKeys.details(), id] as const,
};

export function useLevels(params: LevelQueryRequest = {}) {
  return useQuery({
    queryKey: levelKeys.list(params),
    queryFn: () => levelsService.getAll(params),
  });
}

export function useLevel(id: string) {
  return useQuery({
    queryKey: levelKeys.detail(id),
    queryFn: () => levelsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLevelRequest) => levelsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: levelKeys.lists() });
    },
  });
}
```

### Zustand Store Pattern

```typescript
// store/ui.store.ts
import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  activeModal: string | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeModal: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));
```

### When to Use What

```
Server data (API responses)    → TanStack Query
Global UI state                → Zustand
Auth state                     → Auth0 + Zustand
Form inputs                    → React Hook Form
Simple component state         → useState
Derived/computed state         → useMemo
Side effects                   → useEffect
URL state                      → useSearchParams
```

---

## 9. API Integration

### API Client Setup

```typescript
// services/api-client.ts
import axios, { AxiosError } from 'axios';
import { env } from '@/config';
import { useAuthStore } from '@/store';
import type { ApiError } from '@voqu/shared';

export const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
```

### Service Pattern

```typescript
// services/levels.service.ts
import { apiClient } from './api-client';
import { API_ENDPOINTS } from '@voqu/shared';
import type {
  Level,
  LevelQueryRequest,
  LevelListResponse,
  CreateLevelRequest,
  UpdateLevelRequest,
} from '@voqu/shared';

export const levelsService = {
  getAll: async (params?: LevelQueryRequest): Promise<LevelListResponse> => {
    const { data } = await apiClient.get(API_ENDPOINTS.LEVELS.BASE, { params });
    return data;
  },

  getById: async (id: string): Promise<Level> => {
    const { data } = await apiClient.get(API_ENDPOINTS.LEVELS.BY_ID(id));
    return data;
  },

  create: async (payload: CreateLevelRequest): Promise<Level> => {
    const { data } = await apiClient.post(API_ENDPOINTS.LEVELS.BASE, payload);
    return data;
  },

  update: async (id: string, payload: UpdateLevelRequest): Promise<Level> => {
    const { data } = await apiClient.patch(
      API_ENDPOINTS.LEVELS.BY_ID(id),
      payload
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.LEVELS.BY_ID(id));
  },
};
```

---

## 10. Styling with MUI

### Import Pattern

```typescript
// Prefer named imports
import { Box, Typography, Button, Container } from '@mui/material';
import { School, MenuBook, CheckCircle } from '@mui/icons-material';

// Lab components
import { Timeline, TimelineItem } from '@mui/lab';
```

### sx Prop Pattern

```typescript
// Use sx for component-specific styles
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 2,
    p: { xs: 2, md: 4 },
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 1,
  }}
>
```

### Responsive Design

```typescript
// Breakpoint object syntax
<Typography
  variant="h1"
  sx={{
    fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' },
    textAlign: { xs: 'center', md: 'left' },
  }}
>
  Заголовок
</Typography>
```

### Breakpoints Reference

| Breakpoint | Min Width | Target |
|------------|-----------|--------|
| xs | 0px | Mobile |
| sm | 600px | Tablet portrait |
| md | 900px | Tablet landscape |
| lg | 1200px | Desktop |
| xl | 1536px | Large desktop |

### Spacing System

MUI uses an 8px grid. The spacing multiplier:

| Value | Pixels | Usage |
|-------|--------|-------|
| 0.5 | 4px | Tight spacing |
| 1 | 8px | Small gap |
| 2 | 16px | Standard gap |
| 3 | 24px | Medium gap |
| 4 | 32px | Large gap |
| 6 | 48px | Section padding |
| 8 | 64px | Hero padding |

```typescript
// Spacing examples
<Box sx={{ p: 2, mb: 4, gap: 2 }}>
  {/* p: 16px padding, mb: 32px margin-bottom, gap: 16px */}
</Box>
```

---

## 11. Theme Configuration

### Theme Structure

```typescript
// theme/index.ts
import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
});
```

### Palette Configuration

```typescript
// theme/palette.ts
import { PaletteOptions } from '@mui/material';

export const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
  },
};
```

### Typography Configuration

```typescript
// theme/typography.ts
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'none', // No uppercase
    fontWeight: 600,
  },
};
```

---

## 12. Forms & Validation

### React Hook Form + Zod Pattern

```typescript
// pages/admin/AdminLevels/CreateLevelForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box } from '@mui/material';
import { useCreateLevel } from '@/hooks';
import { VALIDATION, CEFRLevel } from '@voqu/shared';

const createLevelSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME.MIN, 'Назва обов\'язкова')
    .max(VALIDATION.NAME.MAX, `Максимум ${VALIDATION.NAME.MAX} символів`),
  slug: z
    .string()
    .regex(VALIDATION.SLUG.PATTERN, 'Тільки малі літери, цифри та дефіси')
    .optional(),
  description: z
    .string()
    .max(VALIDATION.DESCRIPTION.MAX)
    .optional(),
  cefrLevel: z.nativeEnum(CEFRLevel),
});

type CreateLevelFormData = z.infer<typeof createLevelSchema>;

export function CreateLevelForm() {
  const createLevel = useCreateLevel();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLevelFormData>({
    resolver: zodResolver(createLevelSchema),
    defaultValues: {
      cefrLevel: CEFRLevel.A1,
    },
  });

  const onSubmit = async (data: CreateLevelFormData) => {
    await createLevel.mutateAsync(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        {...register('name')}
        label="Назва рівня"
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        {...register('slug')}
        label="URL-ідентифікатор"
        fullWidth
        margin="normal"
        error={!!errors.slug}
        helperText={errors.slug?.message || 'Наприклад: beginner-basics'}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Збереження...' : 'Створити рівень'}
      </Button>
    </Box>
  );
}
```

---

## 13. Error Handling

### Error Boundary

```typescript
// components/common/ErrorBoundary/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" gutterBottom>
              Щось пішло не так
            </Typography>
            <Button onClick={() => window.location.reload()}>
              Перезавантажити сторінку
            </Button>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
```

### API Error Handling

```typescript
// hooks/useLevels.ts
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { ApiError } from '@voqu/shared';

export function useLevels() {
  return useQuery({
    queryKey: ['levels'],
    queryFn: levelsService.getAll,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError<ApiError>;
      // Don't retry on 4xx errors
      if (axiosError.response?.status && axiosError.response.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Usage in component
function LevelsList() {
  const { data, isLoading, error } = useLevels();

  if (isLoading) return <CircularProgress />;

  if (error) {
    const apiError = (error as AxiosError<ApiError>).response?.data;
    return (
      <Alert severity="error">
        {apiError?.message || 'Помилка завантаження'}
      </Alert>
    );
  }

  return <>{/* render levels */}</>;
}
```

---

## 14. SEO & Meta Tags

### Helmet Pattern

```typescript
// Every page must have Helmet
import { Helmet } from 'react-helmet-async';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Про нас — Voqu</title>
        <meta
          name="description"
          content="Voqu — платформа для вивчення англійської мови. Дізнайтеся більше про нашу місію та підхід до навчання."
        />
        <meta property="og:title" content="Про нас — Voqu" />
        <meta property="og:description" content="Платформа для вивчення англійської" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://voqu.app/about" />
      </Helmet>

      {/* Page content */}
    </>
  );
}
```

### Title Format

| Page Type | Format | Example |
|-----------|--------|---------|
| Public | `{Page} — Voqu` | `Про нас — Voqu` |
| Dashboard | `{Section} \| Dashboard — Voqu` | `Прогрес \| Dashboard — Voqu` |
| Admin | `{Resource} \| Admin — Voqu` | `Рівні \| Admin — Voqu` |
| Detail | `{Item Name} — Voqu` | `Beginner Basics — Voqu` |

---

## 15. Testing

### Test File Location

```
ComponentName/
├── ComponentName.tsx
└── ComponentName.test.tsx  # Co-located test
```

### Testing Tools

- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **MSW** - API mocking

### Test Pattern

```typescript
// Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 16. Performance Guidelines

### Code Splitting

```typescript
// Lazy load pages
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));

// In routes
{
  path: '/admin',
  element: (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
}
```

### Memoization

```typescript
// Memoize expensive computations
const filteredLessons = useMemo(
  () => lessons.filter((l) => l.status === 'published'),
  [lessons]
);

// Memoize callbacks passed to children
const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// Memoize components that receive objects/arrays
const MemoizedList = memo(LessonList);
```

### Image Optimization

```typescript
// Use lazy loading for images
<img
  src={imageUrl}
  alt={description}
  loading="lazy"
  decoding="async"
/>

// Or use MUI's Box with lazy loading
<Box
  component="img"
  src={imageUrl}
  alt={description}
  loading="lazy"
  sx={{ maxWidth: '100%', height: 'auto' }}
/>
```

---

## 17. Code Quality Checklist

### Before Creating a PR

- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Tests pass (`npm run test`)
- [ ] No console.log statements (except in dev utilities)

### Component Checklist

- [ ] Has TypeScript types for all props
- [ ] Uses semantic HTML elements
- [ ] Has proper accessibility (aria labels, roles)
- [ ] Handles loading and error states
- [ ] Works on mobile (tested at 320px width)

### Page Checklist

- [ ] Has Helmet with title and description
- [ ] Has proper heading hierarchy (h1, h2, h3)
- [ ] Shows loading state while fetching
- [ ] Shows error state on failure
- [ ] Has breadcrumbs (for nested pages)

### Form Checklist

- [ ] Uses React Hook Form + Zod
- [ ] Shows validation errors inline
- [ ] Disables submit while submitting
- [ ] Shows success/error feedback
- [ ] Has proper labels and placeholders

---

*Document Version: 1.0*
*Last Updated: December 2024*
