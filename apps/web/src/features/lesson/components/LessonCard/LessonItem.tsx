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
import { useRef } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';

type LessonCardProps = {
  lesson: LessonListItem;
  lessonId: string;
  lessonIndex: number;
};

function LessonItem({ lesson, lessonId, lessonIndex }: LessonCardProps) {
  // const SegmentIcon = LESSON_SEGMENT_ICONS[lesson.status];
  // const segmentColor = LESSON_SEGMENT_COLORS[lesson.status];
  const SegmentIcon = MenuBookIcon;
  const segmentColor = '#71677C';
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
            <Typography variant="body2">{lesson.subtitle} min</Typography>
            <Chip label="reading" color="primary" variant="outlined" size="small" />
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
