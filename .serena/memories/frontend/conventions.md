# Frontend conventions — components, hooks, types, naming (`apps/web`)

How to write the everyday building blocks. Where files go and how they're named on disk →
`mem:frontend/architecture`. API requests → `mem:frontend/data-fetching`. Forms/state/SRP →
`mem:frontend/state-forms`.

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
  them (see Single Responsibility in `mem:frontend/state-forms` for the anti-pattern).
- A data hook returning a list names the state `xxxList` (`coursesList`, `levelsList`), not `xxxData`.
- A function operating on one item is singular: `addCourseToList(course)`, not `addCoursesToTheList`.
- Use `useCallback` on any hook-returned function consumers will put in a `useEffect` dependency
  array.
- **Hook names never contain `get`/`getBy`.** `useGetCourses` is wrong; use `useCoursesList` for
  collections and `useCourseById` (or `useCourse`) for one entity.

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
  `MethodologyCardItem` over `MethodologyCardData`. (The `DTO` suffix on **API request/response**
  types is the deliberate exception — see `mem:frontend/data-fetching`.)

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
- **`fetch` must never appear in a name** — see `mem:frontend/data-fetching` for the `Req`
  convention.

## TypeScript hygiene

- **Never use `any`.** If a third-party type is missing, write a local `type`.
- **Never use `as` to silence the compiler** unless verified after a runtime check; `as unknown as T`
  is almost always wrong.
- **Type both directions of every request.** A `*Req` passes its response type as the `httpClient`
  generic (`httpClient.get<GetCourseDTO>(...)`) and types its input param with a `*BodyDTO`/
  `*ParamsDTO`. No `Promise<any>`, no untyped response. (Details: `mem:frontend/data-fetching`.)

## Imports

Import direction and path-alias rules live in `mem:frontend/architecture` (Imports & dependency
direction) — the one source of truth: `pages → features → shared`, no cross-feature imports, never
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

## Related

- `mem:frontend/index` — the map of all frontend rule files.
- `mem:frontend/architecture` — where files live, file naming, import direction.
- `mem:frontend/data-fetching` · `mem:frontend/state-forms` · `mem:frontend/styling` ·
  `mem:frontend/routing`.
