import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, TextField, Typography } from '@mui/material';
import WordItem from './WordItem';
import AddWordForm from './AddWordForm';
import { WordType } from '../enums/lessonWordType.enum';
import { EditableField } from '@/shared/components/EditableField/EditableField';

export type Word = {
  id: string;
  word: string;
  transcription: string;
  partOfSpeech: WordType;
  translation: string;
  type: 'phrase' | 'word'; // phrase/verb
  secondTense: string;
  thirdTense: string;
  examples: {
    value: string;
    translation: string;
  }[];
};
type CreateVocabularySectionModalProps = {
  segmentDetails: { id: string; title: string; description: string; wordsList: Word[] };
};

function CreateVocabularySectionModal({ segmentDetails }: CreateVocabularySectionModalProps) {
  return (
    <Box
      sx={{
        width: 600,
        display: 'flex',
        flexDirection: 'column',
        //justifyContent: 'space-around',
        //alignItems: 'center',
        gap: '10px',
        // border: '1px solid black',
        backgroundColor: 'white',
        borderRadius: 7,
        padding: 5,
      }}
    >
      <EditableField
        defaultValue={segmentDetails.title}
        onSave={(newValue) => {
          segmentDetails.title = newValue;
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
        defaultValue={''}
        onSave={(newValue) => {
          segmentDetails.description = newValue;
        }}
        slotProps={{
          typography: {
            color: 'primary',
            variant: 'body1',
          },
          textfield: {
            placeholder: 'Add description',
            variant: 'standard',
          },
        }}
      />
      {/* {segmentDetails[0].wordsList.map((word: any) => (
        <WordItem word={word} key={word.id} />
      ))} */}
      {segmentDetails.wordsList.map((word: Word, index: number) => (
        <WordItem word={word} WordIndex={index} key={word.id} />
      ))}
      <AddWordForm />
    </Box>
  );
}

export default CreateVocabularySectionModal;
