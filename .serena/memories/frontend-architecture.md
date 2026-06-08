# Frontend architecture (`apps/web`)

**Where files live, how they're named, and how they may import each other.** How to _write_ the code
inside them is in [[frontend-patterns]].

## TL;DR

- Place a new file by the decision tree: entity-bound → `features/<entity>/`; generic → `shared/`;
  page-local → co-locate in the page. Promote on the **second** use.
- File-role suffixes are singular: `.type.ts`, `.const.ts`, `.enum.ts`, `.helper.ts`, `.section.tsx`,
  `.page.tsx`. Components are `PascalCase.tsx`; hooks are `useXxx.ts` (no suffix).
- A component, page, or section file name must match the symbol it exports; a folder-per-component
  folder is named after its component.
- One-way imports only: `pages → features → shared`. Never import from another feature, never from
  `apps/api`. Shared cross-stack types live in `packages/shared`.

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

## File placement

### Decision tree

When you create a new file, ask in order:

1. **Tied to a backend entity** (course, lesson, level, progress, quiz, vocabulary, …)?
   → `features/<entity>/...`
2. **Generic, no business logic, reusable anywhere?** → `shared/...`
   `shared` must stay business-agnostic — nothing entity-specific lives here. Examples: `Pagination`,
   `Accordion`, a generic `useDebounce`, date helpers.
3. **Specific to one page/section, not tied to an entity?** → co-locate inside that page.

### Promotion rule

Promote on the **second** use, not preemptively:

- gained an entity link → move to `features/<entity>/`
- turned out to be generic → move to `shared/`

### Sections, pages, and feature components

- **A `*.section.tsx` is rendered directly by a `*.page.tsx`.** If section A renders section B, B
  isn't a section — it's a component (in the page's local `components/`) or, if entity-bound, a
  feature component.
- **Card-shaped, entity-bound UI lives in `features/<entity>/components/`** (`CourseCard`,
  `LessonItem`), not in a page's `sections/`.

## Internal layout per area

### `features/<entity>/`

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

### `pages/`

Grouped by area first (`admin/`, `public/`), then by page name:

```
pages/<area>/<PageName>/
├── <PageName>.page.tsx       # the page component itself
├── sections/                 # large blocks rendered by the page
│   └── Foo.section.tsx
├── components/               # small local components used only here
├── hooks/                    # local hooks used only here
└── constants/                # local constants used only here
```

Section files render major page regions (hero, summary, list). Component files are smaller pieces
those sections use.

### `shared/`

```
shared/
├── components/<Name>/<Name>.tsx   # folder per component (room for styles/tests later)
├── hooks/useXxx.ts                # one file per hook
├── helpers/xxx.helper.ts
├── constants/xxx.const.ts
├── enums/xxx.enum.ts
└── types/xxx.type.ts
```

`shared/components` is folder-per-component because shared components often grow auxiliary files
(styled subcomponents, tests, stories). `features/` and `pages/` keep components flat — promote to
folder-per-component only when a component actually gets auxiliary files.

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

- **File name must match the exported symbol.** `Hero.section.tsx` exports `HeroSection`;
  `Dashboard.page.tsx` exports `DashboardPage`. A folder-per-component folder is PascalCase and named
  after the component it contains: `LessonItem/LessonItem.tsx`, never `LessonCard/LessonItem.tsx`
  (folder named after a different/old component) or `deleteLessonModal/` (camelCase). When you rename
  a component, rename its file and folder to match.
- A single file may declare multiple types / constants / helpers — that's fine. Split only when the
  file gets unwieldy.
- Hooks are the one exception to the `.<role>.ts` pattern: the `use` prefix already signals their
  role, so no `.hook.ts` suffix.
- Use `.const.ts` for plain values, `.enum.ts` for enums (an enum is both a type and a value — keep
  it separate).
- Do **not** use plural suffixes (`.types.ts`, `.helpers.ts`, …) or alternative forms
  (`.component.tsx`, `.utils.ts`). Stick to the table above.

## Imports & dependency direction

This is the single source of truth for import rules (referenced from [[frontend-patterns]]).

- **One-way dependency: `pages → features → shared`. Reverse imports are forbidden.** `shared/` must
  never import from `features/` or `pages/`.
- **A feature must not import from another feature.** If two features need the same code, it belongs
  in `shared/` (frontend-only) or `packages/shared` (cross-stack).
- **The web app must never import from `apps/api`.** A relative path like
  `../../../../../api/src/modules/.../lesson-list-item.constructor` is a hard violation — it reaches
  into backend source and couples the web build to it. If the type is genuinely shared, move it to
  `packages/shared`; otherwise declare a frontend-local type in `features/<entity>/types/`.
- A feature helper/hook imports the entity type from `features/<entity>/types/`, never from
  `pages/.../types/`.
- Prefer the TS path alias (`@/features/...`, `@/shared/...`) over long `../../../` chains.

## Cross-stack types

Types that exist on both frontend and backend (DTO shapes, enums shared with the API) live in
`packages/shared` and are imported by both apps. Frontend-only view-models stay in
`features/<entity>/types/`.

## Related memories

- [[project-overview]] — what the product is, which entities exist, how features map to API modules.
- [[frontend-patterns]] — how to write the components, hooks, and types that live in these folders.
