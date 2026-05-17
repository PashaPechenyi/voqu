import { FC } from 'react';
import { Button, Typography, Card } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type LessonCtaCardProps = {
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

const LessonCtaCard: FC<LessonCtaCardProps> = ({
  description = 'This is just a glimpse of our comprehensive vocabulary lessons',
  ctaLabel = 'Start Learning Today',
  onCtaClick,
}) => {
  return (
    <Card sx={sxStyles.card}>
      <Typography color="primary" variant="body2" sx={sxStyles.copy}>
        {description}
      </Typography>
      <Button color="secondary" variant="contained" sx={sxStyles.cta} onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    </Card>
  );
};

const sxStyles = createSxStylesList({
  card: (theme) => ({
    border: `3px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    width: { xs: 1, md: '700px' },
    py: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    m: '0 auto',
    mt: '40px',
  }),
  copy: { textAlign: 'center' },
  cta: (theme) => ({
    width: '50%',
    height: '50px',
    color: theme.palette.common.white,
    '&:hover': { backgroundColor: theme.palette.primary.main },
  }),
});

export default LessonCtaCard;
