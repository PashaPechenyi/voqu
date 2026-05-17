# Frontend code patterns (`apps/web`)

How to actually write the code that lives in the folders described in [[frontend-architecture]].

Formatting (quotes, semicolons, line length, trailing commas) is controlled by Prettier + ESLint. Don't argue with them — fix the config if the rule is wrong.

## Components

### Declaration

Arrow function assigned to a `const`, typed with `FC<Props>`.

```tsx
import { FC } from 'react';

type CourseCardProps = {
  course: Course;
  onEdit?: (id: string) => void;
};

const CourseCard: FC<CourseCardProps> = ({ course, onEdit }) => {
  return <Card>...</Card>;
};

export default CourseCard;
```

### Exports

- **Components: `export default`** (one component per file, the file is the component).
- **Everything else — hooks, types, helpers, constants, enums: named exports only.**
- Don't add barrel `index.ts` files inside features or pages. Barrels are acceptable only at clear public boundaries (e.g. `packages/shared`).

### Props

- Props type name: `<Component>Props`. Declared as `type`, not `interface`, unless declaration merging or `implements` is genuinely needed.
- Never use `any`.
- **Pass entities under their domain name, not `data`/`info`.** `course: Course`, not `data: Course`. `lesson: Lesson`, not `data: Lesson`.
- **The `Data` suffix is a smell on values too, not just on type names.** A variable holding a `Word` is `activeWord`, not `activeWordData`. Drop generic noise — the type name already says what the value is.

### Event handlers

- **Props that emit events start with `on`** (`onSelectAnswer`, `onSuccess`).
- **Local handler functions inside the component start with `handle`** (`handleSelectAnswer`).

## Hooks

- **Named export** (no `export default` for hooks).
- Return an **object** by default. Use a tuple only when consumers are expected to destructure positionally (like `useState`).
- Return narrow APIs — don't expose internal setters unless callers need them.
- A data hook returning a list names the state `xxxList` (`coursesList`, `levelsList`), not `xxxData`.
- A function that operates on one item is singular: `addCourseToList(course)`, not `addCoursesToTheList(course)`.
- Use `useCallback` on any hook-returned function that consumers will put into a `useEffect` dependency array.

```ts
export const useCourseSearch = (query: string) => {
  // ...
  return { results, isLoading, error };
};
```

## Types

- `type` by default. Use `interface` only when you need merging or `implements`.
- Prefer string literal unions over `enum` for simple value sets (`type Status = 'draft' | 'published'`). Use `enum` only when you need an iterable, namespaced set of named values — and then put it in an `.enum.ts` file.
- **One canonical entity type per entity.** `Course`, `Lesson`, `Level` live in `features/<entity>/types/<entity>.type.ts`. No duplicate `Course` types in `pages/...`.
- **An enum and a literal union for the same set is a bug.** Pick one source of truth.
- Drop generic noise from type names — `Data`/`Info` suffixes are red flags. Prefer `MethodologyCardItem` over `MethodologyCardData`.

## Helpers, constants, enums

- Pure functions in `*.helper.ts` files. Named exports. No side effects at module scope.
- Constants in `*.const.ts`. `UPPER_SNAKE_CASE` for static-data constants and primitive constants. Runtime singletons (configured `theme`, local `sxStyles`) stay camelCase.
- **Group related primitive constants into a single object instead of exporting them flat.** When two or more constants share a scope (theme colours, error messages, etc.), export one `UPPER_SNAKE_CASE` object whose keys describe each value, instead of two top-level constants. Examples:
  - `COLORS = { secondary: '#37123c', tertiary: '#aa9f96' }` rather than separate `SECONDARY_COLOR`/`TERTIARY_COLOR`.
  - `FORM_VALIDATION_ERRORS = { requiredField: '...' }` rather than a flat `REQUIRED_FIELD_MESSAGE`.

  Name the object by the **scope it covers** (`FORM_VALIDATION_ERRORS`, not `ERROR_MESSAGES`) so the symbol declares which slice of the domain it owns.

