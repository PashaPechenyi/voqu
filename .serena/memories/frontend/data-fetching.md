# Frontend data fetching (`apps/web`)

Everything about API requests. Folder/file placement for the `api/` folder is also summarized in
`mem:frontend/architecture`; this file owns the **how**.

All API requests go through one shared layer in `@/shared/api`, then up through feature-scoped
request functions consumed by `useMutation` (directly, or via a custom hook when the logic is reused):

**`httpClient` + `useMutation` (shared) → `<verb>Req` (feature `api/`) → `useMutation` in the
component (or a custom hook, only when reused).**

## The shared layer (`@/shared/api`) — do not reinvent

- **`httpClient`** is the single fetch wrapper (a class, exported as a singleton). Methods:
  `get / post / put / patch / delete`. It prepends the API base path (`/api`), attaches the Auth0
  bearer token, serializes the body, and **never throws on an HTTP error** — every call resolves to
  `ApiResult<TData, TError>` = `{ data, status }` _or_ `{ error }`. No component or `*Req` ever calls
  the `fetch()` builtin directly.
- **`useMutation` is mandatory for every API request from the UI** — there is no other sanctioned
  way to fire a request. Never call a `*Req` (or `httpClient`, or `fetch`) directly from a component,
  an event handler, or an ad-hoc `async` function and hand-roll your own `try/catch` +
  `isLoading`/`error` `useState`. If you're managing request loading or error state by hand, you're
  doing it wrong — use `useMutation`. It returns `{ mutate, isLoading, error, reset }` and accepts
  `{ mutationFn, onInit?, onSuccess?, onError?, onFinally? }`. It catches the `{ error }` result,
  normalizes it, and exposes it as `error` (shape: `{ message, code, description, response }`).
  `mutate(...)` resolves to a discriminated result — `{ ok: true; data } | { ok: false; error }`;
  branch on `.ok`, never on the truthiness of the data (a 204/empty success resolves `data` to
  `undefined`). `mutate` is referentially stable (callbacks are read from a ref), so it's safe in
  `useEffect` deps.
- **Put request side-effects in the lifecycle callbacks, not around the `mutate()` call.** Whenever
  the work is naturally tied to a phase of the request, use `onInit` / `onSuccess` / `onError` /
  `onFinally` instead of writing imperative code before/after `await mutate(...)`:
  - `onInit` — runs before the request (and after `isLoading` flips to `true`). Optimistic UI setup,
    clearing a field, opening a spinner.
  - `onSuccess(data, ...args)` — navigation, toasts, updating local state with the response.
  - `onError(error, ...args)` — error toast, rollback.
  - `onFinally(...args)` — cleanup that must run either way (close a menu, re-enable something).

  ```ts
  // ✅ side-effects live in callbacks
  const { mutate, isLoading } = useMutation({
    mutationFn: createCourseReq,
    onSuccess: (res) => navigate(ADMIN_COURSES_UPDATE_URL(res.id)),
    onError: (err) => toast.error(err.message),
  });
  // ❌ logic hand-written around the mutate call
  const handleSubmit = async (values) => {
    setSaving(true);
    const res = await mutate(values);
    if (res.ok) navigate(ADMIN_COURSES_UPDATE_URL(res.data.id)); // belongs in onSuccess
    setSaving(false); // useMutation already owns isLoading
  };
  ```

  The escape hatch — branching on the **awaited result** at the call site — is only for control flow
  the callbacks genuinely can't express (e.g. "submit, and only if it succeeds advance a wizard step
  that lives in this component's state"). `mutate` resolves to `{ ok: true; data } | { ok: false;
error }`; **branch on `result.ok`, never on `if (data)`** — a successful empty response (204
  delete) has `data === undefined` and would read as a failure. Default to the callbacks; reach for
  the result when the next step is the caller's own flow, not a request side-effect.

- **Auth token wiring:** call `useRegisterAuthToken()` once near the top of the tree (App) so every
  request carries a fresh token. Until then, requests go out unauthenticated.
- This layer is documented in `apps/web/src/shared/api/README.md`. Don't add a competing fetch
  wrapper, axios instance, or react-query — extend `@/shared/api` instead (e.g. add a `useQuery`
  companion there when read-on-mount fetching is genuinely needed).

## Feature-scoped requests (`features/<entity>/api/`)

Every feature owns an `api/` folder with **exactly two files**:

```
features/<entity>/api/
├── <entity>.requests.ts   # all *Req functions for this feature, in one file
└── <entity>.types.ts      # request-input + response types for those requests
```

- **All `*Req` functions for a feature live in the single `<entity>.requests.ts` file** — not one
  file per request, not in `helpers/`. They are thin wrappers over `httpClient`.
- **A request function MUST end in `Req`** and is named `<verb><Something>Req`: `getCourseReq`,
  `getCoursesReq`, `createCourseReq`, `updateCourseReq`, `deleteCourseReq`, `reorderLessonsReq`.
  `fetch` must never appear in a name.
- A `*Req` is consumed only as a `useMutation` `mutationFn` — never called bare. A component may
  import it for that (inline `useMutation`); extract a custom hook only on reuse (see below).

```ts
// features/course/api/course.requests.ts
import { httpClient } from '@/shared/api';
import type { CreateCourseBodyDTO, CreateCourseDTO, GetCourseDTO } from './course.types';

export const getCourseReq = (id: string) => httpClient.get<GetCourseDTO>(`/course/${id}`);

export const createCourseReq = (body: CreateCourseBodyDTO) =>
  httpClient.post<CreateCourseDTO>('/course', body);
