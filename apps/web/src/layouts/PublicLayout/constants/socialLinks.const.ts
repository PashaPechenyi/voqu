import { SvgIconComponent } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export type SocialLink = {
  name: string;
  url: string;
  icon: SvgIconComponent;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', url: '#', icon: FacebookIcon },
  { name: 'Instagram', url: '#', icon: InstagramIcon },
  { name: 'Twitter', url: '#', icon: TwitterIcon },
  { name: 'LinkedIn', url: '#', icon: LinkedInIcon },
];
