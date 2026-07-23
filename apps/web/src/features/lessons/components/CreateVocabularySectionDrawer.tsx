import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, TextField, Typography, Drawer } from '@mui/material';
import WordItem from './WordItem';
import AddWordForm from './AddWordForm';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { Segment } from '@/pages/admin/LessonDetails/LessonDetails.page';

import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Word } from '../types/word.type';

type CreateVocabularySectionModalProps = {
  segmentDetails: { id: string; title: string; description: string; wordsList: Word[] };
  setSegmentDetails?: React.Dispatch<React.SetStateAction<Segment>>;
};

function CreateVocabularySectionDrawer({
  segmentDetails,
  setSegmentDetails,
}: CreateVocabularySectionModalProps) {
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={segmentDetails.title}
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
        onSave={(newValue) => {
          // segmentDetails.title = newValue;
          setSegmentDetails ? setSegmentDetails({ ...segmentDetails, title: newValue }) : '';
        }}
        slotProps={{
          typography: {
            color: 'secondary',
            variant: 'h6',
          },
          textfield: {
            placeholder: 'Add title',
            variant: 'standard',
          },
        }}
      />
      <EditableField
        defaultValue={segmentDetails.description}
        onSave={(newValue) => {
          //segmentDetails.description = newValue;
          setSegmentDetails ? setSegmentDetails({ ...segmentDetails, description: newValue }) : '';
        }}
        slotProps={{
          typography: {
            color: 'primary',
            variant: 'body1',
          },
          textfield: {
            placeholder: 'Add description',
            variant: 'standard',
            multiline: true,
            fullWidth: true,
          },
        }}
      />

      {segmentDetails
        ? segmentDetails.wordsList.map((word: Word, index: number) => (
            <WordItem word={word} wordIndex={index} key={word.id} />
          ))
        : ''}
      <AddWordForm />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: (theme) => ({
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: theme.palette.common.white,
    borderRadius: 7,
    padding: 5,
  }),
});

export default CreateVocabularySectionDrawer;