```

## API request/response types (`features/<entity>/api/<entity>.types.ts`)

Both directions of every request are typed in the feature's `api/<entity>.types.ts` and carry a
`DTO` suffix:

- **Response shape → `<Name>DTO`** — what the request returns: `GetCourseDTO`, `GetCoursesDTO`,
  `CreateCourseDTO`, `UpdateCourseDTO`. (`httpClient` unwraps the `{ data }` envelope, so the `DTO`
  describes the server's response body directly.)
- **Request input → `<Name>BodyDTO` / `<Name>ParamsDTO`** (or `QueryDTO`, etc.) — what the request
  function takes: `CreateCourseBodyDTO`, `UpdateCourseBodyDTO`, `ListCoursesQueryDTO`. Pick the token
  by where the input goes (`Body` for a POST/PUT/PATCH body, `Params`/`Query` for path/query input).

```ts
// features/course/api/course.types.ts
import type { Course } from '../types/course.type';

export type GetCourseDTO = { success: boolean; course: Course };
export type CreateCourseDTO = { success: boolean; id: string };

export type CreateCourseBodyDTO = { name: string; LevelId: number };
```

> Migration note: this replaces the older "one `*Req` per file in `helpers/`, response types end in
> `DTO`, request bodies end in `ReqBody`" convention. Requests now live in `api/` (one file per
> feature) and **both** request and response types carry `DTO`. `ReqBody` is retired in favour of
> `BodyDTO`.

## Calling a request: useMutation directly, custom hook only on reuse

- **Default: call `useMutation` directly in the component/section, passing the feature's `*Req` as
  `mutationFn`.** A component MAY import a `*Req` for this purpose — that's the only sanctioned place
  a `*Req` is consumed (still never call it bare, always through `useMutation`). You do **not** need a
  wrapper hook per request.

  ```tsx
  // inline — the common case
  import { useMutation } from '@/shared/api';
  import { createCourseReq } from '@/features/course/api/course.requests';

  const { mutate: createCourse, isLoading } = useMutation({
    mutationFn: createCourseReq,
    onSuccess: (res) => navigate(ADMIN_COURSES_UPDATE_URL(res.id)),
    onError: (err) => toast.error(err.message),
  });
  ```

- **Extract a custom hook only when BOTH hold:** the same request's `useMutation` is used in **more
  than one place**, _and_ that usage carries the **same non-trivial logic** (shared
  `onSuccess`/`onError`/`onInit` orchestration, cache/list updates, optimistic update + rollback,
  mapping/derivation). A single call site, or duplication that's just `mutationFn` + a one-line toast,
  does **not** justify a hook — inline it. (This reverses the old "every request gets its own hook"
  rule.) When you do extract, it lives in `features/<entity>/hooks/`, wraps `useMutation`, exposes
  `{ <verb>, isLoading, error }` plus `{ onSuccess, onError }`, and the shared logic moves inside it.

  ```ts
  // features/course/hooks/useCreateCourse.ts — justified ONLY because >1 caller
  // shares the same post-create orchestration (not shown: list refresh, etc.)
  import { useMutation } from '@/shared/api';
  import { createCourseReq } from '../api/course.requests';

  type UseCreateCourseOptions = {
    onSuccess?: (id: string) => void;
    onError?: (message: string) => void;
  };

  export const useCreateCourse = ({ onSuccess, onError }: UseCreateCourseOptions = {}) => {
    const { mutate, isLoading, error } = useMutation({
      mutationFn: createCourseReq,
      onSuccess: (res) => onSuccess?.(res.id),
      onError: (err) => onError?.(err.message),
    });
    return { createCourse: mutate, isLoading, error };
  };
  ```

- **Hook names never contain `get`/`getBy`.** `useGetCourses` is wrong; use `useCoursesList` for
  collections and `useCourseById` (or `useCourse`) for one entity.

## Fetch only when the data is needed

- An overlay — anything with an `open`-style prop (modal, dialog, drawer, menu, popover) — must not
  fetch on mount; gate the effect on `open` so the request fires only while it's open:
  ```tsx
  useEffect(() => {
    if (open) getLevels();
  }, [open, getLevels]);
  ```
  A `useEffect(() => { getX(); }, [getX])` with no `open` guard inside a closed-by-default overlay is
  a bug — it hits the network on every parent render even when the user never opens it.
- **One API call per `useEffect`** (more in `mem:frontend/state-forms` → State & side effects).

## Request/form input split

- **`*FormValues` types are for forms only — never for API requests or mutation hooks.** They carry
  the UI's nullable, draft-stage shape (`level: Level | null`). The `*BodyDTO` a request takes is
  strict — every field required and non-null.
- **Map form values to request body at the call site** via a dedicated conversion helper
  (`convertCourseFormToApiFormat` — see Data-conversion functions). The null-check for "required form
  fields" lives in that mapper, not in the `*Req` — the network layer assumes valid input.

## Data-conversion functions

A function whose job is to convert data from one shape to another (form values → request body, entity
→ request body, response → view-model, etc.) must:

- **Live in its own `*.helper.ts` file** — never inline inside a component or hook. One conversion
  per file.
- **Be named `convert{Source}To{Target}Format`.** The target token names the destination shape:
  `ApiFormat` for a request body, `FormFormat` for form values, etc.
  - `convertCourseFormToApiFormat(form): CreateCourseBodyDTO`
  - `convertLessonFormToApiFormat(form): CreateLessonBodyDTO`
- Be a pure function, named export, with an explicit return type (the target type).

## Related

- `mem:frontend/index` — the map of all frontend rule files.
- `mem:frontend/architecture` — the `api/` folder placement and file-naming table.
- `mem:frontend/conventions` — hook/type naming, TypeScript hygiene.
- `mem:frontend/state-forms` — `*FormValues`, `useEffect` rules, who may own a hook.
