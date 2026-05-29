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
import { Lesson } from '@/features/lesson/types/lesson.type';
import { LESSON_SEGMENT_ICONS } from '@/features/lesson/constants/lessonSegmentIcons.const';
import { LESSON_SEGMENT_COLORS } from '@/features/lesson/constants/lessonSegmentColors.const';
import { useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type LessonCardProps = {
  lesson: Lesson;
  lessonId: number;
  lessonIndex: number;
};

function LessonItem({ lesson, lessonId, lessonIndex }: LessonCardProps) {
  const SegmentIcon = LESSON_SEGMENT_ICONS[lesson.segmentType];
  const segmentColor = LESSON_SEGMENT_COLORS[lesson.segmentType];
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
        <Chip label={lesson.order} color="primary" />
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
            <Typography variant="body2">{lesson.duration} min</Typography>
            <Chip label={lesson.segmentType} color="primary" variant="outlined" size="small" />
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ flex: 1 }} />
      <CardActions>
        <IconButton aria-label="lock">
          <LockOutlinedIcon />
        </IconButton>
        <IconButton color="warning" aria-label="edit">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
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
