import { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Lesson } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import LessonEditModal from './LessonEditModal';
import { useToggle } from '@/shared/hooks/useToggle';

type LessonListItemProps = {
  lesson: Lesson;
  index: number;
  onDelete?: (lesson: Lesson) => void;
  onEdit?: (lesson: Lesson, values: LessonFormValues) => void;
  onToggleLock?: (lesson: Lesson) => void;
};

const LessonListItem: FC<LessonListItemProps> = ({
  lesson,
  index,
  onDelete,
  onEdit,
  onToggleLock,
}) => {
  const Icon = lesson.icon;
  const [pendingDelete, setPendingDelete] = useState(false);
  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useToggle();
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useToggle();

  const handleConfirmDelete = () => {
    setPendingDelete(true);
    onDelete?.(lesson);
    closeDelete();
    setPendingDelete(false);
  };

  const handleEditSubmit = (values: LessonFormValues) => {
    onEdit?.(lesson, values);
    closeEdit();
  };

  return (
    <>
      <Box sx={sxStyles.item}>
        <Box sx={sxStyles.leftCluster}>
          <Box sx={sxStyles.index}>{index + 1}</Box>
          <Box sx={sxStyles.iconCon}>
            <Icon sx={sxStyles.lessonIcon} />
          </Box>
          <Box>
            <Typography variant="h6" color="secondary">
              {lesson.title}
            </Typography>
            <Box sx={sxStyles.metaRow}>
              <Typography variant="body1" color="tertiary">
                {lesson.duration} min
              </Typography>
              <Typography sx={sxStyles.lessonType} color="tertiary">
                {lesson.type}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={sxStyles.actionsRow}>
          <Button sx={sxStyles.actionButton} onClick={openEdit}>
            <EditIcon />
          </Button>
          <Button sx={sxStyles.actionButton} onClick={() => onToggleLock?.(lesson)}>
            <LockIcon />
          </Button>
          <Button sx={sxStyles.deleteButton} onClick={openDelete} disabled={pendingDelete}>
            <DeleteIcon sx={sxStyles.deleteIcon} />
          </Button>
        </Box>
      </Box>

      <LessonEditModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        lesson={lesson}
        onSubmit={handleEditSubmit}
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
  lessonIcon: (theme) => ({
    fill: theme.palette.divider,
    width: '20px',
    height: '20px',
  }),
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
  iconCon: (theme) => ({
    width: '45px',
    height: '45px',
    borderRadius: '100%',
    border: `2.5px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    m: '0 0 20px 15px',
  }),
  lessonType: (theme) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '20px',
    p: '3px 15px',
    fontSize: '13px',
  }),
});

export default LessonListItem;
