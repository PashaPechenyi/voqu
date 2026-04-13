# Frontend Architecture Rules

> Architecture guidelines and conventions for the Voqu frontend application.

---

## Folder Structure

```
src/
├── shared/                     # App-agnostic, reusable code
│   ├── components/             # Generic UI (no business logic)
│   │   └── ComponentName/
│   │       └── ComponentName.tsx
│   ├── hooks/
│   ├── helpers/
│   ├── constants/
│   └── types/
│
├── layouts/                    # Page wrappers for routing
│   ├── PublicLayout/
│   ├── AdminLayout/
│   └── DashboardLayout/
│
├── features/                   # Domain-specific modules
│   └── {feature}/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── pages/
│   ├── public/
│   │   └── PageName/
│   │       ├── PageName.page.tsx
│   │       └── sections/
│   │           └── SectionName.section.tsx
│   ├── auth/
│   ├── dashboard/
│   └── admin/
│
├── services/                   # Global services (API client)
├── mocks/                      # Mock data for development
├── assets/
│   └── images/
├── routes/
└── theme/
```

---

## Folder Responsibilities

| Folder      | Purpose                          | Example Contents                 |
| ----------- | -------------------------------- | -------------------------------- |
| `shared/`   | Generic, reusable code           | Accordion, Table, Pagination     |
| `features/` | Domain-specific modules          | vocabulary/, quiz/, lessons/     |
| `layouts/`  | Page wrappers with header/footer | PublicLayout, AdminLayout        |
| `pages/`    | Route entry points               | Landing.page.tsx, About.page.tsx |
| `services/` | External integrations            | API client, localStorage         |
| `mocks/`    | Development mock data            | questions.mock.ts, words.mock.ts |

---

## File Naming Conventions

| Type           | Convention          | Example                |
| -------------- | ------------------- | ---------------------- |
| Components     | PascalCase          | `VocabularyCard.tsx`   |
| Pages          | PascalCase + suffix | `Landing.page.tsx`     |
| Sections       | PascalCase + suffix | `Hero.section.tsx`     |
| Hooks          | camelCase + suffix  | `useAuth.hook.ts`      |
| Services       | camelCase + suffix  | `auth.service.ts`      |
| Types          | camelCase + suffix  | `word.type.ts`         |
| Helpers        | camelCase + suffix  | `theme.helper.ts`      |
| Constants      | camelCase + suffix  | `navigation.const.ts`  |
| Mocks          | camelCase + suffix  | `words.mock.ts`        |
| Barrel exports | `index.ts`          | `index.ts`             |

> **Note:** Components in `shared/components/` and `features/*/components/` do NOT require a suffix.
> All other files (hooks, services, types, helpers, constants, mocks) MUST include their suffix.

---

## Component Organization

### Where Components Live

| Component Type                 | Location                 |
| ------------------------------ | ------------------------ |
| Generic UI (no business logic) | `shared/components/`     |
| Feature-specific               | `features/*/components/` |
| Layout wrappers                | `layouts/`               |
| Page sections (one-off)        | `pages/*/sections/`      |

### Component Folder Structure

Each component lives in its own folder:

```
ComponentName/
└── ComponentName.tsx
```

Add additional files only when needed:

- `ComponentName.types.ts` - For complex prop interfaces
- `ComponentName.test.tsx` - For tests

---

## Type Organization

Types are co-located with their feature:

```
features/
├── vocabulary/
│   └── types/
│       └── word.types.ts
├── quiz/
│   └── types/
│       └── question.types.ts
└── levels/
    └── types/
        └── level.types.ts
```

Shared types (theme, common utilities) go in `shared/types/`.

---

## Import Rules

### Import Order

```typescript
// 1. External libraries
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

// 2. Internal absolute imports (@/)
import { Pagination } from '@/shared/components/Pagination/Pagination';
import { Word } from '@/features/vocabulary/types/word.types';

// 3. Relative imports (same feature/folder)
import { HeroSection } from './sections/Hero.section';
```

### Path Alias

Use `@/` alias for all internal imports:

```typescript
// Good
import { theme } from '@/theme';
import { useAuth } from '@/features/auth/hooks/useAuth';

// Bad
import { theme } from '../../../theme';
```

---

## Routing

Routes are organized by domain:

```
routes/
├── index.tsx           # Main router
├── public.routes.tsx
├── auth.routes.tsx
├── dashboard.routes.tsx
└── admin.routes.tsx
```

### Route Rules

- Public pages: `/lowercase` (e.g., `/about`)
- Dashboard: `/dashboard/section` (e.g., `/dashboard/progress`)
- Admin: `/admin/resource` (e.g., `/admin/levels`)
- Only one `index` route per parent

---

## Styling

### Theme Tokens

Always use theme tokens instead of hardcoded values:

```typescript
// Good
<Typography color="secondary">
<Box sx={{ color: 'primary.main', backgroundColor: 'background.paper' }}>

// Bad
<Typography sx={{ color: '#37123c' }}>
```

### Responsive Design

Use MUI breakpoint syntax:

```typescript
<Box sx={{
  flexDirection: { xs: 'column', md: 'row' },
  p: { xs: 2, md: 4 },
}}>
```

---

## Best Practices

1. **No mock data in components** - Extract to `mocks/` folder
2. **No unused imports** - Remove all unused imports
3. **Export conventions**:
   - Components (`.tsx`): Use `export default`
   - Utilities, hooks, types, constants: Use named exports
   - Barrel files (`index.ts`): Use named re-exports
4. **Co-locate types** - Keep types close to their usage in feature folders
5. **Single responsibility** - Each component folder contains one component

---

_Last Updated: March 2026_
