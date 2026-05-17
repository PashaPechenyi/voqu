import { Fragment } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { ADMIN_DASHBOARD_RECENT_ACTIVITY } from '../constants/adminDashboardRecentActivity.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function AdminDashboardRecentActivity() {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader
        avatar={<HistoryIcon />}
        title={<Typography variant="h5">Recent Activity</Typography>}
      />
      <CardContent>
        {ADMIN_DASHBOARD_RECENT_ACTIVITY.map((activity, index) => (
          <Fragment key={index}>
            <Box sx={sxStyles.recentItem}>
              <Typography sx={sxStyles.typography} variant="body1">
                <CircleIcon sx={{ fontSize: '10px' }} color={activity.type} />
                {activity.action}
              </Typography>
              <Typography color="primary" variant="body2">
                {activity.course}
              </Typography>
              <Typography color="adminSecondary" sx={sxStyles.typography}>
                <WatchLaterOutlinedIcon color="adminSecondary" sx={{ fontSize: '15px' }} />
                {activity.time}
              </Typography>
            </Box>
            <Divider />
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

const sxStyles = createSxStylesList({
  card: {
    width: '50%',
    mr: 1,
    border: '2px solid',
    borderColor: 'adminSecondary.main',
  },
  typography: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    gap: 1,
  },
  recentItem: {
    p: 1,
  },
});

export default AdminDashboardRecentActivity;
