import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import { Segment } from '../UpdateLesson.page';
import { AddWordSection } from './AddWord.section';
import { WordItem } from './WordItem';
export type Word = {
  id: string;
  word: string;
  transcription: string;
  partOfSpeech: string;
  translation: string;
  type: string;
  secondTense: string;
  thirdTense: string;
  examples: {
    value: string;
    translation: string;
  }[];
};

type VocabularyFormSectionProps = {
  segment?: Segment;
  setSegments: React.Dispatch<React.SetStateAction<Segment[]>>;
};
export const VocabularyFormSection = ({ segment, setSegments }: VocabularyFormSectionProps) => {
  const [wordlist, setWordlist] = useState<Word[]>(segment?.wordsList || []);
  const [segmentData, setSegmentData] = useState({
    title: '',
    description: '',
  });

  return (
    <Box sx={sxStyles.root}>
      <Box>
        <EditableField
          defaultValue="wordlist topic"
          onSave={(value) => {
            setSegmentData((prev) => ({ ...prev, title: value }));
          }}
          slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
          required
        />
        <EditableField
          defaultValue="wordlist description"
          onSave={(value) => {
            setSegmentData((prev) => ({ ...prev, description: value }));
          }}
          slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
        />
      </Box>

      <Divider variant="middle" />

      {wordlist.map((word) => (
        <WordItem word={word} setWordlist={setWordlist} />
      ))}
      <Box sx={sxStyles.toCenter}>
        <AddWordSection setWordlist={setWordlist} />
      </Box>

      <Button
        type="submit"
        onClick={() => {
          setSegments((prev) => {
            return [
              ...prev,
              {
                id: 'segm12',
                title: segmentData.title,
                description: segmentData.description,
                wordsList: wordlist,
              },
            ];
          });
          console.log(segmentData, 'drover');
        }}
      >
        Add Segment
      </Button>
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
