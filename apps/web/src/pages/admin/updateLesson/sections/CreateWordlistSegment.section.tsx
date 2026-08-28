import { Word } from '@/features/lesson/types/wordListItem.type';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import { AddWordSection } from './AddWord.section';
import { WordItem } from '../../../../features/lesson/components/wordlistWordItem/WordItem';
import { LessonSegmentReqBody } from '@/features/lesson/helpers/createLessonSegmentReq.helper';
import { WordlistSegment } from '@/features/lesson/types/wordlistSegment.type';
import { convertLessonSegmentDetailsToApiFormat } from '@/features/lesson/helpers/convertLessonSegmentDetailsToApiFormat';

type VocabularyFormSectionProps = {
  segment?: WordlistSegment;
  onSave: (body: LessonSegmentReqBody) => void;
  isLoading: boolean;
};

export const CreateWordlistSegment = ({
  onSave,
  segment,
  isLoading,
}: VocabularyFormSectionProps) => {
  const [wordlist, setWordlist] = useState<Word[]>(segment?.wordlist.entries || []);
  const [segmentData, setSegmentData] = useState({
    title: '',
    description: '',
  });
  return (
    <Box sx={sxStyles.root}>
      <Box>
        <EditableField
          placeholder="wordlist topic"
          onSave={(value) => {
            setSegmentData((prev) => ({ ...prev, title: value }));
          }}
          slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
          required
        />
        <EditableField
          placeholder="wordlist description"
          onSave={(value) => {
            setSegmentData((prev) => ({ ...prev, description: value }));
          }}
          slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
        />
      </Box>

      <Divider variant="middle" />

      {wordlist.map((word, index) => (
        <WordItem key={index} word={word} setWordlist={setWordlist} />
      ))}
      <Box sx={sxStyles.toCenter}>
        <AddWordSection setWordlist={setWordlist} />
      </Box>

      <Button
        type="submit"
        loading={isLoading}
        onClick={() => {
          onSave(convertLessonSegmentDetailsToApiFormat(wordlist, segmentData));
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
