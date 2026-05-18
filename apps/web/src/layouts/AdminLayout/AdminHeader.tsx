import { FC, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { ADMIN_NAV_LINKS } from './constants/navLinks.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const AdminHeader: FC = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenDrawer = () => setIsOpen(true);
  const handleCloseDrawer = () => setIsOpen(false);

  return (
    <>
      <AppBar sx={sxStyles.appBar}>
        <Toolbar sx={sxStyles.toolbar}>
          <Box sx={sxStyles.logoWrapper}>
            <SchoolIcon sx={sxStyles.schoolIcon} />
            <Box>
              <Typography variant="h4" component="div" sx={sxStyles.brand}>
                Voqu
              </Typography>
              <Typography variant="body2" color="tertiary">
                Admin panel
              </Typography>
            </Box>
          </Box>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={handleOpenDrawer}
                sx={sxStyles.menuButton}
              >
                <MenuIcon sx={sxStyles.menuIcon} />
              </IconButton>
              <Drawer
                slotProps={{ paper: { sx: sxStyles.drawerPaper } }}
                anchor="right"
                open={isOpen}
                onClick={handleCloseDrawer}
              >
                <Box sx={sxStyles.drawerLinksWrapper}>
                  {ADMIN_NAV_LINKS.map((link) => (
                    <Button
                      key={link.url}
                      color="inherit"
                      component={Link}
                      sx={sxStyles.drawerLink}
                      onClick={handleCloseDrawer}
                      to={link.url}
                    >
                      {link.name}
                    </Button>
                  ))}
                </Box>

                <Box sx={sxStyles.drawerActions}>
                  <Button variant="contained">Login</Button>
                  <Button variant="outlined">Sign up</Button>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={sxStyles.desktopLinksWrapper}>
                {ADMIN_NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.url}
                      color="inherit"
                      component={Link}
                      sx={sxStyles.desktopLink}
                      to={link.url}
                    >
                      <Icon sx={sxStyles.desktopLinkIcon} />
                      {link.name}
                    </Button>
                  );
                })}
              </Box>
              <Box sx={sxStyles.userWrapper}>
                <Box sx={sxStyles.userInfo}>
                  <Typography variant="body2">Admin user</Typography>
                  <Typography variant="body2" color="tertiary">
                    admin@voqu.com
                  </Typography>
                </Box>
                <Button>
                  <LogoutIcon sx={sxStyles.logoutIconDesktop} />
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

const sxStyles = createSxStylesList({
  appBar: (theme) => ({
    width: 1,
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.divider}`,
    position: 'fixed',
    top: '0px',
    left: 'auto',
    right: '0px',
    py: 2,
  }),
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  logoWrapper: { display: 'flex' },
  schoolIcon: (theme) => ({
    color: theme.palette.tertiary.main,
    mr: '10px',
    width: '40px',
    height: '40px',
  }),
  brand: (theme) => ({ flexGrow: 1, color: theme.palette.background.paper }),
  menuButton: { mr: 2 },
  menuIcon: (theme) => ({ fill: theme.palette.common.white }),
  drawerPaper: {
    width: { xs: '80%', sm: '40%' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  drawerLinksWrapper: {
    width: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  drawerLink: { fontSize: { xs: '15px', sm: '20px' } },
  drawerActions: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '65%',
    gap: '10px',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  desktopLinksWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '400px',
  },
  desktopLink: (theme) => ({
    fontSize: '16px',
    textDecoration: 'none',
    color: theme.palette.tertiary.main,
    px: 8,
    '&:hover': { color: theme.palette.background.paper },
  }),
  desktopLinkIcon: { pr: '5px' },
  userWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '200px',
  },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'end' },
  logoutIconDesktop: (theme) => ({
    fill: theme.palette.tertiary.main,
    '&:hover': { fill: theme.palette.background.paper },
  }),
});

export default AdminHeader;
