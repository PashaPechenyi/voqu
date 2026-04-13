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

import { publicNavItems } from '../constants/publicNavItems.const';

type PublicMobileMenuProps = {
  toggleDrawer: (newOpen: boolean) => () => void;
  open: boolean;
};

function PublicMobileMenu({ toggleDrawer, open }: PublicMobileMenuProps) {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {publicNavItems.map((btn) => (
            <ListItem key={btn.label} disablePadding>
              <ListItemButton href={btn.path}>
                <ListItemText primary={btn.label} />
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
            <Typography>Sing up</Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default PublicMobileMenu;
