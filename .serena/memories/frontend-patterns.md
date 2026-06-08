# Frontend code patterns (`apps/web`)

**How to write the code** that lives in the folders described in [[frontend-architecture]] (which
owns file placement, naming, and import direction).

Formatting (quotes, semicolons, line length, trailing commas) is controlled by Prettier + ESLint —
don't argue with them; fix the config if a rule is wrong.

## TL;DR

- **Components:** arrow `const` typed `FC<Props>`, `export default`; everything else is a named
  export. Props type is `<Component>Props` (a `type`). No `any`.
- **Events:** emitted props start with `on` (`onClose`, `onSelectAnswer`); local handlers start with
  `handle`. Success callbacks are `on<Verb>Success` (`onCreateSuccess`/`onUpdateSuccess`/
  `onDeleteSuccess`); hooks keep generic `onSuccess`/`onError`.
- **Vocabulary:** one word per concept — **update** (not edit), **create** (not add), **delete** (not
  remove), and **never `fetch` in a name**.
- **Data:** `component → hook → helper`. Only the helper calls `fetch()` and it ends in `Req`; the
  hook's fetcher is `getX` (no `Req`); a refresh callback is `reloadX`. Response types end with `DTO`
  (`GetCoursesDTO`). Overlays fetch only while `open` — never on mount. One API call per `useEffect`
  (split independent fetches). Data-shape converters are `convert{X}To{Y}Format`, each in its own file.
- **Single responsibility:** a component renders UI and emits events; it doesn't own caller logic or
  branch on a caller-context flag. Cards/items emit events; modals/sections may own a hook.
- **MUI:** multi-line/repeated `sx` → `sxStyles` via `createSxStylesList`; theme tokens, no hardcoded
  hex/px; never import the static `theme` into a component.

---

## Components

### Declaration & exports

Arrow function assigned to a `const`, typed with `FC<Props>`. Components use `export default` (one
component per file); **everything else — hooks, types, helpers, constants, enums — is a named
export**. No barrel `index.ts` inside features/pages (barrels are fine only at public boundaries like
`packages/shared`).

```tsx
import { FC } from 'react';

type CourseCardProps = {
  course: Course;
  onUpdateSuccess?: (id: string) => void;
};

const CourseCard: FC<CourseCardProps> = ({ course, onUpdateSuccess }) => {
  return <Card>...</Card>;
};

export default CourseCard;
```

### Props

- Props type name: `<Component>Props`. Declared as `type`, not `interface`, unless declaration
  merging or `implements` is genuinely needed. Never use `any`.
- **Pass entities under their domain name, not `data`/`info`:** `course: Course`, not `data: Course`.
- **The `Data` suffix is a smell on values too:** a variable holding a `Word` is `activeWord`, not
  `activeWordData`. The type name already says what the value is.

### Event-handler & callback naming

- **Emitted props start with `on`** (`onSelectAnswer`, `onCreateSuccess`); **local handler functions
  start with `handle`** (`handleSelectAnswer`).
- **A close prop is `onClose`, never `handleClose`.** `handleClose` is the _caller's_ local function;
  the prop it's passed to is `onClose`. A parent writes `const handleClose = …` and passes
  `onClose={handleClose}`. (Same for every `handle*` ↔ `on*` pair.)
- **Component success callbacks are `on<Verb>Success`** — present tense, unambiguous:
  `onCreateSuccess`, `onUpdateSuccess`, `onDeleteSuccess`. Not past tense (`onCreated`/`onUpdated`
  read as state), not a bare `onSuccess` (that's the hook's vocabulary, not a component's domain
  event); `onCreate` alone is ambiguous with "perform the create", so the `Success` suffix is
  required. The component maps its semantic prop onto the hook arg:
  `useCreateCourse({ onSuccess: onCreateSuccess })`.

## Hooks

- **Named export** (no `export default`). Return an **object** by default; use a tuple only when
  consumers destructure positionally (like `useState`).
- **Return narrow APIs — don't expose internal `useState` setters** unless callers genuinely need
  them (see Single Responsibility for the anti-pattern).
- A data hook returning a list names the state `xxxList` (`coursesList`, `levelsList`), not `xxxData`.
- A function operating on one item is singular: `addCourseToList(course)`, not `addCoursesToTheList`.
- Use `useCallback` on any hook-returned function consumers will put in a `useEffect` dependency
  array.

