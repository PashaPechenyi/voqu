import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

type ConfirmModalProps = {
  title: string;
  subtitle: string;
  onDelete?: () => void;
  isOpen: boolean;
  buttonText: string;
  close: () => void;
  deleteFunc?:() => void;
};

function ConfirmModal({ title, subtitle, isOpen, buttonText, close, deleteFunc}: ConfirmModalProps) {
  // const handleClose = () => {
  //   setIsOpen(false);
  // };
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      slotProps={{
        paper: {
          sx: {
            p: '20px',
            borderRadius: '20px',
            border: '4px solid red',
            width: 1,
          },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" color="red">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button onClick={deleteFunc} sx={{ backgroundColor: 'red', color: 'white', p: '10px' }}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
