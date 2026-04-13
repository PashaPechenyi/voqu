# Frontend Architecture Improvement Plan

> Based on the rules defined in `ARCHITECTURE_FRONTEND.md`, this document outlines all violations found in the current codebase and the steps to fix them.

---

## 1. Rename all "DB" references to "Dashboard"

**Problem:** The abbreviation `DB` is used as a prefix for dashboard-related files, components, and constants. This is misleading (suggests "database") and violates naming clarity. All occurrences must be replaced with `Dashboard`.

### 1.1 Rename section files

| Current Path | New Path |
|---|---|
| `pages/admin/dashboard/sections/DBHero.section.tsx` | `pages/admin/dashboard/sections/DashboardHero.section.tsx` |
| `pages/admin/dashboard/sections/DBStatistics.section.tsx` | `pages/admin/dashboard/sections/DashboardStatistics.section.tsx` |
| `pages/admin/dashboard/sections/DBStatsActivity.section.tsx` | `pages/admin/dashboard/sections/DashboardStatsActivity.section.tsx` |
| `pages/admin/dashboard/sections/DBRecentActivity.section.tsx` | `pages/admin/dashboard/sections/DashboardRecentActivity.section.tsx` |
| `pages/admin/dashboard/sections/DBPopularCourses.section.tsx` | `pages/admin/dashboard/sections/DashboardPopularCourses.section.tsx` |
| `pages/admin/dashboard/sections/DBQuickActions.section.tsx` | `pages/admin/dashboard/sections/DashboardQuickActions.section.tsx` |

### 1.2 Rename constant files

| Current Path | New Path |
|---|---|
| `shared/constants/admin/dbPopularCourses.const.ts` | `shared/constants/admin/dashboardPopularCourses.const.ts` |
| `shared/constants/admin/dbRecentActivity.const.ts` | `shared/constants/admin/dashboardRecentActivity.const.ts` |

### 1.3 Rename component functions inside files

| File | Current Function Name | New Function Name |
|---|---|---|
| `DashboardHero.section.tsx` | `DBHeroSection` | `DashboardHeroSection` |
| `DashboardStatistics.section.tsx` | `DBStatisticsSection` | `DashboardStatisticsSection` |
| `DashboardStatsActivity.section.tsx` | `DBStatsActivitySection` | `DashboardStatsActivitySection` |
| `DashboardRecentActivity.section.tsx` | `DBRecentActivitySection` | `DashboardRecentActivitySection` |
| `DashboardPopularCourses.section.tsx` | `DBPopularCoursesSection` | `DashboardPopularCoursesSection` |
| `DashboardQuickActions.section.tsx` | `DBQuickActionsSection` | `DashboardQuickActionsSection` |

### 1.4 Update all imports

| File | What to Update |
|---|---|
| `pages/admin/dashboard/Dashboard.page.tsx` | Update all 4 section imports and JSX usage |
| `DashboardStatsActivity.section.tsx` | Update imports of `DashboardPopularCoursesSection` and `DashboardRecentActivitySection` + JSX usage |
| `DashboardRecentActivity.section.tsx` | Update import path of `dashboardRecentActivity.const` |
| `DashboardPopularCourses.section.tsx` | Update import path of `dashboardPopularCourses.const` |

---

## 2. Move feature-specific constants out of `shared/`

**Problem:** The `shared/` folder must only contain generic, app-agnostic, reusable code. Currently it contains constants that import feature types and hold feature-specific mock data.

### 2.1 Move admin/dashboard constants to `features/dashboard/`

These files import `@/features/dashboard/types/` and contain dashboard-specific data. They belong in the dashboard feature.

| Current Path | New Path |
|---|---|
| `shared/constants/admin/dashboardStatistics.const.ts` | `features/dashboard/constants/dashboardStatistics.const.ts` |
| `shared/constants/admin/dashboardPopularCourses.const.ts` | `features/dashboard/constants/dashboardPopularCourses.const.ts` |
| `shared/constants/admin/dashboardRecentActivity.const.ts` | `features/dashboard/constants/dashboardRecentActivity.const.ts` |
| `shared/constants/admin/adminNavItems.const.ts` | `features/dashboard/constants/adminNavItems.const.ts` |

After moving, delete `shared/constants/admin/` folder entirely.

