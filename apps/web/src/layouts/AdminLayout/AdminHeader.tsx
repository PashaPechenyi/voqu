import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import { AppBar, Drawer, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from '@/theme';
import { Link } from 'react-router-dom';

const LINKS: { name: string; way: string; img: any }[] = [
  { name: 'Dashboard', way: '/admin', img: DashboardIcon },
  { name: 'Courses', way: '/admin/courses', img: ImportContactsIcon },
  { name: 'Users', way: '', img: PersonIcon },
  { name: 'Settings', way: '', img: SettingsIcon },
];

export default function AdminHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar
        sx={{
          width: 1,
          backgroundColor: '#37123c',
          borderBottom: '2px solid grey',
          position: 'fixed',
          top: '0px',
          left: 'auto',
          right: '0px',
          py: 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <SchoolIcon sx={{ color: '#aa9f96', mr: '10px', width: '40px', height: '40px' }} />

            <Box>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#f6f1ee' }}>
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
                onClick={() => setIsOpen(true)}
                sx={{ mr: 2 }}
              >
                <LogoutIcon sx={{ fill: 'white' }} />
              </IconButton>
              <Drawer
                PaperProps={{
                  sx: {
                    width: { xs: '80%', sm: '40%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                  },
                }}
                anchor="right"
                open={isOpen}
                onClick={() => setIsOpen(false)}
              >
                <Box
                  sx={{ width: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {LINKS.map((el) => {
                    return (
                      <Button
                        color="inherit"
                        component={Link}
                        sx={{ fontSize: { xs: '15px', sm: '20px' } }}
                        onClick={() => setIsOpen(false)}
                        to={el.way}
                      >
                        {el.name}
                      </Button>
                    );
                  })}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '65%',
                    gap: '10px',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Button variant="contained">Login</Button>
                  <Button variant="outlined">Sing up</Button>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '400px' }}>
                {LINKS.map((link) => {
                  const Icon = link.img;
                  return (
                    <Button
                      color="inherit"
                      component={Link}
                      sx={{
                        fontSize: '16px',
                        textDecoration: 'none',
                        color: '#aa9f96',
                        px: 8,
                        '&:hover': {
                          color: '#f6f1ee',
                        },
                      }}
                      to={link.way}
                    >
                      <Icon sx={{ pr: '5px' }} />
                      {link.name}
                    </Button>
                  );
                })}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '200px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <Typography variant="body2">Admin user</Typography>
                  <Typography variant="body2" color="tertiary">
                    admin@vogu.com
                  </Typography>
                </Box>
                <Button>
                  <LogoutIcon
                    sx={{
                      fill: '#aa9f96',
                      '&:hover': {
                        fill: '#f6f1ee',
                      },
                    }}
                  />
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
