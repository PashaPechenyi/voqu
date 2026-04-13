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
│   ├── helpers/
│   ├── constants/
│   └── types/
│
├── layouts/                    # Page wrappers for routing
│   └── LayoutName/
│       ├── LayoutName.layout.tsx
│       ├── components/         # Sub-components (Header, Footer)
│       └── constants/          # Layout-specific constants
│
├── features/                   # Domain-specific modules
│   └── {feature}/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── constants/
│       └── types/
│
├── pages/
│   ├── public/
│   │   └── pageName/
│   │       ├── PageName.page.tsx
│   │       ├── constants/      # Page-specific constants
│   │       ├── hooks/          # Page-specific hooks
│   │       ├── types/          # Page-specific types
│   │       └── sections/
│   │           └── SectionName.section.tsx
│   └── admin/
│       └── pageName/
│           ├── PageName.page.tsx
│           ├── constants/
│           ├── hooks/
│           ├── types/
│           └── sections/
│
├── routes/
└── theme/
```

---

## Folder Responsibilities

| Folder      | Purpose                          | Example Contents                   |
| ----------- | -------------------------------- | ---------------------------------- |
| `shared/`   | Generic, reusable code           | Table, SectionDivider, QuizSlider  |
| `features/` | Domain-specific modules          | vocabulary/, courses/, levels/     |
| `layouts/`  | Page wrappers with header/footer | PublicLayout/, AdminLayout/        |
| `pages/`    | Route entry points               | Landing.page.tsx, AboutUs.page.tsx |
| `theme/`    | MUI theme configuration          | index.ts, theme.type.ts            |

---

## File Naming Conventions

| Type       | Convention          | Example                     |
| ---------- | ------------------- | --------------------------- |
| Components | PascalCase          | `VocabularyCardsSlider.tsx` |
| Pages      | PascalCase + suffix | `Landing.page.tsx`          |
| Sections   | PascalCase + suffix | `Hero.section.tsx`          |
| Layouts    | PascalCase + suffix | `Public.layout.tsx`         |
| Hooks      | camelCase + suffix  | `useAuth.hook.ts`           |
| Services   | camelCase + suffix  | `auth.service.ts`           |
| Types      | camelCase + suffix  | `vocabularyEntry.type.ts`   |
| Helpers    | camelCase + suffix  | `combineSxStyles.helper.ts` |
| Constants  | camelCase + suffix  | `publicNavItems.const.ts`   |

> **Note:** Components in `shared/components/`, `features/*/components/`, and `layouts/*/components/` do NOT require a suffix.
> All other files (layouts, hooks, services, types, helpers, constants) MUST include their suffix.

---

## Component Organization

### Where Components Live

| Component Type                 | Location                 |
| ------------------------------ | ------------------------ |
| Generic UI (no business logic) | `shared/components/`     |
| Feature-specific               | `features/*/components/` |
| Layout wrappers                | `layouts/*/`             |
| Layout sub-components          | `layouts/*/components/`  |
| Page sections (one-off)        | `pages/**/sections/`     |

### Component Folder Structure

Each component lives in its own folder:

```
ComponentName/
└── ComponentName.tsx
```

Add additional files only when needed:

- `ComponentName.types.ts` - For complex prop interfaces (e.g., `MethodologyCard.types.ts`, `Table.types.ts`)

### Layout Folder Structure

Each layout follows a richer internal structure:

```
LayoutName/
├── LayoutName.layout.tsx         # Main layout component
├── components/                   # Sub-components (Header, Footer, MobileMenu)
│   └── LayoutNameHeader.tsx
└── constants/                    # Layout-specific constants
    └── layoutNameNavItems.const.ts
```

### Page Folder Structure

Pages can co-locate their own constants and types alongside sections:

```
pageName/
├── PageName.page.tsx             # Page entry component
├── constants/                    # Page-specific constants
│   └── pageSpecific.const.ts
├── hooks/                        # Page-specific hooks
│   └── usePageSpecific.hook.ts
├── types/                        # Page-specific types
│   └── pageSpecific.type.ts
└── sections/
    └── PageNameSection.section.tsx
```

---

## Type Organization

Types are co-located with their domain:

```
features/
├── vocabulary/
│   └── types/
│       └── vocabularyEntry.type.ts
├── courses/
│   └── types/
│       └── popularCourses.type.ts
└── levels/
    └── types/
        └── level.type.ts
```

Pages and layouts can also co-locate types when they are only used locally:

```
pages/admin/dashboard/
└── types/
    ├── dashboardStatistic.type.ts
    └── recentActivity.type.ts
```

Shared types (navigation, quiz entries) go in `shared/types/`.
Theme-related types go in `theme/`.

---

## Import Rules

### Import Order

```typescript
// 1. External libraries
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
// 2. Internal absolute imports (@/)
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import PopularCourse from '@/features/courses/components/PopularCourse/PopularCourse';
// 3. Relative imports (within same module)
import { publicNavItems } from '../constants/publicNavItems.const';
import PublicMobileMenu from './PublicMobileMenu';
```

### Path Alias

Use `@/` alias for cross-module imports. Use relative imports within the same module (layout, page, or feature):

```typescript
// Good - cross-module
import { theme } from '@/theme';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

// Good - within same module (relative)
import { publicNavItems } from '../constants/publicNavItems.const';
import AdminHeader from './components/AdminHeader';

// Bad - relative for cross-module
import { theme } from '../../../theme';
```

---

## Routing

Routes are defined in a single file:

```
routes/
└── index.tsx           # All routes defined here
```

### Route Rules

- Public pages: `/lowercase` (e.g., `/`, `/about`)
- Admin: `/admin` (e.g., `/admin`)
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

1. **No mock data in components** - Extract to `constants/` files with `.const.ts` suffix
2. **No unused imports** - Remove all unused imports
3. **Export conventions**:
   - Components (`.tsx`): Use `export default ComponentName;` at the bottom of the file (not inline `export default function`)
   - Types, constants: Use named exports
4. **Co-locate types and constants** - Keep types and constants close to their usage. Pages and layouts can have their own `types/` and `constants/` folders when data is only used locally
5. **Single responsibility** - Each component folder contains one component
6. **No barrel files** - Do not use `index.ts` barrel re-exports (exception: `theme/index.ts` as a module entry point)

---

_Last Updated: April 2026_
