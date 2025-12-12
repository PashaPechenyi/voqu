# Implementation Plan - English Learning Web App

## Tech Stack

| Layer          | Technology                                 | Rationale                                                    |
| -------------- | ------------------------------------------ | ------------------------------------------------------------ |
| **Frontend**   | React 18 + Vite                            | Fast build times, modern React with SPA architecture         |
| **Routing**    | React Router v6                            | Standard routing for React SPAs                              |
| **Backend**    | NestJS                                     | Scalable, TypeScript-first, great for REST APIs              |
| **Database**   | PostgreSQL                                 | Relational structure fits levels/lessons/templates hierarchy |
| **ORM**        | TypeORM                                    | Decorator-based entities, native NestJS integration          |
| **Auth**       | Auth0                                      | Enterprise-grade auth, social logins, user management        |
| **Styling**    | Material UI (MUI)                          | Comprehensive component library, theming support             |
| **Deployment** | Vercel (frontend) + Railway (backend + DB) | Simple, scalable, good free tiers                            |

---

## Project Structure

```
voqu/
├── apps/
│   ├── web/                      # React + Vite frontend
│   │   ├── src/
│   │   │   ├── components/       # Reusable UI components
│   │   │   │   ├── common/
│   │   │   │   ├── layout/
│   │   │   │   └── lessons/
│   │   │   ├── pages/            # Page components
│   │   │   │   ├── public/       # Public pages (Landing, About, Pricing)
│   │   │   │   ├── auth/         # Auth callback pages
│   │   │   │   ├── dashboard/    # User dashboard
│   │   │   │   ├── lessons/      # Lesson views
│   │   │   │   └── admin/        # Admin panel
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── services/         # API client services
│   │   │   ├── store/            # State management (Zustand or Redux)
│   │   │   ├── theme/            # MUI theme configuration
│   │   │   ├── utils/            # Utility functions
│   │   │   ├── routes/           # Route definitions
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   └── api/                      # NestJS backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/         # Auth0 integration
│       │   │   ├── users/
│       │   │   ├── levels/
│       │   │   ├── lessons/
│       │   │   ├── templates/
│       │   │   └── progress/
│       │   ├── common/
│       │   │   ├── guards/
│       │   │   ├── decorators/
│       │   │   ├── filters/
│       │   │   └── interceptors/
│       │   ├── config/
│       │   └── database/
│       │       └── entities/
│       └── ormconfig.ts
│
├── packages/
│   └── shared/                   # Shared types, constants
│       ├── types/
│       └── constants/
│
└── package.json                  # Monorepo root (npm workspaces)
```

---

## Implementation Guidelines

Before creating new phase documents, review the implementation rules:

| Document | Description |
|----------|-------------|
| [IMPLEMENTATION_RULES.md](./phases/IMPLEMENTATION_RULES.md) | Rules for creating implementation plans (frontend & backend) |

---

## Phase 1: Foundation (MVP)

**Goal:** Launch basic platform with content management and learning capabilities.

### Phase 1.1: Public Pages

> **Detailed documentation:** [Phase 1.1 - Public Pages](./phases/phase-1.1-public-pages.md)

| Sub-Phase | Feature | Document | Status |
|-----------|---------|----------|--------|
| 1.1.a | Landing Page | [phase-1.1.a-landing-page.md](./phases/phase-1.1.a-landing-page.md) | Planning |
| 1.1.b | About Page | [phase-1.1.b-about-page.md](./phases/phase-1.1.b-about-page.md) | Planning |
| Shared | Layout, Theme, Components | [phase-1.1-shared.md](./phases/phase-1.1-shared.md) | Planning |

---

### Phase 1.2: Authentication

> **Detailed documentation:** [Phase 1.2 - Authentication](./phases/phase-1.2-authentication.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| User Registration | Email + password sign-up | Not started |
| User Login | Email + password authentication | Not started |
| Password Reset | Email-based password recovery | Not started |
| Role-based Access Control | Admin vs User permissions | Not started |

---

### Phase 1.3: Admin Panel - Levels

> **Detailed documentation:** [Phase 1.3 - Admin Levels](./phases/phase-1.3-admin-levels.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| Create Level | Form to create new level | Not started |
| Edit Level | Edit level details with lesson list | Not started |
| Delete Level | Remove level with confirmation | Not started |
| List All Levels | Dashboard showing all levels | Not started |

---

### Phase 1.4: Admin Panel - Lessons

> **Detailed documentation:** [Phase 1.4 - Admin Lessons](./phases/phase-1.4-admin-lessons.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| Create Lesson | Form with template selection | Not started |
| Edit Lesson | Modify lesson content | Not started |
| Delete Lesson | Remove lesson from level | Not started |

---

### Phase 1.5: Admin Panel - Templates

> **Detailed documentation:** [Phase 1.5 - Admin Templates](./phases/phase-1.5-admin-templates.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| Vocabulary Template | Word list with translations, examples | Not started |
| Add/Edit/Remove Templates | Manage template content | Not started |

---

### Phase 1.6: User - Learning

> **Detailed documentation:** [Phase 1.6 - User Learning](./phases/phase-1.6-user-learning.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| View Levels List | List of all available levels | Not started |
| View Lessons in Level | Lessons within selected level | Not started |
| View Lesson Content | Display lesson with templates | Not started |
| Basic Progress Tracking | Track lesson completion | Not started |

---

## Phase 2: Content Expansion

> **Detailed documentation:** [Phase 2 - Content Expansion](./phases/phase-2-content-expansion.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| Grammar Template | Rule explanations, usage notes | Not started |
| Reading Template | Text passages with vocabulary | Not started |
| Dialogue Template | Conversation format | Not started |
| Listening Template | Audio content with transcript | Not started |
| Bulk Import | CSV/Excel import for vocabulary | Not started |

---

## Phase 3: Exercises & Training

> **Detailed documentation:** [Phase 3 - Exercises & Training](./phases/phase-3-exercises-training.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| Exercise System | Attach exercises to templates | Not started |
| Personal Word List | Save words from lessons | Not started |
| Word Training | Practice with randomized tests | Not started |

---

## Phase 4: Engagement & Polish

> **Detailed documentation:** [Phase 4 - Engagement & Polish](./phases/phase-4-engagement-polish.md) *(coming soon)*

| Feature | Description | Status |
|---------|-------------|--------|
| Streak Tracking | Consecutive days of learning | Not started |
| Progress Achievements | Gamification elements | Not started |
| Blog / Resources | SEO content, learning tips | Not started |
| Spaced Repetition | Smart review scheduling | Not started |

---

## Documentation Index

### Phase 1.1 Documents

| Document | Description |
|----------|-------------|
| [phase-1.1-public-pages.md](./phases/phase-1.1-public-pages.md) | Index & overview |
| [phase-1.1.a-landing-page.md](./phases/phase-1.1.a-landing-page.md) | Landing page implementation |
| [phase-1.1.b-about-page.md](./phases/phase-1.1.b-about-page.md) | About page implementation |
| [phase-1.1-shared.md](./phases/phase-1.1-shared.md) | Shared components, layout, theme |

### Other Phase Documents

| Phase | Document | Status |
|-------|----------|--------|
| 1.2 | Authentication | Coming soon |
| 1.3 | Admin Levels | Coming soon |
| 1.4 | Admin Lessons | Coming soon |
| 1.5 | Admin Templates | Coming soon |
| 1.6 | User Learning | Coming soon |
| 2 | Content Expansion | Coming soon |
| 3 | Exercises & Training | Coming soon |
| 4 | Engagement & Polish | Coming soon |

---

*Document Version: 1.1*
*Last Updated: December 2024*
