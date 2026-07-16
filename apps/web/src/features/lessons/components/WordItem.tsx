import { Box, Typography, Button } from '@mui/material';
import React from 'react';
// import { Word } from './CreateVocabularySectionModal';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import { useToggle } from '@/shared/hooks/useToggle';
import EditWordForm from './EditWordForm';
import { Word } from './CreateVocabularySectionModal';

type WordItemProps = {
  word: Word;
  WordIndex: number;
};

function WordItem({ word, WordIndex }: WordItemProps) {
  const { isOpen: isOpenEdit, open: openEdit, close: closeEdit } = useToggle();
  return (
    <>
      <Box
        sx={{
          width: 1,
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-around',
          border: '1px solid #71677D',
          alignItems: 'center',
          borderRadius: 5,
        }}
      >
        <Typography>{word.word}</Typography>
        <Typography>{word.translation}</Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" onClick={openEdit}>
            edit
          </Button>
          <Button variant="outlined">Delete</Button>
        </Box>
      </Box>
      {isOpenEdit ? <EditWordForm word={word} close={closeEdit} ind={WordIndex} /> : ''}
    </>
  );
}

export default WordItem;
