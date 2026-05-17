import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { ADMIN_DASHBOARD_STATISTICS } from '../constants/adminDashboardStatistics.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function AdminDashboardStatisticsSection() {
  return (
    <Box sx={sxStyles.root} mb={10}>
      {ADMIN_DASHBOARD_STATISTICS.map((stat) => (
        <Card key={stat.label} sx={sxStyles.card}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: stat.color }}>
                <stat.Icon />
              </Avatar>
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {stat.value}
            </Typography>
            <Typography color="primary" variant="body2">
              {stat.label}
            </Typography>
            <Typography color="adminSecondary" variant="body2">
              {stat.change}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    p: 2,
    width: 250,
    border: '2px solid',
    borderColor: 'adminSecondary.main',
    transition: 'ease-in-out 500ms',
    ':hover': {
      boxShadow: ' 5px 5px 10px 0px rgba(0, 0, 0, 0.25)',
    },
  },
});

export default AdminDashboardStatisticsSection;
