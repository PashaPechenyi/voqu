import { FC } from 'react';
import { Box, Button, IconButton, List, ListItem, Typography } from '@mui/material';
import diamondIcon from '@/assets/images/diamond.png';
import { Link } from 'react-router-dom';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { PUBLIC_NAV_LINKS } from './constants/navLinks.const';
import { CONTACTS } from './constants/contacts.const';
import { SOCIAL_LINKS } from './constants/socialLinks.const';

const PublicFooter: FC = () => {
  return (
    <Box component="footer" sx={sxStyles.footer}>
      <Box sx={sxStyles.container}>
        <Box sx={sxStyles.shortDesc}>
          <Typography variant="h6" sx={sxStyles.whiteText}>
            Voqu
          </Typography>
          <Typography variant="body2" sx={sxStyles.descriptionText}>
            Empowering learners to achieve English fluency through expert instruction and innovative
            methods
          </Typography>
        </Box>
        <Box sx={sxStyles.columnWidth}>
          <Typography variant="h6" sx={sxStyles.whiteText}>
            Quick Links
          </Typography>
          <List sx={sxStyles.flatList}>
            {PUBLIC_NAV_LINKS.map((link) => (
              <ListItem key={link.url}>
                <Button color="inherit" component={Link} sx={sxStyles.linkButton} to={link.url}>
                  {link.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={sxStyles.columnWidth}>
          <Typography variant="h6" sx={sxStyles.whiteText}>
            Contact Us
          </Typography>
          <List sx={sxStyles.flatList}>
            {CONTACTS.map((contact) => {
              const Icon = contact.icon;
              return (
                <ListItem key={contact.text}>
                  <Icon sx={sxStyles.contactIcon} />
                  <Typography variant="body2" sx={sxStyles.contact}>
                    {contact.text}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box sx={sxStyles.followCon}>
          <Typography variant="h6" sx={sxStyles.whiteText}>
            Follow Us
          </Typography>
          <Box>
            <List sx={sxStyles.socialList}>
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <ListItem key={social.name} disablePadding>
                    <IconButton
                      component="a"
                      href={social.url}
                      aria-label={social.name}
                      sx={sxStyles.iconButton}
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
      <Box sx={sxStyles.icon}>
        <Box sx={sxStyles.decorationCon}>
          <Box sx={sxStyles.decorationLine} />
          <Box component="img" src={diamondIcon} alt="" sx={sxStyles.decorationIcon} />
          <Box sx={sxStyles.decorationLine} />
        </Box>
        <Typography variant="body2" sx={sxStyles.copyright}>
          © 2025 Voqu. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  footer: (theme) => ({
    backgroundColor: theme.palette.primary.main,
    width: 1,
    py: '40px',
    px: '20px',
    borderTop: `5px solid ${theme.palette.divider}`,
  }),
  container: {
    width: 1,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: { xs: 'center', sm: 'space-around' },
    alignItems: { xs: 'center', sm: 'flex-start' },
    gap: { xs: '20px' },
  },
  shortDesc: {
    width: '300px',
    display: { xs: 'flex', sm: 'inline' },
    alignItems: { xs: 'center', sm: 'flex-start' },
    flexDirection: 'column',
  },
  whiteText: (theme) => ({ color: theme.palette.common.white }),
  descriptionText: (theme) => ({
    color: theme.palette.common.white,
    textAlign: { xs: 'center', sm: 'start' },
  }),
  columnWidth: { width: '300px' },
  flatList: { padding: 0 },
  linkButton: (theme) => ({
    fontSize: '16px',
    textDecoration: 'none',
    color: theme.palette.common.white,
  }),
  contactIcon: (theme) => ({ fill: theme.palette.common.white, pr: '5px' }),
  contact: (theme) => ({
    fontSize: '16px',
    textDecoration: 'none',
    color: theme.palette.common.white,
    padding: 0,
  }),
  followCon: {
    width: '300px',
    display: { xs: 'flex', sm: 'inline' },
    alignItems: { xs: 'center', sm: 'start' },
    flexDirection: 'column',
  },
  socialList: { display: 'flex', gap: '10px' },
  iconButton: (theme) => ({
    backgroundColor: theme.palette.divider,
    cursor: 'pointer',
    '& svg': { color: theme.palette.common.white, transition: 'color 0.3s' },
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      '& svg': { color: theme.palette.divider },
    },
  }),
  icon: (theme) => ({
    borderTop: `2.5px solid ${theme.palette.divider}`,
    width: '100%',
    textAlign: 'center',
    py: '30px',
    color: theme.palette.common.white,
  }),
  decorationCon: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    margin: '0 auto',
    my: '30px',
    width: '140px',
    flexDirection: { xs: 'column', md: 'row' },
  },
  decorationLine: (theme) => ({
    width: '60px',
    height: '1px',
    backgroundColor: theme.palette.tertiary.main,
  }),
  decorationIcon: { width: '13px' },
  copyright: { textAlign: 'center' },
});

export default PublicFooter;
