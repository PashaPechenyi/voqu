import { convertLessonSegmentDetailsToUpdateApiFormat } from '@/features/lesson/helpers/convertLessonSegmentDetailsToUpdateApiFormat';
import {
  updateLessonSegmentReq,
  UpdateLessonSegmentReqBody,
} from '@/features/lesson/helpers/updateLessonSegment.helper';
import { WordlistSegment } from '@/features/lesson/types/wordlistSegment.type';
import { useMutation } from '@/shared/api';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, CardContent, Collapse, IconButton, ListItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AddWordSection } from '../../../../pages/admin/updateLesson/sections/AddWord.section';
import { WordItem } from '../wordlistWordItem/WordItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteSegmentModal } from '@/features/lesson/components/deleteSegmentModal/DeleteSegmentModal';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { MutateResult } from '@/shared/api/useMutation';
import { GetLessonDetailsDTO } from '@/features/lesson/helpers/getLessonDetailsReq.helper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSortable } from '@dnd-kit/react/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type WordlistSegmentProps = {
  segment: WordlistSegment;
  segmentIndex: number;
  reloadLessonDetails: (lessonId: string) => Promise<MutateResult<GetLessonDetailsDTO, unknown>>;
  lessonId: LessonListItem['id'];
  isCollapseble: boolean;
};

export const WordlistSegmentItem = ({
  segment,
  reloadLessonDetails,
  lessonId,
  segmentIndex,
  isCollapseble,
}: WordlistSegmentProps) => {
  const isMounted = useRef<boolean>(false);
  const [wordlist, setWordlist] = useState(segment.wordlist.entries);
  const [expanded, setExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [segmentData, setSegmentData] = useState({
    title: segment.title.value,
    description: segment.description.value,
  });

  const handleExpandClick = () => {
    if (!isCollapseble) return;
    setExpanded((prev) => !prev);
  };

  const { mutate: updateSegment } = useMutation({
    mutationFn: updateLessonSegmentReq,
  });

  const handleUpdate = (body: UpdateLessonSegmentReqBody) => {
    updateSegment(segment.id, body, 'uk');
  };
  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    reloadLessonDetails(lessonId);
  };
  const handleCloseCollapse = expanded && isCollapseble;
  const dragButtonRef = useRef<HTMLButtonElement | null>(null);
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const { isDragging } = useSortable({
    id: segment.id,
    index: segmentIndex,
    element: listItemRef,
    handle: dragButtonRef,
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log(segmentData, 'useef');
    handleUpdate(convertLessonSegmentDetailsToUpdateApiFormat(wordlist, segmentData));
  }, [segmentData.title, segmentData.description, wordlist]);
  return (
    <ListItem
      ref={listItemRef}
      className="item"
      data-shadow={isDragging || undefined}
      sx={sxStyles.root}
    >
      <Box sx={sxStyles.head}>
        <Button ref={dragButtonRef}>
          <DragIndicatorIcon />
        </Button>
        <Box>
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
        <Box flex="1"></Box>
        <Box>
          <IconButton onClick={() => setIsDeleteModalOpen(true)}>
            <DeleteIcon color="adminSecondary" />
          </IconButton>
          <DeleteSegmentModal
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(true)}
            segment={segment}
            onDeleteSuccess={handleDeleteSuccess}
          />
          <IconButton
            onClick={handleExpandClick}
            aria-label="show more"
            sx={{
              marginLeft: 'auto',
              transition: 'ease-in-out ',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={handleCloseCollapse} timeout="auto" unmountOnExit>
        {wordlist.map((word) => (
          <WordItem key={word.id} word={word} setWordlist={setWordlist} />
        ))}

        <Box sx={sxStyles.toCenter}>
          <AddWordSection setWordlist={setWordlist} />
        </Box>
      </Collapse>
    </ListItem>
  );
};
const sxStyles = createSxStylesList({
  root: {
    border: '1px solid',
    borderColor: 'primary.main',
    backgroundColor: 'secondary.main',
    borderRadius: 3,
    m: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
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