**Files that need import updates after move:**
- `pages/admin/dashboard/sections/DashboardStatistics.section.tsx` — update import of `stats`
- `pages/admin/dashboard/sections/DashboardPopularCourses.section.tsx` — update import of `popularCourses`
- `pages/admin/dashboard/sections/DashboardRecentActivity.section.tsx` — update import of `recentActivity`
- `pages/admin/dashboard/sections/DashboardQuickActions.section.tsx` — update import of `adminQuickActions`
- `layouts/AdminLayout/AdminHeader.tsx` — update import of `adminNavItems`

### 2.2 Move vocabulary/lesson constants to `features/vocabulary/`

These files import `@/features/vocabulary/types/` and contain vocabulary-specific mock data.

| Current Path | New Path |
|---|---|
| `shared/constants/lessonPreview.const.ts` | `features/vocabulary/constants/lessonPreview.const.ts` |

**Files that need import updates after move:**
- `pages/public/landing/sections/LessonPreview.section.tsx` — update import of `PREVIEW_LESSON_CARDS` and `TEST`

### 2.3 Move CEFR levels constants to `features/levels/`

The `aboutUs.const.ts` file exports two constants that belong to different features:

- `cefrLevels` — imports `CefrLevel` type → move to `features/levels/`
- `MethodologyCards` — imports `MethodologyCardConst` type from shared component → keep in `shared/` (it's generic UI data)

**Split the file:**

| Current | New |
|---|---|
| `shared/constants/aboutUs.const.ts` → `cefrLevels` export | `features/levels/constants/cefrLevels.const.ts` |
| `shared/constants/aboutUs.const.ts` → `MethodologyCards` export | `shared/constants/methodologyCards.const.ts` |

Then delete `shared/constants/aboutUs.const.ts`.

**Files that need import updates after split:**
- `pages/public/aboutUs/sections/AboutUsCefr.section.tsx` — update import of `cefrLevels`
- `pages/public/aboutUs/sections/AboutUsMethodology.section.tsx` — update import of `MethodologyCards`

### 2.4 Update `shared/constants/index.ts` barrel

After all moves, update the barrel file to remove moved exports:

```typescript
// Before
export * from './navigation.const';
export * from './urls.const';
export * from './aboutUs.const';       // remove
export * from './lessonPreview.const'; // remove

// After
export * from './navigation.const';
export * from './urls.const';
export * from './methodologyCards.const'; // add
```

---

## 3. Split multi-type files into one type per file

**Problem:** The architecture rules state that each type, constant, and function should be in its own file, named after what it exports.

### 3.1 Split `features/dashboard/types/dashboard.type.ts`

Currently contains 3 types: `DashboardStats`, `RecentActivity`, `PopularCourses`.

| New File | Exported Type |
|---|---|
| `features/dashboard/types/dashboardStats.type.ts` | `DashboardStats` |
| `features/dashboard/types/recentActivity.type.ts` | `RecentActivity` |
| `features/dashboard/types/popularCourses.type.ts` | `PopularCourses` |

Then delete `features/dashboard/types/dashboard.type.ts`.

**Files that need import updates:**
- `features/dashboard/constants/dashboardStatistics.const.ts` — import `DashboardStats` from `dashboardStats.type`
- `features/dashboard/constants/dashboardPopularCourses.const.ts` — import `PopularCourses` from `popularCourses.type`
- `features/dashboard/constants/dashboardRecentActivity.const.ts` — import `RecentActivity` from `recentActivity.type`

### 3.2 Split `features/vocabulary/types/vocabulary.type.ts`

Currently contains 3 types: `PreviewLessonCard`, `Test`, `Word`.

| New File | Exported Type |
|---|---|
| `features/vocabulary/types/previewLessonCard.type.ts` | `PreviewLessonCard` |
| `features/vocabulary/types/test.type.ts` | `Test` |
| `features/vocabulary/types/word.type.ts` | `Word` |

Then delete `features/vocabulary/types/vocabulary.type.ts`.

**Files that need import updates:**
- `features/vocabulary/constants/lessonPreview.const.ts` — import `PreviewLessonCard` from `previewLessonCard.type` and `Test` from `test.type`
- `pages/public/table/Table.page.tsx` — import `Word` from `word.type`
- `features/vocabulary/components/VocabularyCard/VocabularyCard.tsx` — import `PreviewLessonCard` from `previewLessonCard.type`
- `features/vocabulary/components/QuizCard/QuizCard.tsx` — import `Test` from `test.type`

### 3.3 Split `shared/types/navigation.type.ts`

Currently contains 2 types: `NavMenuItem`, `AdminNavMenuItem`.

| New File | Exported Type |
|---|---|
| `shared/types/navMenuItem.type.ts` | `NavMenuItem` |
| `shared/types/adminNavMenuItem.type.ts` | `AdminNavMenuItem` |

Then delete `shared/types/navigation.type.ts`.

**Update `shared/types/index.ts`:**
```typescript
export * from './navMenuItem.type';
export * from './adminNavMenuItem.type';
```

**Files that need import updates:**
- `shared/constants/navigation.const.ts` — import `NavMenuItem` from `navMenuItem.type`
- `features/dashboard/constants/adminNavItems.const.ts` — import `AdminNavMenuItem` from `adminNavMenuItem.type`
- `layouts/AdminLayout/AdminHeader.tsx` — if importing `AdminNavMenuItem` type directly

### 3.4 Split `shared/constants/navigation.const.ts`

Currently contains 2 constants: `navItems`, `footerLinks`.

| New File | Exported Constant |
|---|---|
| `shared/constants/navItems.const.ts` | `navItems` |
| `shared/constants/footerLinks.const.ts` | `footerLinks` |

Then delete `shared/constants/navigation.const.ts`.

**Update `shared/constants/index.ts`:**
```typescript
export * from './navItems.const';
export * from './footerLinks.const';
export * from './urls.const';
export * from './methodologyCards.const';
```

**Files that need import updates:**
- `layouts/PublicLayout/PublicHeader.tsx` — update `navItems` import
- `layouts/PublicLayout/PublicFooter.tsx` — update `footerLinks` import
- `layouts/PublicLayout/PublicMobileMenu.tsx` — update `navItems` import

### 3.5 Split `features/dashboard/constants/adminNavItems.const.ts`

Currently contains 2 constants: `adminNavItems`, `adminQuickActions`.

| New File | Exported Constant |
|---|---|
| `features/dashboard/constants/adminNavItems.const.ts` | `adminNavItems` |
| `features/dashboard/constants/adminQuickActions.const.ts` | `adminQuickActions` |

**Files that need import updates:**
- `pages/admin/dashboard/sections/DashboardQuickActions.section.tsx` — import `adminQuickActions` from `adminQuickActions.const`

---

## 4. Move inline data from pages to constants

**Problem:** `pages/public/table/Table.page.tsx` defines a `words` constant (80 lines of mock data) inline. Mock data should not live in page components.

### Action

| Current | New |
|---|---|
| `words` constant in `Table.page.tsx` (lines 7-80) | `features/vocabulary/constants/words.const.ts` |

Update `Table.page.tsx` to import from the new location:
```typescript
import { words } from '@/features/vocabulary/constants/words.const';
```

---

## 5. Add missing barrel (`index.ts`) files

**Problem:** Several features and sub-folders are missing barrel export files, which are required by the architecture conventions.

### Files to create

| Path | Re-exports |
|---|---|
| `features/dashboard/index.ts` | All dashboard constants and types |
| `features/levels/index.ts` | All level types and constants |
| `features/vocabulary/types/index.ts` | `PreviewLessonCard`, `Test`, `Word` |
| `features/vocabulary/constants/index.ts` | `PREVIEW_LESSON_CARDS`, `TEST`, `words` |
| `features/dashboard/types/index.ts` | `DashboardStats`, `RecentActivity`, `PopularCourses` |
| `features/dashboard/constants/index.ts` | All dashboard constants |
| `features/levels/types/index.ts` | `CefrLevel` |
| `features/levels/constants/index.ts` | `cefrLevels` |
| `shared/helpers/index.ts` | Re-export from `styles/` |

---

## 6. Fix relative import in `createSxStylesList.helper.ts`

**Problem:** Uses relative import `'../../../theme/theme.type'` instead of path alias.

### Action

```typescript
// Before
import { TSxItem } from '../../../theme/theme.type';

// After
import { TSxItem } from '@/theme/theme.type';
```

---

## 7. Fix `MethodologyCard.type.ts` naming

**Problem:** Per architecture rules, component type files should use the format `ComponentName.types.ts` (plural). The current file uses singular `.type.ts`.

| Current | New |
|---|---|
| `shared/components/MethodologyCard/MethodologyCard.type.ts` | `shared/components/MethodologyCard/MethodologyCard.types.ts` |

**Files that need import updates:**
- `shared/constants/methodologyCards.const.ts` (after rename from `aboutUs.const.ts`)

---

## Execution Order

The changes have dependencies between them. Recommended order:

1. **Rename DB → Dashboard** (Section 1) — file renames + content updates
2. **Split multi-type files** (Section 3) — create new type files, update imports
3. **Move feature-specific constants** (Section 2) — relocate files, update imports
4. **Move inline data** (Section 4) — extract from `Table.page.tsx`
5. **Add barrel files** (Section 5) — create `index.ts` files
6. **Fix relative import** (Section 6) — one-line change
7. **Fix type file naming** (Section 7) — rename `.type.ts` → `.types.ts`

---

## Final folder structure after all changes

```
src/
├── shared/
│   ├── components/
│   │   ├── index.ts
│   │   ├── MethodologyCard/
│   │   │   ├── MethodologyCard.tsx
│   │   │   └── MethodologyCard.types.ts
│   │   └── SectionDivider/
│   │       └── SectionDivider.tsx
│   ├── constants/
│   │   ├── index.ts
│   │   ├── navItems.const.ts
│   │   ├── footerLinks.const.ts
│   │   ├── urls.const.ts
│   │   └── methodologyCards.const.ts
│   ├── helpers/
│   │   ├── index.ts
│   │   └── styles/
│   │       ├── combineSxStyles.helper.ts
│   │       └── createSxStylesList.helper.ts
│   └── types/
│       ├── index.ts
│       ├── navMenuItem.type.ts
│       └── adminNavMenuItem.type.ts
│
├── features/
│   ├── dashboard/
│   │   ├── index.ts
│   │   ├── constants/
│   │   │   ├── index.ts
│   │   │   ├── dashboardStatistics.const.ts
│   │   │   ├── dashboardPopularCourses.const.ts
│   │   │   ├── dashboardRecentActivity.const.ts
│   │   │   ├── adminNavItems.const.ts
│   │   │   └── adminQuickActions.const.ts
│   │   └── types/
│   │       ├── index.ts
│   │       ├── dashboardStats.type.ts
│   │       ├── recentActivity.type.ts
│   │       └── popularCourses.type.ts
│   ├── levels/
│   │   ├── index.ts
│   │   ├── constants/
│   │   │   ├── index.ts
│   │   │   └── cefrLevels.const.ts
│   │   └── types/
│   │       ├── index.ts
│   │       └── level.type.ts
│   └── vocabulary/
│       ├── index.ts
│       ├── components/
│       │   ├── QuizCard/
│       │   │   └── QuizCard.tsx
│       │   ├── QuizResults/
│       │   │   └── QuizResults.tsx
│       │   ├── QuizSlider/
│       │   │   └── QuizSlider.tsx
│       │   └── VocabularyCard/
│       │       └── VocabularyCard.tsx
│       ├── constants/
│       │   ├── index.ts
│       │   ├── lessonPreview.const.ts
│       │   └── words.const.ts
│       └── types/
│           ├── index.ts
│           ├── previewLessonCard.type.ts
│           ├── test.type.ts
│           └── word.type.ts
│
├── layouts/
│   ├── index.ts
│   ├── AdminLayout/
│   │   ├── AdminLayout.tsx
│   │   └── AdminHeader.tsx
│   └── PublicLayout/
│       ├── PublicLayout.tsx
│       ├── PublicHeader.tsx
│       ├── PublicFooter.tsx
│       └── PublicMobileMenu.tsx
│
├── pages/
│   ├── admin/
│   │   └── dashboard/
│   │       ├── Dashboard.page.tsx
│   │       └── sections/
│   │           ├── DashboardHero.section.tsx
│   │           ├── DashboardStatistics.section.tsx
│   │           ├── DashboardStatsActivity.section.tsx
│   │           ├── DashboardRecentActivity.section.tsx
│   │           ├── DashboardPopularCourses.section.tsx
│   │           └── DashboardQuickActions.section.tsx
│   └── public/
│       ├── landing/
│       │   ├── Landing.page.tsx
│       │   └── sections/
│       │       ├── Hero.section.tsx
│       │       ├── LessonPreview.section.tsx
│       │       └── Futures.section.tsx
│       ├── aboutUs/
│       │   ├── AboutUs.page.tsx
│       │   └── sections/
│       │       ├── AboutUsCefr.section.tsx
│       │       ├── AboutUsCefrAccordion.section.tsx
│       │       ├── AboutUsIntro.section.tsx
│       │       └── AboutUsMethodology.section.tsx
│       └── table/
│           ├── Table.page.tsx
│           └── sections/
│               └── Table.section.tsx
│
├── routes/
│   └── index.tsx
├── theme/
│   ├── index.ts
│   ├── theme.type.ts
│   └── themeDeclaration.type.ts
├── App.tsx
└── main.tsx
```

---

_Created: April 2026_
