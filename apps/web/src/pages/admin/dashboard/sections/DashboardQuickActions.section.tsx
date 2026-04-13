import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { adminQuickActions } from '../constants/adminQuickActions.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function DashboardQuickActionsSection() {
  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h5">Quick Actions</Typography>
      <Box mt={3} sx={sxStyles.actionsBox}>
        {adminQuickActions.map((item, index) => (
          <Card key={index} sx={sxStyles.action}>
            <CardActionArea sx={sxStyles.actionArea} href={item.path}>
              <CardContent sx={sxStyles.actionContent}>
                <item.Icon fontSize="large" />
                <Typography variant="body1">{item.label}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    p: 2,
    border: '2px solid',
    borderColor: 'primary.main',
    borderRadius: '10px',
    transition: 'ease-in-out 500ms',
    boxShadow: ' 5px 5px 10px 0px rgba(0, 0, 0, 0.25)',
  },
  actionsBox: {
    p: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  action: {
    width: '200px',
    border: '2px solid',
    borderColor: 'adminSecondary.main',
    borderRadius: '10px',
  },
  actionContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },
  actionArea: {
    p: 2,
    height: '100%',
    '&[data-active]': {
      backgroundColor: 'action.selected',
      '&:hover': {
        backgroundColor: 'action.selectedHover',
      },
    },
  },
});

export default DashboardQuickActionsSection;
