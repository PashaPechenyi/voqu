# Project overview

## Product

Voqu — web app where people can:

- create their own English course,
- discover courses made by others,
- learn from those courses,
- practice (quizzes, vocabulary).

Courses are organised by CEFR levels (A1–C2) and contain lessons.

## Repo layout

Monorepo on npm workspaces.

```
voqu/
├── apps/
│   ├── web/        # React 18 + Vite + Material UI (frontend)
│   └── api/        # NestJS + TypeORM (backend)
├── packages/
│   └── shared/     # types & constants shared between web and api
├── docs/           # architecture, plans, stories
├── docker-compose.yml   # Postgres 16 container
└── CLAUDE.md       # short rules auto-loaded into every Claude Code session
```

## Stack at a glance

| Layer    | Tech                                                                          |
| -------- | ----------------------------------------------------------------------------- |
| Frontend | React 18, Vite, Material UI 7, react-router-dom 7, react-hook-form, Auth0 SDK |
| Backend  | NestJS, TypeORM, PostgreSQL 16                                                |
| Auth     | Auth0 (frontend SDK + backend token validation)                               |
| Tooling  | TypeScript 5.7, ESLint 9, Prettier 3                                          |
| Node     | >= 20                                                                         |

## Domain entities (current)

Frontend `apps/web/src/features/*` and backend `apps/api/src/modules/*` are aligned around these entities:

- **Course** — a structured English course with lessons.
- **Lesson** — a unit inside a course.
- **Level** — CEFR level (A1–C2). Courses are tagged with a level.
- **Progress** — per-user learning progress.
- **Quiz** — practice questions.
- **Vocabulary** — words/cards.
- **Search** — discovery of courses (frontend-only feature folder).
- **User / Role** — accounts and permissions (backend module).

Roughly, one frontend feature folder maps to one backend module of the same name. Exceptions: `search` is frontend-only; `auth` and `templates` are backend-only.

## Common commands

| Command                                 | What                             |
| --------------------------------------- | -------------------------------- |
| `npm run dev`                           | Run web + api concurrently       |
| `npm run dev:web`                       | Web only (http://localhost:5173) |
| `npm run dev:api`                       | API only (http://localhost:3001) |
| `docker compose up -d`                  | Start Postgres                   |
| `npm run migration:run` (in `apps/api`) | Apply TypeORM migrations         |
| `npm run lint`                          | Lint all workspaces              |
| `npm run format`                        | Prettier write                   |

## Related memories

- [[frontend-architecture]] — where to put files, naming, folder layout (web).
- [[frontend-patterns]] — code conventions and patterns for components, hooks, types, MUI.
