import { Box, Card, CardContent, Typography } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CARDS = [
  { icon: ImportContactsIcon, number: 24, description: 'Total Courses', changes: '+3 this month' },
  { icon: GroupIcon, number: 1.247, description: 'Active Students', changes: '+128 this week' },
  {
    icon: TrendingUpIcon,
    number: '68%',
    description: 'Completion Rate',
    changes: '+5% from last month',
  },
  {
    icon: WorkspacePremiumIcon,
    number: 342,
    description: 'Certificates Issued',
    changes: '+42 this month',
  },
];
function SummarySection() {
  return (
    <Box>
      <Box>
        <Typography
          variant="h2"
          sx={{
            color: '#37123c',
            textAlign: 'start',
            mb: '20px',
            //fontSize: { xs: '45px', md: '60px' },
            pt:"40px",
            typography: { xs: 'h3', sm: 'h2' },
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#71677D', textAlign: 'start', mb: '20px' }}>
          Welcome back! Here's what's happening with Voqu today.
        </Typography>
      </Box>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {CARDS.map((el) => {
          const Icon = el.icon;
          return (
            <Card
              sx={{
                width: { xs: 1, sm: '23%' },

                p: '15px 0  0 0 ',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                justifyContent: 'start',
                alignItems: 'start',
                border: '2px solid grey',
              }}
            >
              <Box
                sx={{
                  width: '55px',
                  height: '55px',
                  borderRadius: '100%',
                  border: '2.5px solid grey',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  m: '0  0 20px 15px ',
                }}
              >
                <Icon sx={{ fill: 'grey' }} />
              </Box>

              <CardContent>
                <Typography gutterBottom variant="h5" color="secondary">
                  {el.number}
                </Typography>
                <Typography variant="body1" color="primary">
                  {el.description}
                </Typography>
                <Typography variant="body2" color="tertiary">
                  {el.changes}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default SummarySection;
