import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { createSxStylesList } from '@/theme/helpers';
import HistoryIcon from '@mui/icons-material/History';
import { recentActivity } from '@/consts/adminConsts/dbRecentActivity';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CircleIcon from '@mui/icons-material/Circle';

export default function DBRecentActivitySection() {
  return (
    <Card sx={sxStyles.card}>
      <CardHeader
        avatar={<HistoryIcon />}
        title={<Typography variant="h5">Recent Activity</Typography>}
      />
      <CardContent>
        {recentActivity.map((item, index) => (
          <>
            <Box sx={sxStyles.recentItem} key={index}>
              <Typography sx={sxStyles.typography} variant="body1">
                <CircleIcon sx={{ fontSize: '10px' }} color={item.type as any} />
                {item.action}
              </Typography>
              <Typography color={'primary'} variant="body2">
                {item.course}
              </Typography>
              <Typography color={'adminSecondary'} sx={sxStyles.typography}>
                <WatchLaterOutlinedIcon color={'adminSecondary'} sx={{ fontSize: '15px' }} />
                {item.time}
              </Typography>
            </Box>
            <Divider />
          </>
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
