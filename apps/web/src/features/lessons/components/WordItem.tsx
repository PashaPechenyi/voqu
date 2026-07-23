import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useToggle } from '@/shared/hooks/useToggle';
import EditWordForm from './EditWordForm';
import { Word } from '../types/word.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

// RENAME: WordIndex (prop) -> wordIndex - props are camelCase
type WordItemProps = {
  word: Word;
  wordIndex: number;
};

const WordItem: FC<WordItemProps> = ({ word }) => {
  const { isOpen: isOpenEdit, open: openEdit, close: closeEdit } = useToggle();
  return (
    <>
      <Box sx={sxStyles.root}>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Typography>{word.word}</Typography>
          <Typography>{word.translation}</Typography>
          <Box sx={sxStyles.actions}>
            <Button variant="contained" onClick={openEdit}>
              edit
            </Button>
            <Button variant="outlined">Delete</Button>
          </Box>
        </Box>
        {isOpenEdit ? <EditWordForm word={word} close={closeEdit} /> : ''}
      </Box>
    </>
  );
};

const sxStyles = createSxStylesList({
  root: {
    width: 1,
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid #71677D',
    alignItems: 'center',
    borderRadius: 5,
  },
  actions: { display: 'flex', gap: '10px' },
});

export default WordItem;
