import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import { PUBLIC_NAV_ITEMS } from '../constants/publicNavItems.const';

type PublicMobileMenuProps = {
  toggleDrawer: (newOpen: boolean) => () => void;
  open: boolean;
};

function PublicMobileMenu({ toggleDrawer, open }: PublicMobileMenuProps) {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {PUBLIC_NAV_ITEMS.map((navItem) => (
            <ListItem key={navItem.path} disablePadding>
              <ListItemButton href={navItem.path}>
                <ListItemText primary={navItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ ml: 1.5, mt: 1 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            <Typography>Log in</Typography>
          </Button>
          <Button variant="outlined">
            <Typography>Sign up</Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default PublicMobileMenu;
