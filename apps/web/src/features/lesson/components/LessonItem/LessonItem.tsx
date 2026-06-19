import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  ListItem,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { Course } from '@/features/courses/types/course.type';
import DeleteLessonModal from '../deleteLessonModal/DeleteLessonModal';

type LessonItemProps = {
  lesson: LessonListItem;
  lessonId: LessonListItem['id'];
  lessonIndex: number;
  courseId: Course['id'];
  reloadLessons: (courseId: Course['id']) => void;
};

function LessonItem({ lesson, courseId, lessonId, lessonIndex, reloadLessons }: LessonItemProps) {
  // FIXME: segment icon and color should be derived from the lesson's segment, not hardcoded
  // For know the backend doesn't support segments BUT once it is implemented - we need to fix it
  const SegmentIcon = MenuBookIcon;
  const segmentColor = '#71677C';

  const [open, setOpen] = useState<'update' | 'delete' | null>(null);
  const handleClose = () => setOpen(null);

  const handleDeleteSuccess = () => {
    handleClose();
    reloadLessons(courseId);
  };

  const dragButtonRef = useRef<HTMLButtonElement | null>(null);
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const { isDragging } = useSortable({
    id: lessonId,
    index: lessonIndex,
    element: listItemRef,
    handle: dragButtonRef,
  });

  return (
    <ListItem
      ref={listItemRef}
      className="item"
      data-shadow={isDragging || undefined}
      sx={sxStyles.card}
    >
      <Button ref={dragButtonRef}>
        <DragIndicatorIcon />
      </Button>
      <CardContent sx={sxStyles.cardContent}>
        <Chip label={lessonIndex + 1} color="primary" />
        <Box
          sx={{
            ...sxStyles.iconBackground,
            borderColor: segmentColor,
            backgroundColor: `${segmentColor}20`,
          }}
        >
          <SegmentIcon fontSize="small" htmlColor={segmentColor} />
        </Box>

        <Box>
          <Typography>{lesson.title}</Typography>
          <Box sx={sxStyles.lessonInfo}>
            {/* 
              TODO: shows subtitle as duration; should render lesson.duration, and the chip label is hardcoded to "reading" 
              Also add a condition. We need to show duration only when it exists
            */}
            {lesson.duration && <Typography variant="body2">{lesson.duration} min</Typography>}
            <Chip label={lesson.status} color="primary" variant="outlined" size="small" />
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ flex: 1 }} />
      <CardActions>
        <IconButton aria-label="lock">
          <LockOutlinedIcon />
        </IconButton>
        <IconButton color="warning" aria-label="update">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton color="error" aria-label="delete" onClick={() => setOpen('delete')}>
          <DeleteIcon />
        </IconButton>
        <DeleteLessonModal
          onDeleteSuccess={handleDeleteSuccess}
          lesson={lesson}
          open={open === 'delete'}
          onClose={handleClose}
        />
      </CardActions>
    </ListItem>
  );
}

const sxStyles = createSxStylesList({
  card: {
    display: 'flex',
    borderRadius: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottom: '1px solid',
    borderColor: 'secondary.main',
  },
  cardContent: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
  },
  lessonInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  iconBackground: {
    border: '1px solid',
    borderRadius: '50px',
    p: 1,
    display: 'flex',
    alignItems: 'center',
  },
});

export default LessonItem;
