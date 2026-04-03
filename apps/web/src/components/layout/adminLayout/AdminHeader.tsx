import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

import { createSxStylesList } from '@/theme/helpers';
import { adminNavItems } from '@/consts/adminConsts/adminNavItems';

export default function AdminHeader() {
  return (
    <AppBar sx={(theme) => ({ backgroundColor: theme.palette.adminPrimary.main })}>
      <Toolbar sx={sxStyles.toolbarDesktop}>
        <Box sx={sxStyles.logoBox}>
          <IconButton>
            <SchoolIcon fontSize="large" color="secondary" />
          </IconButton>
          <Typography color={'textSecondary'} variant="h6">
            Voqu
          </Typography>
        </Box>

        <Box>
          {adminNavItems.map((btn, index) => {
            return (
              <Button sx={sxStyles.link} key={index} href={btn.path} color="inherit">
                <btn.Icon />
                <Typography marginLeft={'5px'} color={'secondary'}>
                  {btn.label}
                </Typography>
              </Button>
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography ml={2}>Admin</Typography>
          <Button sx={sxStyles.link} variant="outlined" color="inherit">
            <Typography color={'secondary'}>Log out</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
const sxStyles = createSxStylesList({
  logoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarDesktop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    transition: 'ease-in-out 500ms',

    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.30)',
      mb: 0.5,
    },
  },
});
