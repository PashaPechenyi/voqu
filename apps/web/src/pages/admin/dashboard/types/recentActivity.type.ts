// TODO: `type: string` should be a union `'success' | 'info' | 'warning' | 'error'` — these are MUI severity strings consumed by `<CircleIcon color={item.type as any}>`. Typing it removes the `as any` cast.
// TODO: `time: string` (e.g. `'2 hours ago'`) should be an ISO date — format the "x hours ago" string in the UI via a date helper (`date-fns/formatDistanceToNow`), not in the data.
// TODO: When wired to a real API, add an `id` field for stable React keys.
// TODO: "Recent activity" is reused across the admin domain — once two pages need it, promote this type from `pages/admin/dashboard/types/` to `features/recentActivity/types/`.
export type RecentActivity = {
  action: string;
  course: string;
  time: string;
  type: string;
};
