// TODO: This section is a trivial 2-child flex wrapper — no need for a dedicated section file. Inline its two children directly in `Dashboard.page.tsx` (or rename to `DashboardActivityRow.section.tsx` if kept).
// TODO: Inline `sx={{ display: 'flex', flexDirection: 'row' }}` — extract via `createSxStylesList` for consistency with other sections.
// TODO: No responsive behavior — the two cards sit side by side at all viewport sizes and overflow on mobile.
import { Box } from '@mui/material';

import DashboardRecentActivitySection from './DashboardRecentActivity.section';
import DashboardPopularCoursesSection from './DashboardPopularCourses.section';

function DashboardStatsActivitySection() {
  return (
    <Box mb={10} sx={{ display: 'flex', flexDirection: 'row' }}>
      <DashboardRecentActivitySection />
      <DashboardPopularCoursesSection />
    </Box>
  );
}

export default DashboardStatsActivitySection;
