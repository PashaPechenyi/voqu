// TODO: Mock `stats` data displayed as if real. Wire to a real metrics endpoint.
// TODO: `<Card key={index}>` — use `item.label` as key, never the array index.
// TODO: `aria-label=""` on `<Avatar>` is empty — either remove or provide a meaningful description.
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { stats } from '../constants/dashboardStatistics.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function DashboardStatisticsSection() {
  return (
    <Box sx={sxStyles.root} mb={10}>
      {stats.map((item, index) => (
        <Card key={index} sx={sxStyles.card}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: item.color }} aria-label="">
                <item.Icon />
              </Avatar>
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.value}
            </Typography>
            <Typography color={'primary'} variant="body2">
              {item.label}
            </Typography>
            <Typography color={'adminSecondary'} variant="body2">
              {item.change}
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

export default DashboardStatisticsSection;