```ts
export const useCourseSearch = (query: string) => {
  // ...
  return { results, isLoading, error };
};
```

## Types

- `type` by default. Use `interface` only when you need merging or `implements`.
- Prefer string-literal unions over `enum` for simple value sets (`type Status = 'draft' |
'published'`). Use `enum` only when you need an iterable, namespaced set — and put it in an
  `.enum.ts` file. **An enum and a literal union for the same set is a bug** — pick one source.
- **One canonical entity type per entity.** `Course`, `Lesson`, `Level` live in
  `features/<entity>/types/<entity>.type.ts`. No duplicate `Course` types in `pages/...`.
- Drop generic noise from type names — `Data`/`Info` suffixes are red flags. Prefer
  `MethodologyCardItem` over `MethodologyCardData`.

## Helpers, constants, enums

- Pure functions in `*.helper.ts`. Named exports. No side effects at module scope.
- Constants in `*.const.ts`. `UPPER_SNAKE_CASE` for static-data/primitive constants; runtime
  singletons (configured `theme`, local `sxStyles`) stay camelCase.
- **Group related primitive constants into one `UPPER_SNAKE_CASE` object** instead of exporting them
  flat, named by the **scope it covers**:
  - `COLORS = { secondary: '#37123c', tertiary: '#aa9f96' }`, not separate `SECONDARY_COLOR`/…
  - `FORM_VALIDATION_ERRORS = { requiredField: '...' }`, not a flat `REQUIRED_FIELD_MESSAGE`.
- Mock data is named `MOCK_*` (`MOCK_POPULAR_COURSES`).
- **File suffixes are singular** (`.type.ts`, `.const.ts`, `.enum.ts`, `.helper.ts`); never plural.
- Renaming a `const`'s symbol never changes the file name — `LESSON_SEGMENT_COLORS` lives in
  `lessonSegmentColors.const.ts`.

## Naming: vocabulary consistency (one word per concept)

The same process/thing must always be named the same word, so the codebase stays greppable.

- **`update`, never "edit"** — the modify mutation: `useUpdateCourse`, `updateCourseReq`,
  `UpdateCourseModal`, route `/update/:id`, `ADMIN_COURSES_UPDATE_URL`, modal state key `'update'`,
  label "Update Course". _Not this concept (leave alone):_ MUI `EditOutlinedIcon`, the `updatedAt`
  field, prose copy.
- **`create`, never "add"** — the create mutation/affordance: `CreateCourseModal`, `useCreateCourse`,
  label "Create Course". _Exception:_ `addCourseToList`/`addLessonToList` are local _list_ operations
  (insert into an array) — "add" is correct there; they don't create anything.
- **`delete`, never "remove"** — the delete mutation.
- **`fetch` must never appear in a name** — see Data fetching → Naming for the get / `Req` / reload
  split.

When renaming for consistency, update **every** call site (and the file name if it's named after the
symbol). Renaming a route _path string_ (e.g. `/edit/` → `/update/`) is a user-facing change, not a
pure rename — old links break; flag it.

## Data fetching

Pattern: **page/component → hook → helper → `fetch`**.

- The component never calls `fetch` directly.
- The **helper** (`features/<entity>/helpers/`) holds the URL, declares the response type, calls
  `fetch`, throws on `!response.ok`, returns a typed value. **The response type is named with a `DTO`
  suffix** and declared (not inline) — see Request payload types.
- The **hook** (`features/<entity>/hooks/`) owns state (`data`, `setData`, `isLoading`, `error`) and
  exposes a stable `getX` (wrapped in `useCallback`). It accepts `onSuccess`/`onError` and stays
  generic about the caller. Mutation hooks pass the entity through the callback:
  `onSuccess?: (updatedCourse: Course) => void`.
- **Fetch only when the data is actually needed.** An overlay — anything with an `open`-style prop
  (modal, dialog, drawer, menu, popover) — must not fetch on mount; gate the effect on `open` so the
  request fires only while it's open:
  ```tsx
  useEffect(() => {
    if (open) getLevels();
  }, [open, getLevels]);
  ```
  A `useEffect(() => { getX(); }, [getX])` with no `open` guard inside a closed-by-default overlay is
  a bug — it hits the network on every parent render even when the user never opens it.

