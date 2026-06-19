# Frontend forms, state & single responsibility (`apps/web`)

How to build forms, manage state and side effects, and decide what a component/hook is allowed to
own. API request mechanics → `mem:frontend/data-fetching`.

## Forms

- `react-hook-form` for all forms. Validation: pick one library (typically zod) and stick to it.

## Async UI

- Every async view has three states: loading, error, content. Don't skip the error state.
- Don't silently swallow errors with `catch (e) {}`. Propagate, surface, or leave a one-line comment
  stating why.

## State & side effects

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

## Related

- `mem:frontend/index` — the map of all frontend rule files.
- `mem:frontend/data-fetching` — request hooks, `*FormValues` vs `*BodyDTO`, fetch-on-open.
- `mem:frontend/conventions` — event/callback naming (`on*` / `handle*`), hook API shape.
- `mem:frontend/architecture` — where sections vs components vs feature components live.