- Mock data is named `MOCK_*` so it's obvious it's a placeholder: `MOCK_POPULAR_COURSES`.
- Enums in `*.enum.ts`.
- **File suffixes are singular: `.type.ts`, `.const.ts`, `.enum.ts`, `.helper.ts`.** Never `.types.ts`, `.consts.ts`.
- Renaming a `const`'s symbol never changes the file name. Symbol `LESSON_SEGMENT_COLORS` lives in `lessonSegmentColors.const.ts`.

## URL constants

URL constants live in `shared/constants/urls.const.ts`.

- **Static URL** → export a `string`: `export const ADMIN_COURSES_URL = '/admin/courses';`
- **URL with a dynamic segment** → export a function that takes the segment and returns the built URL:

  ```ts
  export const ADMIN_COURSES_EDIT_URL = (id: string) => `${ADMIN_COURSES_URL}/edit/${id}`;
  ```

  When using it as a router pattern, pass the param placeholder: `ADMIN_COURSES_EDIT_URL(':courseId')`. When navigating, pass the real id: `ADMIN_COURSES_EDIT_URL(course.id)`.

- Never hardcode an internal URL string in a component or nav-item constant. Always import from `urls.const.ts`.
- Every URL that appears in nav/footer/quick-actions must have a matching `<Route>` in the router.

## Single Responsibility

A component or hook or function should do **one thing** and stay agnostic of the specific use case its caller is solving. When extra behaviour is needed for a particular call site, pass it in as an abstract callback — don't bake the caller's concerns into the implementation.

### Rules

