import { FC, useRef } from 'react';
import { Box, Button, ListItem, Typography, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { LessonListItem } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import LessonEditModal from './LessonEditModal';
import { useToggle } from '@/shared/hooks/useToggle';
import { useSortable } from '@dnd-kit/react/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { UseUpdateLesson } from '../hooks/useUpdateLesson';
import { deleteLessonReq } from '../helpers/deleteLessonReq.helper';
import { useMutation } from '@/shared/api';

type LessonItemProps = {
  lesson: LessonListItem;
  index: number;
  onDelete?: (lesson: LessonListItem) => void;
  onUpdate?: (lesson: LessonListItem, values: LessonFormValues) => void;
  onToggleLock?: (lesson: LessonListItem) => void;
  id: string;

  reloadLessons: () => void;
};
const LessonItem: FC<LessonItemProps> = ({
  lesson,
  index,
  onDelete,
  onUpdate,
  onToggleLock,
  id,
  reloadLessons,
}) => {
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useToggle();
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useToggle();
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const dragButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isDragging } = useSortable({ id, index, element: listItemRef, handle: dragButtonRef });

  const { isLoading, mutate: deleteLesson } = useMutation({
    // mutationFn: (lessonId: LessonListItem['id']) => deleteLessonReq(lessonId),
    mutationFn: deleteLessonReq,
    onSuccess: () => {
      reloadLessons();
    },
  });

  // const { deleteLesson, isLoading } = useDeleteLesson({
  //   onSuccess: () => {
  //     reloadLessons();
  //   },
  // });
  const { updateLesson } = UseUpdateLesson({
    onSuccess: () => {
      reloadLessons();
      closeEdit();
    },
  });

  const handleConfirmDelete = async () => {
    // setIsLoading(true);
    isLoading && onDelete?.(lesson);
    isLoading && closeDelete();
    //setIsLoading(false);
    await deleteLesson(lesson.id);
    closeDelete();
  };

  // TODO: There is no API integration for lesson edit.
  const handleUpdateSubmit = async (values: LessonFormValues) => {
    await updateLesson(lesson.id, values);
    onUpdate?.(lesson, values);
    closeEdit();
  };

  return (
    <>
      <ListItem ref={listItemRef} data-shadow={isDragging || undefined} sx={sxStyles.item}>
        <Box sx={sxStyles.leftCluster}>
          <Button ref={dragButtonRef} className="handle">
            <DragIndicatorIcon />
          </Button>
          <Box sx={sxStyles.index}>{index + 1}</Box>
          <ListItemText>
            <Typography variant="h6" color="secondary">
              {lesson.title}
            </Typography>
            <Box sx={sxStyles.metaRow}>
              <Typography variant="body2" color="secondary">
                {lesson.description}
              </Typography>
            </Box>
          </ListItemText>
        </Box>
        <Box sx={sxStyles.actionsRow}>
          <Button sx={sxStyles.actionButton} onClick={openEdit}>
            <EditIcon />
          </Button>
          <Button sx={sxStyles.actionButton} onClick={() => onToggleLock?.(lesson)}>
            <LockIcon />
          </Button>
          <Button sx={sxStyles.deleteButton} onClick={openDelete} disabled={isLoading}>
            <DeleteIcon sx={sxStyles.deleteIcon} />
          </Button>
        </Box>
      </ListItem>

      <LessonEditModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        lesson={lesson}
        onSubmit={handleUpdateSubmit}
      />
      <ConfirmModal
        subtitle={`Are you sure you want to delete "${lesson.title}"? This action cannot be undone.`}
        title="Delete Lesson"
        isOpen={isDeleteOpen}
        buttonText="Delete lesson"
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

const sxStyles = createSxStylesList({
  item: {
    p: '20px',
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'space-between' },
    alignItems: { xs: 'flex-start', md: 'center' },
    position: 'relative',
    flexDirection: { xs: 'column', md: 'row' },
  },
  leftCluster: { display: 'flex', gap: '20px' },
  metaRow: { display: 'flex', gap: '20px' },
  actionsRow: { display: 'flex', gap: '20px' },
  actionButton: (theme) => ({ border: `2px solid ${theme.palette.divider}` }),
  deleteButton: (theme) => ({ border: `2px solid ${theme.palette.error.main}` }),
  deleteIcon: (theme) => ({ fill: theme.palette.error.main }),
  index: (theme) => ({
    width: '45px',
    height: '45px',
    borderRadius: '100%',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    m: '0 0 20px 15px',
    backgroundColor: theme.palette.secondary.main,
  }),
});

export default LessonItem;