### Naming

- **`fetch` must never appear in a name** (reserved for the `fetch()` builtin).
- **A function that calls `fetch()` directly MUST end in `Req`** and lives in
  `features/<entity>/helpers/`, one per network call, named `<verb><Entity>Req`: `getCoursesReq`,
  `getCourseByIdReq`, `createCourseReq`, `updateCourseReq`, `deleteCourseReq`, `reorderLessonReq`.
- **A function that does NOT call `fetch()` directly** (the hook's fetcher that calls a `*Req` helper)
  uses a plain `get` prefix, **no `Req`**: `getCourses`, `getCourseById`, `getLessons`, `getLevels`.
  So the hook returns `getCourses`, and inside it calls `getCoursesReq()`.
- **A refresh callback is `reload<Entity>`** — never `refetch*`: `reloadCourses`, `reloadLessons`.
- **Hook names never contain `get`/`getBy`.** `useGetCourses` is wrong; use `useCoursesList` for
  collections and `useCourseById` (or `useCourse`) for one entity.

### Per-call hooks

- **Every API helper has its own custom hook.** A component never imports a `*Req` helper directly.
  Mutations get a dedicated hook (`useCreateCourse`, `useUpdateCourse`, `useDeleteCourse`,
  `useReorderLessons`) that wraps a single helper and exposes `{ <verb>, isLoading, error }` plus
  `{ onSuccess, onError }`.

### Request payload & response types

- **A type describing an API response payload ends with `DTO`** and is a named, declared type (never
  an inline `Promise<{ … }>`). Name it `<Verb><Entity>DTO` after the helper:
  `GetCoursesDTO`, `GetCourseByIdDTO`, `CreateCourseDTO`, `UpdateCourseDTO`, `GetLessonsDTO`,
  `CreateLessonDTO`, `ReorderLessonDTO`, `GetLevelsDTO`. (Not `…Response` — `DTO` already says it's
  the response shape.) Declared in the helper file next to its `*Req` function.
- **`*FormValues` types are for forms only — never for API helpers or mutation hooks.** They carry
  the UI's nullable, draft-stage shape (`level: Level | null`). Helpers/hooks take a strict request
  body (`CreateCourseReqBody`, `UpdateCourseReqBody`) where every field is required and non-null.
  (Request-body types keep the `ReqBody` suffix — `DTO` is for _response_ shapes only.)
- **Map form values to request body at the call site** via a dedicated conversion helper
  (`convertCourseFormToApiFormat` — see Data-conversion functions below). The null-check for "required
  form fields" lives in that mapper, not in the API helper — the network layer assumes valid input.

### Data-conversion functions

A function whose job is to convert data from one shape to another (form values → API body, entity →
API body, response → view-model, etc.) must:

- **Live in its own `*.helper.ts` file** — never inline inside a component or hook. One conversion
  per file.
- **Be named `convert{Source}To{Target}Format`.** The target token names the destination shape:
  `ApiFormat` for an API request body, `FormFormat` for form values, etc.
  - `convertCourseFormToApiFormat(form): CourseReqBody` (was `courseFormToReqBody`)
  - `convertLessonFormToApiFormat(form): LessonReqBody` (was `lessonFormToReqBody`)
  - `convertCourseToApiFormat(course): CourseReqBody` (was an inline `fromCourseToReqBody`)
- Be a pure function, named export, with an explicit return type (the target type).

```ts
// helpers/getCourseByIdReq.helper.ts  — calls fetch() → ends in Req; response type ends in DTO
export type GetCourseByIdDTO = { course: Course };

export const getCourseByIdReq = async (id: Course['id']): Promise<GetCourseByIdDTO> => {
  const response = await fetch(`/api/course/${id}`);
  if (!response.ok) throw new Error('Failed to fetch course');
  return response.json();
};
```

```ts
// hooks/useCourseById.ts  — getCourseById does NOT call fetch() directly → no Req
export const useCourseById = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const getCourseById = useCallback(async (id: Course['id']) => {
    const result = await getCourseByIdReq(id);
    setCourse(result.course);
  }, []);
  return { course, setCourse, getCourseById };
};
```

## Forms, async UI & state

### Forms

- `react-hook-form` for all forms. Validation: pick one library (typically zod) and stick to it.

### Async UI

- Every async view has three states: loading, error, content. Don't skip the error state.
- Don't silently swallow errors with `catch (e) {}`. Propagate, surface, or leave a one-line comment
  stating why.

### State & side effects

- Form state → `react-hook-form`. Server state → a dedicated `features/<entity>/hooks/` hook.
- `useEffect` only for true side effects (subscriptions, imperative DOM, syncing external systems).
  Don't use it to compute derived values — derive them in render.
- **One API call per `useEffect`.** Each independent fetch gets its own effect with its own
  dependencies — don't batch unrelated requests into one effect. The only exception is calls that are
  part of the _same process_ (one depends on another's result, or they must run together as a unit).
  ```tsx
  // ✅ independent fetches → separate effects
  useEffect(() => { if (courseId) getCourseDetails(courseId); }, [courseId, getCourseDetails]);
  useEffect(() => { if (courseId) getLessonsList(courseId); }, [courseId, getLessonsList]);
  // ❌ unrelated fetches batched in one effect
  useEffect(() => { getCourseDetails(courseId); getLessonsList(courseId); }, [courseId, ...]);
  ```
- One owner per piece of state. Don't keep the same `expanded` flag in both parent and child.

## Single Responsibility

A component, hook, or function does **one thing** and stays agnostic of the specific use case its
caller is solving. When extra behaviour is needed for a call site, pass it in as an abstract callback
(`onSuccess`, `onSubmit`, …) — don't bake the caller's concerns into the implementation.

### Rules

- **Don't add props/arguments that name a specific scenario** (`showRedirectToCheckoutOnSuccess`,
  `clearFormAfterDelete`). Replace them with abstract callbacks (`onSuccess`, `onError`, `onSubmit`).
- **No scenario branches inside generic code.** `if (caseA) {…} else if (caseB) {…}` means the
  component knows cases it shouldn't — the caller should pass a callback that does the right thing.
- **A reusable form/component must never branch its validation/business rules on a caller-context
  flag.** We hit this: `CourseForm` took `update?: boolean` and did `requiredRule = update ? {} :
{required:…}`, disabling validation just because the caller was the update screen — wrong twice:
  the form shouldn't know where it's used, and the condition shouldn't exist (required fields are
  required either way). If create/update genuinely differ, pass the rules in as a prop.
