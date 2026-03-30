import { Box, Button, IconButton, List, ListItem, Typography, useMediaQuery } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import icon from '@/img/diamond.png';
import { theme } from '@/theme';
import { Link } from 'react-router-dom';

export const LINKS: { name: string; way: string }[] = [
  { name: 'Home', way: '/landingPage' },
  { name: 'About us', way: '/about' },
  { name: 'Our offers', way: '' },
  { name: 'Contact', way: '' },
];
const contacts = [
  { icon: MailOutlineIcon, text: ' info@englishpro.com' },
  { icon: LocalPhoneIcon, text: '+1 (555) 123-4567' },
  { icon: LocationOnIcon, text: ' 123 Learning Street, Education City' },
];

const icons = [FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon];
function PublicFooter() {
  //const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: '#71677D',
          width: 1,

          py: '40px',
          px: '20px',
          borderTop: '5px solid grey',
        }}
      >
        <Box
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-around' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: { xs: '20px' },
          }}
        >
          <Box
            sx={{
              width: '300px',
              display: { xs: 'flex', sm: 'inline' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white' }}>
              Voqu
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'white', textAlign: { xs: 'center', sm: 'start' } }}
            >
              Empowering learners to achieve English fluency through expert instruction and
              innovative methods
            </Typography>
          </Box>
          <Box
            sx={{
              width: '300px',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white' }}>
              Quick Links
            </Typography>
            <List sx={{ padding: 0 }}>
              {LINKS.map((text, ind) => (
                <ListItem key={ind}>
                  {/* <Typography
                    component="a"
                    href="#"
                    variant="body2"
                    sx={{ fontSize: '16px', textDecoration: 'none', color: 'white', padding: 0 }}
                  >
                    {text.name}
                  </Typography> */}
                  <Button
                    color="inherit"
                    component={Link}
                    sx={{ fontSize: '16px', textDecoration: 'none', color: 'white', padding: 2 }}
                    to={text.way}
                  >
                    {text.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ width: '300px' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Contact Us
            </Typography>
            <List sx={{ padding: 0 }}>
              {contacts.map((el, ind) => {
                const Icon = el.icon;
                return (
                  <ListItem key={ind}>
                    <Icon sx={{ fill: 'white', pr: '5px' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '16px',
                        textDecoration: 'none',
                        color: 'white',
                        padding: 0,
                      }}
                    >
                      {el.text}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            sx={{
              width: '300px',
              display: { xs: 'flex', sm: 'inline' },
              alignItems: { xs: 'center', sm: 'start' },
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white' }}>
              Follow Us
            </Typography>
            <Box>
              <List sx={{ display: 'flex', gap: '10px' }}>
                {icons.map((Icon, ind) => {
                  //const Icon=icon
                  return (
                    <ListItem key={ind} component="a" href="https://www.deepl.com/uk/translator">
                      <IconButton
                        sx={{
                          backgroundColor: 'grey',
                          cursor: 'pointer',
                          '& svg': {
                            color: 'white',
                            transition: 'color 0.3s',
                          },

                          '&:hover': {
                            backgroundColor: 'white',

                            '& svg': {
                              color: 'grey',
                            },
                          },
                        }}
                      >
                        <Icon />
                      </IconButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: '2.5px solid grey',
            width: '100%',
            textAlign: 'center',
            py: '30px',
            color: 'white',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              margin: '0 auto',
              my: '30px',
              width: '140px',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ width: '60px', height: '1px', backgroundColor: '#AA9F96' }}></Box>
            <Box component="img" src={icon} sx={{ width: '13px' }}></Box>
            <Box sx={{ width: '60px', height: '1px', backgroundColor: '#AA9F96' }}></Box>
          </Box>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            © 2025 EnglishPro. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default PublicFooter;
