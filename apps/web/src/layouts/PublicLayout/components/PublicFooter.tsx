import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { PUBLIC_FOOTER_LINKS } from '../constants/publicFooterLinks.const';
import { PUBLIC_FOOTER_SOCIALS } from '../constants/publicFooterSocials.const';
import { PUBLIC_FOOTER_CONTACTS } from '../constants/publicFooterContacts.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { HOME_URL } from '@/shared/constants/urls.const';

function PublicFooter() {
  return (
    <Box component="footer">
      <Box sx={sxStyles.root}>
        <Box sx={sxStyles.boxLogo}>
          <IconButton href={HOME_URL}>
            <SchoolIcon color="secondary" />
          </IconButton>
          <Typography color="textSecondary" variant="h5">
            Voqu
          </Typography>
        </Box>
        <Toolbar sx={sxStyles.toolbar}>
          {PUBLIC_FOOTER_LINKS.map((link) => (
            <Button key={link.path} href={link.path} color="inherit">
              <Typography color="textSecondary">{link.label}</Typography>
            </Button>
          ))}
        </Toolbar>
        <Box sx={sxStyles.boxSocials}>
          <Box sx={sxStyles.socials}>
            <Typography color="textSecondary">Follow us</Typography>
            {PUBLIC_FOOTER_SOCIALS.map(({ id, path, Icon }) => (
              <IconButton key={id} href={path}>
                <Icon color="secondary" />
              </IconButton>
            ))}
          </Box>
        </Box>
        <Box sx={sxStyles.boxContacts}>
          <Typography color="textSecondary">Contact us</Typography>
          {PUBLIC_FOOTER_CONTACTS.map(({ id, Icon, path, value }) => (
            <Box key={id} sx={sxStyles.contacts}>
              <IconButton href={path}>
                <Icon color="secondary" />
              </IconButton>
              <Typography color="textSecondary">{value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={sxStyles.boxCopyright}>
        <Typography>&copy; {new Date().getFullYear()} Voqu. All rights reserved.</Typography>
      </Box>
    </Box>
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
