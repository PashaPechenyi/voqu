import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { FC } from 'react';
import { useMutation } from '@/shared/api';
import { WordlistSegment } from '../../types/wordlistSegment.type';
import { deleteSegmentReq } from '../../helpers/deleteSegmentReq';

type DeleteLessonModalProps = {
  open: boolean;
  onClose: () => void;
  segment: WordlistSegment;
  onDeleteSuccess?: () => void;
};

export const DeleteSegmentModal: FC<DeleteLessonModalProps> = ({
  open,
  onClose,
  segment,
  onDeleteSuccess,
}) => {
  const { isLoading, mutate: deleteSegment } = useMutation({
    mutationFn: deleteSegmentReq,
    onSuccess: onDeleteSuccess,
  });

  const onSubmit = () => {
    if (!segment.id) return;
    deleteSegment(segment.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={sxStyles.modal}>
        <Typography variant="h6" component="h2">
          Delete Segment
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete "{segment.title.value}"? This action cannot be undone.
        </Typography>

        <Box sx={sxStyles.actions}>
          <Button loading={isLoading} onClick={onSubmit} variant="contained" color="error">
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

const sxStyles = createSxStylesList({
  modal: {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'error.main',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
  },
});
