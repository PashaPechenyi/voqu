import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useToggle } from '@/shared/hooks/useToggle';
import EditWordForm from './EditWordForm';
import { Word } from '../types/word.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { CreateLessonSegmentReqBody } from '../types/createLessonSegmentReqBody.type';
import { Segment } from '../types/lessonDetails.type';

type WordItemProps = {
  word: Word;
  wordIndex: number;
  handleEdit: (body: Segment) => void;
  segment: Segment;
};

const WordItem: FC<WordItemProps> = ({ word, handleEdit, segment }) => {
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
          <Typography>{word.definition.value}</Typography>
          <Typography>{word.definition.translation}</Typography>
          <Box sx={sxStyles.actions}>
            <Button variant="contained" onClick={openEdit}>
              edit
            </Button>
            <Button variant="outlined">Delete</Button>
          </Box>
        </Box>
        {isOpenEdit ? (
          <EditWordForm segment={segment} handleEdit={handleEdit} word={word} close={closeEdit} />
        ) : (
          ''
        )}
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
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
  },
  actions: { display: 'flex', gap: '10px' },
});

export default WordItem;
