import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ACTIVITIES = [
  {
    type: 'New course published',
    name: 'Business English Advanced',
    time: '2 hours ago',
    color: 'green',
  },
  { type: 'Course updated', name: 'Grammar Essentials', time: '5 hours ago', color: 'blue' },
  { type: 'Lesson deleted', name: 'Vocabulary Builder', time: '1 day ago', color: 'orange' },
  { type: 'New student enrolled', name: 'Speaking Practice', time: '2 day ago', color: 'green' },
];

function StatisticsCard() {
  return (
    <Card
      // TODO: move styles
      sx={{
        width: { xs: 1, md: '50%' },
        border: '3px, solid grey',
        borderRadius: '10px',
        py: '20px',
        mt: '30px',
      }}
    >
      <CardContent sx={{ px: '20px', mt: '20px' }}>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', pb: '30px' }}>
          <TimelineIcon fontSize="large" sx={{ fill: 'grey' }} />
          <Typography variant="h4">Recent Activity</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '40px', mt: '13px', flexDirection: 'column' }}>
          {ACTIVITIES.map((el) => {
            return (
              <Box>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: el.color,
                      borderRadius: '100%',
                    }}
                  ></Box>
                  <Typography color="secondary" variant="body3">
                    {el.type}
                  </Typography>
                </Box>
                <Box sx={{ ml: '20px' }}>
                  <Typography variant="body1" color="primary">
                    {el.name}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', gap: '5px', alignItems: 'center', textAlign: 'center' }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ fill: '#aa9f96' }} />
                    <Typography variant="body2" color="tertiary">
                      {el.time}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: '20px' }} />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatisticsCard;
