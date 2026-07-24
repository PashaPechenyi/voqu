import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Typography } from '@mui/material';
import { Segment } from '../UpdateLesson.page';
import { AddWordSection } from './AddWord.section';
import { Word } from './VocabularyForm.section';
import { WordItem } from './WordItem';
type WordlistSegmentProps = {
  segment: Segment;
  setWordlist?: React.Dispatch<React.SetStateAction<Word[]>>;
};
export const WordlistSegment = ({ segment, setWordlist }: WordlistSegmentProps) => {
  const wordlist = segment?.wordsList;
  return (
    <Box sx={sxStyles.root}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" color="adminPrimary">
          {segment?.title}
        </Typography>
        <Typography variant="h6" color="adminSecondary">
          {segment?.description}
        </Typography>
      </Box>

      {wordlist.map((word) => (
        <WordItem word={word} setWordlist={() => {}} />
      ))}

      <Box sx={sxStyles.toCenter}>
        <AddWordSection setWordlist={() => {}} />
      </Box>
    </Box>
  );
};
const sxStyles = createSxStylesList({
  root: {
    border: '1px solid',
    borderColor: 'primary.main',
    p: 2,
    borderRadius: 3,
    m: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    mb: 2,
  },
  wordItem: {
    p: 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid',
    borderRadius: 3,
    borderColor: 'primary.main',
    mb: 1,
  },
  toCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
