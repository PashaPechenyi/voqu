import * as React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SchoolIcon from '@mui/icons-material/School';
import { AppBar, Drawer, IconButton } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import { theme } from '@/theme';
import MenuIcon from '@mui/icons-material/Menu';
import { LINKS } from './PublicFooter';

//const links: string[] = ['Home', 'About us', 'Our offers', 'Contact'];

export default function PublicHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
    <AppBar
      sx={{
        width: 1,
        backgroundColor: '#f6f1ee',
        borderBottom: '2px solid grey',
        position: 'fixed',
        top: '0px',
        left: 'auto',
        right: '0px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <SchoolIcon sx={{ color: '#71677D', mr: '10px', width: '40px', height: '40px' }} />

          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Voqu
          </Typography>
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
              <MenuIcon sx={{ color: '#37123c' }} />
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
                      
                      sx={{ fontSize: { xs: '15px', sm: '20px' } }}
                      onClick={() => setIsOpen(false)}
                    >
                      {el}
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
                return (
                  <Typography variant="body1" sx={{ color: '#37123c' }}>
                    {link}
                  </Typography>
                );
              })}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '200px' }}>
              <Button variant="contained">Login</Button>
              <Button variant="outlined">Sing up</Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </>
  );
}
