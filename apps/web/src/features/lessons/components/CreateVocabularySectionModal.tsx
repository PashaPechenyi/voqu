import { FC } from 'react';
import { Box } from '@mui/material';
import WordItem from './WordItem';
import AddWordForm from './AddWordForm';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { Word } from '../types/word.type';
import { Segment } from '../types/lessonDetails.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type CreateVocabularySectionModalProps = {
  segmentDetails: Segment;
};

const CreateVocabularySectionModal: FC<CreateVocabularySectionModalProps> = ({
  segmentDetails,
}) => {
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={segmentDetails.title}
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
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
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
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
      {segmentDetails.wordsList.map((word: Word, index: number) => (
        <WordItem word={word} wordIndex={index} key={word.id} />
      ))}
      <AddWordForm />
    </Box>
  );
};

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

export default CreateVocabularySectionModal;
