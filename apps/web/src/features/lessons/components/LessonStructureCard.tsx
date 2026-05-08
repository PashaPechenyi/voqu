import { Box, Typography } from '@mui/material';
import { Style } from './LessonStructurePhase';
type LessonStructureCardProps = {
  icon: any;
  title: string;
  description: string;

  cardStyles: Style;
};

function LessonStructureCard({ icon, title, description, cardStyles }: LessonStructureCardProps) {
  const Icon = icon;
  return (
    <Box sx={{ alignItems: cardStyles.alignItems, width: cardStyles.width, ...styles.card }}>
      <Box sx={styles.header}>
        <Box color="secondary" sx={{ order: cardStyles.order, ...styles.icon }}>
          <Icon sx={{ fill: 'white', fontSize: '28px' }} />
        </Box>
        <Typography variant="h6" sx={{ textAlign: cardStyles.textAlign, mx: '10px', order: 2 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ textAlign: cardStyles.textAlign }}>
        {description}
      </Typography>
    </Box>
  );
}
const styles = {
  header: {
    with: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '50px',
    height: '50px',
    borderRadius: '100%',
    backgroundColor: '#37123c',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    p: '15px',
    border: '1.5px, solid grey',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '200px',
    gap: '20px',
    my: '20px',
  },
};

export default LessonStructureCard;
