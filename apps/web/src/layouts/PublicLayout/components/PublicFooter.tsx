import { FC } from 'react';
import { Box, Button, IconButton, SvgIconProps, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { publicFooterLinks } from '../constants/publicFooterLinks.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
type SocialMediBtn = { Icon: FC<SvgIconProps>; path: string };
const socialMediaBtns: SocialMediBtn[] = [
  { Icon: InstagramIcon, path: '#' },
  { Icon: FacebookIcon, path: '#' },
  { Icon: LinkedInIcon, path: '#' },
];
type ContactItem = {
  Icon: FC<SvgIconProps>;
  path: string;
  value: string;
};
const contacts: ContactItem[] = [
  {
    Icon: MailOutlineIcon,
    path: '#',
    value: 'voqu@gmail.com',
  },
  {
    Icon: PhoneIcon,
    path: '#',
    value: '+11 222 333 444',
  },
  {
    Icon: PinDropIcon,
    path: '#',
    value: 'T. Shewchenka 11. Kyiv',
  },
];
function PublicFooter() {
  return (
    <>
      <Box sx={sxStyles.root}>
        <Box sx={sxStyles.boxLogo}>
          <IconButton href={'/'}>
            <SchoolIcon color={'secondary'} />
          </IconButton>

          <Typography color={'textSecondary'} variant="h5">
            Voqu
          </Typography>
        </Box>
        <Toolbar sx={sxStyles.toolbar}>
          {publicFooterLinks.map((btn, index) => {
            return (
              <Button key={index} href={btn.path} color="inherit">
                <Typography color={'textSecondary'}>{btn.label}</Typography>
              </Button>
            );
          })}
        </Toolbar>
        <Box sx={sxStyles.boxSocials}>
          <Box sx={sxStyles.socials}>
            <Typography color={'textSecondary'}>Follow us</Typography>
            {socialMediaBtns.map(({ path, Icon }, index) => (
              <IconButton key={index} href={path}>
                <Icon color={'secondary'} />
              </IconButton>
            ))}
          </Box>
        </Box>
        <Box sx={sxStyles.boxContacts}>
          <Typography color={'textSecondary'}>Contact us</Typography>
          {contacts.map(({ Icon, path, value }, index) => (
            <Box key={index} sx={sxStyles.contacts}>
              <IconButton href={path}>
                <Icon color={'secondary'} />
              </IconButton>
              <Typography color={'textSecondary'}>{value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={sxStyles.boxCopyright}>
        <Typography>&copy; 2025 Voqu. All rights reserved.</Typography>
      </Box>
    </>
  );
}

const sxStyles = createSxStylesList({
  root: (theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    bgcolor: 'primary.main',
    width: '100%',
    padding: 2,
    flexWrap: 'wrap',
    [theme.breakpoints.between('xs', 'sm')]: {
      gap: '25px',
    },
  }),

  boxLogo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxCopyright: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    bgcolor: 'secondary.main',
    width: '100%',
  },
  boxContacts: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  boxSocials: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  contacts: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socials: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default PublicFooter;
