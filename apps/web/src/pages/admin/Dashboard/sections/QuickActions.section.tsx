import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Button, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/theme.helpers';

// FIXME: add links to pages later
const CARDS = [
  { icon: ImportContactsIcon, description: 'Manage Courses' },
  { icon: GroupIcon, description: 'Manage users' },
  { icon: TrendingUpIcon, description: 'View Reports' },
  { icon: TimelineIcon, description: 'Settings' },
];

function QuickActions() {
  return (
    <Box sx={sxStyles.container}>
      <Typography variant="h5" color="secondary">
        Quick Actions
      </Typography>
      <Box sx={sxStyles.cards}>
        {CARDS.map((el) => {
          const Icon = el.icon;
          return (
            <Button sx={sxStyles.buttonCard}>
              <Icon fontSize="large" sx={{ fill: 'grey' }} />

              <Box sx={{ p: '30px' }}>
                <Typography gutterBottom variant="body1" color="secondary">
                  {el.description}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
const sxStyles = createSxStylesList({
  container: {
    width: 1,
    border: '3px solid grey',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    p: '30px',
    gap: '20px',
    my: '40px',
    backgroundColor: 'rgba(164, 148, 137, 0.41)',
  },
  cards: {
    width: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '10px',
    m: 0,
  },
  buttonCard: {
    width: { xs: 1, sm: '23%' },
    textAlign: 'center',
    p: '15px 0  0 0 ',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid grey',
    backgroundColor: 'white',
  },
});

export default QuickActions;