- **Hooks expose a narrow API; never drill a raw `useState` setter through props.** Passing
  `setLessonsList: Dispatch<SetStateAction<…>>` down is a leak — the hook should offer an
  intent-named method (`reorderLessonsLocally(orderedList)`) and own the optimistic update +
  rollback-on-error internally.
- A request-wrapping hook returns generic state (`data`, `isLoading`, `error`) and accepts
  `onSuccess`/`onError`. It does **not** accept `redirectAfter`, `showToast`, or anything
  case-specific.
- If you're adding a third boolean flag to a component, stop and split it.

### Container vs presentational (who may own a hook)

- **Presentational, entity-bound UI — cards & list items (`CourseCard`, `LessonItem`) — must not own
  mutations or network calls.** They render and emit events (`onToggleStatus`, `onRequestDelete`,
  `onUpdateSuccess`); they must not call `useUpdateCourse`/`reloadX` or embed a delete-modal + reload.
  Threading `courseId`/`reloadX` through every item is the tell-tale sign the responsibility is
  misplaced — lift it to the parent section.
- **Containers — entity modals & page sections (`CreateCourseModal`, `CourseLessonsArea.section`) —
  _may_ own a mutation/data hook**, orchestrate a form, and expose lifecycle callbacks. That's their
  role. The line: a _card/item_ emits events; a _modal/section_ may own the hook.

### Example

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

// ✅ component emits the event; caller decides what to do
type DeleteCourseButtonProps = {
  courseId: string;
  onDeleteSuccess?: () => void;
};

const DeleteCourseButton: FC<DeleteCourseButtonProps> = ({ courseId, onDeleteSuccess }) => {
  const handleClick = async () => {
    await deleteCourse(courseId);
    onDeleteSuccess?.();
  };
  return <Button onClick={handleClick}>Delete</Button>;
};

