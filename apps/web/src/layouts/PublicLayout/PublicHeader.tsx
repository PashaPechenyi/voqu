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
import { Link } from 'react-router-dom';
import { PUBLIC_NAV_LINKS } from './constants/navLinks.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

const PublicHeader: FC = () => {
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
            <Typography variant="h4" component="div" sx={sxStyles.brand}>
              Voqu
            </Typography>
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
                  {PUBLIC_NAV_LINKS.map((link) => (
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
                {PUBLIC_NAV_LINKS.map((link) => (
                  <Button
                    key={link.url}
                    color="inherit"
                    component={Link}
                    sx={sxStyles.desktopLink}
                    to={link.url}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
              <Box sx={sxStyles.actionsWrapper}>
                <Button variant="contained">Login</Button>
                <Button variant="outlined">Sign up</Button>
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
    backgroundColor: theme.palette.background.paper,
    borderBottom: `2px solid ${theme.palette.divider}`,
    position: 'fixed',
    top: '0px',
    left: 'auto',
    right: '0px',
  }),
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  logoWrapper: { display: 'flex' },
  schoolIcon: (theme) => ({
    color: theme.palette.primary.main,
    mr: '10px',
    width: '40px',
    height: '40px',
  }),
  brand: { flexGrow: 1 },
  menuButton: { mr: 2 },
  menuIcon: (theme) => ({ color: theme.palette.secondary.main }),
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
    color: theme.palette.secondary.main,
    padding: 2,
  }),
  actionsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '200px',
  },
});

export default PublicHeader;
