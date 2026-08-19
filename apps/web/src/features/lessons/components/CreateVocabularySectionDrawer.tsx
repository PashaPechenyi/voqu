import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box, TextField, Typography, Drawer } from '@mui/material';
import WordItem from './WordItem';
import AddWordForm from './AddWordForm';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Word } from '../types/word.type';
import { Segment } from '../types/lessonDetails.type';
import { creaLessonSegmentReq } from '../helpers/createLessonSegmentReq.helper';
import { useMutation } from '@/shared/api';
import { WordFormValues } from '../types/wordForm.type';
import { useUpdateLessonDetails } from '../hooks/useUpdateLessonDetails';
import { CreateLessonSegmentReqBody } from '../types/createLessonSegmentReqBody.type';
import { convertWordToReq } from '@/pages/admin/LessonDetails/sections/LessonSections.section';
import { UpdateLessonSegmentReqBody } from '../types/updateLessonSegmentReqBody.type';
import { useToggle } from '@/shared/hooks/useToggle';
import { useGetLessonDetails } from '../hooks/useGetLessonDetails';

type CreateVocabularySectionModalProps = {
  segmentDetails: Segment;
  onUpdate: (segment: Segment) => void;
  lang?: string;
};
export const convertFormWord = (formWord: WordFormValues) => {
  return {
    entryType: formWord.type!,
    definition: { value: formWord.word, translation: formWord.translation },
    examples: formWord.examples,
    lemma: formWord.word,
    partOfSpeech: formWord.partOfSpeech!,
    transcription: formWord.transcription,
    v2: formWord.secondTense,
    v3: formWord.thirdTense,
  };
};

function CreateVocabularySectionDrawer({
  segmentDetails,
  onUpdate,
  lang,
}: CreateVocabularySectionModalProps) {
  console.log(segmentDetails.wordlist.entries, 'entries');
  const { close: closeEdit } = useToggle();

  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={segmentDetails.title.value}
        onSave={(newValue) => {
          // setSegmentDetails
          //   ? setSegmentDetails({ ...segmentDetails, title: { value: newValue, translation: '' } })
          //   : '';
          //handleEdit({ ...segmentDetails, title: { value: newValue, translation: '' } });
          onUpdate({ ...segmentDetails, title: { value: newValue, translation: '' } });
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
        defaultValue={segmentDetails.description.value}
        onSave={(newValue) => {
          // setSegmentDetails
          //   ? setSegmentDetails({
          //       ...segmentDetails,
          //       description: { value: newValue, translation: '' },
          //     })
          //   : '';
          //handleEdit({ ...segmentDetails, description: { value: newValue, translation: '' } });
          onUpdate({ ...segmentDetails, description: { value: newValue, translation: '' } });
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
        ? segmentDetails.wordlist.entries.map((word: Word, index: number) => (
            <WordItem
              segment={segmentDetails}
              handleEdit={onUpdate}
              word={word}
              wordIndex={index}
              key={word.id}
            />
          ))
        : ''}
      <AddWordForm
        onSubmit={(newWord) => {
          const updatedEntries = [...segmentDetails.wordlist.entries, convertFormWord(newWord)];

          onUpdate?.({
            ...segmentDetails,
            wordlist: {
              ...segmentDetails.wordlist,
              entries: updatedEntries,
            },
          });
          console.log(segmentDetails, 'segment details yjfgv');
          // handleEdit({
          //   ...segmentDetails,
          //   wordlist: {
          //     ...segmentDetails.wordlist,
          //     entries: updatedEntries,
          //   },
          // });
        }}
      />
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
