import { Box } from '@mui/material';
import WordItem from './WordItem';
import AddWordForm from './AddWordForm';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Word } from '../types/word.type';
import { Segment } from '../types/lessonDetails.type';
import { WordFormValues } from '../types/wordForm.type';

type CreateVocabularySectionModalProps = {
  segmentDetails: Segment;
  onUpdate: (segment: Segment) => void;
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

// TODO: RENAME. 1) It's not a Drawer 2) it is used not only for CREATE.  WordlistSegmentForm
function CreateVocabularySectionDrawer({
  segmentDetails,
  onUpdate,
}: CreateVocabularySectionModalProps) {
  const handleUpdateLesson = (data: Partial<Segment>) => {
    onUpdate({ ...segmentDetails, ...data });
  };
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={segmentDetails.title.value}
        onSave={(newValue) => {
          handleUpdateLesson({ title: { value: newValue, translation: '' } });
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
          handleUpdateLesson({ description: { value: newValue, translation: '' } });
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

      {segmentDetails?.wordlist?.entries?.map((word: Word, index: number) => (
        <WordItem
          segment={segmentDetails}
          onUpdate={handleUpdateLesson}
          word={word}
          wordIndex={index}
          key={word.id}
        />
      )) || ''}

      <AddWordForm
        onSubmit={(newWord) => {
          const updatedEntries = [...segmentDetails.wordlist.entries, convertFormWord(newWord)];
          handleUpdateLesson({
            wordlist: {
              ...segmentDetails.wordlist,
              entries: updatedEntries,
            },
          });
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
