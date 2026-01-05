import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { navItems } from '@/consts/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '@/theme';
import { createSxStylesList } from '@/theme/helpers';
import PublicMobileMenu from './PublicMobileMenu';

function PublicHeader() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {isMobile ? (
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
              <Typography color={'textSecondary'} variant="h6">
                Voqu
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar>
          <Toolbar sx={sxStyles.toolbarDesktop}>
            <Box sx={sxStyles.logoBox}>
              <IconButton>
                <SchoolIcon color="secondary" />
              </IconButton>
              <Typography color={'textSecondary'} variant="h6">
                Voqu
              </Typography>
            </Box>

            <Box>
              {navItems.map((btn) => {
                return (
                  <Button href={btn.path} color="inherit">
                    <Typography color={'textSecondary'}>{btn.label}</Typography>
                  </Button>
                );
              })}
            </Box>
            <Box>
              <Button variant="outlined" color="inherit" sx={{ mr: 2 }}>
                <Typography color={'textSecondary'}>Log in</Typography>
              </Button>
              <Button variant="contained" color="inherit">
                <Typography color={'textPrimary'}>Sing up</Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
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
