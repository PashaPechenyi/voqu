import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import AdminDashboardRecentActivity from '../components/AdminDashboardRecentActivity';
import AdminDashboardPopularCourses from '../components/AdminDashboardPopularCourses';

function AdminDashboardStatsActivitySection() {
  return (
    <Box mb={10} sx={sxStyles.root}>
      <AdminDashboardRecentActivity />
      <AdminDashboardPopularCourses />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default AdminDashboardStatsActivitySection;
