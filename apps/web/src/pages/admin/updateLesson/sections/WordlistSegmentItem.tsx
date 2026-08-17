import { convertLessonSegmentDetailsToUpdateApiFormat } from '@/features/lesson/helpers/convertLessonSegmentDetailsToUpdateApiFormat';
import {
  updateLessonSegmentReq,
  UpdateLessonSegmentReqBody,
} from '@/features/lesson/helpers/updateLessonSegment.helper';
import { WordlistSegment } from '@/features/lesson/types/wordlistSegment.type';
import { useMutation } from '@/shared/api';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AddWordSection } from './AddWord.section';
import { WordItem } from './WordItem';
type WordlistSegmentProps = {
  segment: WordlistSegment;
  segmentOrder: number;
};
export const WordlistSegmentItem = ({ segment }: WordlistSegmentProps) => {
  const isMounted = useRef<boolean>(false);
  const [wordlist, setWordlist] = useState(segment.wordlist.entries);
  const [segmentData, setSegmentData] = useState({
    title: segment.title.value,
    description: segment.description.value,
  });
  const { mutate: updateSegment, isLoading } = useMutation({
    mutationFn: updateLessonSegmentReq,
  });

  const handleUpdate = (body: UpdateLessonSegmentReqBody) => {
    updateSegment(segment.id, body, 'uk');
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log(segmentData, 'useef');
    handleUpdate(convertLessonSegmentDetailsToUpdateApiFormat(wordlist, segmentData));
  }, [segmentData.title, segmentData.description, wordlist]);

  return (
    <Box sx={sxStyles.root}>
      <Box sx={{ mb: 2 }}>
        <EditableField
          defaultValue={segment?.title.value}
          onSave={(value) => {
            setSegmentData((prev) => ({ ...prev, title: value }));
          }}
          slotProps={{ typography: { mr: 2, variant: 'h5', color: 'adminPrimary' } }}
        />
        <EditableField
          defaultValue={segment?.description.value}
          onSave={(value) => {
            setSegmentData((prev) => ({ ...prev, description: value }));
          }}
          slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
        />
      </Box>

      {wordlist.map((word) => (
        <WordItem key={word.id} word={word} setWordlist={setWordlist} />
      ))}

      <Box sx={sxStyles.toCenter}>
        <AddWordSection setWordlist={setWordlist} />
      </Box>
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
