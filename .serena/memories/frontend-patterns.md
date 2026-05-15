# Frontend code patterns (`apps/web`)

How to actually write the code that lives in the folders described in [[frontend-architecture]].

Formatting (quotes, semicolons, line length, trailing commas) is controlled by Prettier + ESLint. Don't argue with them — fix the config if the rule is wrong.

## Components

### Declaration

- Function components only. No class components.
- Use **arrow function assigned to a `const`** with `FC<Props>` typing.
- One component per file. File name matches the component name.

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
- **Everything else (hooks, types, helpers, constants, enums): named exports only.**
  Reason: refactor-safe, grep-friendly, IDE auto-import resolves the right symbol.
- Don't add barrel `index.ts` files inside features or pages. Barrels are acceptable only at clear public boundaries (e.g. `packages/shared`).

### Props

- Props type name: `<Component>Props`. No `T`/`I` prefix on types.
- Declared as `type`, not `interface`, unless declaration merging or `implements` is genuinely needed.
- Destructure props in the parameter list — no `props.foo` access inside the body.
- Never use `any`. Prefer `unknown` and narrow, or write a proper type.
- Optional callbacks are fine (`onClick?`); required handlers stay required.

### Children

- Type `children` as `ReactNode` (from `react`), not `JSX.Element` / `ReactElement`.

## Hooks

- Custom hook name starts with `use`. ESLint rules depend on it.
- One hook per file.
- **Named export** (no `export default` for hooks).
- Return an **object** by default. Use a tuple only when the consumer is expected to destructure positionally (like `useState`). Objects survive future additions without breaking call sites.
- Return narrow APIs — don't expose internal state setters unless the consumer needs them.

```ts
export const useCourseSearch = (query: string) => {
  // ...
  return { results, isLoading, error };
};
```

## Types

- `type` by default. Use `interface` only when you specifically need merging or `implements`.
- Type names are `PascalCase`, **no prefix** (`Course`, not `ICourse`/`TCourse`).
- Named exports.
- A single `xxx.type.ts` file may export multiple related types — split only when the file gets unwieldy.
- Prefer string literal unions over `enum` for simple value sets (`type Status = 'draft' | 'published'`). Use `enum` only when you need an iterable, namespaced set of named values — and then put it in an `.enum.ts` file.

## Helpers, constants, enums

- Pure functions in `*.helper.ts` files. Named exports. No side effects at module scope.
- Constants in `*.const.ts`. `UPPER_SNAKE_CASE` for primitive constants; `PascalCase` for constant objects/maps; lower for descriptive bags.
- Enums in `*.enum.ts`. Named export.

## Single Responsibility

A component or hook or function should do **one thing** and stay agnostic of the specific use case its caller is solving. When extra behaviour is needed for a particular call site, pass it in as an abstract callback — don't bake the caller's concerns into the implementation.

### Rules

