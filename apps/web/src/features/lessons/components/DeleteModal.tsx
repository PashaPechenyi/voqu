import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

// TODO: create global component in shared folder - ConfirmationModal
// it will be used everywhere where you need confirmation for something (delete/...)
type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainWord: string;
  title: string;
};

// TODO: rename file, component and props types to add Lesson
export default function DeleteModal({ isOpen, setIsOpen, mainWord, title }: DeleteModalProps) {
  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          p: '20px',
          borderRadius: '20px',
          border: '4px solid red',
          width: 1,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" color="red">
          Delete {mainWord}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button sx={{ backgroundColor: 'red', color: 'white', p: '10px' }}>
          {' '}
          {mainWord == 'Lesson' ? 'Delete lesson' : ' Delete course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