// caller decides:
<DeleteCourseButton courseId={id} onDeleteSuccess={() => navigate('/courses')} />;
```

## MUI

- Stick to MUI and the project theme.
- **Extract `sx` into a `sxStyles` constant** built with `createSxStylesList` (from
  `@/shared/helpers/styles/createSxStylesList.helper`) whenever a style block is **repeated** or
  **spans more than one line**. Inline `sx={{ … }}` is reserved for trivial one-liners (`sx={{ mt: 2 }}`).
- `sxStyles` lives at module scope, below the component, keyed by what each style targets (`root`,
  `title`, `actions`, …). Reference as `sx={sxStyles.title}`.
- Styles that depend on props/state → a `getSxStyles(...)` factory returning `createSxStylesList({…})`,
  called inside the component. Don't recompute identical objects every render.
- Combine a base style with a caller `sx` via `combineSxStyles(sxStyles.root, sx)`.
- **Never `as any` an sx object** — fix the type. **No dead style keys** — delete unused `sxStyles.*`.
- Get the theme via `useTheme()` or `sx={(theme) => ({…})}`. **Do not import the static `theme` from
  `@/theme`** into a component — that bypasses `ThemeProvider`.
- Don't hardcode hex colours, spacing px, or radii — use theme tokens (`theme.palette.*`,
  `theme.spacing(n)`, `theme.shape.borderRadius`). If a colour is missing, add it to the theme.
- If the same `sxStyles` block is needed in more than one component → `styled()` or extend the theme;
  don't copy-paste.

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
  title: { fontWeight: 600, mb: 1 },
});

export default CourseCard;
```

## Routing

- Routes are defined in `src/routes/`; pages are imported there. URL constants come from
  `urls.const.ts` (see below) — never hardcode an internal URL string in a component or nav item.
- Internal navigation uses `Link` / `useNavigate` from `react-router-dom`. **Never raw `<a href>` or
  `<Button href>` for internal routes** — that triggers a full page reload and breaks SPA state.
- Type route params explicitly: `useParams<{ courseId: string }>()`.
- Admin routes are guarded with `<RequireAuth>` / `<RequireAdmin>`. The router has a catch-all
  `<Route path="*" element={<NotFound />} />`.

### URL constants (`shared/constants/urls.const.ts`)

- **Static URL** → a `string`: `export const ADMIN_COURSES_URL = '/admin/courses';`
- **URL with a dynamic segment** → a function:
  ```ts
  export const ADMIN_COURSES_UPDATE_URL = (id: string) => `${ADMIN_COURSES_URL}/update/${id}`;
  ```
  As a router pattern, pass the placeholder: `ADMIN_COURSES_UPDATE_URL(':courseId')`. When navigating,
  pass the real id: `ADMIN_COURSES_UPDATE_URL(course.id)`.
- Every URL in nav/footer/quick-actions must have a matching `<Route>` in the router.

## TypeScript hygiene

- **Never use `any`.** If a third-party type is missing, write a local `type`.
- **Never use `as` to silence the compiler** unless verified after a runtime check; `as unknown as T`
  is almost always wrong.
- Type the response shape of every network (`*Req`) helper — no `Promise<any>`, no untyped
  `await response.json()` at a call site.

## Imports

Import direction and path-alias rules live in [[frontend-architecture]] (`Imports & dependency
direction`) — the one source of truth: `pages → features → shared`, no cross-feature imports, never
import from `apps/api`, prefer `@/...` aliases.

## Assets

Import assets so Vite can hash/fingerprint/tree-shake them — don't reference by URL path:

```ts
import courseImg from '@/assets/images/course.jpg'; // not '/src/assets/...'
```

## Comments

- Default to **no comments**. Names should explain intent. Add one only when the _why_ is non-obvious
  (a workaround, a non-trivial invariant, an external constraint).
- **Deferred-work comments start with `TODO:`** so they're greppable. Plain explanatory comments
  (no `TODO:`) are reserved for invariants that won't change.
- No commented-out code committed (delete it). No `console.log` in committed code.

## Definition of done

Before opening a PR:

- `npx tsc --noEmit` is clean.
- `npm run lint` is clean.
- You opened the page in a browser and walked the golden path of the feature.

## Related memories

- [[project-overview]] — product context.
- [[frontend-architecture]] — where files live, naming, and import direction.
