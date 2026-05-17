import { SvgIconComponent } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export type ContactItem = {
  icon: SvgIconComponent;
  text: string;
};

export const CONTACTS: ContactItem[] = [
  { icon: MailOutlineIcon, text: 'info@voqu.com' },
  { icon: LocalPhoneIcon, text: '+1 (555) 123-4567' },
  { icon: LocationOnIcon, text: '123 Learning Street, Education City' },
];
