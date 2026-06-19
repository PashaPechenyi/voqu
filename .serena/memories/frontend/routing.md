# Frontend routing & URL constants (`apps/web`)

- Routes are defined in `src/routes/`; pages are imported there. URL constants come from
  `urls.const.ts` (see below) — never hardcode an internal URL string in a component or nav item.
- Internal navigation uses `Link` / `useNavigate` from `react-router-dom`. **Never raw `<a href>` or
  `<Button href>` for internal routes** — that triggers a full page reload and breaks SPA state.
- Type route params explicitly: `useParams<{ courseId: string }>()`.
- Admin routes are guarded with `<RequireAuth>` / `<RequireAdmin>`. The router has a catch-all
  `<Route path="*" element={<NotFound />} />`.

## URL constants (`shared/constants/urls.const.ts`)

- **Static URL** → a `string`: `export const ADMIN_COURSES_URL = '/admin/courses';`
- **URL with a dynamic segment** → a function:
  ```ts
  export const ADMIN_COURSES_UPDATE_URL = (id: string) => `${ADMIN_COURSES_URL}/update/${id}`;
  ```
  As a router pattern, pass the placeholder: `ADMIN_COURSES_UPDATE_URL(':courseId')`. When navigating,
  pass the real id: `ADMIN_COURSES_UPDATE_URL(course.id)`.
- Every URL in nav/footer/quick-actions must have a matching `<Route>` in the router.

## Related

- `mem:frontend/index` — the map of all frontend rule files.
- `mem:frontend/conventions` — the `update`-not-`edit` vocabulary rule that route paths follow.
