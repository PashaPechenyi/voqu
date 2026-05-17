// TODO: File and component are named `Futures` (the future) but the content is "Features" (product features). Rename `Futures.section.tsx` → `Features.section.tsx` and `FuturesSection` → `FeaturesSection`. This is a project-wide misnomer.
// TODO: Local type `Card` shadows the MUI `Card` component imported just below — confusing. Rename `Card` to `FeatureCard` and move to a constants/types file.
// TODO: Local `CARDS: Card[]` array should live in a `constants/featureCards.const.ts` (matches `aboutUsMethodologyCards.const.ts` pattern).
// TODO: `paddind: 2` — misspelled, should be `padding`. Affects both `card` and `cardContent` sxStyles. The property is silently ignored.
// TODO: `Card key={index}` — use a stable key (e.g. `title`).
// TODO: `<Icon color="secondary" height={40} width={40} />` — MUI `SvgIcon`'s `height`/`width` props are HTML attributes, not size; use `fontSize` or `sx={{ fontSize: 40 }}`.
// TODO: Headline "Чому обирають Voqu?" is Ukrainian, while other public pages use English. Choose one source language and localize.
import { FC } from 'react';
import { Bookmark, MenuBook, School, Timeline } from '@mui/icons-material';
import { Box, Card, CardContent, SvgIconProps, Typography } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
type Card = {
  Icon: FC<SvgIconProps>;
  title: string;
  sub: string;
};
const CARDS: Card[] = [
  {
    Icon: School,
    title: 'Структуровані рівні',
    sub: 'Від A1 до C2 за стандартом CEFR',
  },
  {
    Icon: MenuBook,
    title: 'Різноманітні уроки',
    sub: 'Словник, граматика, читання, аудіювання',
  },
  {
    Icon: Timeline,
    title: 'Відстеження прогресу',
    sub: 'Бачте свій розвиток у реальному часі',
  },
  {
    Icon: Bookmark,
    title: 'Особистий словник',
    sub: 'Зберігайте та тренуйте нові слова',
  },
];

function FuturesSection() {
  return (
    <Box sx={sxStyles.root}>
      <Typography variant={'h3'}>Чому обирають Voqu?</Typography>
      <Box sx={sxStyles.cards}>
        {CARDS.map(({ Icon, title, sub }, index) => (
          <Card key={index} sx={sxStyles.card}>
            <CardContent sx={sxStyles.cardContent}>
              <Box sx={sxStyles.iconBox}>
                <Icon color="secondary" height={40} width={40} />
              </Box>
              <Box sx={{ maxWidth: '170px' }}>
                <Typography variant="h6">{title}</Typography>
                <Typography color={'textDisabled'} variant="body1">
                  {sub}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    mb: 5,
  },
  cards: (theme) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    mt: 3,
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  }),
  card: (theme) => ({
    width: '90%',
    height: '100%',
    paddind: 2,
    border: '2px solid',
    borderColor: 'primary.main',
    [theme.breakpoints.up('sm')]: {
      width: '45%',
    },
  }),
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddind: 2,
    textAlign: 'center',
    bgcolor: 'secondary.main',
  },
  iconBox: {
    width: 45,
    height: 45,
    bgcolor: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default FuturesSection;
