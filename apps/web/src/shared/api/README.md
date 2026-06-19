# API request pattern

All frontend API calls go through two pieces:

- **`httpClient`** — the single fetch wrapper. `get/post/put/patch/delete`. It
  attaches the Auth0 token, serializes the body, and **never throws** on HTTP
  errors — it resolves to `{ data, status }` or `{ error }`.
- **`useMutation`** — the hook components use. It runs a request, tracks
  `isLoading` / `error`, and runs `onSuccess` / `onError` callbacks.

Import everything from `@/shared/api`.

## One-time setup

Auth0 exposes the access token only inside React, so register it once near the
top of the tree:

```tsx
// App.tsx
import { useRegisterAuthToken } from '@/shared/api';

function App() {
  useRegisterAuthToken(); // every httpClient call now carries the token
  return <Routes />;
}
```

Until this runs (or for unauthenticated calls) requests simply go out without an
`Authorization` header.

## Defining a request

Keep request functions next to the feature they belong to
(`features/<entity>/api.ts`). They're thin wrappers around `httpClient`:

```ts
// features/courses/api.ts
import { httpClient } from '@/shared/api';
import type { Course, CreateCourseInput } from './types';

export const createCourse = (input: CreateCourseInput) =>
  httpClient.post<Course>('/courses', input);

export const deleteCourse = (id: string) => httpClient.delete<void>(`/courses/${id}`);
```

## Using it in a component

```tsx
import { useMutation } from '@/shared/api';
import { createCourse } from '../api';

function CreateCourseForm() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: createCourse,
    onSuccess: (course) => navigate(`/courses/${course.id}`),
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <Button disabled={isLoading} onClick={() => mutate(values)}>
        {isLoading ? 'Saving…' : 'Create'}
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
    </>
  );
}
```

## Lifecycle callbacks

`useMutation` accepts four optional callbacks. **Put request side-effects here
rather than writing imperative code around the `mutate()` call** — that's the
whole point of the hook.

| Callback                   | When it runs                                   | Typical use                         |
| -------------------------- | ---------------------------------------------- | ----------------------------------- |
| `onInit(...args)`          | before the request (after `isLoading` is true) | optimistic setup, clear a field     |
| `onSuccess(data, ...args)` | request succeeded                              | navigate, toast, store the response |
| `onError(error, ...args)`  | request failed (normalized error)              | error toast, rollback               |
| `onFinally(...args)`       | always, after success or failure               | close a menu, re-enable something   |

All four are awaited and receive the same args you passed to `mutate(...)`.

`mutate(...)` resolves to a **discriminated result** —
`{ ok: true; data } | { ok: false; error }`. Branch on `.ok`, never on the
truthiness of the data (a successful request can resolve to `undefined`, e.g. a
204 delete, so `if (data)` would treat a valid success as a failure). Prefer the
callbacks above; only branch on the return value when the next step is the
caller's own control flow (e.g. advancing a local wizard step), not a request
side-effect:

```ts
const result = await mutate(values);
if (result.ok) {
  // result.data is the response; advance some caller-owned flow
}
```

## The error object

Both `error` (state) and the `onError` callback receive a normalized shape:

```ts
{
  message: string; // safe to show the user
  code: number | null; // HTTP status when available
  description: string | null;
  response: TError | null; // raw server error body, for field-level detail
}
```

## Typing errors

Pass a second type argument when the server returns a structured error body:

```ts
type ValidationError = { fields: Record<string, string> };

const { mutate, error } = useMutation<Course, [CreateCourseInput], ValidationError>({
  mutationFn: createCourse,
});

// error?.response?.fields is typed
```

## Why no `useQuery`?

This pattern covers mutations (create/update/delete and any user-triggered
request). Add a `useQuery` companion when read-on-mount data fetching becomes a
real need — keep it in this folder and follow the same `httpClient` +
normalized-error conventions.