- Don't add props or arguments that name a specific scenario (e.g. `showRedirectToCheckoutOnSuccess`, `clearFormAfterDelete`). Replace them with abstract hooks: `onSuccess`, `onError`, `onSubmit`, `onComplete`, etc.
- Branches like `if (caseA) { ... } else if (caseB) { ... }` inside a generic component/hook are a smell. The component shouldn't know `caseA` and `caseB` exist — the caller should pass a callback that does the right thing for its case.
- A hook that wraps a request exposes lifecycle callbacks (`onSuccess`, `onError`) and returns generic state (`data`, `isLoading`, `error`). It does **not** know what the caller wants to do with the result.
- A component renders UI and emits events through its props. It does not import caller-specific modules (a generic `Modal` doesn't know about courses; a `<CourseModal>` knows about courses but doesn't know whether it's used in the dashboard or the admin page).
- If you find yourself adding the third boolean flag like prop to a component, stop and split it instead — either into separate components or by replacing the flags with a single callback.

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

## State and side effects

- Local UI state → `useState`.
- Form state → `react-hook-form` (already a dependency). Don't roll your own.
- Server state → a dedicated hook in `features/<entity>/hooks/` that wraps the fetch. Keep components free of raw `fetch`/`axios` calls.
- Side effects → `useEffect` **only for true side effects** (subscriptions, imperative DOM, syncing external systems). Don't use it to compute derived values — derive them in render.
- Don't store derived data in state. If it can be computed from props/state, compute it.

## MUI usage

- Stick to MUI and the project theme. Don't introduce a second UI library.
- **Extract `sx` into a `sxStyles` constant** built with `createSxStylesList` (from `@/shared/helpers/theme.helpers`) whenever a style block is **repeated** or **spans more than one line**. Inline `sx={{ ... }}` is reserved for genuinely trivial one-liners (e.g. `sx={{ mt: 2 }}`).
- The `sxStyles` constant lives at module scope, below the component, and is keyed by what each style targets (`root`, `title`, `actions`, ...). The component then references it as `sx={sxStyles.title}`.
- If the styles depend on props/state, wrap them in a `getSxStyles(...)` factory that returns `createSxStylesList({ ... })` and is called inside the component. Don't recompute identical objects on every render.
- For combining a base style with a caller-supplied `sx`, use `combineSxStyles(sxStyles.root, sx)` rather than spreading manually.

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

- Don't hardcode hex colours, spacing pixels, or radii in `sx`. Use theme tokens (`theme.palette.*`, `theme.spacing(n)`, `theme.shape.borderRadius`). If a colour doesn't exist in the theme yet — add it to the theme, don't inline it.
- If the same `sxStyles` block is needed in more than one component → use `styled()` or extend the theme, don't copy-paste the styles.

## Styling

- No global CSS files for components. MUI's `sx` / `styled` is the styling system.
- Conditional class composition → `clsx` (already a dependency).

## Routing

- Routes are defined in `src/routes/`. Pages are imported there.
- Internal navigation: `Link` / `useNavigate` from `react-router-dom`. Never raw `<a href>` for internal routes.
- Route params: read with `useParams`, type the result explicitly: `useParams<{ courseId: string }>()`.

## Forms

- `react-hook-form` for all forms.
- Validation: pick one library (typically zod) and stick to it across the codebase. Don't mix.
- Don't write custom controlled-component plumbing on top of RHF — use `Controller` for MUI inputs that RHF can't register directly.

## Async UI

- Every async view has three states: loading, error, content. Don't skip the error state.
- Don't `alert()` on errors. Surface them in the UI (snackbar, inline message).

## TypeScript hygiene

- **Never use `any`.** If a third-party type is missing, write a local `type` declaration.
- **Never use `as` to silence the compiler** unless the cast is verified (e.g. narrowing after a runtime check). `as unknown as T` is almost always wrong.
- `===` / `!==` only. ESLint should enforce.
- No unused imports / variables — remove them.
- `unknown` is preferred over `any` for genuinely unknown values; narrow before use.

## Imports

- Use TS path aliases (`@/features/...`, `@/shared/...`) instead of long `../../../` chains.
- Dependency direction: `pages → features → shared`. Reverse imports are forbidden.
- A feature must not import from another feature. Shared code goes into `shared/` or `packages/shared`.
- Type-only imports use `import type { ... }` when the import has no runtime side effects.

## Comments

- Default to **no comments**. Names should explain intent.
- Add a comment only when the _why_ is non-obvious: a workaround, a non-trivial invariant, an external constraint.
- Don't write JSDoc for component props — the `Props` type already documents them.

## Assets

- Don't reference assets by URL path like `/src/assets/...`. Import them:
  ```ts
  import courseImg from '@/assets/images/course.jpg';
  ```
  This lets Vite hash, fingerprint, and tree-shake the assets.

## Common anti-patterns to avoid

- `any` in props, state, or returns.
- `==` / `!=`.
- `export default` for anything other than a component.
- Naming a props type `XxxType` instead of `XxxProps`.
- Hardcoded hex colours and pixel spacing in `sx`.
- Inline `sx` objects that span more than one line, or are repeated — extract via `createSxStylesList`.
- Components that call `fetch`/`axios` directly inside `useEffect` instead of going through an entity hook.
- Importing assets via string paths instead of `import`.
- Storing derived values in state with `useEffect` instead of deriving in render.

## Related memories

- [[project-overview]] — product context.
- [[frontend-architecture]] — where files live and how to name them.
