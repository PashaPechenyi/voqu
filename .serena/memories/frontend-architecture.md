# Frontend architecture (`apps/web`)

How to name files and where to put them. Code-style rules are in [[frontend-patterns]].

## Top-level structure

```
apps/web/src/
├── App.tsx
├── main.tsx
├── assets/          # static images, fonts, etc.
├── features/        # business features tied to a backend entity
├── pages/           # route-level pages, grouped by area (admin/, public/, ...)
├── layouts/         # layout wrappers
├── routes/          # route definitions
├── shared/          # business-agnostic reusables
└── theme/           # MUI theme
```

## File placement decision tree

When you create a new file, ask in order:

### 1. Is it tied to a backend entity (course, lesson, level, progress, quiz, vocabulary, ...)?

→ `features/<entity>/...`

### 2. Is it generic, with no business logic, reusable anywhere?

→ `shared/...`
`shared` must stay business-agnostic — nothing entity-specific lives here.
Examples: `Pagination`, `Accordion`, a generic `useDebounce`, date helpers.

### 3. Specific to one page or section, not tied to an entity?

→ co-locate inside that page.

### Promotion rule

Promote on the **second** use, not preemptively:

- gained an entity link → move to `features/<entity>/`
- turned out to be generic → move to `shared/`

## `features/<entity>/` — internal layout

```
features/<entity>/
├── components/      # entity-specific UI components
├── hooks/           # entity-specific hooks
├── types/           # entity-specific types
├── constants/       # entity-specific constants
├── enums/           # entity-specific enums
├── helpers/         # entity-specific pure functions
└── services/        # entity-specific API client calls (optional)
```

Only create the subfolders you actually need. Inside, files are flat (not folder-per-component).

## `pages/` — internal layout

Pages are grouped by area first (`admin/`, `public/`), then by page name:

```
pages/<area>/<PageName>/
├── <PageName>.page.tsx       # the page component itself
├── sections/                 # large blocks rendered by the page
│   └── Foo.section.tsx
├── components/               # small local components used only here
├── hooks/                    # local hooks used only here
└── constants/                # local constants used only here
```

Section files render major page regions (hero, summary, list). Component files are smaller pieces those sections use.

## `shared/` — internal layout

```
shared/
├── components/<Name>/<Name>.tsx   # folder per component (room for styles/tests later)
├── hooks/useXxx.ts                # one file per hook
├── helpers/xxx.helper.ts
├── constants/xxx.const.ts
├── enums/xxx.enum.ts
└── types/xxx.type.ts
```

`shared/components` is folder-per-component because shared components often grow auxiliary files (styled subcomponents, tests, stories). `features/` and `pages/` keep components flat — promote to folder-per-component only if a component actually gets auxiliary files.

## File naming

All role suffixes are **singular**.

| Kind                    | Pattern                     | Example                     |
| ----------------------- | --------------------------- | --------------------------- |
| React component         | `PascalCase.tsx`            | `CourseCard.tsx`            |
| Page                    | `PascalCase.page.tsx`       | `Dashboard.page.tsx`        |
| Page section            | `PascalCase.section.tsx`    | `Hero.section.tsx`          |
| Hook                    | `useXxx.ts` (no suffix)     | `useResolveColor.ts`        |
| Type                    | `xxx.type.ts`               | `lesson.type.ts`            |
| Helper / pure utils     | `xxx.helper.ts`             | `string.helper.ts`          |
| Constants               | `xxx.const.ts`              | `courseStatus.const.ts`     |
| Enum                    | `xxx.enum.ts`               | `courseStatus.enum.ts`      |
| Shared component folder | `PascalCase/PascalCase.tsx` | `Pagination/Pagination.tsx` |

Notes:

- A single file may declare multiple types / constants / helpers — that's fine. Split only when the file gets unwieldy.
- Hooks are the one exception to the `.<role>.ts` pattern: the `use` prefix already signals their role, so no `.hook.ts` suffix.
- Use `.const.ts` for plain values, `.enum.ts` for enums (an enum is both a type and a value — keep it separate).
- Do **not** use plural suffixes (`.types.ts`, `.helpers.ts`, etc.) or alternative forms (`.component.tsx`, `.utils.ts`). Stick to the table above.

## Imports

- Prefer the configured TS path alias (e.g. `@/features/...`, `@/shared/...`) over long `../../../` chains.
- A feature must not import from another feature directly. If two features need the same code, that code belongs in `shared/` or in `packages/shared` (cross-stack).
- `shared/` must never import from `features/` or `pages/`. One-way dependency: `pages` → `features` → `shared`.

## Cross-stack types

Types that exist on both frontend and backend (DTO shapes, enums shared with the API) live in `packages/shared` and are imported by both apps. Frontend-only view-models stay in `features/<entity>/types/`.

## Related memories

- [[project-overview]] — what the product is, which entities exist, how features map to API modules.
- [[frontend-patterns]] — how to actually write the components, hooks, and types that live in these folders.
