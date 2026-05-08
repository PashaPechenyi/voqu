import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import { createSxStylesList } from '@/shared/helpers/theme.helpers';
import { Lesson } from '../types/lesson.types';
import ConfirmModal from '@/shared/components/ConfirmModal/ConfirmModal';
import LessonAddModal from './LessonAddModal';
import useToggle from '../customHooks/useToggle';

type AdminLessonItemProps = {
  lesson: Lesson;
  ind: number;
};

function AdminLessonItem({ lesson, ind }: AdminLessonItemProps) {
  const Icon = lesson.icon;

  const { isOpen: isDeleteModalOpen, open: openDeleteModal, close: closeDeleteModal } = useToggle();
  const { isOpen: isEditModalOpen, open: openEditModal, close: closeEditModal } = useToggle();

  return (
    <>
      <Box sx={sxStyles.item}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box sx={sxStyles.index}>{ind + 1}</Box>
          <Box sx={sxStyles.iconCon}>
            <Icon sx={{ fill: 'grey', with: '20px', Height: '20px' }} />
          </Box>
          <Box>
            <Typography variant="h6" color="secondary">
              {lesson.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Typography variant="body1" color="tertiary">
                {lesson.duration} min
              </Typography>
              <Typography sx={sxStyles.lessonType} color="tertiary">
                {lesson.type}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            sx={{ border: '2px solid grey' }}
            onClick={() => {
              openEditModal();
            }}
          >
            <EditIcon />
          </Button>
          <Button sx={{ border: '2px solid grey' }}>
            <LockIcon />
          </Button>
          <Button
            sx={{ border: '2px solid red' }}
            onClick={() => {
              openDeleteModal();
            }}
          >
            <DeleteIcon sx={{ fill: 'red' }} />
          </Button>
        </Box>
      </Box>

      <LessonAddModal isOpen={isEditModalOpen} close={closeEditModal} lesson={lesson} />
      <ConfirmModal
        subtitle={`Are you sure you want to delete "${lesson.title}"? This action cannot be undone.`}
        title="Delete Lesson"
        isOpen={isDeleteModalOpen}
        buttonText="Delete lesson"
        close={closeDeleteModal}
      />
    </>
  );
}
const sxStyles = createSxStylesList({
  item: {
    p: '20px',
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'space-between' },
    alignItems: { xs: 'flex-start', md: 'center' },
    position: 'relative',
    flexDirection: { xs: 'column', md: 'row' },
  },
  index: {
    width: '45px',
    height: '45px',
    borderRadius: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    m: '0  0 20px 15px ',
    backgroundColor: '#37123c',
  },
  iconCon: {
    width: '45px',
    height: '45px',
    borderRadius: '100%',
    border: '2.5px solid grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    m: '0  0 20px 15px ',
  },
  lessonType: {
    border: ' 1px solid  grey',
    borderRadius: '20px',
    p: '3px 15px',
    fontSize: '13px',
  },
});

export default AdminLessonItem;