- Don't add props or arguments that name a specific scenario (e.g. `showRedirectToCheckoutOnSuccess`, `clearFormAfterDelete`). Replace them with abstract hooks: `onSuccess`, `onError`, `onSubmit`, `onComplete`, etc.
- Branches like `if (caseA) { ... } else if (caseB) { ... }` inside a generic component/hook are a smell. The component shouldn't know `caseA` and `caseB` exist — the caller should pass a callback that does the right thing for its case.
- A hook that wraps a request exposes lifecycle callbacks (`onSuccess`, `onError`) and returns generic state (`data`, `isLoading`, `error`). It does **not** know what the caller wants to do with the result.
- A component renders UI and emits events through its props. It does not import caller-specific modules (a generic `Modal` doesn't know about courses; a `<CourseModal>` knows about courses but doesn't know whether it's used in the dashboard or the admin page).
- If you find yourself adding the third boolean flag like prop to a component, stop and split it — either into separate components or by replacing the flags with a single callback.

### Example

Don't:

```tsx
// ❌ component knows about caller's redirect logic
const DeleteCourseButton: FC<{ courseId: string; redirectAfter?: boolean }> = ({
  courseId,
  redirectAfter,
}) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await deleteCourse(courseId);
    if (redirectAfter) navigate('/courses');
  };
  return <Button onClick={handleClick}>Delete</Button>;
};
```

Do:

```tsx
// ✅ component exposes the lifecycle hook; caller decides what to do
type DeleteCourseButtonProps = {
  courseId: string;
  onDeleted?: () => void;
};

const DeleteCourseButton: FC<DeleteCourseButtonProps> = ({ courseId, onDeleted }) => {
  const handleClick = async () => {
    await deleteCourse(courseId);
    onDeleted?.();
  };
  return <Button onClick={handleClick}>Delete</Button>;
};

// caller decides:
<DeleteCourseButton courseId={id} onDeleted={() => navigate('/courses')} />;
```

The same applies to hooks: a `useDeleteCourse()` hook returns `{ mutate, isLoading, error }` and accepts `{ onSuccess, onError }` — it does not accept `redirectAfter`, `showToast`, or anything else case-specific.

## Sections, pages, and components

- **A `*.section.tsx` is rendered directly by a `*.page.tsx`.** If section A renders section B, B isn't a section — it's a component (in the page's local `components/`) or, if it's entity-bound, a feature component.
- **Section file name and component name must agree: `<Name>.section.tsx` exports `<Name>Section`** (file `Hero.section.tsx` exports `HeroSection`).
- **Page file name and component name must agree: `<Name>.page.tsx` exports `<Name>Page`**.
- **Card-shaped, entity-bound UI lives in `features/<entity>/components/`** (`CourseCard`, `LessonCard`), not in a page's `sections/`.

## Data fetching

Pattern: **page/component → hook → helper → `fetch`**.

- The component never calls `fetch` directly.
- The helper in `features/<entity>/helpers/` holds the URL, declares the response type, calls `fetch`, throws on `!response.ok`, returns a typed value.
- The hook in `features/<entity>/hooks/` owns the state (`data`, `setData`, `isLoading`, `error`) and exposes a stable `fetchX` (wrapped in `useCallback`). It accepts lifecycle callbacks (`onSuccess`, `onError`) and is generic about the caller.
- Mutation hooks pass the updated entity through the callback: `onSuccess?: (updatedCourse: Course) => void`.

### Naming

- **API helper functions end with `Req`.** Each helper in `features/<entity>/helpers/` corresponds to one network call and is named `<verb><Entity>Req` (`getCoursesReq`, `createCourseReq`, `editCourseReq`, `deleteCourseReq`, `updateCourseStatusReq`). The `Req` suffix marks the function as "this hits the network" and keeps the helper symbol distinct from the same-named local symbol inside its wrapping hook.
- **Hook names never contain `get`/`getBy`.** `useGetCourses` is wrong; use `useCoursesList` for collections and `useCourseById` (or `useCourse`) for a single entity. The internal fetcher returned by the hook uses `fetch`, not `get`: `fetchCourses`, `fetchLevels`, `fetchCourseById`.

### Per-call hooks

- **Every API helper has its own custom hook.** A component never imports a `*Req` helper directly. Mutations get a dedicated hook (`useCreateCourse`, `useEditCourse`, `useDeleteCourse`, `useUpdateCourseStatus`) that wraps a single helper and exposes `{ <verb>, isLoading, error }` plus `{ onSuccess, onError }` lifecycle callbacks.

### Request payload types

- **Form-values types are for forms only — never for API helpers or mutation hooks.** A `*FormValues` type carries the UI's nullable, draft-stage shape (`level: Level | null`, `status: CourseStatus | null`). Helpers and hooks take a strictly-typed request body (`CreateCourseReqBody`, `EditCourseReqBody`) where every field is required and non-null.
- **Map form values to request body at the call site**, via a dedicated helper (e.g. `courseFormToReqBody`). The runtime null-check for "required form fields" lives in that mapper, not in the API helper. The network layer assumes its input is already valid.

```ts
// helpers/getCourseById.helper.ts
export type GetCourseResponse = { course: Course };

export const getCourseByIdReq = async (id: Course['id']): Promise<GetCourseResponse> => {
  const response = await fetch(`/api/course/${id}`);
  if (!response.ok) throw new Error('Failed to fetch course');
  return response.json();
};
```

```ts
// hooks/useCourseById.ts
export const useCourseById = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const fetchCourseById = useCallback(async (id: Course['id']) => {
    const result = await getCourseByIdReq(id);
    setCourse(result.course);
  }, []);
  return { course, setCourse, fetchCourseById };
};
```

## Async UI

- Every async view has three states: loading, error, content. Don't skip the error state.
- Don't silently swallow errors with `catch (e) {}`. Either propagate, surface, or leave a one-line comment stating why.

## State and side effects

- Form state → `react-hook-form`.
- Server state → a dedicated hook in `features/<entity>/hooks/` that wraps the fetch.
- `useEffect` only for true side effects (subscriptions, imperative DOM, syncing external systems). Don't use it to compute derived values — derive them in render.
- One owner per piece of state. Don't keep the same `expanded` flag in both parent and child.

## MUI usage

- Stick to MUI and the project theme.
- **Extract `sx` into a `sxStyles` constant** built with `createSxStylesList` (from `@/shared/helpers/styles/createSxStylesList.helper`) whenever a style block is **repeated** or **spans more than one line**. Inline `sx={{ ... }}` is reserved for genuinely trivial one-liners (e.g. `sx={{ mt: 2 }}`).
- The `sxStyles` constant lives at module scope, below the component, keyed by what each style targets (`root`, `title`, `actions`, ...). Reference it as `sx={sxStyles.title}`.
- If styles depend on props/state, wrap them in a `getSxStyles(...)` factory that returns `createSxStylesList({ ... })` and is called inside the component. Don't recompute identical objects on every render.
- Combine a base style with a caller-supplied `sx` using `combineSxStyles(sxStyles.root, sx)`.
- **Never `as any` an sx object.** Fix the type.
- **No dead style keys.** If `sxStyles.foo` isn't applied to any element, delete it.
- Get the theme via `useTheme()` inside components, or via `sx={(theme) => ({...})}`. **Do not import the static `theme` object from `@/theme`** into a component — that bypasses `ThemeProvider` and breaks overrides.
- Don't hardcode hex colours, spacing pixels, or radii in `sx`. Use theme tokens (`theme.palette.*`, `theme.spacing(n)`, `theme.shape.borderRadius`). If a colour doesn't exist in the theme — add it to the theme.
- If the same `sxStyles` block is needed in more than one component → use `styled()` or extend the theme, don't copy-paste.

```tsx
const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <Card sx={sxStyles.root}>
      <Typography sx={sxStyles.title}>{course.name}</Typography>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  root: (theme) => ({
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  }),
  title: {
    fontWeight: 600,
    mb: 1,
  },
});

export default CourseCard;
```

## Routing

- Routes are defined in `src/routes/`. Pages are imported there.
- Internal navigation: `Link` / `useNavigate` from `react-router-dom`. **Never raw `<a href>` or `<Button href>` for internal routes** — that triggers a full page reload and breaks SPA state.
- Route params: type the result explicitly: `useParams<{ courseId: string }>()`.
- Admin routes are guarded with `<RequireAuth>` / `<RequireAdmin>`.
- The router has a catch-all `<Route path="*" element={<NotFound />} />`.

## Forms

- `react-hook-form` for all forms.
- Validation: pick one library (typically zod) and stick to it across the codebase.

## TypeScript hygiene

- **Never use `any`.** If a third-party type is missing, write a local `type` declaration.
- **Never use `as` to silence the compiler** unless the cast is verified after a runtime check. `as unknown as T` is almost always wrong.
- Type the response shape of every `fetch` helper. No `Promise<any>`, no untyped `await response.json()` at a call site.

## Imports

- Use TS path aliases (`@/features/...`, `@/shared/...`) instead of long `../../../` chains.
- **Dependency direction: `pages → features → shared`. Reverse imports are forbidden.**
- A feature must not import from another feature.
- **A feature helper/hook imports the entity type from `features/<entity>/types/`, never from `pages/.../types/`.**

## Assets

Don't reference assets by URL path like `/src/assets/...`. Import them:

```ts
import courseImg from '@/assets/images/course.jpg';
```

This lets Vite hash, fingerprint, and tree-shake the assets.

## Comments

- Default to **no comments**. Names should explain intent.
- Add a comment only when the _why_ is non-obvious: a workaround, a non-trivial invariant, an external constraint.
- **Deferred-work comments start with `TODO:`.** Any comment that explains a temporary workaround, a known-suboptimal pattern, or a follow-up the codebase should eventually do should begin with `TODO:` so it shows up in search and review. Plain explanatory comments without a `TODO:` prefix are reserved for invariants that won't change.
- No commented-out code blocks committed. If it's dead, delete it.
- No `console.log` in committed code.

## Definition of done

Before opening a PR:

- `npx tsc --noEmit` is clean.
- `npm run lint` is clean.
- You opened the page in a browser and walked the golden path of the feature.

## Related memories

- [[project-overview]] — product context.
- [[frontend-architecture]] — where files live and how to name them.
