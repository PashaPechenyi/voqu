# Frontend styling — MUI & sx (`apps/web`)

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

## Related

- `mem:frontend/index` — the map of all frontend rule files.
- `mem:frontend/conventions` — `*.const.ts` rules (where `sxStyles` constants follow camelCase).
