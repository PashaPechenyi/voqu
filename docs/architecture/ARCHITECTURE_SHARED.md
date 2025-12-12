# Shared Packages Architecture

> **Purpose:** Guidelines for the `packages/shared` module - shared types, constants, and utilities used by both frontend and backend.
>
> **Related documents:**
> - [Frontend Architecture](./ARCHITECTURE_FRONTEND.md)
> - [Backend Architecture](./ARCHITECTURE_BACKEND.md)
> - [Implementation Plan](./IMPLEMENTATION_PLAN.md)

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Folder Structure](#2-folder-structure)
- [3. File Naming Conventions](#3-file-naming-conventions)
- [4. What Belongs in Shared](#4-what-belongs-in-shared)
- [5. What Does NOT Belong in Shared](#5-what-does-not-belong-in-shared)
- [6. Import Path Aliases](#6-import-path-aliases)
- [7. Type Definitions](#7-type-definitions)
- [8. Constants](#8-constants)
- [9. Utility Functions](#9-utility-functions)
- [10. Enums](#10-enums)
- [11. API Contracts](#11-api-contracts)
- [12. Export Patterns](#12-export-patterns)
- [13. Versioning & Breaking Changes](#13-versioning--breaking-changes)

---

## 1. Overview

The `packages/shared` module serves as the single source of truth for:

- **Types & Interfaces** - Shared TypeScript definitions
- **Constants** - Application-wide constant values
- **Enums** - Shared enumeration types
- **Utilities** - Pure functions used by both apps
- **API Contracts** - Request/Response DTOs shared between frontend and backend

### Package Information

```json
{
  "name": "@voqu/shared",
  "version": "1.0.0",
  "private": true
}
```

### Key Principles

1. **Platform agnostic** - No browser or Node.js specific code
2. **Zero external dependencies** - Only TypeScript, no runtime dependencies
3. **Pure exports** - Only types, interfaces, enums, constants, and pure functions
4. **Single source of truth** - Avoid duplicating definitions across apps

---

## 2. Folder Structure

```
packages/shared/
├── src/
│   ├── index.ts                    # Main barrel export
│   ├── types/
│   │   ├── index.ts                # Types barrel export
│   │   ├── user.types.ts           # User-related types
│   │   ├── level.types.ts          # Level-related types
│   │   ├── lesson.types.ts         # Lesson-related types
│   │   ├── template.types.ts       # Template-related types
│   │   ├── progress.types.ts       # Progress-related types
│   │   └── api.types.ts            # Generic API types (pagination, etc.)
│   ├── constants/
│   │   ├── index.ts                # Constants barrel export
│   │   ├── routes.constants.ts     # Route path constants
│   │   ├── api.constants.ts        # API endpoint constants
│   │   ├── validation.constants.ts # Validation rules (min/max lengths)
│   │   └── cefr.constants.ts       # CEFR level definitions
│   ├── enums/
│   │   ├── index.ts                # Enums barrel export
│   │   ├── user.enums.ts           # User-related enums
│   │   ├── level.enums.ts          # Level-related enums
│   │   ├── lesson.enums.ts         # Lesson-related enums
│   │   └── template.enums.ts       # Template-related enums
│   ├── utils/
│   │   ├── index.ts                # Utils barrel export
│   │   ├── slug.utils.ts           # Slug generation utilities
│   │   ├── date.utils.ts           # Date formatting utilities
│   │   └── validation.utils.ts     # Validation helper functions
│   └── contracts/
│       ├── index.ts                # Contracts barrel export
│       ├── auth.contracts.ts       # Auth request/response types
│       ├── level.contracts.ts      # Level API contracts
│       ├── lesson.contracts.ts     # Lesson API contracts
│       └── progress.contracts.ts   # Progress API contracts
├── dist/                           # Compiled output (gitignored)
├── package.json
└── tsconfig.json
```

---

## 3. File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Type definitions | `{domain}.types.ts` | `user.types.ts` |
| Constants | `{domain}.constants.ts` | `routes.constants.ts` |
| Enums | `{domain}.enums.ts` | `level.enums.ts` |
| Utilities | `{domain}.utils.ts` | `slug.utils.ts` |
| API Contracts | `{domain}.contracts.ts` | `auth.contracts.ts` |
| Barrel exports | `index.ts` | `types/index.ts` |

### Naming Rules

- **All lowercase** with dot separators
- **Domain-first** naming: `user.types.ts` not `types-user.ts`
- **Singular domain names**: `user.types.ts` not `users.types.ts`
- **No abbreviations**: `validation.constants.ts` not `val.constants.ts`

---

## 4. What Belongs in Shared

### Types & Interfaces

- Entity types (User, Level, Lesson, Template)
- API request/response types (DTOs)
- Pagination types
- Generic utility types

### Constants

- Route paths (`/dashboard`, `/admin/levels`)
- API endpoints (`/api/v1/levels`)
- Validation constraints (min/max lengths, patterns)
- CEFR level definitions

### Enums

- User roles (`ADMIN`, `USER`)
- Entity statuses (`DRAFT`, `PUBLISHED`)
- Template types (`VOCABULARY`, `GRAMMAR`)
- Lesson types

### Utilities

- Slug generation
- Date formatting (locale-independent)
- String manipulation (truncate, capitalize)
- Validation helpers (isValidEmail, isValidSlug)

### API Contracts

- Request body interfaces
- Response interfaces
- Query parameter interfaces
- Error response interfaces

---

## 5. What Does NOT Belong in Shared

| Category | Reason | Where it belongs |
|----------|--------|------------------|
| React components | Frontend-specific | `apps/web/src/components/` |
| React hooks | Frontend-specific | `apps/web/src/hooks/` |
| NestJS decorators | Backend-specific | `apps/api/src/common/` |
| Database entities | Backend-specific | `apps/api/src/database/entities/` |
| Browser APIs (localStorage, fetch) | Platform-specific | `apps/web/src/services/` |
| Node.js APIs (fs, path) | Platform-specific | `apps/api/src/` |
| Environment variables | App-specific | `.env` files per app |
| Styling (CSS, MUI theme) | Frontend-specific | `apps/web/src/theme/` |
| Business logic with side effects | App-specific | Services in respective apps |

---

## 6. Import Path Aliases

### Configuration

The shared package uses the `@/` alias for internal imports:

```json
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Internal Imports (within shared package)

```typescript
// Good - use @/ alias
import { UserRole } from '@/enums';
import { generateSlug } from '@/utils';

// Avoid - relative paths for deeply nested files
import { UserRole } from '../../enums';
```

### External Imports (from frontend/backend)

```typescript
// From apps/web or apps/api
import { User, UserRole, ROUTES } from '@voqu/shared';

// Or specific imports
import { User } from '@voqu/shared/types';
import { UserRole } from '@voqu/shared/enums';
```

---

## 7. Type Definitions

### Entity Type Pattern

```typescript
// src/types/user.types.ts

/**
 * Base user properties shared across all contexts
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * User with optional relations loaded
 */
export interface UserWithProgress extends User {
  progress?: LessonProgress[];
}

/**
 * Minimal user data for lists/previews
 */
export interface UserPreview {
  id: string;
  firstName: string;
  lastName: string;
}
```

### Type Naming Conventions

| Pattern | Usage | Example |
|---------|-------|---------|
| `{Entity}` | Full entity type | `User`, `Level`, `Lesson` |
| `{Entity}Preview` | Minimal data for lists | `LevelPreview`, `LessonPreview` |
| `{Entity}With{Relation}` | Entity with loaded relations | `LevelWithLessons` |
| `Create{Entity}` | Creation payload | `CreateLevel`, `CreateLesson` |
| `Update{Entity}` | Update payload (partial) | `UpdateLevel`, `UpdateLesson` |
| `{Entity}Query` | Query/filter parameters | `LevelQuery`, `LessonQuery` |

### Generic Types

```typescript
// src/types/api.types.ts

/**
 * Standard paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Standard API error response
 */
export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
  details?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}
```

---

## 8. Constants

### Route Constants

```typescript
// src/constants/routes.constants.ts

export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',

  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    CALLBACK: '/auth/callback',
    LOGOUT: '/auth/logout',
  },

  // Dashboard
  DASHBOARD: {
    ROOT: '/dashboard',
    PROGRESS: '/dashboard/progress',
    SETTINGS: '/dashboard/settings',
  },

  // Learning
  LEVELS: '/levels',
  LEVEL_DETAIL: (id: string) => `/levels/${id}`,
  LESSON_DETAIL: (levelId: string, lessonId: string) =>
    `/levels/${levelId}/lessons/${lessonId}`,

  // Admin
  ADMIN: {
    ROOT: '/admin',
    LEVELS: '/admin/levels',
    LEVEL_EDIT: (id: string) => `/admin/levels/${id}`,
    LESSONS: '/admin/lessons',
    LESSON_EDIT: (id: string) => `/admin/lessons/${id}`,
    TEMPLATES: '/admin/templates',
    USERS: '/admin/users',
  },
} as const;
```

### API Endpoints Constants

```typescript
// src/constants/api.constants.ts

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Levels
  LEVELS: {
    BASE: '/levels',
    BY_ID: (id: string) => `/levels/${id}`,
    BY_SLUG: (slug: string) => `/levels/slug/${slug}`,
  },

  // Lessons
  LESSONS: {
    BASE: '/lessons',
    BY_ID: (id: string) => `/lessons/${id}`,
    BY_LEVEL: (levelId: string) => `/levels/${levelId}/lessons`,
  },

  // Progress
  PROGRESS: {
    BASE: '/progress',
    BY_LESSON: (lessonId: string) => `/progress/lessons/${lessonId}`,
  },
} as const;

export const API_VERSION = 'v1';
export const API_BASE_URL = `/api/${API_VERSION}`;
```

### Validation Constants

```typescript
// src/constants/validation.constants.ts

export const VALIDATION = {
  // String lengths
  NAME: {
    MIN: 1,
    MAX: 255,
  },
  DESCRIPTION: {
    MAX: 5000,
  },
  SLUG: {
    MIN: 1,
    MAX: 255,
    PATTERN: /^[a-z0-9-]+$/,
  },
  EMAIL: {
    MAX: 255,
  },
  PASSWORD: {
    MIN: 8,
    MAX: 128,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
} as const;
```

---

## 9. Utility Functions

### Rules for Shared Utilities

1. **Must be pure functions** - no side effects
2. **No external dependencies** - only TypeScript built-ins
3. **No platform-specific code** - no `window`, `process`, `fs`
4. **Well-typed** - explicit input/output types
5. **Well-documented** - JSDoc comments required

### Utility Examples

```typescript
// src/utils/slug.utils.ts

/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to slug
 * @returns Lowercase slug with hyphens
 * @example
 * generateSlug('Hello World') // 'hello-world'
 * generateSlug('Привіт Світ') // 'pryvit-svit' (transliterated)
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Validates if a string is a valid slug
 * @param slug - The slug to validate
 * @returns True if valid slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug) && slug.length > 0;
}
```

```typescript
// src/utils/date.utils.ts

/**
 * Formats an ISO date string to a human-readable format
 * @param isoDate - ISO 8601 date string
 * @param locale - Locale code (default: 'uk-UA')
 * @returns Formatted date string
 */
export function formatDate(isoDate: string, locale = 'uk-UA'): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Returns relative time string (e.g., "2 days ago")
 * @param isoDate - ISO 8601 date string
 * @param locale - Locale code (default: 'uk-UA')
 * @returns Relative time string
 */
export function getRelativeTime(isoDate: string, locale = 'uk-UA'): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const date = new Date(isoDate);
  const now = new Date();
  const diffInDays = Math.floor(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60)
    );
    return rtf.format(diffInHours, 'hour');
  }

  return rtf.format(diffInDays, 'day');
}
```

---

## 10. Enums

### Enum Definition Pattern

```typescript
// src/enums/user.enums.ts

/**
 * User roles for authorization
 */
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

/**
 * User account status
 */
export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}
```

```typescript
// src/enums/level.enums.ts

/**
 * CEFR proficiency levels
 */
export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

/**
 * Level publication status
 */
export enum LevelStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}
```

```typescript
// src/enums/template.enums.ts

/**
 * Types of lesson templates
 */
export enum TemplateType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  READING = 'reading',
  LISTENING = 'listening',
  DIALOGUE = 'dialogue',
}
```

### Enum Naming Rules

- **PascalCase** for enum name: `UserRole`, `LevelStatus`
- **SCREAMING_SNAKE_CASE** or **PascalCase** for enum keys: `ADMIN` or `Admin`
- **lowercase** for enum values (strings): `'admin'`, `'published'`

---

## 11. API Contracts

API contracts define the shape of data exchanged between frontend and backend.

### Contract Pattern

```typescript
// src/contracts/level.contracts.ts

import type { Level, LevelPreview, PaginatedResponse } from '@/types';
import type { LevelStatus, CEFRLevel } from '@/enums';

// ============================================
// Request Types
// ============================================

/**
 * Request body for creating a level
 */
export interface CreateLevelRequest {
  name: string;
  slug?: string;
  description?: string;
  cefrLevel: CEFRLevel;
  status?: LevelStatus;
  order?: number;
}

/**
 * Request body for updating a level
 */
export interface UpdateLevelRequest {
  name?: string;
  slug?: string;
  description?: string;
  cefrLevel?: CEFRLevel;
  status?: LevelStatus;
  order?: number;
}

/**
 * Query parameters for listing levels
 */
export interface LevelQueryRequest {
  page?: number;
  limit?: number;
  status?: LevelStatus;
  cefrLevel?: CEFRLevel;
  search?: string;
  sortBy?: 'name' | 'order' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

// ============================================
// Response Types
// ============================================

/**
 * Response for single level
 */
export type LevelResponse = Level;

/**
 * Response for level list
 */
export type LevelListResponse = PaginatedResponse<LevelPreview>;

/**
 * Response for level with lessons
 */
export interface LevelDetailResponse extends Level {
  lessons: LessonPreview[];
}
```

### Contract File Structure

Each contract file should contain:

1. **Request types** - Inputs sent to API
2. **Response types** - Outputs received from API
3. **Query types** - URL query parameters

---

## 12. Export Patterns

### Barrel Exports

Every folder must have an `index.ts` that re-exports all public members:

```typescript
// src/types/index.ts
export * from './user.types';
export * from './level.types';
export * from './lesson.types';
export * from './template.types';
export * from './progress.types';
export * from './api.types';
```

```typescript
// src/index.ts (main entry point)

// Types
export * from './types';

// Enums
export * from './enums';

// Constants
export * from './constants';

// Utils
export * from './utils';

// API Contracts
export * from './contracts';
```

### Import Examples

```typescript
// Import everything from shared
import { User, UserRole, ROUTES, generateSlug } from '@voqu/shared';

// Import from specific modules
import type { User, Level } from '@voqu/shared/types';
import { UserRole, LevelStatus } from '@voqu/shared/enums';
import { ROUTES, API_ENDPOINTS } from '@voqu/shared/constants';
import { generateSlug, formatDate } from '@voqu/shared/utils';
import type { CreateLevelRequest } from '@voqu/shared/contracts';
```

---

## 13. Versioning & Breaking Changes

### When to Bump Version

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| New types/exports added | Patch (1.0.x) | Add `TemplatePreview` type |
| Bug fixes in utils | Patch (1.0.x) | Fix `generateSlug` edge case |
| New features | Minor (1.x.0) | Add new `contracts/` module |
| Breaking changes | Major (x.0.0) | Rename `User.name` to `User.firstName` |

### Breaking Change Checklist

Before making a breaking change:

1. [ ] Search for usages in `apps/web`
2. [ ] Search for usages in `apps/api`
3. [ ] Update both apps simultaneously
4. [ ] Document the change in commit message
5. [ ] Update relevant documentation

### Deprecation Pattern

```typescript
/**
 * @deprecated Use `UserPreview` instead. Will be removed in v2.0.0
 */
export interface UserSummary {
  // ...
}

// New preferred type
export interface UserPreview {
  // ...
}
```

---

*Document Version: 1.0*
*Last Updated: December 2024*
