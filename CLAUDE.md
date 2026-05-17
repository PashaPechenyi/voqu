# Voqu — English Learning Platform

An app where people can create their own English course, discover courses made by others, learn, and practice.

## Stack

- **Monorepo:** npm workspaces (`apps/*`, `packages/*`)
- **Frontend** (`apps/web`): React 18 + Vite + Material UI
- **Backend** (`apps/api`): NestJS + TypeORM
- **Shared** (`packages/shared`): types & constants
- **DB:** PostgreSQL 16 (via docker-compose)
- **Auth:** Auth0

## Common commands

| Command | What |
|---|---|
| `npm run dev` | Run web + api concurrently |
| `npm run dev:web` | Web only (http://localhost:5173) |
| `npm run dev:api` | API only (http://localhost:3001) |
| `docker compose up -d` | Start Postgres |
| `npm run migration:run` (in `apps/api`) | Apply TypeORM migrations |
| `npm run lint` | Lint all workspaces |
| `npm run format` | Prettier write |

## Backend conventions (`apps/api`)

### Module layout
Only `{name}.module.ts` lives at the module root. Everything else is split into subfolders:

```
modules/<name>/
├── <name>.module.ts
├── http/
│   ├── controllers/
│   └── dto/
├── services/
├── repositories/
└── structs/
```

### Naming
- **FK columns and TypeORM relations start with uppercase:** `RoleId`, not `roleId`. Same for relation property names.

### Entities
- **Every column, FK, and relation is declared optional (`?`)** so partial objects are assignable. No required fields on entity classes.

### Services
- **Services must not reference DTO classes.** They accept an input interface defined in `structs/`. The DTO `implements` that interface; the controller passes the body straight through.

### Controllers / responses
- **Every endpoint returns a response-DTO class that extends `BaseResponseDto`.** Never return entities directly.

## Frontend conventions (`apps/web`)

### Structure

```
apps/web/src/
├── App.tsx, main.tsx
├── features/        # business features tied to a backend entity
│   └── <entity>/{components, hooks, types, constants, ...}
├── pages/           # route-level pages; may have local components/, hooks/, sections/
├── layouts/         # layout wrappers
├── routes/          # route definitions
├── shared/          # business-agnostic reusables: components, hooks, helpers, types
├── theme/           # MUI theme
└── assets/
```

### File placement rules

Decide where a file goes by asking these in order:

**1. Is it tied to a backend entity (course, lesson, level, ...)?**
→ `features/<entity>/...`
Example: a course-card, a lesson hook, a level-related type.

**2. Is it generic, with no business logic, reusable anywhere?**
→ `shared/...`
`shared` must stay business-agnostic — nothing entity-specific lives here.
Example: a generic `Button`, a `useDebounce` hook, date helpers.

**3. Specific to one page/section, not tied to an entity?**
→ co-locate inside that page:
```
pages/<area>/<Page>/
├── <Page>.tsx
├── sections/
├── components/   # local components used only by this page
└── hooks/        # local hooks used only by this page
```
The moment a **second** page needs it, promote it:
- gained an entity link → move to `features/<entity>/`
- turned out to be generic → move to `shared/`

Promote on the second use, not preemptively.

## Docs

Longer design docs live in `docs/` (architecture, IMPLEMENTATION_PLAN.md, phases, PRODUCT_PLAN.md, stories). Read them when working on broader features.
