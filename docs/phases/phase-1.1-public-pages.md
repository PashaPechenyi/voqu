# Phase 1.1: Public Pages

> **Parent document:** [Implementation Plan](../IMPLEMENTATION_PLAN.md)
>
> **Status:** Planning
>
> **Goal:** Create public-facing pages (Landing, About) as the first touchpoint for visitors.

---

## Overview

Public pages are the first touchpoint for visitors. They should be in **Ukrainian** language with English examples where appropriate (vocabulary samples, lesson previews).

### Language Strategy

| Page Area | Language | Notes |
|-----------|----------|-------|
| UI Text (buttons, navigation) | Ukrainian | Навігація, кнопки |
| Headlines & descriptions | Ukrainian | Основний контент |
| Lesson examples/previews | English with UA translation | Демонстрація формату уроків |
| CEFR level names | English (A1, A2, B1...) | International standard |

---

## Sub-Phase Documents

| Phase | Document | Description | Status |
|-------|----------|-------------|--------|
| 1.1.a | [Landing Page](./phase-1.1.a-landing-page.md) | Main marketing page with hero, features, CEFR preview | Planning |
| 1.1.b | [About Page](./phase-1.1.b-about-page.md) | CEFR explanation, methodology, benefits | Planning |
| Shared | [Shared Components](./phase-1.1-shared.md) | Layout, theme, common components | Planning |

---

## Routes Summary

| Path | Component | Document |
|------|-----------|----------|
| `/` | `LandingPage` | [1.1.a](./phase-1.1.a-landing-page.md) |
| `/about` | `AboutPage` | [1.1.b](./phase-1.1.b-about-page.md) |

---

## File Structure Overview

```
apps/web/src/
├── components/
│   ├── layout/
│   │   ├── PublicLayout.tsx         # → Shared
│   │   ├── PublicHeader.tsx         # → Shared
│   │   └── PublicFooter.tsx         # → Shared
│   └── common/
│       └── Logo.tsx                 # → Shared
├── pages/
│   └── public/
│       ├── LandingPage/             # → 1.1.a
│       │   ├── index.tsx
│       │   ├── LandingPage.tsx
│       │   └── sections/
│       │       ├── HeroSection.tsx
│       │       ├── FeaturesSection.tsx
│       │       ├── LevelsPreviewSection.tsx
│       │       ├── LessonPreviewSection.tsx
│       │       ├── lessonPreviewData.ts
│       │       └── CTASection.tsx
│       └── AboutPage/               # → 1.1.b
│           ├── index.tsx
│           ├── AboutPage.tsx
│           └── sections/
│               ├── IntroSection.tsx
│               ├── CEFRSection.tsx
│               ├── MethodologySection.tsx
│               └── BenefitsSection.tsx
├── theme/
│   └── index.ts                     # → Shared
├── routes/
│   └── index.tsx                    # → Shared
└── main.tsx                         # → Shared
```

---

## Dependencies

All dependencies are documented in [Shared Components](./phase-1.1-shared.md#dependencies).

```bash
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/lab react-router-dom react-helmet-async
```

---

## Implementation Order

1. **Shared Components** ([phase-1.1-shared.md](./phase-1.1-shared.md))
   - Theme configuration
   - PublicLayout, PublicHeader, PublicFooter
   - Logo component
   - Routes setup
   - App entry point

2. **Landing Page** ([phase-1.1.a-landing-page.md](./phase-1.1.a-landing-page.md))
   - HeroSection
   - FeaturesSection
   - LevelsPreviewSection
   - LessonPreviewSection
   - CTASection

3. **About Page** ([phase-1.1.b-about-page.md](./phase-1.1.b-about-page.md))
   - IntroSection
   - CEFRSection
   - MethodologySection
   - BenefitsSection

---

## Master Checklist

### Shared Components
- [ ] Set up MUI theme configuration
- [ ] Create `PublicLayout` with header and footer
- [ ] Implement `Logo` component
- [ ] Implement `PublicHeader` with responsive navigation
- [ ] Implement `PublicFooter`
- [ ] Configure routes in React Router
- [ ] Set up app entry point with providers

### Landing Page (1.1.a)
- [ ] Create `LandingPage` folder structure
- [ ] Implement `HeroSection`
- [ ] Implement `FeaturesSection`
- [ ] Implement `LevelsPreviewSection`
- [ ] Create static mockup data for lesson preview
- [ ] Implement `LessonPreviewSection`
- [ ] Implement `CTASection`
- [ ] Add SEO meta tags

### About Page (1.1.b)
- [ ] Create `AboutPage` folder structure
- [ ] Implement `IntroSection`
- [ ] Implement `CEFRSection` with accordion
- [ ] Implement `MethodologySection` with timeline
- [ ] Implement `BenefitsSection`
- [ ] Add SEO meta tags

### Quality Assurance
- [ ] Test responsive design on all breakpoints
- [ ] Verify all Ukrainian text content
- [ ] Test navigation between pages
- [ ] Verify SEO meta tags render correctly
