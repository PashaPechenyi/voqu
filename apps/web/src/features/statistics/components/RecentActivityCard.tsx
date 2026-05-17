import { FC, Fragment } from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { MOCK_ACTIVITIES } from '../constants/mockActivities.const';
import { useResolveColor } from '@/shared/hooks/useResolveColor';

const RecentActivityCard: FC = () => {
  const { resolveColorFromPalette } = useResolveColor();

  return (
    <Card sx={sxStyles.card}>
      <CardContent sx={sxStyles.cardContent}>
        <Box sx={sxStyles.title}>
          <TimelineIcon fontSize="large" sx={sxStyles.titleIcon} />
          <Typography variant="h4">Recent Activity</Typography>
        </Box>

        <Box sx={sxStyles.activitiesCon}>
          {MOCK_ACTIVITIES.map((activity) => (
            <Fragment key={activity.id}>
              <Box>
                <Box sx={sxStyles.activityRow}>
                  <Box
                    sx={[
                      sxStyles.dot,
                      { backgroundColor: resolveColorFromPalette(activity.color) },
                    ]}
                  />
                  <Typography color="secondary" variant="body3">
                    {activity.label}
                  </Typography>
                </Box>
                <Box sx={sxStyles.activityBody}>
                  <Typography variant="body1" color="primary">
                    {activity.name}
                  </Typography>
                  <Box sx={sxStyles.timeBox}>
                    <AccessTimeIcon fontSize="small" sx={sxStyles.timeIcon} />
                    <Typography variant="body2" color="tertiary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={sxStyles.itemDivider} />
              </Box>
            </Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: (theme) => ({
    width: { xs: 1, md: '50%' },
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    py: '20px',
    mt: '30px',
  }),
  cardContent: { px: '20px', mt: '20px' },
  title: { display: 'flex', gap: '10px', alignItems: 'center', pb: '30px' },
  titleIcon: (theme) => ({ fill: theme.palette.divider }),
  timeBox: { display: 'flex', gap: '5px', alignItems: 'center', textAlign: 'center' },
  timeIcon: (theme) => ({ fill: theme.palette.tertiary.main }),
  activitiesCon: { display: 'flex', gap: '40px', mt: '13px', flexDirection: 'column' },
  activityRow: { display: 'flex', gap: '10px', alignItems: 'center' },
  activityBody: { ml: '20px' },
  dot: { width: '10px', height: '10px', borderRadius: '100%' },
  itemDivider: { mt: '20px' },
});

export default RecentActivityCard;
