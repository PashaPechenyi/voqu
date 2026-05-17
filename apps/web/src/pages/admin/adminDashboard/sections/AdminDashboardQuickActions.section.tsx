import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { ADMIN_QUICK_ACTIONS } from '../constants/adminQuickActions.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function AdminDashboardQuickActionsSection() {
  return (
    <Box sx={sxStyles.root}>
      <Typography variant="h5">Quick Actions</Typography>
      <Box mt={3} sx={sxStyles.actionsBox}>
        {ADMIN_QUICK_ACTIONS.map((action) => (
          <Card key={action.path} sx={sxStyles.action}>
            <CardActionArea sx={sxStyles.actionArea} href={action.path}>
              <CardContent sx={sxStyles.actionContent}>
                {action.Icon && <action.Icon fontSize="large" />}
                <Typography variant="body1">{action.label}</Typography>
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
  },
});

export default AdminDashboardQuickActionsSection;
