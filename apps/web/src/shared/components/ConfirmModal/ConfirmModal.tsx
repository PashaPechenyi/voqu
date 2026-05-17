import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type ConfirmModalProps = {
  title: string;
  subtitle: string;
  isOpen: boolean;
  buttonText: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  subtitle,
  isOpen,
  buttonText,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} slotProps={{ paper: { sx: sxStyles.paper } }}>
      <DialogTitle>
        <Typography variant="h4" color="error">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={sxStyles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onConfirm} sx={sxStyles.confirmButton}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const sxStyles = createSxStylesList({
  paper: (theme) => ({
    p: '20px',
    borderRadius: '20px',
    border: `4px solid ${theme.palette.error.main}`,
    width: 1,
  }),
  cancelButton: { p: '10px' },
  confirmButton: (theme) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    p: '10px',
  }),
});

export default ConfirmModal;
