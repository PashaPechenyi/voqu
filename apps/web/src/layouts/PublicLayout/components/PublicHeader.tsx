import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import { PUBLIC_NAV_ITEMS } from '../constants/publicNavItems.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import PublicMobileMenu from './PublicMobileMenu';

function PublicHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  if (isMobile) {
    return (
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <PublicMobileMenu open={open} toggleDrawer={toggleDrawer} />
          <Box sx={sxStyles.logoBox}>
            <IconButton>
              <SchoolIcon color="secondary" />
            </IconButton>
            <Typography color="textSecondary" variant="h6">
              Voqu
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar>
      <Toolbar sx={sxStyles.toolbarDesktop}>
        <Box sx={sxStyles.logoBox}>
          <IconButton>
            <SchoolIcon color="secondary" />
          </IconButton>
          <Typography color="textSecondary" variant="h6">
            Voqu
          </Typography>
        </Box>

        <Box>
          {PUBLIC_NAV_ITEMS.map((navItem) => (
            <Button key={navItem.path} href={navItem.path} color="inherit">
              <Typography color="textSecondary">{navItem.label}</Typography>
            </Button>
          ))}
        </Box>
        <Box>
          <Button variant="outlined" color="inherit" sx={{ mr: 2 }}>
            <Typography color="textSecondary">Log in</Typography>
          </Button>
          <Button variant="contained" color="inherit">
            <Typography color="textPrimary">Sign up</Typography>
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
});

export default PublicHeader;
