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
import { useUpdateLesson } from '../hooks/useUpdateLesson';
import { deleteLessonReq } from '../helpers/deleteLessonReq.helper';
import { useMutation } from '@/shared/api';
import { Link } from 'react-router-dom';
import { ADMIN_LESSON_DETAILS_URL } from '@/shared/constants/urls.const';

type LessonItemProps = {
  lesson: LessonListItem;
  index: number;
  id: string;
  onDelete?: (lesson: LessonListItem) => void;
  onUpdate?: (lesson: LessonListItem, values: LessonFormValues) => void;
  onToggleLock?: (lesson: LessonListItem) => void;
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
    mutationFn: deleteLessonReq,
    onSuccess: () => {
      reloadLessons();
    },
  });

  const { updateLesson } = useUpdateLesson({
    onSuccess: () => {
      reloadLessons();
      closeEdit();
    },
  });

  // TODO: onDelete/closeDelete are gated on `isLoading`, which is false before the request starts, so they never run; the delete flow should not branch on isLoading here.
  const handleConfirmDelete = async () => {
    // TODO: all logic that is related to handle the success scenario of the request should be in useMutation -> onSuccess
    isLoading && onDelete?.(lesson);
    isLoading && closeDelete();
    await deleteLesson(lesson.id);

    closeDelete();
  };

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
          {/* TODO: the edit button now navigates to the lesson-details page, so openEdit is never called and LessonEditModal (with useUpdateLesson/handleUpdateSubmit) is now dead/unreachable — decide whether to remove the modal or restore an edit affordance. */}
          <Button
            sx={sxStyles.actionButton}
            component={Link}
            to={ADMIN_LESSON_DETAILS_URL(lesson.id)}
          >
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
