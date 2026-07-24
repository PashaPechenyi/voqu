import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateWordSection } from './UpdateWord.section';
import { Word } from './VocabularyForm.section';
type WordItemProps = {
  word: Word;
  setWordlist: React.Dispatch<React.SetStateAction<Word[]>>;
};
export const WordItem = ({ word, setWordlist }: WordItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Box sx={sxStyles.toCenter} flexDirection="column">
      <Box sx={sxStyles.wordItem}>
        <Typography>{word.word}</Typography>
        <Typography>{word.translation}</Typography>
        <Box>
          <IconButton onClick={() => setIsEdit((prev) => !prev)}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {isEdit && <UpdateWordSection setWordlist={setWordlist} wordItem={word} />}
    </Box>
  );
};
const sxStyles = createSxStylesList({
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
